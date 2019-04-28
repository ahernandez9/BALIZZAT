import React, {Component} from 'react'
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import {manhattanDistance} from '../../pathFinder/mapRoute/RenderUtilities'
import {downloadTopPlaces} from "../actions/topPlacesActions";
import connect from "react-redux/es/connect/connect";
import {updateTargetPosition} from "../../floorMap/actions/mapAction";

export class TopPlaceContent extends Component {

    calculatePath() {
        let position = this.props.section.position;
        if (this.props.section.position.length > 1) {
            position = this.calculateCloserPoint();
        }
        this.props.updateTargetPosition(position);

    }

    calculateCloserPoint() {
        let result = 1000000;
        let bestPosition;
        for (let position of this.props.section.length) {
            let distance = manhattanDistance(this.props.mapRedux.currentPosition, position);
            result > distance ? (result = distance) && (bestPosition = position) : null;
        }
        return bestPosition;
    }

    loading = () => {
        if (this.props.loading) {
            return (
                <View style={styles.containerLoadingMore}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    };



    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={this.props.section.image}
                        style={styles.image}
                    />
                </View>
                <View style={{flex: 2}}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{this.props.section.content}</Text>
                    </View>
                    <View>
                        <View>
                            <Text>
                                {this.props.section.floor}
                            </Text>
                            <Text>
                                Horario: {this.props.section.schedule}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={"Directions"} onPress={() => this.calculatePath()}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 3,
        flexDirection: 'row',
        marginTop: 1,
        marginBottom: 1
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        height: '90%',
        width: '90%',
        marginLeft: 3,
        marginTop: 5

    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 2

    },
    text: {
        color: 'black',
        textAlign: 'justify',
        fontSize: 15,
    },
    buttonContainer: {
        width: '60%',
        margin: 2,
        marginTop: 5,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    containerLoadingMore: {
        alignSelf: 'center',
        marginTop: ((Dimensions.get('window').height - 250) / 2),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }
});

const mapStateToProps = state => {
    return {
        mapRedux: state.MapReducer,

    }
};

const mapStateToPropsAction = {updateTargetPosition};


export default connect(mapStateToProps, mapStateToPropsAction)(TopPlaceContent);
