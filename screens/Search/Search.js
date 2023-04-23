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
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Separator from '../../components/Separator.js';

const Search = () => {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                        <Separator height={Display.setHeight(14)}/>
                        <GooglePlacesAutocomplete
                            query={{ key: "AIzaSyCN0cSCl0WQatiQVrqjJVGlEXCL5JuoWDg" }}
                            onPress={(data, details = null) => {
                                console.log(data.description);
                            }}
                            onFail={error => console.log(error)}
                            onNotFound={() => console.log('no results')}
                            placeholder="Search "
                            styles={{
                                textInput: {
                                    backgroundColor: COLORS.lightGray1,
                                    borderRadius: 20,
                                    fontWeight: "700",
                                    marginTop: 7,
                                },
                                textInputContainer: {
                                    backgroundColor:  COLORS.lightGray1,
                                    borderRadius: 50,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginRight: 10,
                                },
                            }}
                            renderLeftButton={() => (
                                <View style={{ marginLeft: 10 }}>
                                    <Ionicons name="location-sharp" size={24} />
                                </View>
                            )}
                            renderRightButton={() => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginRight: 8,
                                        backgroundColor: "white",
                                        padding: 9,
                                        borderRadius: 30,
                                        alignItems: "center",
                                    }}
                                >
                                    <AntDesign
                                        name="clockcircle"
                                        size={11}
                                        style={{ marginRight: 6 }}
                                    />
                                    <Text>Search</Text>
                                </View>
                            )}
                        />

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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