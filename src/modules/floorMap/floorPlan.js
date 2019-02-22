import React, {Component} from 'react'
import {connect} from "react-redux";
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
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

    constructor(props) {
        super(props);
        this.state = {
            beaconsToShow: []
        }

    }

    componentDidMount(): void {
        Orientation.lockToLandscape();
        this.interval = setInterval(async () => {
            if (this.props.scanner.beaconsOnRange.length > 0) {
                let area = this._calculatePosition();
                let center = centerAreaCalculator({area: area});
                await this.props.updatePosition(area, center);
                this.setState();
            }
        }, 2000);
        this.reset = setInterval(() => {
            resetScan();
            this.setState({});
        }, 7000);

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
        let iconWidth, iconHeight;
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
                                <View onLayout={(event) => {
                                    iconWidth  = event.nativeEvent.layout.width;
                                    iconHeight = event.nativeEvent.layout.height;
                                    console.log("height :", iconHeight , "width: ",iconWidth);
                                }} key={index} style={{flex: 1, backgroundColor: 'f0f3fd'}}>
                                    <Image source={require('../../../assets/images/placeholder.png')}
                                           resizeMode={"center"}
                                           resizeMethod={"resize"}
                                           style={{flex:1, height: undefined, width: undefined}}

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
            10 ** ((-50 - beacon.rssi) / 35) <= 10 ? result.push(beacon) : null;
        });
        return result;
    };

    _calculatePosition = () => {

        let beacons = this._getBeaconsOnPriority();
        console.log("Beaacons to show: ", beacons);
        this.setState({
            beaconsToShow: beacons
        });
        let finder = [];
        for (let i = 0; i < beacons.length; i++) {
            // distance : Formula para calcular distancia entre beacon y movil a partir de el rssi esperado a un metro ( -50) y una
            //constante en 20 y 40 ( 35 ). Los valores dados salen después de calcular varias posibilidades.
            let distance = Math.round(10 ** ((-50 - beacons[i].rssi) / 35));
            //Si la distancia es 0.algo la redondeamos a 1 para que los calculos funcionen. A efectos prácticos es lo mismo
            distance === 0 ? distance = 1 : null;
            let beaconPosition = this.props.mapRedux.beaconsList[beacons[i].name];
            finder[i] = {x: beaconPosition.x, y: beaconPosition.y, distance: distance};
        }
        console.log("Finder: ", finder);
        let areas = PriorityAreaCalculator({
            beaconsOnPriority: finder,
            plan: this.props.mapRedux.plan
        });
        console.log("These are the areas: ", areas);
        return PriorityLocation({
            areas: areas
        })


    };

    _showBeaconsForCalculation = () => {
        if (this.state.beaconsToShow.length > 0) {
            return this.state.beaconsToShow.map((beacon) => {
                return <Text>{beacon.name} --- {10 ** ((-50 - beacon.rssi) / 35)}</Text>
            })
        } else {
            return null;
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
                <View style={{flex: 11}}>
                    {this.props.mapRedux.plan.map((row, index) => {
                        return this.renderRow(row, index)
                    })}
                </View>
                <View style={styles.buttonContainer}>
                    {this._renderButton('Start scanning', startScan)}
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
