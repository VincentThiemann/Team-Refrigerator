import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import OnboardingText from '../../components/OnboardingText.js';
import { COLORS, SIZES } from '../../constants';
import { StorageService } from '../../services';
import firstLauchActions from '../../stores/firstLaunch/firstLauchActions';

const slides = [
    {
        image: require('../../assets/images/splash_image.png'),
        name: "Discover places near you",
        subtitle: "We make it simple to find foods. Enter the address and let us do the rest."
    },
    {
        image: require('../../assets/images/splash_image.png'),
        name: "Find favorite foods",
        subtitle: "We will store your favorite foods based on your search and orders."
    },
    {
        image: require('../../assets/images/splash_image.png'),
        name: "Order food efficiently",
        subtitle: "We make food ordering fast, easy and free."
    }
]

export const Onboarding = () => {
    const [i, setI] = React.useState(0);
    const [image, setImage] = React.useState(slides[i].image);
    const [subtitle, setSubtitle] = React.useState(slides[i].subtitle);
    const [name, setName] = React.useState(slides[i].name);
    const dispatch = useDispatch();

    const navigate = () => {
        StorageService.setFirstTimeUse().then(() => {
            dispatch(firstLauchActions.setIsFirstTimeUse());
        });
    };

    function moveToNextSlide() {
        if (i < 2) {
            const nextSlide = slides[i + 1];
            setI(i + 1);
            setImage(nextSlide.image);
            setName(nextSlide.name);
            setSubtitle(nextSlide.subtitle);
        } else {
            navigate("");
        }


    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground style={styles.image} source={image}>

                <OnboardingText name={name} subtitle={subtitle} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            moveToNextSlide()
                        }}>
                        <Text style={styles.text}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>



        </View>
    )
}

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.green,
    },
    text: {
        textAlign: 'center',
        fontSize: SIZES.h1,
        color: COLORS.black,
    },
    button: {
        height: '40%',
        width: '80%',
        paddingLeft: SIZES.radius,
        borderRadius: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        width: '100%',
        height: '100%'
    }
})