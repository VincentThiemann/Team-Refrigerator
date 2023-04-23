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
    TouchableWithoutFeedback,
} from 'react-native';
import Display from '../../utils/Display.js';

export default NewAddress = () => {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <NewAddressHeader />
                    <View style={{ marginVertical: 10 }} />
                    <Text style={styles.title}>NEW ADDRESS INFORMATION</Text>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <View style={{ marginVertical: 10 }} />
                        <LocationInput type={"ADDRESS TYPE"} placeholder={"Type address type here..."} />
                        <View style={{ marginVertical: 15 }} />
                        <LocationInput type={"ADDRESS DETAIL"} placeholder={"Type address detail here..."} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Address") }}>
                            <Text style={{ fontSize: SIZES.h2, color: COLORS.white }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export const NewAddressHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginTop: 40, marginHorizontal: 20 }} title={"ADD NEW ADDRESS"}
            leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate("Address") }}>
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}
export const LocationInput = ({ type, content }) => {
    return (
        <View>
            <Text style={styles.text}>{type}</Text>
            <View style={{ marginVertical: 5 }} />
            <TextInput style={styles.input} placeholder={content} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
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
        ...FONTS.body2,
    },
    input: {
        height: 70,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: SIZES.h3,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.lightGray1,
        backgroundColor: COLORS.lightGray1,
        ...FONTS.body3,
    },
    button: {
        height: 60,
        width: '80%',
        paddingLeft: SIZES.radius,
        borderRadius: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        alignSelf: 'center',
        width: Display.setWidth(80),
        height: Display.setHeight(40),
        borderRadius: SIZES.padding,
    }
})