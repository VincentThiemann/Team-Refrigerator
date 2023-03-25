import React from 'react';
import Header from '../../components/Header.js';
import { SIZES, COLORS, icons } from '../../constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const HelpCenter = () => (
    <SafeAreaView style={{ flex: 1 }} >
        <HelpCenterHeader />
        <Tab.Navigator>
            <Tab.Screen name="FAQ" component={FAQ} />
            <Tab.Screen name="CONTACT" component={ContactInfo} />
        </Tab.Navigator>
    </SafeAreaView>
)

export const HelpCenterHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginHorizontal: 20, marginBottom: 10 }} title={"HELP CENTER"}
            leftComponent={
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Splash") }}>
                    <Image style = {{width: 30, height: 30}} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}

function FAQ() {
    return (
        <View style={styles.container}>
            <Text>FAQ</Text>
        </View>
    )
}

function ContactInfo() {
    return (
        <View style={styles.container}>
            <Text>Contact Info</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default HelpCenter;