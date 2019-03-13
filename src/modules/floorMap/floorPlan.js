import React, {Component} from 'react'
import {connect} from "react-redux";
import {StyleSheet, View, Text, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';
import {downloadMap, downloadBeaconList, updatePosition} from "./actions/mapAction";
import {PriorityLocation, centerAreaCalculator} from "./element/priorityLocation";
import {PriorityAreaCalculator} from "./element/priorityAreaCalculator";
import {resetScan, startScan, currentlyScanning} from "../auxModule/auxModule";
import AuxModule from "../auxModule/auxModule";
import Orientation from 'react-native-orientation';

//Leyenda : En el mapa habrá distintos valores según el terreno ...
// valor 1 = Camino transitable. (Azul)
// valor 0 = Camino no transitable. (Rojo)
// valor 2 = Escaleras o ascensores
class FloorPlan extends Component {

    interval;
    reset;
    beacons3 = [];

    constructor(props) {
        super(props);

    }

    async componentDidMount(): void {
        Orientation.lockToLandscape();
        try {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH,
                {
                    'title': 'Bluetooth',
                    'message': 'Beacon Scanner needs access to your bluetooth ' +
                        'so you we are able to find the beacons.'
                })
        }catch (err) {
            console.warn(err)
        }
    }

    componentWillMount(): void {
        this.interval = setInterval(async () => {
            if (this.props.scanner.beaconsOnRange.length > 0) {
                let area = this._calculatePosition();
                let center = null;
                area.length > 0 ? center = centerAreaCalculator({area: area}) : null;
                await this.props.updatePosition(area, center);
                this.setState();
            }
        }, 2000);
        this.reset = setInterval(() => {
            resetScan();
            this.setState({});
        }, 8000);
    }

    componentWillUnmount(): void {
        Orientation.unlockAllOrientations();
        clearInterval(this.interval);
        clearInterval(this.reset);
    }

    renderRow = (row, index) => {
        if (index < 8) {
            return null;
        }
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {
                    row.map((x, index) => {
                        switch (x) {
                            case 1: //Camino transitable
                                return (<View key={index} style={{flex: 1, backgroundColor: '#f0f3fd'}}/>);
                            case 0: // Camino no transitable
                                return (<View key={index} style={{flex: 1, backgroundColor: '#7c7d8d'}}/>);
                            // Posición actual
                            case 5:
                                return (<View key={index} style={{flex: 1, backgroundColor: 'yellow'}}/>);
                            case 6:
                                return (
                                    <View key={index} style={{flex: 1, backgroundColor: 'f0f3fd'}}>
                                        <Image source={require('../../../assets/images/placeholder.png')}
                                               style={{flex: 1, height: undefined, width: undefined}}

                                        />

                                    </View>);
                        }
                    })}
            </View>
        )
    };


    _getBeaconsOnPriority = () => {
        let result = [];
        this.props.scanner.beaconsOnRange.forEach((beacon) => {
            10 ** ((-50 - beacon.rssi) / 35) < 8 ? result.push(beacon) : null;
        });
        return result;
    };

    _calculatePosition = () => {
        let beacons = this._getBeaconsOnPriority();
        console.log("Beacons to show: ", beacons);
        this.beacons3 = [];
        let beaconFinder = [];
        for (let i = 0; i < beacons.length; i++) {

            let beaconPosition = this.props.mapRedux.beaconsList[beacons[i].name];
            beaconFinder.push({x: beaconPosition.x, y: beaconPosition.y, rssi: beacons[i].rssi});
            this.beacons3.push({name: beacons[i].name, distance: 10 ** ((-50 - beacons[i].rssi) / 35)})

        }
        console.log("beaconFinder: ", beaconFinder);
        let areas = PriorityAreaCalculator({
            beaconsOnPriority: beaconFinder,
            plan: this.props.mapRedux.plan
        });
        console.log("These are the areas: ", areas);
        if (areas.priority1.length > 0 || areas.priority2.length > 0) {
            return PriorityLocation({
                areas: areas
            })
        } else {
            return [];
        }


    };


    _renderButton = (text, onPress) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );

    //Poner el auxmodule de nuevo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    render() {
        return (
            <View style={{flex: 12, flexDirection: 'column'}}>
                <AuxModule/>
                <View style={{flex: 9}}>
                    {this.props.mapRedux.plan.map((row, index) => {
                        return this.renderRow(row, index)
                    })}
                </View>
                <View style={styles.buttonContainer}>
                    {this._renderButton('Start scanning', startScan)}
                </View>
                <View style={{flex: 2}}>
                    {this.beacons3.map((beacon) => {
                        return (<Text>{beacon.name} --> {beacon.distance}</Text>)
                    })}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        width: '90%',
        height: '40%'
    },
    buttonText: {
        color: '#323232',
    },
    buttonContainer: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    iconContainer: {
        flex: 1,
        backgroundColor: '#f0f3fd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: '50%',
        width: '50%'
    },
});

const
    mapStateToProps = state => {
        return {
            mapRedux: state.MapReducer,
            scanner: state.RangeReducer

        }
    };

const mapStateToPropsAction = {downloadMap, downloadBeaconList, updatePosition};


export default connect(mapStateToProps, mapStateToPropsAction)(FloorPlan);
