import React, {Component} from 'react';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import {Router, Scene} from 'react-native-router-flux'
import Home from "../home/home";
import FloorPlan from "../floorMap/floorPlan"
import TopPlaces from "../topPlaces/topPlaces"
import menuIcon from "./elements/MenuIcon";
import NavigationDrawer from "./NavigationDrawer"

class IndexNavigation extends Component {
    render() {
        return (
            <View style={Platform.OS === 'ios' ? styles.containersIos : styles.containersAndroid}>
                <Router>
                    <Scene key='app'
                           drawer
                           contentComponent={NavigationDrawer}
                           hideNavBar
                           drawerWidth={2*Dimensions.get('window').width/3}
                           drawerIcon={menuIcon}
                           navigationBarStyle={{backgroundColor: '#fff'}}
                    >

                        <Scene key='Home'
                               component={Home}
                               initial
                               title={'Inicio'}
                               disableBackButton
                        />

                        <Scene key='FloorPlan'
                               component={FloorPlan}
                               title={'Mapa'}
                               HideNavBar
                        />

                        <Scene key='TopPlaces'
                               component={TopPlaces}
                               title={'Lugares de interés'}
                               HideNavBar
                        />
                    </Scene>
                </Router>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containersIos: {
        flex: 1,
    },
    containersAndroid: {
        flex: 1,
        // paddingTop: 24,
        // backgroundColor: 'rgba(0,0,0, 0.1)'
    }
});

export default IndexNavigation

