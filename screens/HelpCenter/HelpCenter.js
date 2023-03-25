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

const FAQData = [
    {
        id: 1,
        question: "Question 1 ?",
        answer: "Answer 1",
    },
    {
        id: 2,
        question: "Question 2?",
        answer: "Answer 2",
    },
    {
        id: 3,
        question: "Question 3?",
        answer: "Answer 3",
    }
]

const FAQItem = ({ item }) => {
    return (
        <View>
            <Text>{item.question}</Text>
            <Text>{item.answer}</Text>
        </View>
    )
}

function FAQ() {
    return (
        <View style={styles.container}>
                <FlatList
                data={FAQData}
                renderItem={({ item }) => <FAQItem question={item.question} answer={item.answer} />}
                keyExtractor={item => item.id}
                />
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