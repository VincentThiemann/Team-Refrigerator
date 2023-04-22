import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const Profile = ({ navigation }) => {
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState(0);

    const createProfile = () => {
        firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .set({
                name: name,
                age: age,
            })
            .then(() => {
                console.log('User added!');
                navigation.navigate("CustomDrawer")
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <TextInput
                onChangeText={setName}
                value={name}
                placeholder="NAME" />
            <TextInput
                onChangeText={setAge}
                value={age}
                placeholder="Age" />
            <Button title="Verify" onPress={() => createProfile()} />
        </View>
    )
}

export default Profile;

