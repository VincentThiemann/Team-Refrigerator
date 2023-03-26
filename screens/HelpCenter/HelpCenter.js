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
    TouchableOpacity
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
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
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

const ContactData = [
    {
        id: 1,
        content: "Customer Service",
    },
    {
        id: 2,
        content: "Facebook",
    },
    {
        id: 3,
        content: "Instagram",
    },
    {
        id: 4,
        content: "WhatsApp",
    }
]

const FAQItem = ({ question, answer }) => {
    const [pressed, setPressed] = React.useState(false);
    function press() {
        if (pressed) {
            const currentState = !pressed;
            <View>
                <Text>{question}</Text>
                <Text>{answer}</Text>
            </View>
            setPressed(true);
        }
        else {
            const currentState = !pressed;
            <View>
                <Text>{question}</Text>
            </View>
            setPressed(false);
        }
    }
    return (
        <View>
            <TouchableOpacity style={styles.faqItem} onPress={() => { press() }}>
            </TouchableOpacity>
        </View>
    )
}

const ContactItem = ({ content }) => {
    return (
        <View>
            <Text>{content}</Text>
        </View>
    )
}

export const FAQ = () => {
    return (
        <View style={styles.container}>
            <Text>Frequently Asked Questions</Text>
            <FlatList
                data={FAQData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<FAQItem question={item.question} answer={item.answer} />)}
            />
        </View>
    )
}

export const ContactInfo = () => {
    return (
        <View style={styles.container}>
            <Text>Contact Info</Text>
            <FlatList
                data={ContactData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<ContactItem content={item.content} />)}
            />
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