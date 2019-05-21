import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {downloadBeaconList, downloadMap} from "../floorMap/actions/mapAction";
import {connect} from "react-redux";
import SplashScreen from 'react-native-splash-screen'
import {Actions} from 'react-native-router-flux'

class Home extends Component {

    async componentDidMount(): void {
        console.log("Descargando lista de beacons");
        await this.props.downloadBeaconList();
        await this.props.downloadMap();
        // this.showMap();
        SplashScreen.hide();
    }

    // showMap = () => {
    //     let mapita = [];
    //     for (let row of this.props.mapRedux.plan) {
    //         let show = [];
    //         for (let i = 100; i < 275; i++) {
    //             show.push(row[i]);
    //         }
    //         mapita.push(show);
    //     }
    //     console.log(mapita);
    // };

    render() {
        return (
            <View style={styles.container}>
                {this.props.mapRedux.plan.length > 0 ? <Text> Todo ok </Text>: null}

                <TouchableOpacity onPress={() => Actions.FloorPlan()}>
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