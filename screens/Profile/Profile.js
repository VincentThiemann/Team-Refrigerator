
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native"
import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"
import { Button, Icon, Input } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const user = auth()?.currentUser?.uid;
var currentUserName,currentphoneNumber,currentProfileName;
 



const Profile = ({ navigation }) => {
 useEffect(()=>{
    const fetchData = async ()=>{
        currentUserName  =  await firestore().collection('Users').doc(user).get()?.userName;
        currentphoneNumber  =  await firestore().collection('Users').doc(user).get()?.profileName;
        currentProfileName  =  await firestore().collection('Users').doc(user).get()?.phoneNumber;
    }

    fetchData();
    
 }, []);
    
      
     const [profileName, setProfileName] = useState((currentProfileName === undefined)? "": currentProfileName);
     const [userName, setUserName] = useState((currentUserName === undefined)? "": currentUserName);
     const [phoneNumber, setPhoneNumber] = useState((currentphoneNumber === undefined)? "": currentphoneNumber);
    const createProfile = () => {
        firestore()
            .collection('Cart')
            .doc(user)
            .update({

            })
        firestore()
            .collection('Bookmark')
            .doc(user)
            .update({

            })

        firestore()
            .collection('Users')
            .doc(user)
            .set({
                phoneNumber: phoneNumber,
                userName: userName,
                profileName: profileName
            })
            .then(() => {
                console.log('User added!');
                navigation.navigate("CustomDrawer")
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    if (user == null)
        return null;



    const [remember, setRemember] = React.useState(false);
    const [editting1, setEditting1] = React.useState(false);
    const [editting2, setEditting2] = React.useState(false);
    const [editting3, setEditting3] = React.useState(false);
    const [pressed1, setPressed1] = React.useState(false);
    const [pressed2, setPressed2] = React.useState(false);
    const [pressed3, setPressed3] = React.useState(false);


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
                >
                    <Image
                        source={{ uri: 'https://wilcity.com/wp-content/uploads/2020/06/115-1150152_default-profile-picture-avatar-png-green.jpg' }}
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

                        }}
                        onChangeText={text => setProfileName(text)}
                        onEndEditing={() => {
                            setEditting1(false)
                        }}
                        placeholder='Profile Name'
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

                        }}
                        onChangeText={text => setUserName(text)}
                        onEndEditing={() => {
                            setEditting2(false)
                        }}
                        placeholder='Username'
                        id="userName"
                        style={editting2 ? styles.selectedInput : styles.input}
                    />
                </View>

                <View
                    style={styles.inputVeiwStyle}
                >
                    <TextInput
                        value={phoneNumber}
                        inputMode="tel"
                        onTouchStart={() => {
                            setEditting1(false)
                            setEditting2(false)
                            setEditting3(true)
                        }}
                        onChangeText={text => setPhoneNumber(text)}
                        onEndEditing={() => {
                            setEditting3(false)
                        }}
                        placeholder='+1 000 000 0000'
                        id="phoneNumber"
                        style={editting3 ? styles.selectedInput : styles.input}
                    />
                </View>

                <Button
                    onPress={() => {createProfile()}}
                    title="Set Profile"
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