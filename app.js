import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import PhotoGallery from './src/components/PhotoGallery';

const App = () => {
  return (
    <Provider store={store}>
      <PhotoGallery />
    </Provider>
  );
};

export default App;
