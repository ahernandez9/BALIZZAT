import React, {Component} from 'react'
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import {Avatar} from "react-native-elements";

let viewWidth = 0;


export class TopPlaceHeader extends Component {


    constructor(props) {
        super(props);
        this.state = {
            imageWidth: 0
        }
    }

    componentWillMount() {
        this.width = Dimensions.get('window').width / 4;
    }

    componentDidMount() {
        console.log(this.width);
    }


    render() {
        return (
            <View>
                    <View style={styles.mainContainer}>
                        <View style={styles.imageContainer} onLayout={(event) => {
                            let {x, y, width, height} = event.nativeEvent.layout;
                            // viewWidth = width;
                            this.width = width;
                            console.log("Creeema", width);
                        }}>
                            <Image
                                source={this.props.section.image}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{this.props.section.title}</Text>
                            <Text style={styles.floorText}>{this.props.section.floor}</Text>
                        </View>
                        <View style={[styles.iconContainer, {justifyContent: 'flex-end'}]}>
                            <Image
                                source={require("../../../../assets/images/down-arrow.png")}
                                style={{height: 20, width: 20}}
                            />
                        </View>
                    </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 4,
        flexDirection: 'row',
        height: 100,
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        marginTop: 1,
        marginBottom: 1
    },
    mainContainerCollapsed: {
        flex: 4,
        flexDirection: 'row',
        height: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        marginTop: 1,
        marginBottom: 1,
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: Dimensions.get('window').width / 4 * 0.9,
        width: Dimensions.get('window').width / 4 * 0.9,
        borderRadius: Dimensions.get('window').width / 4 * 0.9 / 2,
        // paddingTop: 2,
        // paddingBottom: 2,
        // paddingLeft: 1
        //resizeMode: 'stretch'

    },
    textContainer: {
        flex: 2,
        justifyContent: 'space-around',

    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    titleCollapsed: {
        flex: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    floorText: {
        color: 'grey',
        marginLeft: 10,
        fontSize: 15
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    }
});