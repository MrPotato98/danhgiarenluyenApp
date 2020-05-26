import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './src/duck/index';
import AppNavigator from './src/navigators/app.navigation';

const App = () => {
  const store = configureStore();

  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
};

export default App;
