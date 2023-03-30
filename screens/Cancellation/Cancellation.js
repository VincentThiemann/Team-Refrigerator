import React from 'react';
import Header from '../../components/Header.js';
import { SIZES, COLORS, icons } from '../../constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    StyleSheet,
    ScrollView,
    Linking
} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default cancellationScreen = (props) => {
    return (
        <View style={styles.container}>
            <CancellationHeader />
            <CancellationList />
            <Text>Other reason</Text>
            <TextInput />
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
    return (
        <CheckBox title={props.title} checked={this.state.checked} />
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})