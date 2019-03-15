import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {downloadBeaconList, downloadMap} from "../floorMap/actions/mapAction";
import {connect} from "react-redux";
import SplashScreen from 'react-native-splash-screen'
import Population from "../pathFinder/element/Population";


class Home extends Component {

    async componentDidMount(): void {
        console.log("Descargando lista de beacons");
        await this.props.downloadBeaconList();
        await this.props.downloadMap();
        SplashScreen.hide();

    }

    tryGenetic() {
        let population = new Population(this.props.mapRedux.beaconsList["BlueUp-04-025412"],this.props.mapRedux.beaconsList["BlueUp-04-025420"], this.props.mapRedux.beaconsList,
            0.1, 50);
        //Nos resta iterar sobre la poblacion con seleccion natural, mutacion y crossovers

        //for ( numero de iteraciones para que converja en solucion optima) {
            // Generate weighed mating pool with the fittest members
            population.naturalSelection();

            // Generate new population of children from parents in the mating pool
            population.generate();

            // Calculate fitness score of the new population
            population.calcPopulationFitness();

            // Get the best route in the population
            population.evaluate();
        // }

        console.log("Heeeeecho", population.best);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.mapRedux.plan.length > 0 ? <Text> Todo ok </Text>: null}

                <TouchableOpacity onPress={() => this.props.navigation.navigate('FloorPlan')}>
                    <View style={styles.circle}>
                        <Text style={styles.text}>
                            TAP TO PLAY
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        color: 'black',
        alignItems: 'center',

    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 50
    }
});

const mapStateToProps = state => {
    return {
        mapRedux: state.MapReducer,

    }
};

const mapStateToPropsAction = {downloadMap, downloadBeaconList};


export default connect(mapStateToProps, mapStateToPropsAction)(Home);