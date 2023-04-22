import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES, icons } from '../constants';

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
    //save the food in favourites ()
    const [save, setSave] = React.useState(false);

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
            onPress={onPress}>
            <Image source={{uri: item.image_url}} style={imageStyle} />
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={{ ...FONTS.h3, fontSize: 17 }}>{item.name}</Text>
                <Text style={{ color: COLORS.darkGray, ...FONTS.body4 }}>{console.log(item.categories)}</Text>
            </View>

            {/* Favorite */}
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 5, right: SIZES.radius }}>
                <Image source={icons.love} style={{ width: 20, height: 20, tintColor: save ? COLORS.red : COLORS.darkGray }} />
                <TouchableWithoutFeedback onPress={() => setSave(!save)}>    
                    <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}> {save ? 'Saved' : 'Unsaved'} </Text>
                </TouchableWithoutFeedback>
            </View>
        </TouchableOpacity>
    )
}

export default HorizontalFoodCard;