import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, StatusBar } from 'react-native';
import { COLORS, SIZES, FONTS, MARGIN } from '../constants';

export default OnboardingText = (props) => (
    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 0, left: 0, right: 0, bottom: -350, marginLeft: 20, marginRight: 20 }}>
        <Text style={{ textAlign: 'center', color: COLORS.green, fontSize: SIZES.smallTitle, fontFamily: 'Arial' }}>
            {props.name}
        </Text>
        <View style={{ marginTop: 25 }} />
        <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: SIZES.h2, fontFamily: 'Arial' }}>
            {props.subtitle}
        </Text>
    </View>
)