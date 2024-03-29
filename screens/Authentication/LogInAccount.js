import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { OTPCodeVerification } from "./OTPCodeVerification";


export const LogInAccount = ({ navigation, signIn }) => {
    const [remember, setRemember] = React.useState(false);
    const [editting1, setEditting1] = React.useState(false);
    const [pressed1, setPressed1] = React.useState(false);
    const [pressed2, setPressed2] = React.useState(false);
    const [pressed3, setPressed3] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [result, setResult] = React.useState("");

    // If null, no SMS has been sent
    const [confirm, setConfirm] = React.useState();
    const [OTPInput, setOTPinput] = React.useState("");

    const setCode = (number) => {
        setOTPinput(number)
    }
    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    GoogleSignin.configure({
        webClientId: '675071634893-vtfk81icgitaf5rchkm1pdfaridehqn1.apps.googleusercontent.com',
    });

    async function confirmCode() {
        try {
            await confirm.confirm(OTPInput);
        } catch (error) {
            console.log('Invalid code', OTPInput);
        }
    }

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const user_sign_in = auth().signInWithCredential(googleCredential);
        user_sign_in
            .then((user) => {
                console.log("authenticated");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    function isPhoneNumberValid() {
        var pattern = /^\+[0-9\s\-\(\)]+$/;
        return phoneNumber.search(pattern) !== -1;
    }

    if (!confirm) {
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
                        ></Image>
                    </TouchableOpacity>

                    <Image
                        source={{ uri: 'https://millennialmoney.com/wp-content/uploads/2021/09/Free-Food-Apps.jpg' }}
                        style={{
                            width: 100,
                            height: 100,
                            marginTop: 80,
                            borderRadius: 900
                        }}
                    />


                    <Text style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        marginVertical: 50

                    }}>Login to Your Account </Text>

                    <View
                        style={styles.inputVeiwStyle}
                    >
                        <Image
                            style={editting1 ? styles.inputProfileIconSelected : styles.inputProfileIcon}
                            source={icons.phoneIcon}
                        />

                        <TextInput
                            inputMode="tel"
                            onTouchStart={() => {
                                setEditting1(true)
                            }}

                            onEndEditing={() => {
                                setEditting1(false)
                            }}
                            onChangeText={text => setPhoneNumber(text)}

                            id="phoneNumber"
                            style={editting1 ? styles.selectedInput : styles.input}
                            placeholder="+1 000 000 000 "
                        />
                    </View>


                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            marginVertical: 10
                        }}
                    >
                        <TouchableOpacity onPress={() => { setRemember(!remember) }}
                            style={{
                                width: 25,
                                height: 25,
                                borderColor: COLORS.green,
                                borderWidth: 3,
                                borderRadius: 6,
                                marginRight: 15,
                                backgroundColor: remember ? COLORS.green : 'transparent'

                            }}
                        >

                            <Image
                                source={icons.checkMarkIcon}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    tintColor: remember ? COLORS.white : 'transparent'
                                }}
                            />

                        </TouchableOpacity>
                        <Text style={{ fontWeight: "bold", ...FONTS.h3 }}>Remember me</Text>
                    </View>


                    <Button
                        onPress={() => {
                            signInWithPhoneNumber(phoneNumber)
                        }}

                        title="Sign in"
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
                            marginVertical: 10,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: SIZES.radius,
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            marginVertical: 30
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: COLORS.lightGray1,
                                height: 1,
                                width: "30%"
                            }}
                        >
                        </View>
                        <Text style={{
                            fontWeight: "bold",
                            width: "40%",
                            color: COLORS.gray,
                            textAlign: "center",
                            ...FONTS.h3
                        }}>or continue with</Text>
                        <View
                            style={{
                                backgroundColor: COLORS.lightGray1,
                                height: 1,
                                width: "30%"
                            }}
                        >

                        </View>
                    </View>

                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: 'center',
                        marginVertical: 20,
                        justifyContent: "space-evenly",
                        height: 60
                    }}>
                        <Button

                            loading={pressed1}
                            loadingProps={{
                                size: 'large',
                                color: COLORS.green,
                            }}

                            onPress={() => {
                                setPressed1(true)
                                setPressed2(false)
                                setPressed3(false)
                                onFacebookButtonPress()
                            }}

                            buttonStyle={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.lightGray1,
                                borderWidth: 1,
                                borderRadius: 15,
                                height: 60,
                            }}
                            containerStyle={{
                                width: 100,
                                borderRadius: 15,
                            }}
                        >
                            <Image
                                source={icons.facebookIcon}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </Button>

                        <Button
                            loading={pressed2}
                            loadingProps={{
                                size: 'large',
                                color: COLORS.green,
                            }}

                            onPress={() => {
                                setPressed1(false)
                                setPressed2(true)
                                setPressed3(false)
                                onGoogleButtonPress()
                            }}
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.lightGray1,
                                borderWidth: 1,
                                borderRadius: 15,
                                height: 60,
                            }}
                            containerStyle={{
                                width: 100,
                                borderRadius: 15,
                            }}
                        >
                            <Image
                                source={icons.googleIcon}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </Button>

                        {Platform.OS === 'ios' &&
                            <Button
                                loading={pressed3}
                                loadingProps={{
                                    size: 'large',
                                    color: COLORS.green,
                                }}


                                onPress={() => {
                                    setPressed1(false)
                                    setPressed2(false)
                                    setPressed3(true)
                                    console.log("Sign Up With Apple")
                                }}
                                buttonStyle={{
                                    backgroundColor: 'transparent',
                                    borderColor: COLORS.lightGray1,
                                    borderWidth: 1,
                                    borderRadius: 15,
                                    height: 60,
                                }}
                                containerStyle={{
                                    width: 100,
                                    borderRadius: 15,
                                }}
                            >
                                <Image
                                    source={icons.appleIcon}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </Button>
                        }
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Text style={{ color: COLORS.gray, fontSize: 17 }}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("CreateNewAccount")
                                console.log("Sign up")
                            }}
                        >
                            <Text style={{ color: COLORS.green, fontWeight: "bold", fontSize: 17 }}>  Sign up</Text>
                        </TouchableOpacity>

                    </View>
                </View >
            </KeyboardAwareScrollView>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <OTPCodeVerification OTPInput={OTPInput} setCode={setCode} confirmCode={confirmCode} />
        </View>
    );
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
        paddingLeft: 50
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
        paddingLeft: 50
    },

    inputProfileIcon: {
        position: "relative",
        left: 40,
        zIndex: 30,
        height: 20,
        width: 20,
        tintColor: COLORS.black
    },

    inputProfileIconSelected: {
        position: "relative",
        left: 40,
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