import React from 'react';
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image as RNImage,
} from 'react-native';
import {connect} from 'react-redux';
import {addPhoto, deletePhoto, clearPhotos} from '../redux/Actions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native-compressor';
import Icon from 'react-native-vector-icons/Entypo';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useNavigation} from '@react-navigation/native';
import DrawerNavbar from './DrawerNavbar';

const PhotoGallery = ({photos, addPhoto, deletePhoto, clearPhotos}) => {
  const selectImage = sourceType => {
    const options = {
      title: 'Select Images',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
      includeBase64: false,
      saveToPhotos: true,
      cameraType: 'back',
      videoQuality: 'high',
      durationLimit: 10,
      selectionLimit: 0, // Set this to 0 for unlimited selection from the gallery
    };

    if (sourceType === 'camera') {
      launchCamera(options, response => {
        handleImageResponse(response);
      });
    } else if (sourceType === 'gallery') {
      launchImageLibrary(options, response => {
        handleImageResponse(response);
      });
    }
  };

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('Image selection cancelled');
    } else if (response.error) {
      console.log('Image selection error:', response.error);
    } else if (response.assets && response.assets.length > 0) {
      try {
        const compressedImages = response.assets.map(async asset => {
          const compressedImage = await Image.compress(asset.uri);
          return compressedImage;
        });
        Promise.all(compressedImages)
          .then(compressedImages => {
            compressedImages.forEach(imageUri => {
              // Dispatch the addPhoto action to add the image to the Redux store
              addPhoto(imageUri);
            });
          })
          .catch(error => {
            console.error('Image compression error:', error);
          });
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  };

  const deleteImage = index => {
    deletePhoto(index);
  };

  const clearImages = () => {
    clearPhotos();
  };

  const renderItem = ({item, index}) => (
    <View style={styles.imageContainer}>
      {/* Add a button with the drawer icon */}
      <RNImage source={{uri: item}} style={styles.image} />
      <TouchableOpacity
        onPress={() => deleteImage(index)}
        style={styles.deleteIconContainer}>
        <Icon name="circle-with-cross" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <DrawerNavbar/> */}
      <Button
        title="Select Photos from Gallery"
        onPress={() => selectImage('gallery')}
      />
      <Button
        title="Take Photos from Camera"
        onPress={() => selectImage('camera')}
      />
      <Button title="Clear Images" onPress={clearImages} />
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    photos: state.photos.photos,
  };
};

const mapDispatchToProps = {
  addPhoto,
  deletePhoto,
  clearPhotos,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 3 - 10,
    height: Dimensions.get('window').width / 3 - 10,
    margin: 5,
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 5,
    borderRadius: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);
