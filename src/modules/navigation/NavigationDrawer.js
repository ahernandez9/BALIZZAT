import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Home from "../home/home"
import FloorPlan from "../floorMap/floorPlan"
import TopPlaces from "../topPlaces/topPlaces"
import DrawerComponent from "./elements/DrawerComponent";
import {version} from '../../../app.json';
import icon from '../../../assets/images/icon.png';
import {Actions} from 'react-native-router-flux';

class NavigationDrawer extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.overlay}>
                    <Image source={icon} style={styles.logo}
                           resizeMode='contain'/>
                </View>

                <View style={{width: '100%', height: 1, backgroundColor: '#e2e2e2'}}/>

                <DrawerComponent
                    title={"Inicio"}
                    icon={'home'}
                    onPress={() => Actions.Home()}
                />

                <DrawerComponent
                    title={"Mapa"}
                    icon={'map'}
                    onPress={() => Actions.FloorPlan()}
                />

                <DrawerComponent
                    title={"Lugares de interés"}
                    icon={'map-signs'}
                    onPress={() => Actions.TopPlaces()}
                />

                <View style={styles.containerEnd}>
                    <TouchableOpacity /*onPress={() => Actions.LegalWarning()}*/ >
                        <Text style={styles.bottomText}>Instrucciones de uso</Text>
                    </TouchableOpacity>

                    <Text style={styles.version}>{version}</Text>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    overlay: {
        flexDirection: 'column',
        paddingTop: '5%',
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.3
    },
    logo: {
        height: '9%'
    },
    containerEnd: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 25
    },
    bottomText: {
        marginBottom: 10,
        fontSize: 14,
    },
    version: {
        color: 'gray',
        fontSize: 14,
    }
});


export default NavigationDrawer;