import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { COLORS, SIZES, FONTS, MARGIN } from '../../constants';
import OnboardingText from '../../components/OnboardingText.js';

export const OnboardingScreen1 = ({navigation}) => (
    <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <OnboardingText name="ONBOARDING SCREEN 1" subtitle="Welcome to first onboarding screen" />
        <Button color = {COLORS.green} onPress = {() => navigation.navigate("Onboarding2")} title = "Continue" />
    </View>
)

export const OnboardingScreen2 = ({navigation}) => (
    <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <OnboardingText name="ONBOARDING SCREEN 2" subtitle="Welcome to second onboarding screen" />
        <Button color = {COLORS.green} onPress = {() => navigation.navigate("Onboarding3")} title = "Continue" />
    </View>
)

export const OnboardingScreen3 = ({navigation}) => (
    <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <OnboardingText name="ONBOARDING SCREEN 3" subtitle="Welcome to third onboarding screen" />
        <Button color = {COLORS.green} onPress = {() => navigation.navigate("Onboarding1")} title = "Continue" />
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
    image: {
        width: '100%',
        height: '100%'
    }
})