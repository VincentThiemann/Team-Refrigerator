import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import Animated from "react-native-reanimated";

import { MainLayout } from '../screens'

import { COLORS, FONTS, SIZES, dummyData, icons } from '../constants'
import constants from '../constants/constants'
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tabs/tabActions'
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();
const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginTop: SIZES.base,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: isFocused ? COLORS.transparentBlack1 : null
            }}
            onPress={onPress}
        >
            <Image source={icon} style={{
                width: 20,
                height: 20,
                tintColor: COLORS.black,
            }} />
            <Text style={{
                marginLeft: 50,
                color: COLORS.black,
                ...FONTS.h3,
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
    const user = auth()?.currentUser?.uid;

    const handleSignOut = () => {

        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
            })
            .catch(error => alert(error.message))
    }

    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1, top: 0, bottom: 0 }}
        >
            <View style={{
                flex: 1,
                paddingHorizontal: SIZES.radius,
            }}>
                {/* Close */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}>
                    <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                        <Image source={icons.cross} style={{
                            width: 35,
                            height: 35,
                            tintColor: COLORS.black,
                        }} />
                    </TouchableOpacity>

                </View>
                {/* Profile */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.radius,
                    }}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Image source={dummyData.myProfile?.profile_images}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View style={{
                        marginLeft: SIZES.radius,
                    }}
                    >
                        <Text style={{
                            color: COLORS.black,
                            ...FONTS.h3,
                        }}>{user}</Text>
                        <Text style={{
                            color: COLORS.black,
                            ...FONTS.body4,
                        }}>View your profile</Text>
                    </View>
                </TouchableOpacity>
                {/* Drawer Item */}
                <View style={{
                    flex: 1,
                    marginTop: SIZES.padding,
                }}
                >
                    <CustomDrawerItem label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        onPress={() => {
                            setSelectedTab(constants.screens.home)
                            navigation.navigate("MainLayout")
                        }} />

                    <CustomDrawerItem
                        label={constants.screens.my_wallet}
                        icon={icons.wallet}
                        isFocused={selectedTab == constants.screens.my_wallet}
                        onPress={()=>{
                            setSelectedTab(constants.screens.my_wallet)
                            navigation.navigate("MainLayout")
    
                        }}
                        
                    />

                    <CustomDrawerItem
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab == constants.screens.notification}
                        onPress={() => {
                            setSelectedTab(constants.screens.notification)
                            navigation.navigate("MainLayout")
                        }} />

                    <CustomDrawerItem label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab == constants.screens.favourite}
                        onPress={() => {
                            setSelectedTab(constants.screens.favourite)
                            navigation.navigate("MainLayout")
                        }} />

                    {/* Line divider */}
                    <View style={{
                        height: 1, marginVertical: SIZES.radius,
                        marginLeft: SIZES.radius,
                        backgroundColor: COLORS.lightGray1
                    }} />

                    <CustomDrawerItem label="Track your order"
                        icon={icons.location}
                        onPress={() => {
                            navigation.navigate("Map")
                        }} />

                    <CustomDrawerItem label="Coupons"
                        icon={icons.coupon} />

                    <CustomDrawerItem label="Settings"
                        icon={icons.setting} />

                    <CustomDrawerItem label="Invite a friend"
                        icon={icons.profile}
                        onPress={() => {
                            navigation.navigate("Tracker")
                        }} />

                    <CustomDrawerItem label="Help"
                        icon={icons.help} />

                </View>

                <View style={{
                    marginBottom: SIZES.padding,
                }}>
                    <CustomDrawerItem label="Log out"
                        onPress={handleSignOut}
                        icon={icons.logout} />
                </View>
            </View>
        </DrawerContentScrollView>
    )

}

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
    

    const [progress, setProgress] = useState(new Animated.Value(0));

    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8]
    })

    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 26]
    })

    const animatedStyle = { borderRadius, transform: [{ scale }] }


    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.lightGreen,
        }}>
            <Drawer.Navigator
                screenOptions={{
                    drawerType: 'slide',
                    drawerStyle: {
                        flex: 1,
                        width: '65%',
                        paddingRight: 20,
                        backgroundColor: 'transparent',
                        headerShown: false

                    },
                    overlayColor: 'transparent',

                }}

                initialRouteName="Tab"
                drawerContent={props => {
                    setTimeout(() => {
                        setProgress(props.progress)
                    }, 0)

                    return (
                        <CustomDrawerContent
                            navigation={props.navigation}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab} />

                    )
                }}
            >
                <Drawer.Screen options={{ headerShown: false }} name="MainLayout">
                    {props => <MainLayout {...props}
                        drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)