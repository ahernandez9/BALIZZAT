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
    Dimensions,
    PanResponder
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
import GeneticAlgorithm from "../pathFinder/beaconRoute/geneticAlgorithm";


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

        // this.panResponder = null;

        this.state = {
            loading: false,
            showRoute: false,
            optimalRoute: null,
            // locationX: 0,
            // locationY: 0,
            // enablePanHandlers: false
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
        // this.panResponder = PanResponder.create(
        //     {
        //         onStartShouldSetPanResponder: (event, gestureState) => true,
        //         onStartShouldSetPanResponderCapture: (event, gestureState) => true,
        //         onMoveShouldSetPanResponder: (event, gestureState) => false,
        //         onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
        //         onPanResponderGrant: (event, gestureState) => false,
        //         onPanResponderMove: (event, gestureState) => false,
        //         onPanResponderRelease: (event, gestureState) =>
        //         {
        //             this.setState({
        //                 locationX: event.nativeEvent.locationX.toFixed(2),
        //                 locationY: event.nativeEvent.locationY.toFixed(2),
        //                 enablePanHandlers: false
        //             });
        //         }
        //     });
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
        this.flipaManito = {x: 0, y: 0};
        while (this.props.mapRedux.plan[this.flipaManito.x][this.flipaManito.y] === 0) {
            let x = Math.floor(Math.random() * 115);
            let y = Math.floor(Math.random() * 274);
            this.flipaManito = {x: x, y: y};
        }
        console.log("position: ", x, y);
        await this.props.updateCurrentPosition(this.flipaManito);
        // await this.props.updatePosition([[x,y]], null);
        this.props.updateOptimalRoute([]);
        // console.log(this.state);
        this.setState({showRoute: false, optimalRoute: null/*, enablePanHandlers: true*/})
    };

    _renderButton = (text, onPress) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );

    setReference = (reference) => {
        this.pollas = reference;
    };

    // scrollToPosition = () => {
    //     console.log("estas pasando flaco?", this.pollas);
    //     Esta es la mierda que nos ocupa ahora
        // this.pollas.scrollTo(2000, 700, true)
    // };

    getClosestBeaconsFromPosition(position) {
        let beacons = this.props.mapRedux.beaconsList;
        let closest = null, shortestDistance = 100000;
        for (let [key, beacon] of Object.entries(beacons)) {
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
    tryGenetic = async () => {
        this.setState({loading: true});
        let closestBeacon = this.getClosestBeaconsFromPosition(this.props.mapRedux.currentPosition);
        let nonEvolvedPopulation = new Population(
            closestBeacon,
            this.props.mapRedux.beaconsList["Beacon-131"],
            this.props.mapRedux.beaconsList,
            0.3, 500, true);

        let firstGenetic = new GeneticAlgorithm(nonEvolvedPopulation, 5);
        for(let i = 0; i < 1000; i++) {
            firstGenetic.evolvePopulation();
        }
        let fittest = firstGenetic.population.getFittest();

        if(this.state.optimalRoute === null) {
            await this.setState({optimalRoute: fittest});
        } else if (this.state.optimalRoute.fitness > fittest.fitness) {
            await this.setState({optimalRoute: fittest});
        }

        let currentPosition = this.props.mapRedux.currentPosition;
        let beacons = this.state.optimalRoute.beacons;
        if (!(this.state.optimalRoute.beacons[0].x === currentPosition.x && this.state.optimalRoute.beacons[0].y === currentPosition.y)) {
            beacons.unshift(currentPosition);
        }
        console.log("Heeeeecho", this.state.optimalRoute);
        console.log("Beacons", beacons);

        this.renderRoute(beacons)
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
                {this.state.enablePanHandlers &&
                    <View style = {{ flex: 1, backgroundColor: 'transparent' }}  { ...this.panResponder.panHandlers } />
                }
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
                        <View style={styles.loadingView}>
                            <View style={styles.loadingTextView}>
                                <Text style={styles.loadingText}>Calculando la mejor ruta, por favor espere</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignContent: 'center', marginBottom: 15}}>
                                <ActivityIndicator size="large"/>
                            </View>
                        </View>
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
        // alignItems: 'center',
        // justifyContent: 'center',
        // position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%',
    },
    loadingView: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        width: '73%',
        position: 'absolute',
        left: '13.5%',
        bottom: '40%'
    },
    loadingTextView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 19,
        marginTop: 15,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 15,
        textAlign: 'center',
        width: '90%',
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
