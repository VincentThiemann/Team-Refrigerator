import React from 'react';
import Header from '../../components/Header.js';
import { SIZES, COLORS, icons } from '../../constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
    TouchableWithoutFeedback
} from 'react-native';

export default Rating = () => {

    return (
        <View>
            <RatingHeader />
            
        </View>
    )
}

export const RatingHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginTop: 40, marginHorizontal: 20 }} title={"RATING EXPERIENCE"}
            leftComponent={
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Welcome") }}>
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        textAlign: 'center',
        fontSize: SIZES.h2,
        color: COLORS.black,
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
        width: '100%',
        height: '100%'
    }
})