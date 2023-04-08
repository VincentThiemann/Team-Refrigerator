import React from 'react';
import Header from '../../components/Header.js';
import { FONTS, SIZES, COLORS, icons } from '../../constants/index.js';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    FlatList,
} from 'react-native';
import Display from '../../utils/Display.js';
import { FontAwesome } from '@expo/vector-icons';

export default Address = () => {
    const [currentlyPressed, setCurrentlyPressed] = React.useState(0);
    return (
        <View style={styles.container}>
            <AddressHeader />
            <ScrollView containerStyle={{ justifyContent: 'center' }}>
                {
                    AddressData.map((AddressDataPoint) => {
                        return (
                            <AddressItem
                                key={AddressDataPoint.id}
                                id={AddressDataPoint.id}
                                title={AddressDataPoint.title}
                                detail={AddressDataPoint.detail}
                                onPress={() => setCurrentlyPressed(AddressDataPoint.id)}
                                currentlyPressed={currentlyPressed} />
                        )
                    })
                }
                <View style={{marginVertical: 4}} />
                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Text style={{ fontSize: SIZES.h2, color: COLORS.white }}>Add new address</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export const AddressHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginTop: 40, marginHorizontal: 20 }} title={"DELIVERY ADDRESS"}
            leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate("Welcome") }}>
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}

const AddressData = [
    {
        id: 1,
        title: "Home",
        detail: "A1 Mayfield Road",
    },
    {
        id: 2,
        title: "Parent's house",
        detail: "A2 Mayfield Road",
    },
    {
        id: 3,
        title: "Office",
        detail: "A3 Mayfield Road",
    }
]

const AddressItem = ({ id, title, detail, onPress, currentlyPressed }) => {
    const CheckBox = () => {
        const CheckedIcon = <FontAwesome name="dot-circle-o" size={20} color={COLORS.green} />
        const UncheckedIcon = <FontAwesome name="circle-o" size={20} color={COLORS.green} />
        return (currentlyPressed == id ? CheckedIcon : UncheckedIcon)
    }
    const Item = () => {
        return (
            <TouchableOpacity style={styles.item} onPress={onPress}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Image style={styles.image} source={require('../../assets/icons/location.png')} tintColor={COLORS.green} />
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={{ marginVertical: 2 }} />
                        <Text style={styles.text}>{detail}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <CheckBox />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (<Item />)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        height: 80,
        marginVertical: 8,
        backgroundColor: COLORS.lightGray1,
        borderRadius: 10,
        borderColor: COLORS.black,
        marginHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.h1,
        color: COLORS.black,
        ...FONTS.h2,
    },
    text: {
        textAlign: 'center',
        color: COLORS.black,
        ...FONTS.body3,
    },
    input: {
        height: 100,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: SIZES.h3,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.lightGray1,
        backgroundColor: COLORS.lightGray1,
    },
    button: {
        height: 60,
        marginHorizontal: 80,
        paddingLeft: SIZES.radius,
        borderRadius: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        width: 45,
        height: 45,
    }
})