import React from "react";
import { FlatList, ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native"
import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"
import { Button, Icon, Input } from '@rneui/themed';
import Display from '../../utils/Display';
import { Header, Separator, IconLabel } from "../../components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { color, Value } from "react-native-reanimated";


const transactionData = [
    {
        id: 1,
        name: "Big Garden Salad",
        date: "Dec 15, 2024 | 16:00PM",
        type: "Orders",
        image: "https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg",
        value: 21.20
    },

    {
        id: 2,
        name: "Big Garden Salad",
        date: "Dec 15, 2024 | 16:00PM",
        type: "Orders",
        image: "https://hips.hearstapps.com/hmg-prod/images/burger-king-cheeseburger-1666891208.jpg",
        value: 15.03
    },

    {
        id: 3,
        name: "Big Garden Salad",
        date: "Dec 15, 2024 | 16:00PM",
        type: "Orders",
        image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/1/23/0/FN_healthy-fast-food-red-robin-avocado-cobb-salad_s4x3.jpg.rend.hgtvcom.616.462.suffix/1516723515457.jpeg",
        value: 8.69
    },

    {
        id: 4,
        name: "Big Garden Salad",
        date: "Dec 15, 2024 | 16:00PM",
        type: "Orders",
        image: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/3b774c77-2f94-4a3a-8193-d7a3d049f7b8-Willie_Mae.jpg",
        value: 15.99
    },

    {
        id: 5,
        name: "Big Garden Salad",
        date: "Dec 15, 2024 | 16:00PM",
        type: "Orders",
        image: "https://minimalistbaker.com/wp-content/uploads/2022/04/Strawberry-Milkshake-SQUARE.jpg",
        value: 5.20
    },

]

export const TransactionHistory = () => {

    return (

        <View
            style={{ flexDirection: "column", flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "white" }}
        >



            <View>
                <Image
                    source={{ uri: 'https://www.summitcreditunion.com/sites/default/files/consumer.png' }}
                    style={{
                        width: 360,
                        height: 220,
                        marginTop: 24,
                        borderRadius: 30
                    }}
                />
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, height: 6510}}
            >
                <FlatList
                    data={transactionData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        { return <FAQItem name={item.name} type={item.type} image={item.image} date={item.date} value={item.value} /> }
                    }}
                />

            </ScrollView>


        </View>

    )
}

const FAQItem = ({ name, type, value, date, image }) => {
    const [pressed, setPressed] = React.useState(false);
    const ButtonPress = () => {
        if (pressed) {
            return <TouchableOpacity style={styles.largeItem} onPress={() => { setPressed(!pressed) }}>

                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text}>{type}</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={styles.item} onPress={() => { setPressed(!pressed) }}>

                <Image
                    source={{ uri: image }}
                    style={{ height: "100%", aspectRatio: 1, borderRadius: 1000 }}
                ></Image>

                <View
                    style={{ width: "100%", height: "100%", marginLeft: "5%" }}
                >
                    <View
                        style={{ width: "75%", height: "50%", flexDirection: "row", padding: 2, justifyContent: 'space-between' }}
                    >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 22 }}>${value}</Text>
                    </View>

                    <View
                        style={{ width: "75%", height: "50%", flexDirection: "row", padding: 2, justifyContent: 'space-between' }}
                    >
                        <Text style={{ fontSize: 15, color: COLORS.darkGray }}>{date}</Text>
                        <Text style={{ fontSize: 15, color: COLORS.darkGray }}>{type}</Text>
                    </View>

                </View>



            </TouchableOpacity>
        }
    }
    return (
        <ButtonPress />
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
        height: 70,
        width: 350,
        borderRadius: 15,
        backgroundColor: COLORS.transparent,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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

export default TransactionHistory;