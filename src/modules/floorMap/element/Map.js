/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ScrollView, { ScrollViewChild } from 'react-native-directed-scrollview';
import MapContent from './MapContent';
import { getCellsByRow } from './data';
import {connect} from "react-redux";

class Map extends Component {

    render() {
        const cellsByRow = getCellsByRow(this.props.mapRedux.plan);

        return (
            <ScrollView
                bounces={false}
                bouncesZoom={false}
                maximumZoomScale={1.5}
                minimumZoomScale={0.5}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                style={styles.container}
            >
                <ScrollViewChild scrollDirection={'both'}>
                    <MapContent cellsByRow={cellsByRow} />
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
        height: 1080,
        width: 1080,
    },
    rowLabelsContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 100,
    },
    columnLabelsContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: 30,
    },
});

const mapStateToProps = state => {
        return {
            mapRedux: state.MapReducer
        }
    };


export default connect(mapStateToProps)(Map);
