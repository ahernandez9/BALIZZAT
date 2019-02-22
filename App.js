import configureStore from './src/Store/store';
import {Provider} from "react-redux";
import React, {Component} from "react";
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
const {persistor, store} = configureStore();
import IndexNavigation from "./src/modules/navigation"

export default class App extends Component {


    render() {
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor} onBeforeLift={this._onBeforeLift}>
            <StatusBar
                //backgroundColor={colors.primaryColor}
                barStyle="dark-content"
            />
            <IndexNavigation/>
          </PersistGate>
        </Provider>
    );
  }
}


