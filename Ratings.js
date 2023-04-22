import React from 'react';
import Header from '../../components/Header.js';
import { FONTS, SIZES, COLORS, icons } from '../../constants/index.js';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
    TouchableWithoutFeedback
} from 'react-native';
import Display from '../../utils/Display.js';
import { Entypo } from '@expo/vector-icons';

export default Ratings = () => {
    const [rating, setRating] = React.useState(0);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <RatingHeader />
            <View style = {{flex: 4}}>
                <View style={{ marginVertical: 20 }} />
                <Image style={styles.image} source={require('../../assets/images/splash_image.jpg')} />
                <View style={{ marginVertical: 20 }} />
                <Text style={styles.title}>How was your order?</Text>
                <View style={{ marginVertical: 15 }} />
                <Text style={styles.text}>Did you enjoy it? Please rate your experience</Text>
                <View style={{ marginVertical: 5 }} />
                <View style={{ justifyContent: 'center', marginVertical: 20, display: 'flex', flexDirection: 'row' }}>
                    <Star starNumber={1} onPress={() => setRating(1)} currentRating={rating} />
                    <Star starNumber={2} onPress={() => setRating(2)} currentRating={rating} />
                    <Star starNumber={3} onPress={() => setRating(3)} currentRating={rating} />
                    <Star starNumber={4} onPress={() => setRating(4)} currentRating={rating} />
                    <Star starNumber={5} onPress={() => setRating(5)} currentRating={rating} />
                </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Onboarding") }}>
                            <Text style={{ fontSize: SIZES.h2, color: COLORS.white, fontFamily: FONTS.POPPINS_BOLD }}>Confirm your choice</Text>
                        </TouchableOpacity>
                    </View>
        </View>
    )
}

export const Star = ({ starNumber, onPress, currentRating }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Entypo
                name={currentRating >= starNumber ? 'star' : 'star-outlined'}
                size={50}
                style={{ color: COLORS.DEFAULT_YELLOW }}
            />
        </TouchableOpacity>
    )
}

export const RatingHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginTop: 40, marginHorizontal: 20 }} title={"RATING"}
            leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate("Welcome") }}>
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
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
        ...FONTS.h1,
    },
    text: {
        textAlign: 'center',
        color: COLORS.black,
        ...FONTS.body1,
    },
    input: {
        height: 100,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: SIZES.h3,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.lightGray1,
        backgroundColor: COLORS.lightGray1,
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