import React from "react";
import { Text, View } from "react-native";

import BottomTabBar from "@react-navigation/bottom-tabs";

const CustomTabBar = (props) => {
    return (
        <BottomTabBar
            {...props.props}
        />
    )
}

export default CustomTabBar;