import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import type {Row, Cell} from './data';
import {connect} from "react-redux";

class MapContent extends Component {

    render() {
        let currentPosition = this.props.mapRedux.currentPosition;
        let optimalRoute = this.props.mapRedux.optimalRoute;
        console.log('position: ', currentPosition);
        console.log('route: ', optimalRoute);
        return (
            <View>
                <Image
                    source={require('../../../../assets/images/cropped_cordial_map.png')}
                    resizeMode={'contain'}
                    //style={{flex:1}}
                />
                { currentPosition &&
                    <View style={{flex: 1, backgroundColor: 'transparent', width: 50, height: 50,
                        position: 'absolute', top: currentPosition.x * 10, left: currentPosition.y * 10}}>
                        <Image source={require('../../../../assets/images/placeholder.png')}
                               style={{flex: 1, height: undefined, width: undefined}}/>
                    </View>
                }
                { optimalRoute.length > 0 &&
                    optimalRoute.map((position) => {
                        return (
                            <View key={position.id}
                                style={{
                                    flex: 1,
                                    backgroundColor: 'black',
                                    width: 10,
                                    height: 10,
                                    position: 'absolute',
                                    top: position.x * 10,
                                    left: position.y * 10
                                }}
                            />
                            )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
    },
    cellContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        margin: 10,
        backgroundColor: 'lightgrey',
    },
});

const mapStateToProps = state => {
    return {
        mapRedux: state.MapReducer
    }
};


export default connect(mapStateToProps)(MapContent);
