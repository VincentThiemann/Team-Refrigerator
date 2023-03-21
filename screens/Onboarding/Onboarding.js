import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { COLORS, SIZES, FONTS, MARGIN } from '../../constants';
import OnboardingText from '../../components/OnboardingText.js';

export const OnboardingScreen1 = ({ navigation }) => (
    <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/images/splash_image.jpg')}>
            <OnboardingText name="ONBOARDING SCREEN 1" subtitle="Welcome to first onboarding screen" />
        </ImageBackground>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Onboarding2")}>
            <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
    </View>
)

export const OnboardingScreen2 = ({ navigation }) => (
    <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/images/splash_image.jpg')}>
            <OnboardingText name="ONBOARDING SCREEN 2" subtitle="Welcome to second onboarding screen" />
        </ImageBackground>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Onboarding3")}>
            <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
    </View>
)

export const OnboardingScreen3 = ({ navigation }) => (
    <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/images/splash_image.jpg')}>
            <OnboardingText name="ONBOARDING SCREEN 3" subtitle="Welcome to final onboarding screen" />
        </ImageBackground>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Onboarding1")}>
            <Text style={styles.text}>Finish</Text>
        </TouchableOpacity>
    </View>
)

export default OnboardingScreen = { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    text: {
        fontSize: SIZES.h2,
        color: COLORS.white
    },
    button: {
        borderRadius: 12,
        backgroundColor: COLORS.green,
        margin: 10,
        padding: 15,
        position: 'absolute',
        bottom: 90
    },
    image: {
        width: '100%',
        height: '100%'
    }
})