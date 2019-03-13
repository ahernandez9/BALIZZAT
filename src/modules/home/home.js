import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {downloadBeaconList, downloadMap} from "../floorMap/actions/mapAction";
import {connect} from "react-redux";


class Home extends Component {

    componentDidMount(): void {

        console.log("Descargando lista de beacons");
        this.props.downloadBeaconList();
        this.props.downloadMap();

    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.mapRedux.plan.length > 0 ? <Text> Todo ok </Text>: null}

                <TouchableOpacity onPress={Actions.FloorPlan}>
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