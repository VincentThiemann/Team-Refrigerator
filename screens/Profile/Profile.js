

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native"
import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"
import { Button, Icon, Input } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
const user = auth()?.currentUser.uid;

const Profile = ({ navigation }) => {
    const [name, setName] = React.useState("");
    if (user == null)
        return null;

    const [image, setImage] = useState(null);


    const [remember, setRemember] = React.useState(false);
    const [editting1, setEditting1] = React.useState(false);
    const [editting2, setEditting2] = React.useState(false);
    const [editting3, setEditting3] = React.useState(false);
    const [editting4, setEditting4] = React.useState(false);
    const [editting5, setEditting5] = React.useState(false);
    const [editting6, setEditting6] = React.useState(false);
    const [editting7, setEditting7] = React.useState(false);
    const [pressed1, setPressed1] = React.useState(false);
    const [pressed2, setPressed2] = React.useState(false);
    const [pressed3, setPressed3] = React.useState(false);
    const [pressed4, setPressed4] = React.useState(false);
    const [pressed5, setPressed5] = React.useState(false);
    const [pressed6, setPressed6] = React.useState(false);
    const [pressed7, setPressed7] = React.useState(false);
    const [profilePicture, setProfilePicture] = useState('https://wilcity.com/wp-content/uploads/2020/06/115-1150152_default-profile-picture-avatar-png-green.jpg');

    //Change the defualts to data in the firebase
    const [profileName, setProfileName] = useState('default');
    const [userName, setUserName] = useState('default');
    const [birthday, setBirthday] = useState('default');
    const [gender, setGender] = useState('default');
    const [email, setEmail] = useState('default');
    const [phoneNumber, setPhoneNumber] = useState('default');
    const [country, setCountry] = useState('default');
    const [selectedValue, setSelectedValue] = useState("java");
    return (
        <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 30, backgroundColor: "white" }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: SIZES.radius,
                        backgroundColor: 'transparent',
                        position: "absolute",
                        left: 30,
                        top: 60
                    }}
                >
                    <Image
                        source={icons.arrow_back}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    >

                    </Image>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    marginVertical: 25

                }}>Your Profile</Text>

                <TouchableOpacity
                    onPress={pickImage}
                >
                    <Image
                        source={{ uri: profilePicture }}
                        style={{
                            width: 200,
                            height: 200,
                            marginVertical: 40,
                            borderRadius: 900
                        }}

                    />

                </TouchableOpacity>

                <View
                    style={styles.inputVeiwStyle}
                >
                    <TextInput
                        value={profileName}
                        inputMode="text"
                        onTouchStart={() => {
                            setEditting1(true)
                            setEditting2(false)
                            setEditting3(false)
                            setEditting4(false)
                            setEditting5(false)
                            setEditting6(false)
                            setEditting7(false)
                        }}
                        onChangeText={text => setProfileName(text)}
                        onEndEditing={() => {
                            setEditting1(false)
                        }}

                        id="profileName"
                        style={editting1 ? styles.selectedInput : styles.input}
                    />
                </View>

                <View
                    style={styles.inputVeiwStyle}
                >
                    <TextInput
                        value={userName}
                        inputMode="text"
                        onTouchStart={() => {
                            setEditting1(false)
                            setEditting2(true)
                            setEditting3(false)
                            setEditting4(false)
                            setEditting5(false)
                            setEditting6(false)
                            setEditting7(false)
                        }}
                        onChangeText={text => setUserName(text)}
                        onEndEditing={() => {
                            setEditting2(false)
                        }}

                        id="userName"
                        style={editting2 ? styles.selectedInput : styles.input}
                    />
                </View>

                <View
                    style={styles.inputVeiwStyle}
                >
                    <TextInput
                        value={birthday}
                        inputMode="date"
                        onTouchStart={() => {
                            setEditting1(false)
                            setEditting2(false)
                            setEditting3(true)
                            setEditting4(false)
                            setEditting5(false)
                            setEditting6(false)
                            setEditting7(false)
                        }}
                        onChangeText={text => setBirthday(text)}
                        onEndEditing={() => {
                            setEditting3(false)
                        }}

                        id="birthday"
                        style={editting3 ? styles.selectedInput : styles.input}
                    />
                </View>

                <Button
                    onPress={() => { console.log("UPDATE"); }}
                    title="Update"
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        backgroundColor: COLORS.green,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                        height: 60,
                    }}
                    containerStyle={{
                        width: "100%",
                        marginHorizontal: 50,
                        marginVertical: 20,
                        marginTop: 40,
                    }}
                />
            </View >
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        position: "relative",
        left: 0,
        height: 60,
        width: "100%",
        borderRadius: 20,
        marginVertical: 10,
        borderWidth: 1,
        backgroundColor: COLORS.lightGray2,
        borderColor: COLORS.lightGray2,
        padding: 10,
        paddingLeft: 25
    },
    selectedInput: {
        position: "relative",
        left: 0,
        height: 60,
        width: "100%",
        borderRadius: 20,
        marginVertical: 10,
        borderWidth: 1,
        backgroundColor: COLORS.lightGreen2,
        borderColor: COLORS.green,
        padding: 10,
        paddingLeft: 25
    },

    inputProfileIcon: {
        position: "relative",
        left: "470%",
        zIndex: 30,
        height: 20,
        width: 20,
        tintColor: COLORS.black
    },

    inputProfileIconSelected: {
        position: "relative",
        left: "470%",
        zIndex: 30,
        height: 20,
        width: 20,
        tintColor: COLORS.green
    },

    inputVeiwStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
export default Profile;