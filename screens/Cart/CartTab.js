import React from 'react';
import {
    View,
    Text
} from 'react-native';

const CartTab = ({navigation}) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text>Cart</Text>
        </View>
    )
}

export default CartTab