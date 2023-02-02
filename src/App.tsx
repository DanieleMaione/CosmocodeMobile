/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {NavigatorApp} from './NavigatorApp';

export default function App() {
  return (
    <Provider store={store}>
      <NavigatorApp />
    </Provider>
  );
}
