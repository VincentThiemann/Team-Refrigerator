import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, StatusBar } from 'react-native';
import { COLORS, SIZES, FONTS, MARGIN } from '../../constants';

export default SplashScreen = () => (
    <View style={styles.container}>
        <WelcomeText name="FOOD DELIVERY" subtitle="Welcome to the food delivery app created uniquely for CWRU students" />
    </View>
)

const WelcomeText = (props) => (
    <ImageBackground style={styles.image} source={require('../../assets/images/splash_image.png')}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 20, marginRight: 20, marginBottom: 80 }}>
            <Text style={{ textAlign: 'center', color: COLORS.green, fontSize: SIZES.largeTitle, textShadowColor: 'cyan', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 5 }}>
                {props.name}
            </Text>
            <View style={{ marginTop: 15 }} />
            <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: SIZES.h2 }}>
                {props.subtitle}
            </Text>
        </View>
    </ImageBackground>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})