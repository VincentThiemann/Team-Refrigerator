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
import Display from '../../utils/Display.js';
// import { Rating } from 'react-native-ratings';

export default Rating = () => {

    return (
        <View style={styles.container}>
            <RatingHeader />
            <View style = {{ flex: 1, justifyContent: 'center'}}>
                <Image style={styles.image} source={require('../../assets/images/splash_image.jpg')} />
                <Text style={styles.title}>How was your order?</Text>
                <Text style={styles.text}>Did you enjoy it? Please rate the restaurant</Text>
                {/* <Rating showRating ratingCount={5} imageSize={20} style = {{paddingVertical: 10}} /> */}
            </View>
        </View>
    )
}

export const RatingHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginTop: 40, marginHorizontal: 20 }} title={"RATING"}
            leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate("Welcome") }}>
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.h1,
        color: COLORS.black,
    },
    text: {
        textAlign: 'center',
        fontSize: SIZES.h2,
        color: COLORS.black,
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
        width: Display.setWidth(50),
        height: Display.setHeight(25),
        borderRadius: SIZES.padding,
    }
})