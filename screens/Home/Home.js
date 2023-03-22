import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants"
import Search from '../Search/Search';

const Home = () => {
    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* Icon */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black,
                    }}
                />

                {/* Text Input */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder="What are you craving?"
                />

                {/* filter */}
                <TouchableOpacity
                    onPress={() => console.log('filter')}
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Search */}
            {renderSearch()}
        </View>
    )
}

export default Home;