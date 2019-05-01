import React, {Component} from 'react'
import {connect} from "react-redux";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    TextInput,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import {
    downloadMap,
    downloadBeaconList,
    colorPositions,
    updateCurrentPosition,
    updateOptimalRoute
} from "./actions/mapAction";
import {PriorityLocation, centerAreaCalculator} from "./element/priorityLocation";
import {PriorityAreaCalculator} from "./element/priorityAreaCalculator";
import {resetScan, startScan, currentlyScanning} from "../scanner/scanner";
import Scanner from "../scanner/scanner";
import Orientation from 'react-native-orientation';
import Map from "./element/Map";
import Population from "../pathFinder/beaconRoute/Population";
import RenderRoute from "../pathFinder/mapRoute/RenderRoute";
import util from "../pathFinder/mapRoute/RenderUtilities";


//Leyenda : En el mapa habrá distintos valores según el terreno ...
// valor 1 = Camino transitable. (Azul)
// valor 0 = Camino no transitable. (Rojo)
// valor 2 = Escaleras o ascensores

// valor 7 = balizas

class FloorPlan extends Component {

    interval;
    reset;
    beacons3 = [];
    pollas = {};
    flipaManito = {};

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showRoute: false
        }
    }

    async componentDidMount(): void {
        //Orientation.lockToLandscape();
        // try {
        //     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH,
        //         {
        //             'title': 'Bluetooth',
        //             'message': 'Beacon Scanner needs access to your bluetooth ' +
        //                 'so you we are able to find the beacons.'
        //         })
        // }catch (err) {
        //     console.warn(err)
        // }
    }

    componentWillMount(): void {
        // this.interval = setInterval(async () => {
        //     console.log("Beacons en rango", this.props.scanner.beaconsOnRange);
        //     if (this.props.scanner.beaconsOnRange.length > 0) {
        //         let area = this._calculatePosition();
        //         let center = null;
        //         area.length > 0 ? center = centerAreaCalculator({area: area}) : null;
        //         await this.props.updatePosition(area, center);
        //         this.setState();
        //     }
        // }, 2000);
        // this.reset = setInterval(() => {
        //     resetScan();
        //     this.setState({});
        // }, 8000);
    }

    componentWillUnmount(): void {
        Orientation.unlockAllOrientations();
        clearInterval(this.interval);
        clearInterval(this.reset);
    }

    _getBeaconsOnPriority = () => {
        let result = [];
        this.props.scanner.beaconsOnRange.forEach((beacon) => {
            10 ** ((-68 - beacon.rssi) / 35) < 8 ? result.push(beacon) : null;
        });
        return result;
    };

    _calculatePosition = () => {
        let beacons = this._getBeaconsOnPriority();
        console.log("Beacons to show: ", beacons);
        this.beacons3 = [];
        let beaconFinder = [];
        for (let i = 0; i < beacons.length; i++) {

            let beaconPosition = this.props.mapRedux.beaconsList[beacons[i].address];
            beaconFinder.push({x: beaconPosition.x, y: beaconPosition.y, rssi: beacons[i].rssi});
            this.beacons3.push({name: beacons[i].address, distance: 10 ** ((-68 - beacons[i].rssi) / 35)})

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

    async colorRandomPosition() {
        let x = Math.floor(Math.random() * 58);
        let y = Math.floor(Math.random() * 138);
        this.flipaManito = {x: x, y: y};
        while (this.props.mapRedux.plan[this.flipaManito.x][this.flipaManito.y] === 0) {
            let x = Math.floor(Math.random() * 58);
            let y = Math.floor(Math.random() * 138);
            this.flipaManito = {x: x, y: y};
        }
        console.log("position: ", x, y);
        await this.props.updateCurrentPosition(this.flipaManito);
        //await this.props.updatePosition([[x,y]], null);
        this.props.updateOptimalRoute([]);
        this.setState({showRoute: false})
    };

    _renderButton = (text, onPress) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );

    setReference = (reference) => {
        this.pollas = reference;
    };

    scrollToPosition = () => {
        console.log("estas pasando flaco?", this.pollas);
        //Esta es la mierda que nos ocupa ahora
        this.pollas.scrollTo(2000, 700, true)
    };

    getClosestBeaconsFromPosition(position) {
        let beacons = this.props.mapRedux.beaconsList;
        console.log("beacons: ", beacons);
        let closest = null, shortestDistance = 100000;
        for (let [key, beacon] of Object.entries(beacons)) {
            console.log("dentro del for", beacon, position);
            let distance = util.manhattanDistance(beacon, position);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closest = beacon;
            }
        }

        return closest
    }

//RENDER OPTIMISED ROUTE
    renderRoute = (populationFittest) => {
        console.log(populationFittest);
        let optimalRoute = [];
        //Render del 16 al 17
        for (let i = 0; i < populationFittest.length - 1; i++) {
            let start = {x: populationFittest[i].x, y: populationFittest[i].y};
            let target = {x: populationFittest[i + 1].x, y: populationFittest[i + 1].y};
            let route = new RenderRoute(
                this.props.mapRedux.plan,
                start,
                target,
                true
            );
            optimalRoute.push.apply(optimalRoute, route.positions);
            //this.props.colorPositions(route.positions, 4);
        }
        this.props.updateOptimalRoute(optimalRoute);
        this.setState({loading: false, showRoute: true});
    };

//GENETIC ALGORITHM FOR BEACONS
    tryGenetic = () => {
        this.setState({loading: true});
        let closestBeacon = this.getClosestBeaconsFromPosition(this.props.mapRedux.currentPosition);
        console.log("Closest: ", closestBeacon, 'shouldBe', this.props.mapRedux.beaconsList["BlueUp-04-025415"] );
        let population = new Population(
            closestBeacon,
            this.props.mapRedux.beaconsList["BlueUp-04-025415"],
            this.props.mapRedux.beaconsList,
            0.1, 50
        );

        //Nos resta iterar sobre la poblacion con seleccion natural, mutacion y crossovers
        let iterationLimit = 1;

        // Generate weighed mating pool with the fittest members
        population.naturalSelection();

        for (let i = 0; i < iterationLimit; i++) {
            // Generate new population of children from parents in the mating pool
            population.generate();

            // Calculate fitness score of the new population
            population.calcPopulationFitness();

            // Get the best route in the population
            population.evaluate();
        }
        console.log("Heeeeecho", population.best);
        let beacons = population.best.beacons;
        let position = this.props.mapRedux.currentPosition;
        console.log("Population.bestBeacons: ", beacons);
        console.log("position: ", position);
        console.log("Añadimos currentPosition: ", beacons.unshift(position));
        console.log("Añadimos currentPosition: ", beacons);
        this.renderRoute(population.best.beacons)

    };

//<Scanner/>
// <Map
//callbackFromParent={(reference) => this.setReference(reference)}
// />
//Poner el scanner de nuevo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    render() {
        console.log("RENDER");
        return (
            <SafeAreaView style={styles.containerScrollView}>
                <Map
                    showRoute={this.state.showRoute}
                />
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.circle, {marginBottom: 2}]}
                        onPress={() => this.colorRandomPosition()}>
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                justifyContent: "center"
                            }}
                            source={require('../../../assets/images/gps-fixed-indicator.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.circle, {backgroundColor: '#FF9800', marginBottom: 5}]}
                        onPress={() => this.tryGenetic()}
                    >
                        <Image
                            style={{
                                width: 15,
                                height: 15,
                                justifyContent: "center"
                            }}
                            source={require('../../../assets/images/forward-arrow.png')}
                        />
                        <Text>Go</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.searcherContainer}>
                    <TextInput
                        style={[{height: 40, borderColor: 'gray', borderWidth: 1}, styles.searcher]}
                        placeholder={"Search your room here.  Eg: 101"}
                    />
                </View>
                {this.state.loading &&
                <View style={styles.containerLoading}>
                    <Text style={styles.loadingText}>Calculando la mejor ruta,{'\n'}por favor espere</Text>
                    <ActivityIndicator size="large"/>
                </View>
                }
            </SafeAreaView>
        )
    }
}

/*
 <View style={styles.searcherContainer}>
                    <TextInput
                        style={[{height: 40, borderColor: 'gray', borderWidth: 1}, styles.searcher]}
                        placeholder={"Search your room here.  Eg: 101"}
                    />
                </View>
*/
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
    buttonGroup: {
        flexDirection: 'column',
        bottom: 1,
        marginBottom: 85,
        marginRight: 20,
        position: 'absolute',
        right: 0.5,
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
    circle: {
        padding: 2,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1
    },
    circleIcon: {},
    searcherContainer: {
        flex: 2,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0.5,
        width: "100%",
        marginBottom: 36,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searcher: {
        borderRadius: 10,
        width: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    containerScrollView: {
        flex: 1
    },
    contentContainer: {
        height: 1080,
        width: 1080,
    },
    containerLoading: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: Dimensions.get('window').height / 2,
        left: Dimensions.get('window').width / 2,
        margin: 15,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '700',
    },
});

const
    mapStateToProps = state => {
        return {
            mapRedux: state.MapReducer,
            scanner: state.RangeReducer
        }
    };

const mapStateToPropsAction = {
    downloadMap,
    downloadBeaconList,
    colorPositions,
    updateCurrentPosition,
    updateOptimalRoute
};


export default connect(mapStateToProps, mapStateToPropsAction)(FloorPlan);
