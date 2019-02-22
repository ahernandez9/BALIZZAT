import {todoApp} from "../redux/reducers"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistStore, persistReducer, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Note: this API requires redux@>=3.1.0
const config = {
    key: 'root',
    storage,
   // blacklist: [],
    whitelist: ['MapReducer']
};

const reducers = persistReducer(config, todoApp);

const composeEnhancers = (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] && __DEV__)
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({shouldHotReload: false})
    : compose;

export default function configureStore() {

    const middleware = (__DEV__) ? [thunk, logger] : [thunk];
    const enhancers = [applyMiddleware(...middleware)];
    const initialState = {};
    // if (__DEV__) middleware.push(logger); //Show logs on Chrome

    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(...enhancers)
        // compose(...enhancers)
    );
    let persistor = persistStore(store);

    return {persistor, store};


}


