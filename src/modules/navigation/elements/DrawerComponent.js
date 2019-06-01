import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";

const DrawerComponent = (props) => {
    const {
        icon,
        title,
        onPress
    } = props;
  return (
      <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'center', marginTop: 12, marginBottom: 12}}
          onPress={onPress}>
          <View style={{flex: 0.3}}>
              <Icon name={icon}
                    type='font-awesome'
                    color='#268DE7'
                    size={35}
                    style={{marginLeft: 10}}/>
          </View>
          <View style={styles.mainTextView}>
              <Text style={styles.mainText}>{title}</Text>
          </View>
      </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    mainTextView: {
        flex: 0.7,
        justifyContent: 'center'
    },
    mainText: {
        fontSize: 16,
    },
});

export default DrawerComponent;