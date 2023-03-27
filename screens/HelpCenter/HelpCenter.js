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
    Linking,
} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const HelpCenter = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.green }}>
        <HelpCenterHeader />
        <Tab.Navigator>
            <Tab.Screen name="FAQ" component={FAQ} />
            <Tab.Screen name="CONTACT" component={ContactInfo} />
        </Tab.Navigator>
    </View>
)

export const HelpCenterHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginHorizontal: 20, marginTop: 40, marginBottom: 20 }} title={"HELP CENTER"}
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
    },
    {
        id: 4,
        question: "Question 4?",
        answer: "Answer 4",
    },
    {
        id: 5,
        question: "Question 5?",
        answer: "Answer 5",
    }
]

const ContactData = [
    {
        id: 1,
        content: "Facebook",
        page: 'http://facebook.com'
    },
    {
        id: 2,
        content: "Instagram",
        page: 'http://instagram.com'
    },
    {
        id: 3,
        content: "Twitter",
        page: 'http://twitter.com'
    }
]

const FAQItem = ({ question, answer }) => {
    const [pressed, setPressed] = React.useState(false);
    const ButtonPress = () => {
        if (pressed) {
            return <TouchableOpacity style={styles.largeItem} onPress={() => { setPressed(!pressed) }}>
                <Text style={styles.title}>{question}</Text>
                <Text style={styles.text}>{answer}</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={styles.item} onPress={() => { setPressed(!pressed) }}>
                <Text style={styles.title}>{question}</Text>
            </TouchableOpacity>
        }
    }
    return (
        <ButtonPress />
    )
}

const ContactItem = ({ content, page }) => {
    return (
            <TouchableOpacity style={styles.item} onPress={() => Linking.openURL(page)}>
                <Text style={styles.title}>{content}</Text>
            </TouchableOpacity>
    )
}

export const FAQ = () => {
    return (
        <View style={styles.container}>
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
            <FlatList
                data={ContactData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<ContactItem content={item.content} page={item.page}/>)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        height: 60,
        width: 350,
        paddingLeft: SIZES.radius,
        borderRadius: 15,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
        marginTop: 20
    },
    largeItem: {
        height: 200,
        width: 350,
        paddingLeft: SIZES.radius,
        borderRadius: 15,
        backgroundColor: COLORS.green,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        marginTop: 20
    },
    title:
    {
        fontSize: SIZES.h2,
        color: COLORS.black,
    },
    text:
    {
        fontSize: SIZES.h2,
        color: COLORS.black,
    }
});

export default HelpCenter;