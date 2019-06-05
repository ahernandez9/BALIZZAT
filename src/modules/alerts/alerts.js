import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux';
import {hideAlert, showAlert} from "./actions/AlertActions";

class Alert extends Component {

    render() {
        return (
            this.props.toast.enable ?
                this.generateAlertView()
                :
                <View/>
        );
    }

    generateAlertView = () => {
        let title = this.props.toast.title;
        if (title.includes('LOADER')) {
            return (
                <View style={styles.containerAlert}>
                    <View style={styles.alert}>
                        <View style={styles.containerText}>
                            <Text style={styles.alertText}>Procesando</Text>
                            <Text style={styles.alertDescription}>Estamos calculando la mejor ruta, por favor espere</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginBottom: 15}}>
                            <ActivityIndicator size="large"/>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.containerAlert}>
                    <View style={styles.alert}>
                        <View style={styles.containerText}>
                            <Text style={styles.alertText}>{this.props.toast.title}</Text>
                            <Text style={styles.alertDescription}>{this.props.toast.description}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.botonDual} onPress={() => {
                                this.onPressNo();
                            }}>
                                <Text style={styles.botomTextCancel}>NO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonDual} onPress={() => {
                                Actions.pop();
                                this.onPresYes();
                            }}>
                                <Text style={styles.botomTextContinue}>SI</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

    };

    onPressNo = () => {
        this.props.hideAlert();
    };

    onPresYes = () => {
        this.props.hideAlert();
    };
}


const styles = StyleSheet.create({
    containerAlert: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '110%',
        width: '100%',

    },
    alert: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        width: '73%',
    },
    containerText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 5,
        paddingBottom: 0,
        textAlign: 'center',
        width: '90%',
    },
    alertDescription: {
        fontSize: 16,
        color: 'black',
        marginTop: 5,
        marginRight: 5,
        marginLeft: 5,
        paddingBottom: 10,
        textAlign: 'center',
        width: '90%',
    },
    botonDual: {
        width: '50%',
        paddingBottom: 5,
        paddingTop: 0,
    },
    singleBoton: {
        width: '100%',
        paddingBottom: 5,
        paddingTop: 0,
    },
    botomTextContinue: {
        fontSize: 20,
        width: '100%',
        padding: 40,
        paddingBottom: 5,
        paddingTop: 0,
        color: 'rgb(2, 0, 0)',
        textAlign: 'center',
    },
    botomTextRetry: {
        fontSize: 18,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
    },

    botomTextCancel: {
        fontSize: 20,
        width: '100%',
        padding: 40,
        paddingBottom: 5,
        paddingTop: 0,
        color: 'rgb(209, 0, 0)',
        textAlign: 'center',
    },

    botomTextAccept: {
        fontSize: 18,
        width: '100%',
        padding: 40,
        paddingBottom: 5,
        paddingTop: 0,
        marginTop: 10,
        color: 'rgb(209, 0, 0)',
        textAlign: 'center',
    }
});

const mapStateToProps = state => {
    return {
        toast: state.AlertReducer,
    };
};

export default connect(mapStateToProps, {
    showAlert,
    hideAlert
})(Alert);
