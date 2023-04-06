import React from 'react';
import Header from '../../components/Header.js';
import { SIZES, COLORS, icons } from '../../constants/index.js';
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
import { MaterialIcons } from '@expo/vector-icons';

export default Ratings = () => {
    return (
        <View style={styles.container}>
            <RatingHeader />
            <View style={{marginVertical: 20}} />
                <Image style={styles.image} source={require('../../assets/images/splash_image.jpg')} />
                <View style={{marginVertical: 20}} />
                <Text style={styles.title}>How was your order?</Text>
                <View style={{marginVertical: 10}} />
                <Text style={styles.text}>Did you enjoy it? Please rate the restaurant</Text>
        </View>
    )
}

export const Star = ({number}) => {
    return (
        <TouchableOpacity onPress={() => setStarRating(number)}>
            <MaterialIcons
            name = {starRating >= number ? 'star' : 'star-border'}
            size = {20}
            style = {starRating >= number ? styles.unselected : styles.selected}
            />
        </TouchableOpacity>
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
        width: Display.setWidth(60),
        height: Display.setHeight(30),
        borderRadius: SIZES.padding,
    }
})