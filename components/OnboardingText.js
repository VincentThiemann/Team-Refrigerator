import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, StatusBar } from 'react-native';
import { COLORS, SIZES, FONTS, MARGIN } from '../constants';

export default OnboardingText = (props) => (
    <View style={{ flex: 4, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Text style={{ textAlign: 'center', color: COLORS.green, fontSize: SIZES.smallTitle, fontFamily: 'Arial' }}>
            {props.name}
        </Text>
        <View style={{ marginTop: 25 }} />
        <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: SIZES.h2, fontFamily: 'Arial', marginLeft: 20, marginRight: 20, marginBottom:20 }}>
            {props.subtitle}
        </Text>
    </View>
)