import React, {useState} from 'react';
import {
    View,
    Text
} from 'react-native';
import CustomInput from '/Users/mufu/Documents/GitHub/Team-Refrigerator/components/CustomInput.js';

const EditProfile = () => {
    const [fullName, setFullName] = useState('');
    const [nickname, setNickname] = useState('');
    return (
        <View style = {{
        flex: 1, justifyContent: "center", alignItems: "center"
        }} >
            <Text>
        EditProfile
            </Text>

            <Text>

                sadd
            </Text>

            <CustomInput
            placeholder="Full Name"
            value={fullName}
            setValue={setFullName}
            />

            <CustomInput
            placeholder="Nickname"
            value={nickname}
            setValue={setNickname}
            />

            <CustomInput placeholder="Date of Birth"/>
            <CustomInput placeholder="Email"/>
        </View>
    )
}

export default EditProfile