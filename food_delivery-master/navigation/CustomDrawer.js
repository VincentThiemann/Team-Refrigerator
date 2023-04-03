import React from "react";  
import {View, Text, Image, TouchableOpacity} from "react-native";  
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";  
import Animated from "react-native-reanimated";  

import { MainLayout } from '../screens'
import { COLORS, FONTS, SIZES, dummyData, icons } from '../constants'
import constantsScreen from '../constants/constantsScreen'

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon}) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            height: 40,
            marginTop: SIZES.base,
            alignItems: 'center',
            paddingLeft: SIZES.radius,
            borderRadius: SIZES.base,
        }}>
            <Image source = {icon} style = {{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white,
                        }}/>
            <Text style = {{
                marginLeft: 50, 
                color: COLORS.white,
                ...FONTS.h3,
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({navigation}) => {
    return (
        <DrawerContentScrollView
            scrollEnabled = {true}
            contentContainerStyle={{ flex: 1}}
        >
            <View style = {{
                flex: 1,
                paddingHorizontal: SIZES.radius,
            }}>
                {/* Close */}
                <View style = {{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <TouchableOpacity onPress = {() => navigation.closeDrawer()}
                                                      style = {{alignItems: 'center',
                                                                justifyContent: 'center'}}>
                                        <Image source = {icons.cross} style = {{
                                            width: 35,
                                            height: 35,
                                            tintColor: COLORS.white,
                                        }}/>
                                    </TouchableOpacity>

                                </View>
                {/* Profile */}
                <TouchableOpacity
                    style = {{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.radius,
                    }}
                    onPress = {() => console.log('Profile')}
                 >
                    <Image source = {dummyData.myProfile?.profile_image} 
                           style = {{
                                width: 50,
                                height: 50,
                                borderRadius: SIZES.radius
                            }}
                    />

                    <View style = {{
                                marginLeft: SIZES.radius,
                    }}
                    >
                        <Text style = {{
                                    color: COLORS.white,
                                    ...FONTS.h3,
                                }}>{dummyData.myProfile?.name}</Text>
                        <Text style = {{
                                    color: COLORS.white,
                                   ...FONTS.body4,
                                }}>View your profile</Text>
                    </View>
                </TouchableOpacity>
                {/* Drawer Item */}
                <View style = {{
                          flex: 1,
                          marginTop: SIZES.padding,
                }}
                >
                    <CustomDrawerItem label={constantsScreen.screens.home}
                                      icons={icons.home}/>

                    <CustomDrawerItem label={constantsScreen.screens.my_wallet}
                    icons={icons.wallet}/>      

                    <CustomDrawerItem label={constantsScreen.screens.notification}
                    icons={icons.notification}/>

                    <CustomDrawerItem label={constantsScreen.screens.favourite}
                    icons={icons.favourite}/>

                    {/* Line divider */}
                    <View style = {{height: 1, marginVertical: SIZES.radius, 
                                    marginLeft: SIZES.radius, 
                                    backgroundColor: COLORS.lightGray1}}/>

                    <CustomDrawerItem label="Track your order"
                                      icons={icons.location}/>

                    <CustomDrawerItem label="Coupons"
                                        icons={icons.coupon}/>
                    
                    <CustomDrawerItem label="Settings"
                                      icons={icons.settings}/>    

                    <CustomDrawerItem label="Invite a friend"
                                      icons={icons.invite}/>      
                    
                    <CustomDrawerItem label="Help"
                                        icons={icons.help}/>

                </View>

                <View style = {{
                    marginBottom: SIZES.padding,
                }}>
                    <CustomDrawerItem label="Log out"
                                      icons={icons.logout}/>
                </View>
            </View>
        </DrawerContentScrollView>
    )

}

const CustomDrawer = () => {
    [progress, setProgress] = React.useState(new Animated.Value(0));

    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });

    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 26],
    });

    const animatedStyle = {borderRadius, transform: [{scale}]};


    return (
        <View style = {{
            flex: 1,
            backgroundColor: COLORS.primary,
        }}>
            <Drawer.Navigator 
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle = {{
                    flex: 1,
                    width: '65%',
                    paddingRight: 20,
                    backgroundColor: 'transparent',
                }}
                sceneContainerStyle={{
                    backgroundColor: 'transparent',
                }}           
                initialRouteName="MainLayout"
                drawerContent={props => {
                    setTimeout(() => {
                        setProgress(props.progress)
                    }, 0)

                    return (
                        <CustomDrawerContent navigation={props.navigation} />
                    )
                }}
            >
                <Drawer.Screen name ="MainLayout">
                    {props => <MainLayout {...props} 
                     drawerAnimationStyle={animatedStyle} 
                    />}
                </Drawer.Screen> 
            </Drawer.Navigator>
        </View>
    )
}

export default CustomDrawer
