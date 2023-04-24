import React, { useState } from 'react';
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
import { keys } from "../../apiKeys.js";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const GOOGLE_PLACES_API_KEY = keys.GOOGLE_PLACES_API_KEY;
const Search = () => {
    const navigation = useNavigation();
    const [initialRegion, setInitialRegion] = useState(null);
    const [markerCoords, setMarkerCoords] = useState(null);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <Separator height={Display.setHeight(22)} />

                {/* Google Text Input */}
                <GooglePlacesAutocomplete
                    query={{ key: GOOGLE_PLACES_API_KEY }}
                    fetchDetails={true}
                    // Set initial region as the text input region
                    onPress={(data, details) => {
                        const { lat, lng } = details.geometry.location;
                        setInitialRegion({
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        });
                        setMarkerCoords({ latitude: lat, longitude: lng });
                    }}
                    onFail={error => console.log(error)}

                    // Show sad emoji if location not found
                    onNotFound={() => console.log("No Result")}
                    listEmptyComponent={() => (
                        <NotFound />
                    )}
                    placeholder="Search "

                    // Styles for text input
                    styles={{
                        container: {
                            flex: 1,
                            marginHorizontal: 15,
                        },
                        textInput: {
                            backgroundColor: COLORS.lightGray1,
                            borderRadius: 20,
                            fontWeight: "700",
                            marginTop: 7,
                        },
                        textInputContainer: {
                            backgroundColor: COLORS.lightGray1,
                            borderRadius: 25,
                            flexDirection: "row",
                            alignItems: "center",
                            marginRight: 10,

                        },
                    }}

                    // Location mark
                    renderLeftButton={() => (
                        <View style={{ marginLeft: 10 }}>
                            <Ionicons name="location-sharp" size={24} />
                        </View>
                    )}
                    // Clock & search mark
                    renderRightButton={() => (
                        <View
                            style={{
                                flexDirection: "row",
                                marginRight: 8,
                                backgroundColor: "white",
                                padding: 9,
                                borderRadius: 15,
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
                {/* Show map */}

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                >
                    {/* // initialRegion={initialRegion}
                            // {markerCoords && <Marker coordinate={markerCoords} />} */}
                </MapView>
                 <View style={{ height: 100 }}/>               
            </View>
        </TouchableWithoutFeedback>
    )
}

const NotFound = () => {
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => { setTimeout(() => setLoading(false), 1000) }, []);
    if (!loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
                <Image style={{ width: 300, height: 300 }} source={require("../../assets/images/sad.png")} />
                <View style={{ marginVertical: 20 }} />
                <Text style={styles.title}>Could not find the requested address</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    title: {
        marginHorizontal: 10,
        textAlign: 'center',
        color: COLORS.black,
        ...FONTS.h1,
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
    },
    map: {
        width: '100%',
        height: '60%',
    }
})

export default Search