import React from "react";
import { View } from "react-native";
import { COLORS } from "../constants";

const BackgroundCurvedView = ({ pos }) => {
    return (
    <View style={{
        backgroundColor: COLORS.green,
        height: 2000,
        position: 'absolute',
        top: -1 * (pos - 230),
        width: 2000,
        borderRadius: 2000,
        alignSelf: 'center',
        zIndex: -1,
    }} />

)
}

export default BackgroundCurvedView