import React from 'react';
import Header from '../../components/Header.js';
import { FONTS, SIZES, COLORS, icons } from '../../constants/index.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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

const Search = () => {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <View style={{ marginVertical: 10 }} />
                        <LocationInput type={"ADDRESS DETAIL"} placeholder={"Type address detail here..."} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export const LocationInput = ({ type, content }) => {
    return (
        <View>
            <Text style={styles.text}>{type}</Text>
            <View style={{ marginVertical: 5 }} />
            <GooglePlacesAutocomplete 
            placeholder={content} 
            styles={{textInput: styles.input}}
            query={{
                key: 'AIzaSyA-ZUiliFrdS5B5oU2Z_jKwtjhTaU8JoVA',
                language: 'en',
            }}
            
            />
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

export default Search