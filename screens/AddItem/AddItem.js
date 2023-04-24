import React from 'react';
import { SIZES, COLORS, icons, images, FONTS} from '../../constants';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    TextInput
} from 'react-native';
import { text } from 'stream/consumers';

export const AddItem = () => {
    const [orderQuantity, setOrderQuantity] = React.useState(1);
    const navigation = useNavigation();
    return (
        <View style = {{backgroundColor: 'white'}}>
            <ImageBackground
                style = {{width: SIZES.width, height: SIZES.height * 0.475}}
                source={images.food_bowl}
            >
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Splash") }}>
                    <Image style = {{width: 40, height: 40, marginLeft: SIZES.width * 0.05, marginTop: SIZES.height * 0.1}} source={icons.arrow_back} />
                </TouchableOpacity>
            </ImageBackground>
            <Text style = {{...FONTS.h1, textAlign: 'center', marginTop: SIZES.height * 0.02}}>
                Spork
            </Text>
            <View
                style={{borderBottomColor: COLORS.gray2, borderBottomWidth: StyleSheet.hairlineWidth, marginTop: SIZES.height * 0.02, marginLeft: SIZES.width * 0.1, marginRight: SIZES.width * 0.1}}
            />
            <Text style = {{...FONTS.h2, textAlign: 'center', marginTop: SIZES.height * 0.02, marginHorizontal: SIZES.width * 0.02}}>
                One singular spork. Just one spork, no more no less. Fuck you.
            </Text>
            <View
                style = {{ flexDirection: 'row', height: SIZES.height * 0.1, marginTop: SIZES.height * 0.03}} >
                <View style={{flex: 0.18}} />
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => setOrderQuantity(orderQuantity - 1)}>
                        <Text style={{fontFamily: "Poppins-Black", fontSize: 50, textAlign: 'center', textAlignVertical: 'center', color: '#1BAC4B'}}>-</Text>
                </TouchableOpacity>
                <Text style={{fontFamily: "Poppins-Black", fontSize: SIZES.smallTitle, textAlign: 'center', textAlignVertical: 'center', flex: 0.24}}>
                    {orderQuantity}
                </Text>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => setOrderQuantity(orderQuantity + 1)}>
                        <Text style={{fontFamily: "Poppins-Black", fontSize: 50, textAlign: 'center', textAlignVertical: 'center', color: '#1BAC4B'}}>+</Text>
                </TouchableOpacity>
                <View style={{flex: 0.18}} />
            </View>
            <TextInput 
                    style = {{textAlign: 'left', marginHorizontal: SIZES.width * 0.02, marginTop: SIZES.height * 0.02, backgroundColor: '#FAFAFA', height: SIZES.height * 0.12, borderRadius: 15, fontSize: 15, color: COLORS.gray2}}
            >Note to Restaurant (Optional)</TextInput>
            <TouchableOpacity 
                    style = {{alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#1BAC4B', marginTop: SIZES.height * 0.02, marginHorizontal: SIZES.width * 0.02, height: SIZES.height * 0.1}}
                    onPress = {{}}>
                        <Text style={{fontFamily: "Poppins-Black", fontSize: 35, textAlign: 'center', textAlignVertical: 'center', color: 'white'}}>Add to Cart</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: COLORS.gray3,
      flex: 0.2
    }
  });

export default AddItem;