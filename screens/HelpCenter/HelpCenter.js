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
    ScrollView,
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
        <Header containerStyle={{ marginHorizontal: 20, marginTop: 45, marginBottom: 20 }} title={"HELP CENTER"}
            leftComponent={
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Home") }}>
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}

const FAQData = [
    {
        id: 1,
        question: "Question 1?",
        answer: "Answer 1",
        topic: 1
    },
    {
        id: 2,
        question: "Question 2?",
        answer: "Answer 2",
        topic: 1
    },
    {
        id: 3,
        question: "Question 3?",
        answer: "Answer 3",
        topic: 2
    },
    {
        id: 4,
        question: "Question 4?",
        answer: "Answer 4",
        topic: 1
    },
    {
        id: 5,
        question: "Question 5?",
        answer: "Answer 5",
        topic: 2
    },
    {
        id: 6,
        question: "Question 6?",
        answer: "Answer 6",
        topic: 4
    },
    {
        id: 7,
        question: "Question 7?",
        answer: "Answer 7",
        topic: 3
    },
    {
        id: 8,
        question: "Question 8?",
        answer: "Answer 8",
        topic: 2
    },
    {
        id: 9,
        question: "Question 9?",
        answer: "Answer 9",
        topic: 2
    }
]

const ContactData = [
    {
        id: 1,
        content: "FACEBOOK",
        page: 'http://facebook.com'
    },
    {
        id: 2,
        content: "INSTAGRAM",
        page: 'http://instagram.com'
    },
    {
        id: 3,
        content: "TWITTER",
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
    const [requiredTopic, setRequiredTopic] = React.useState(0);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal={true}>
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(0) }}>
                        <Text style={styles.title}>All topics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(1) }}>
                        <Text style={styles.title}>Topic 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(2) }}>
                        <Text style={styles.title}>Topic 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(3) }}>
                        <Text style={styles.title}>Topic 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(4) }}>
                        <Text style={styles.title}>Topic 4</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <FlatList
                data={FAQData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    if (requiredTopic == item.topic || requiredTopic == 0) { return <FAQItem question={item.question} answer={item.answer} /> }
                }}
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
                renderItem={({ item }) => (<ContactItem content={item.content} page={item.page} />)}
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
    category: {
        height: 60,
        width: 98,
        paddingLeft: SIZES.radius,
        borderRadius: 15,
        backgroundColor: "transparent",
        borderColor: COLORS.green,
        justifyContent: 'center',
        borderWidth: 2,
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
        marginHorizontal: 10
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
        fontSize: SIZES.h3,
        color: COLORS.black,
    },
    text:
    {
        fontSize: SIZES.h4,
        color: COLORS.black,
    }
});

export default HelpCenter;