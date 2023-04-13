import React from 'react';

export const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <InputData keyboardType = "default" type = "First name:" placeholder = "Type first name here" />
            <InputData keyboardType = "default" type = "Last name:" placeholder = "Type last name here" />
            <InputData keyboardType = "default" type = "Username:" placeholder = "Type username here" />
            <InputData keyboardType = "email-address" type = "Email:" placeholder = "Type email here" />
            <InputData keyboardType = "phone-pad" type = "Phone number:" placeholder = "Type phone number here" />
            <InputData keyboardType = "default" type = "Password:" placeholder = "Type password here" secureTextEntry = {true}/>
        </View>
    )
}
export const InputData = (props) => {
    return (
        <View style={styles.container}>
            <Text>{props.type}</Text>
            <TextInput style = {styles.input} placeholder = {props.placeholder} keyboardType = {props.dataType}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderRadius: 12,
        backgroundColor: COLORS.green,
        padding: 15
    }
})