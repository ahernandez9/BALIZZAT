import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from "react-redux";
import {updateCurrentPosition} from "../actions/mapAction";

class MapContent extends Component {

    renderRouteInMap = (color) => {
        let optimalRoute = this.props.mapRedux.optimalRoute;
        return (
            optimalRoute.map((position) => {
                return (
                    <View key={position.id}
                          style={{
                              flex: 1,
                              backgroundColor: color,
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              position: 'absolute',
                              top: position.x * 10,
                              left: position.y * 10
                          }}
                    />
                )
            })
        )

    };

    render() {
        let currentPosition = this.props.mapRedux.currentPosition;
        let optimalRoute = this.props.mapRedux.optimalRoute;
        let map = this.props.mapRedux.plan;
        /*
            Lo que vamos a hacer es meter un showRoute que nos dice si queremos mostrar la ruta o no
            Luego con el optimalRoute.length > 0 && showRoute sabemos que queremos mostrar la ruta
            Y con el optimalRoute.length > 0 && !showRoute sabemos que queremos eliminar la ruta
         */
        let optionalCurrentPosition = map[currentPosition.x - 5] !== undefined && map[currentPosition.x - 5][currentPosition.y - 2] ?
                {x: currentPosition.x - 5, y: currentPosition.y - 2} : currentPosition;

        return (
            <View>
                <Image
                    source={require('../../../../assets/images/better_cropped_cordial_map.png')}
                    resizeMode={'contain'}
                    //style={{flex:1}}
                />
                { optionalCurrentPosition &&
                    <View key={optionalCurrentPosition.id} style={{flex: 1, backgroundColor: 'transparent', width: 50, height: 50,
                        position: 'absolute', top: optionalCurrentPosition.x * 10, left: optionalCurrentPosition.y * 10}}>
                        <Image source={require('../../../../assets/images/placeholder.png')}
                               style={{flex: 1, height: undefined, width: undefined}}/>
                    </View>
                }
                { this.props.showRoute && optimalRoute && optimalRoute.length > 0 &&
                    this.renderRouteInMap('black')
                }
                { !this.props.showRoute && optimalRoute && optimalRoute.length > 0 &&
                this.renderRouteInMap('transparent')
                }
            </View>
        )
    }
}
/*
Render beacons
{
    Object.entries(beaconList).map((beacon, key) => {
        console.log('beacon: ', beacon[1], 'key', beacon[0]);
        return (
            <View key={key}
                  style={{
                      flex: 1,
                      backgroundColor: 'green',
                      width: 10,
                      height: 10,
                      position: 'absolute',
                      top: beacon[1].x * 10,
                      left: beacon[1].y * 10
                  }}
            />
        )
    })
}
 */

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


export default connect(mapStateToProps, {updateCurrentPosition})(MapContent);
