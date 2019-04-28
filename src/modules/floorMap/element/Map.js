/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import ScrollView, { ScrollViewChild } from 'react-native-directed-scrollview';
import MapContent from './MapContent';
import { getCellsByRow } from './data';
import {connect} from "react-redux";
import MapCordial from '../../../../assets/images/cropped_cordial_map.png'

class Map extends Component {

    componentDidMount(): void {
        // this.props.callbackFromParent(this.reference);
        // console.log(this.reference);
        // this.reference.scrollTo(2000, 700, true)
    }

    render() {
        return (
            <ScrollView
                bounces={false}
                bouncesZoom={false}
                maximumZoomScale={1.5}
                minimumZoomScale={0.4}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                style={styles.container}
                ref={ref => { this.reference = ref}}
            >
                <ScrollViewChild scrollDirection={'both'}>
                    <MapContent
                        showRoute={this.props.showRoute}
                    />
                </ScrollViewChild>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        height: 1160,
        width: 2750,
    }
});

const mapStateToProps = state => {
        return {
            mapRedux: state.MapReducer
        }
    };

export default connect(mapStateToProps)(Map);
