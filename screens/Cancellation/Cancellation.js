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
    FlatList,
    StyleSheet,
} from 'react-native';
import { Icon, CheckBox } from '@rneui/themed';

export default Cancellation = (props) => {
    return (
        <View style={styles.container}>
            <CancellationHeader />
            <Text style={styles.text}>Reasons for cancellation</Text>
            <View style={{marginTop: 10}} />
            <CancellationList />
            <View style={{marginTop: 20}} />
            <Text style={styles.text}>If you have another reason, please type in the box below:</Text>
            <View style={{marginTop: 10}} />
            <TextInput style={styles.input} placeholder = "Type another reason here" placeholderTextColor = {COLORS.gray} keyboardType = "default"/>
        </View>
    )
}

export const CancellationHeader = () => {
    const navigation = useNavigation();
    return (
        <Header containerStyle={{ marginHorizontal: 20, marginTop: 50, marginBottom: 20 }} title={"CANCEL ORDER"}
            leftComponent={
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Splash") }}>
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
        onPress = {() => setCheck(!check)}
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: SIZES.h3,

    },
    text: {
        fontSize: SIZES.h3
    }
})