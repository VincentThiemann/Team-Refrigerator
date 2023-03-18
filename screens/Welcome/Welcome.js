import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { COLORS, SIZES, FONTS, MARGIN} from '../../constants';

export default splash_screen = () => (
    <View style = {styles.container}>
        <Welcome_text name = "Food App" subtitle = "Welcome to the food delivery app created uniquely for CWRU students"/>
    </View>
)

export const Welcome_text = (props) => (
    <SafeAreaView style = {styles.container}>
        <Image style = {styles.image} source = {require('../../assets/images/screen_splash.jpg')} />
        <Text style = {{fontSize: SIZES.largeTitle, marginBottom: MARGIN.d1}}>
            {props.name}
        </Text>
        <Text style = {{fontSize: SIZES.h2, textAlign: 'center', marginBottom: MARGIN.d3, marginHorizontal: MARGIN.d1}}>
            {props.subtitle}
        </Text>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
});