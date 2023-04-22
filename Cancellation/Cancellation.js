import React from 'react';
import Header from '../../components/Header.js';
import { SIZES, COLORS, icons } from '../../constants';
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
import { CheckBox } from '@rneui/themed';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default Cancellation = () => {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <CancellationHeader />
                    <View style={{ flex: 4, marginHorizontal: 20 }}>
                        <ScrollView>
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.text}>Please choose reasons for the cancellation</Text>
                            <View style={{ marginTop: 10 }} />
                            <CancellationList />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.text}>Another reason</Text>
                            <View style={{ marginTop: 22 }} />
                            <TextInput style={styles.input} multiline placeholder="Another reason..." placeholderTextColor={COLORS.gray} keyboardType="default" />
                            <View style={{ marginTop: 80 }} />
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Onboarding") }}>
                            <Text style={{ fontSize: SIZES.h2, color: COLORS.white }}>Confirm your choice</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export const CancellationHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginTop: 40, marginHorizontal: 20 }} title={"CANCEL ORDER"}
            leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate("Welcome") }}>
                    <Image style={{ width: 30, height: 30 }} source={icons.arrow_back} />
                </TouchableOpacity>
            }
        />
    )
}

export const Reason = (props) => {
    const [check, setCheck] = React.useState(false);
    return (
        <CheckBox
            title={props.title}
            checked={check}
            onPress={() => setCheck(!check)}
            iconType="material"
            checkedIcon={<Feather name="check-square" size={SIZES.h2} color={COLORS.green} />}
            uncheckedIcon={<Feather name="square" size={SIZES.h2} color={COLORS.green} />}
            containerStyle={{ backgroundColor: "transparent" }}
            textStyle={styles.text}
        />
    )
}

export const CancellationList = () => {
    return (
        <View>
            <Reason title="Order was placed by mistake" />
            <Reason title="Cannot contact driver" />
            <Reason title="Waiting for too long" />
            <Reason title="The total price is too high" />
            <Reason title="The order destination is wrong" />
            <Reason title="Could not contact the driver" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 100,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: SIZES.h3,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.lightGray1,
        backgroundColor: COLORS.lightGray1,
    },
    text: {
        fontSize: SIZES.h3,
        fontWeight: 'bold',
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
    }
})