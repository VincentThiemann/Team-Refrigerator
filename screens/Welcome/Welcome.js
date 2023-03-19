import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS, SIZES, FONTS, MARGIN } from '../../constants';

export default SplashScreen = () => (
    <View style={styles.container}>
        <StatusBar barStyle = 'dark-content' />
        <WelcomeText name = "Food App" subtitle = "Welcome to the food delivery app created uniquely for CWRU students" />
    </View>
)

const WelcomeText = (props) => (
    <ImageBackground style={styles.image} source={require('../../assets/images/splash_image.jpg')}>
        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 0, left: 0, right: 0, bottom: -590, marginLeft: 20, marginRight: 20 }}>
            <Text style={{ color: COLORS.green, fontSize: SIZES.largeTitle, fontFamily: 'Arial'}}>
                {props.name}
            </Text>
            <View style = {{ marginTop: 25}}/>
            <Text style={{ textAlign: 'center',  color: COLORS.black, fontSize: SIZES.h2 ,fontFamily: 'Arial' }}>
                {props.subtitle}
            </Text>
        </View>
    </ImageBackground>
)

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