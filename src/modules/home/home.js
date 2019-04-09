import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {downloadBeaconList, downloadMap} from "../floorMap/actions/mapAction";
import {connect} from "react-redux";
import SplashScreen from 'react-native-splash-screen'
import Population from '../pathFinder/mapRoute/RenderPopulation'

class Home extends Component {

    async componentDidMount(): void {
        console.log("Descargando lista de beacons");
        await this.props.downloadBeaconList();
        await this.props.downloadMap();
        SplashScreen.hide();
    }

    //GENETIC ALGORITHM FOR THE ROUTE
    tryGenetic = () => {
        //Render del 16 al 17
        let start = {x: this.props.mapRedux.beaconsList["BlueUp-04-025416"].x, y: this.props.mapRedux.beaconsList["BlueUp-04-025416"].y}
        let target = {x: this.props.mapRedux.beaconsList["BlueUp-04-025417"].x, y: this.props.mapRedux.beaconsList["BlueUp-04-025417"].y}
        let population = new Population(
            start,
            target,
            this.props.mapRedux.plan,
            0.1, 50
        );

        //Nos resta iterar sobre la poblacion con seleccion natural, mutacion y crossovers
        let iterationLimit = 1;

        // Generate weighed mating pool with the fittest members
        population.naturalSelection();

        for ( let i = 0; i<iterationLimit; i++) {
            // Generate new population of children from parents in the mating pool
            population.generate();

            // Calculate fitness score of the new population
            population.calcPopulationFitness();

            // Get the best route in the population
            population.evaluate();
        }
        console.log("Heeeeecho", population.best);
    };

    render() {
        return (
            <View style={styles.container}>
                {this.props.mapRedux.plan.length > 0 ? <Text> Todo ok </Text>: null}

                <TouchableOpacity onPress={() => /*this.props.navigation.navigate('FloorPlan')*/this.tryGenetic()}>
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