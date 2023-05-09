import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, icons, images, constants, dummyData } from "../../constants";
import { IconButton } from '../../components';
import { utils } from '../../utils';
import MapViewDirections from "react-native-maps-directions"
import { keys } from "../../apiKeys";
import { useSelector } from "react-redux";
import { Entypo } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

const Map = ({ navigation }) => {

    const mapView = React.useRef()
    const [region, setRegion] = React.useState(null)
    const [toLoc, setToLoc] = React.useState(null)
    const [fromLoc, setFromLoc] = React.useState(null)
    const [angle, setAngle] = React.useState(0)
    const [isReady, setIsReady] = React.useState(false)
    const [duration, setDuration] = React.useState("")

    React.useEffect(() => {
        let initialRegion = {
            latitude: 41.514396,
            longitude: -81.6058287,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        let destination = {
            latitude: 41.5094611,
            longitude: -81.606195,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        setToLoc(destination);
        setFromLoc(dummyData.fromLocs[1])

        setRegion(initialRegion)
    }, [])

    const { addressName } = useSelector(state => state?.location)

    function renderMap() {
        return (
            <MapView
                ref={mapView}
                style={{
                    flex: 1
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
            >
                {
                    fromLoc &&
                    <Marker
                        key={'FromLoc'}
                        coordinate={fromLoc}
                        tracksViewChanges={false}
                        icon={icons.navigator1}
                        rotation={angle}
                        anchor={{ x: 0.5, y: 0.5 }}
                    />
                }

                {
                    toLoc &&
                    <Marker
                        key={'ToLoc'}
                        coordinate={toLoc}
                        tracksViewChanges={false}
                        //icon={icons.location_pin}
                        anchor={{ x: 0.5, y: 0.5 }}
                    />

                }
                <MapViewDirections
                    origin={fromLoc}
                    destination={toLoc}
                    apikey={keys.GOOGLE_PLACES_API_KEY}
                    strokeWidth={5}
                    strokeColor="hotpink"
                    optimizeWaypoints={true}
                    onReady={result => {
                        setDuration(Math.ceil(result.duration))

                        if (!isReady)
                            mapView.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 300,
                                    left: 30,
                                    top: 100,
                                }
                            })

                        //reposition the navigaotr
                        if (result.coordinates.length >= 2) {
                            let angle = utils.calculateAngle(result.coordinates)
                            setAngle(angle)
                        }

                        setIsReady(true)
                    }} />
            </MapView>
        )
    }

    function renderButton() {
        return (
            <>
                <IconButton
                    icon={icons.back}
                    containerStyle={{
                        position: 'absolute',
                        top: SIZES.padding * 2,
                        left: SIZES.padding,
                        ...styles.buttonStyle
                    }}
                    iconStyle={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.black
                    }}
                    onPress={() => navigation.goBack()}
                />
            </>
        )
    }

    function renderFooter() {
        return (
            <>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: "100%"
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={[COLORS.transparent, COLORS.lightGray1]}
                        style={{
                            position: 'absolute',
                            top: -20,
                            left: 0,
                            right: 0,
                            height: Platform.OS === 'ios' ? 200 : 50,
                        }}
                    />

                    <View
                        style={{
                            padding: SIZES.padding,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            backgroundColor: COLORS.white
                        }}
                    >
                        {/* Delivery time  */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source={icons.clock}
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: COLORS.black
                                }}
                            />

                            <View
                                style={{
                                    marginLeft: SIZES.padding
                                }}
                            >
                                <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>Your delivery time</Text>
                                <Text style={{ ...FONTS.h3 }}>{duration} minutes</Text>
                            </View>
                        </View>

                        {/* Address */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: SIZES.padding
                            }}
                        >
                            <Image
                                source={icons.focus}
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: COLORS.black
                                }}
                            />

                            <View
                                style={{
                                    marginLeft: SIZES.padding
                                }}
                            >
                                <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>Your address</Text>
                                <Text style={{ ...FONTS.h3 }}>{addressName}</Text>
                            </View>
                        </View>

                        {/* Delivery Person Detail */}
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                height: 70,
                                marginTop: SIZES.padding,
                                borderRadius: SIZES.radius,
                                paddingHorizontal: SIZES.radius,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.green
                            }}
                        >
                            <Image
                                source={images.profile}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 5,
                                }}
                            />

                            <View
                                style={{
                                    flex: 1,
                                    marginLeft: SIZES.radius,
                                }}
                            >
                                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>John Doe </Text>
                                <Text style={{ color: COLORS.white, ...FONTS.body4 }}> Delivery Info</Text>
                            </View>

                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.transparent
                                }}
                            >
                                <Entypo name="chat" size={24} color="white" onPress={() => Linking.openURL('sms:+12349319865')} />
                                
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }


    return (
        <View style={{
            flex: 1
        }}>
            {/* Map */}
            {renderMap()}
            {/* Header Button */}
            {renderButton()}
            {/* Footer */}
            {renderFooter()}
        </View>
    )

}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

    }
});

export default Map;