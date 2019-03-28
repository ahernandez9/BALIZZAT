import React, {Component} from 'react'
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button
} from 'react-native';

export class TopPlaceContent extends Component {
    render() {
        return (
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={this.props.section.image}
                            style={styles.image}
                        />
                    </View>
                    <View style={{flex:2}}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{this.props.section.content}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Button title={"Directions"} onPress={() => {}}/>
                        </View>
                    </View>
                </View>
        )
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 3,
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ff8a00',
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
        paddingTop: 5,
        paddingLeft: 3

    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    text: {
        textAlign: 'justify',
        fontSize: 10,
    },
    floorText: {
        color: 'grey'
    }
});