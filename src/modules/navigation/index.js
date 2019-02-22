import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene} from 'react-native-router-flux'
import Home from "../home/home";
import FloorPlan from "../floorMap/floorPlan"



class IndexNavigation extends Component{
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene
                        key="Home"
                        component={Home}
                        initial
                        hideNavBar
                    />
                    <Scene
                        key="FloorPlan"
                        component={FloorPlan}
                        hideNavBar
                    />

                </Scene>

            </Router>
        );
    }
}

const styles = StyleSheet.create({

});
export default IndexNavigation

