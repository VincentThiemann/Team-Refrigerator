import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES, icons } from '../constants';

const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
    //save the food in favourites ()
    const [save, setSave] = React.useState(false);

    return (
        <TouchableOpacity
            style={{
                width: 200,
                padding: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
        >
            {/* Favourite */}
            <View style={{ flexDirection: 'row' }}>
                {/* calories */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                        source={icons.calories}
                        style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ ...FONTS.body5, color: COLORS.darkGray2, marginLeft: 10 }}>
                        {item.calories} Calories
                    </Text>
                </View>

                {/* favourite */}
                <Image
                    source={icons.love}
                    style={{ width: 20, height: 20, tintColor: save ? COLORS.red : COLORS.gray }}
                />
            </View>

            {/* Image */}
            <View
                style={{
                    width: 150,
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={item.image}
                    style={{ height: '100%', width: '100%' }}
                />
            </View>

            {/* Info */}
            <View 
            style={{
                alignItems: 'center',
                marginTop: -20,
            }}>
                <Text style={{...FONTS.h3}}>{item.name}</Text>
                <Text style = {{ color: COLORS.darkGray2, textAlign: 'center', ...FONTS.body5}}>
                    {item.description}
                    </Text>
                <Text style = {{ marginTop: SIZES.radius, ...FONTS.h2 }}>
                    ${item.price}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalFoodCard;