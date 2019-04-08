/* @flow */

import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import type {Row, Cell} from './data';
import {connect} from "react-redux";

class MapContent extends Component {
    // props: {
    //     cellsByRow: Array<Row>
    // };

    render() {
        // return (
        //     <View>
        //         {this.props.cellsByRow.map(row => this._renderRow(row))}
        //     </View>
        // );
        let currentPosition = this.props.mapRedux.currentPosition;
        console.log('position: ', currentPosition);
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
            </View>

        )
    }

    _renderRow(row: Row) {
        return (
            <View key={row.id} style={styles.rowContainer}>
                {row.cells.map(cell => this._renderCell(cell))}
            </View>
        );
    }


    _renderCell(cell: Cell) {
        switch (cell.type) {
            case 1: //Camino transitable
                return (<View key={cell.id} style={{flex: 1, backgroundColor: '#f0f3fd', width: 10, height: 10}}/>);
            case 0: // Camino no transitable
                return (<View key={cell.id} style={{flex: 1, backgroundColor: '#7c7d8d', width: 10, height: 10}}/>);
            case 5: // Posición actual
                return (<View key={cell.id} style={{flex: 1, backgroundColor: 'yellow', width: 10, height: 10}}/>);
            case 6: //Centro
                return (
                    <View key={index} style={{flex: 1, backgroundColor: 'f0f3fd', width: 10, height: 10}}>
                        <Image source={require('../../../../assets/images/placeholder.png')}
                               style={{flex: 1, height: undefined, width: undefined}}/>
                    </View>);
        }
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
