import React from 'react'
import {
    View,
    Image
} from 'react-native'
import menu from '../../../../assets/images/menu_button.png'

const menuIcon = () => {
    return (
        <View>
            <Image source={menu}
                   resizeMode='contain'
                   style={styles.menuIcon}
            />
        </View>
    )
};

const styles = {
    menuIcon: {
        height: 40,
        width: 40,
        alignItems: 'stretch'
    }
};

export default menuIcon
