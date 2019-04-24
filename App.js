import configureStore from './src/Store/store';
import {Provider} from "react-redux";
import React, {Component} from "react";
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';
const {persistor, store} = configureStore();
import IndexNavigation from "./src/modules/navigation/IndexNavigation";

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
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

