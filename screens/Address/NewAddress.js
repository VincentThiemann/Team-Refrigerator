import React from 'react';
import Header from '../../components/Header.js';
import { FONTS, SIZES, COLORS, icons } from '../../constants/index.js';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    FlatList,
} from 'react-native';
import Display from '../../utils/Display.js';

export default NewAddress = () => {
    return (
        <View>
            <View style={{flex: 1}}>
                
            </View>
            <View style={{flex: 1}}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.h1,
        color: COLORS.black,
        ...FONTS.h1,
    },
    text: {
        textAlign: 'center',
        color: COLORS.black,
        ...FONTS.body1,
    },
    input: {
        height: 100,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: SIZES.h3,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.lightGray1,
        backgroundColor: COLORS.lightGray1,
    },
    button: {
        height: 60,
        width: '80%',
        paddingLeft: SIZES.radius,
        borderRadius: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        alignSelf: 'center',
        width: Display.setWidth(80),
        height: Display.setHeight(40),
        borderRadius: SIZES.padding,
    }
})