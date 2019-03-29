import React, {Component} from 'react'
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export class TopPlaceHeader extends Component {
    render() {
        return (
            <View>
                {!this.props.isActive ?
                    <View style={styles.mainContainer}>
                        <View style={styles.imageContainer}>
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
                    </View> :
                    <View style={[styles.mainContainerCollapsed, {flex: 3}]}>
                            <Text style={styles.titleCollapsed}>{this.props.section.title}</Text>
                            <View style={[styles.iconContainer, {alignSelf: 'flex-end',justifyContent: 'flex-end', marginBottom: 5}]}>
                                <Image
                                    source={require("../../../../assets/images/up-arrow.png")}
                                    style={{height: 15, width: 15}}
                                />
                            </View>
                    </View>
                }
            </View>
        )
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 4,
        flexDirection: 'row',
        height: 70,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ff8a00',
        marginTop: 1,
        marginBottom: 1
    },
    mainContainerCollapsed: {
        flex: 4,
        flexDirection: 'row',
        height: 30,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ff8a00',
        marginTop: 1,
        marginBottom: 1,
        alignItems:'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '90%',
        width: '90%',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 1

    },
    textContainer: {
        flex: 2,
        justifyContent: 'space-around',

    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 10
    }, titleCollapsed: {
        flex:2,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    floorText: {
        color: 'grey'
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    }
});