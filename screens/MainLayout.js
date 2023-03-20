import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Flatlist
} from 'react-native';

import { Animated, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tabs/tabActions';

import { Home, Search, CartTab, Notification, Favourite } from './'

import { COLORS, FONTS, SIZES, icons, constants, dummyData } from '../constants';

import { Header } from '../components';


const MainLayout = ({ navigation, selectedTab, setSelectedTab }) => {

    React.useEffect(() => {
        setSelectedTab(constants.screens.home)
    }, [])

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
               

            }}
        >
            {/* Header */}
            <Header
                containerStyle={{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: "center"
                }}
                title={String(selectedTab).toUpperCase()}  //to upper case later
                leftComponent = {
                    <TouchableOpacity
                        style ={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.gray2,
                        }}
                    >
                        <Image
                            source = {dummyData?.myProfile?.profile_image}
                            style ={{
                                width: 40,
                                height: 40,
                                borderRadius: SIZES.radius,
                            }}
                            />
                    </TouchableOpacity>
                    
                }

                rightComponent = {
                    <TouchableOpacity
                        style ={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.gray2,
                        }}
                        onPress = {() => {navigation.openDrawer()}}>
                        <Image
                            source = {icons.menu}
                            />
                    </TouchableOpacity>
                    
                }
            />

            {/* Content */}

            <View 
                style = {{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                    }
            }>
                <Text>MainLayout</Text>
            </View>
             
            {/* footer */}

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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);