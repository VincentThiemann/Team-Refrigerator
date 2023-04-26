import 'react-native-gesture-handler';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    StatusBar
} from 'react-native';
import { BackgroundCurvedView } from "../components"
import { EvilIcons } from '@expo/vector-icons';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tabs/tabActions';
import { Home, Search, CartTab, Notification, Favourite, TransactionHistory } from './'
import { COLORS, FONTS, SIZES, icons, constants, dummyData } from '../constants';
import { Header } from '../components';
import { auth } from "../firebase"
import Display from '../utils/Display';
import { useSelector } from 'react-redux';

const TabButton = ({ label, icon, isFocused, onPress, outerContainerStyle, innerContainerStyle }) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Animated.View
                style={[
                    outerContainerStyle,
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                ]}
            >
                <Animated.View
                    style={[
                        innerContainerStyle,
                        {
                            flexDirection: 'row',
                            width: '80%',
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25
                        }
                    ]}
                >
                    <Image
                        source={icon}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: isFocused ? COLORS.black : COLORS.gray,
                        }}
                    />

                    {isFocused &&
                        <Text
                            numberOfLines={1}
                            style={{
                                marginLeft: SIZES.base,
                                color: COLORS.black,
                                ...FONTS.h3
                            }}
                        >
                            {label}
                        </Text>
                    }
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const MainLayout = ({ drawerAnimationStyle, navigation, selectedTab, setSelectedTab }) => {

    const flatListRef = React.useRef();

    // Reanimated shared value
    const homeTabFlex = useSharedValue(1);
    const homeTabColor = useSharedValue(COLORS.white);
    const searchTabFlex = useSharedValue(1);
    const searchTabColor = useSharedValue(COLORS.white);
    const cartTabFlex = useSharedValue(1);
    const cartTabColor = useSharedValue(COLORS.white);
    const favTabFlex = useSharedValue(1);
    const favTabColor = useSharedValue(COLORS.white);
    const notiTabFlex = useSharedValue(1);
    const notiTabColor = useSharedValue(COLORS.white);
    const [toggleLocation, setToggleLocation] = React.useState(false);


    // reanimated styles
    const homeFlexStyle = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value,
        }
    })

    const homeColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: homeTabColor.value
        }
    })

    const searchFlexStyle = useAnimatedStyle(() => {
        return {
            flex: searchTabFlex.value,
        }
    })

    const searchColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: searchTabColor.value
        }
    })

    const cartFlexStyle = useAnimatedStyle(() => {
        return {
            flex: cartTabFlex.value,
        }
    })

    const cartColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: cartTabColor.value
        }
    })

    const favFlexStyle = useAnimatedStyle(() => {
        return {
            flex: favTabFlex.value,
        }
    })

    const favColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: favTabColor.value
        }
    })

    const notiFlexStyle = useAnimatedStyle(() => {
        return {
            flex: notiTabFlex.value,
        }
    })

    const notiColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: notiTabColor.value
        }
    })


    React.useEffect(() => {
        setSelectedTab(constants.screens.home)
    }, [])

    React.useEffect(() => {
        if (selectedTab == constants.screens.home) {
            flatListRef?.current?.scrollToIndex({
                index: 0,
                animated: false
            })
            homeTabFlex.value = withTiming(4, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.green, { duration: 500 })
        }
        else {
            homeTabFlex.value = withTiming(1, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == constants.screens.search) {
            flatListRef?.current?.scrollToIndex({
                index: 1,
                animated: false
            })
            searchTabFlex.value = withTiming(4, { duration: 500 })
            searchTabColor.value = withTiming(COLORS.green, { duration: 500 })
        }
        else {
            searchTabFlex.value = withTiming(1, { duration: 500 })
            searchTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == constants.screens.cart) {
            flatListRef?.current?.scrollToIndex({
                index: 2,
                animated: false
            })
            cartTabFlex.value = withTiming(4, { duration: 500 })
            cartTabColor.value = withTiming(COLORS.green, { duration: 500 })
        }
        else {
            cartTabFlex.value = withTiming(1, { duration: 500 })
            cartTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == constants.screens.favourite) {
            flatListRef?.current?.scrollToIndex({
                index: 3,
                animated: false
            })
            favTabFlex.value = withTiming(4, { duration: 500 })
            favTabColor.value = withTiming(COLORS.green, { duration: 500 })
        }
        else {
            favTabFlex.value = withTiming(1, { duration: 500 })
            favTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == constants.screens.notification) {
            flatListRef?.current?.scrollToIndex({
                index: 4,
                animated: false
            })
            notiTabFlex.value = withTiming(4, { duration: 500 })
            notiTabColor.value = withTiming(COLORS.green, { duration: 500 })
        }
        else {
            notiTabFlex.value = withTiming(1, { duration: 500 })
            notiTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

    }, [selectedTab])

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Authentication")
            })
            .catch(error => alert(error.message))
    }
    
    const { addressName } = useSelector(state => state?.location)

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                ...drawerAnimationStyle
            }}
        >
            <StatusBar barStyle="light-content"
                backgroundColor="transparent"
                translucent />
            <BackgroundCurvedView  pos = {2000}
            />
            
            {/* Header */}
            <Header
                containerStyle={{
                    position: "absolute",
                    zIndex: 1,
                    width: "100%",
                    height: Display.setHeight(14),
                    paddingHorizontal: SIZES.padding,
                    paddingTop: 40,
                    backgroundColor: COLORS.green,
                    borderBottomRightRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                }}
                //title={selectedTab.toUpperCase()} //to upper case later
                leftComponent={
                    <View>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <EvilIcons name="location" size={24} color={COLORS.white} />
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body4,
                                }}
                            >
                                Deliver to
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: SIZES.base,
                            }}
                            onPress={() => {console.log(addressName)}}>
                            <Text style={{ ...FONTS.h3 }}>
                                {addressName}
                            </Text>

                            <Image
                                source={icons.down_arrow}
                                style={{
                                    marginLeft: SIZES.base,
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.white,
                                }}
                            />

                        </TouchableOpacity>



                    </View>
                }

                rightComponent={
                    <View style={{ flexDirection: "row" }}>

                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => { navigation.openDrawer() }}>
                            <Image
                                source={icons.menu}
                                style={{
                                    tintColor: COLORS.white
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => { setSelectedTab(constants.screens.notification) }}>
                            <View style={{
                                borderRadius: 32,
                                backgroundColor: COLORS.DEFAULT_YELLOW,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 16,
                                width: 16,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                            }}>
                                <Text style={{
                                    color: COLORS.DEFAULT_WHITE,
                                    fontSize: 10,
                                    lineHeight: 10 * 1.4,
                                    fontFamily: FONTS.POPPINS_BOLD,
                                }}>12</Text>
                            </View>
                            <Image
                                source={icons.notification}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.white
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => { setSelectedTab(constants.screens.cart) }}>
                            <Image
                                source={icons.cart}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.white,

                                }}
                            />
                        </TouchableOpacity>
                    </View>
                }
            />

            {/* Content */}

            <View
                style={{
                    flex: 1
                }}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    keyboardShouldPersistTaps={'handled'}
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width,
                                }}
                            >
                                {selectedTab != constants.screens.my_wallet && item.label == constants.screens.home && <Home />}
                                {selectedTab != constants.screens.my_wallet && item.label == constants.screens.search && <Search />}
                                {selectedTab != constants.screens.my_wallet && item.label == constants.screens.cart && <CartTab />}
                                {selectedTab != constants.screens.my_wallet && item.label == constants.screens.favourite && <Favourite />}
                                {selectedTab != constants.screens.my_wallet && item.label == constants.screens.notification && <Notification />}
                                {selectedTab == constants.screens.my_wallet && <TransactionHistory />}

                            </View>
                        )
                    }}

                />

            </View>

            {/* footer */}
            <View
                style={{
                    height: 100,
                    justifyContent: 'flex-end'
                }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    colors={[COLORS.transparent, COLORS.black]}
                    style={{
                        position: 'absolute',
                        top: -20,
                        left: 0,
                        right: 0,
                        height: 100,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}
                />

                {/* tab */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: 10,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.white,
                    }}>
                    <TabButton
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        outerContainerStyle={homeFlexStyle}
                        innerContainerStyle={homeColorStyle}
                        onPress={() => { setSelectedTab(constants.screens.home) }}
                    />
                    <TabButton
                        label={constants.screens.search}
                        icon={icons.search}
                        isFocused={selectedTab == constants.screens.search}
                        outerContainerStyle={searchFlexStyle}
                        innerContainerStyle={searchColorStyle}
                        onPress={() => { setSelectedTab(constants.screens.search) }}
                    />
                    <TabButton
                        label={constants.screens.cart}
                        icon={icons.cart}
                        isFocused={selectedTab == constants.screens.cart}
                        outerContainerStyle={cartFlexStyle}
                        innerContainerStyle={cartColorStyle}
                        onPress={() => { setSelectedTab(constants.screens.cart) }}
                    />
                    <TabButton
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab == constants.screens.favourite}
                        outerContainerStyle={favFlexStyle}
                        innerContainerStyle={favColorStyle}
                        onPress={() => { setSelectedTab(constants.screens.favourite) }}
                    />
                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab == constants.screens.notification}
                        outerContainerStyle={notiFlexStyle}
                        innerContainerStyle={notiColorStyle}
                        onPress={() => { setSelectedTab(constants.screens.notification) }}
                    />
                </View>
            </View>

        </Animated.View>
    )
}

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => { return dispatch(setSelectedTab(selectedTab)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);