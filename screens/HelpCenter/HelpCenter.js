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
import Display from '../../utils/Display';

const Tab = createMaterialTopTabNavigator();

const HelpCenter = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.DEFAULT_GREEN }}>
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
        <Header containerStyle={{ marginHorizontal: 20, marginTop: 45, marginBottom: 20 }} title={"HELP CENTER"} titleStyle={{ color: COLORS.white }}
            leftComponent={
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}>
                    <Image style={{ width: 30, height: 30, tintColor: COLORS.white }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}

const FAQData = [
    {
        id: 1,
        question: "How do I place order on the app?",
        answer: "To do so, you just need to browse the menu, select foods that you want to order, put them in the cart, and proceed to checkout.",
        topic: 1
    },
    {
        id: 2,
        question: "How can I receive my order?",
        answer: "You can pick up your order at the restaurant or you can request your friend to take the order for you. We provide notification functionality to help you receive order from your friend more easily.",
        topic: 2
    },
    {
        id: 3,
        question: "How long does it take to have my order?",
        answer: "It depends on the current demand and the distance between your current location and the restaurant's location.",
        topic: 2
    },
    {
        id: 4,
        question: "Can I change the quantity for each food or drink type?",
        answer: "Yes, you can click on the + sign or the - sign to increase or decrease the quantity.",
        topic: 1
    },
    {
        id: 5,
        question: "Can I choose different types of foods and drinks for my order?",
        answer: "Yes, you can choose as many different types of foods and drinks for your order as you like.",
        topic: 1
    },
    {
        id: 6,
        question: "How can I find my favorite foods or drinks?",
        answer: "You can click on the heart sign in the lower tab to have information about your favorite foods or drinks.",
        topic: 1
    },
    {
        id: 7,
        question: "Will I be notified when my order has arrived?",
        answer: "Yes, there will be a push notification when your friend has brought my order to your place.",
        topic: 2
    },
    {
        id: 8,
        question: "What if my order is incorrect or missing items?",
        answer: "You will need to contact the restaurant as soon as possible to solve the issue.",
        topic: 1
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
                <Text style={styles.smallTitle}>{question}</Text>
                <Text style={styles.text}>{answer}</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={styles.item} onPress={() => { setPressed(!pressed) }}>
                <Text style={styles.smallTitle}>{question}</Text>
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
            <Text style={styles.smallTitle}>{content}</Text>
        </TouchableOpacity>
    )
}

export const FAQ = () => {
    const [requiredTopic, setRequiredTopic] = React.useState(0);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal={true}>
                    <View style={{ marginHorizontal: 5 }} />
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(0) }}>
                        <Text style={styles.title}>ALL TOPICS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(1) }}>
                        <Text style={styles.title}>ORDERING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => { setRequiredTopic(2) }}>
                        <Text style={styles.title}>RECEIVING ORDER</Text>
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
        width: 180,
        paddingLeft: SIZES.radius,
        borderRadius: 15,
        backgroundColor: "transparent",
        borderColor: COLORS.DEFAULT_GREEN,
        justifyContent: 'center',
        borderWidth: 2,
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
        marginHorizontal: 10
    },
    item: {
        height: 60,
        // width: 350,
        width: Display.setWidth(90),
        paddingLeft: SIZES.radius,
        borderRadius: 15,
        backgroundColor: COLORS.DEFAULT_GREEN,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
        marginTop: 20
    },
    largeItem: {
        height: 120,
        // width: 350,
        width: Display.setWidth(90),
        marginHorizontal: 10,
        paddingLeft: SIZES.radius,
        borderRadius: 15,
        backgroundColor: COLORS.DEFAULT_GREEN,
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
    smallTitle: {
        fontSize: SIZES.h2,
        color: COLORS.white,
    },
    text:
    {
        fontSize: SIZES.h3,
        color: COLORS.white,
    }
});

export default HelpCenter;