import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {downloadBeaconList, downloadMap, updateCurrentPosition} from "../floorMap/actions/mapAction";
import {connect} from "react-redux";
import SplashScreen from 'react-native-splash-screen'
import {Actions} from 'react-native-router-flux'

class Home extends Component {

    async componentDidMount(): void {
        console.log("Descargando lista de beacons");
        await this.props.downloadBeaconList();
        await this.props.downloadMap();
        this.props.updateCurrentPosition({x: 17, y: 20});
        SplashScreen.hide();
    }

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

const mapStateToPropsAction = {downloadMap, downloadBeaconList, updateCurrentPosition};

export default connect(mapStateToProps, mapStateToPropsAction)(Home);