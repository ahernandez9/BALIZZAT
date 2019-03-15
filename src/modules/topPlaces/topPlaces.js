import React, {Component} from 'react'
import {connect} from "react-redux";
import {downloadTopPlaces} from "./actions/topPlacesActions";
import {Text} from "react-native";


class TopPlaces extends Component {

    render(){
        return <Text>Soy un cremita</Text>
    }
}


const mapStateToProps = state => {
        return {
            mapRedux: state.MapReducer,
            scanner: state.RangeReducer

        }
    };

const mapStateToPropsAction = {downloadTopPlaces};


export default connect(mapStateToProps, mapStateToPropsAction)(TopPlaces);
