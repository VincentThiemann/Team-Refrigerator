import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

function renderHeader() {
    return (
        <View style = {{flex: 1}}>
            <TouchableOpacity>
                <Text> Getting started </Text>
            </TouchableOpacity>
        </View>
    )
}

export default GettingStarted;