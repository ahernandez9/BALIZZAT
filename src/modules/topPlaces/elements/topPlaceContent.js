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
                        <View style={styles.buttonContainer}>
                            <Button title={"Directions"} onPress={() => {} }/>
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
        marginTop:5

    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 2

    },
    text: {
        color:'black',
        textAlign: 'justify',
        fontSize: 15,
    },
    buttonContainer:{
        width: '60%',
        margin: 2,
        marginBottom: 4,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    }
});