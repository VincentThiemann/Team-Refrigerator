import React from 'react';
import { View, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const ProgressiveImage = ({
    thumbnailSource,
    source,
    style,
    ...props }) => {


    return (
        <View style={styles.container}>
            <Image
                {...props}
                source={thumbnailSource}
                style={style}
                blurRadius={2}
            />
            <Image
                {...props}
                source={source}
                style={[styles.imageOverlay, style]}
            />
        </View>

    )

}
const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        resizeMode: "center",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: 10
    },
});

export default ProgressiveImage;