import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const Profile = () => {
    const user = auth().currentUser
    const createProfile = () => {
        firestore()
            .collection('Users')
            .doc("test")
            .set({
                name: 'Ada Lovelace',
                age: 30,
            })
            .then(() => {
                console.log('User added!');
            });
    }

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            {createProfile()}
        </View>
    )
}

export default Profile;

