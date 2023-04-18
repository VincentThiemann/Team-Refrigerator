import React, { useState, useRef } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native"
import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';

export const OTPCodeVerification = ({ OTPInput, setCode, confirmCode }) => {


    const OTPInputRef = React.useRef();

    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    var [canResendCode, setCanResendCode] = React.useState(false);
    var resendTime = 15; //Time to resend OTP code
    const [time, setTime] = React.useState(resendTime);
    const timerRef = React.useRef(time);

    const confirm = route.params.confirm

    async function confirmCode() {
        try {
            await confirm.confirm(OTP_CODE);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    React.useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;

            if (timerRef.current <= 0) {
                setCanResendCode(true);
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);


    //Listerners for if keyboard is open or not
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );


        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const styles = StyleSheet.create({
        input: {
            position: "relative",
            left: 0,
            width: 50,
            marginHorizontal: 20,
            height: 50,
            borderRadius: 10,
            marginVertical: 10,
            textAlign: "center",
            borderWidth: 1,
            fontSize: 25,
            backgroundColor: COLORS.lightGray2,
            borderColor: COLORS.green,
            padding: 10,
        },
        selectedInput: {
            fontSize: 25,
            position: "relative",
            color: COLORS.green,
            left: 0,
            height: 50,
            width: 50,
            textAlign: "center",
            marginHorizontal: 20,
            borderRadius: 10,
            marginVertical: 10,
            borderWidth: 2,
            backgroundColor: COLORS.lightGreen2,
            borderColor: COLORS.green,
            padding: 10
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
            width: "100%",
            justifyContent: "space-evenly",
            marginTop: 40,
            marginBottom: 20,
            flex: 1,
        },
    });




    return (
        <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 30, backgroundColor: "white" }}>
                {/* <TouchableOpacity onPress={() => { navigation.goBack() }}
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
                </TouchableOpacity> */}

                <Text style={{
                    position: "relative",
                    left: 20,
                    top: 20,
                    marginVertical: 10,
                    fontSize: 30,
                    fontWeight: "bold",


                }}>OTP Code Verification </Text>


                <Image
                    source={{ uri: 'https://cdn1.vectorstock.com/i/1000x1000/35/05/verified-emblem-flat-icon-shield-with-check-mark-vector-25913505.jpg' }}
                    style={{
                        width: 80,
                        height: 80,
                        marginBottom: 38,
                        marginVertical: 30,
                        borderRadius: 900
                    }}
                />

                <Text style={{
                    fontWeight: "bold",
                    marginTop: 20,
                    ...FONTS.h3

                }}>Code has been sent to +1 111 ********99</Text>
                <View
                    style={styles.inputVeiwStyle}
                >

                    <Text
                        style={(OTPInput.length == 0 && isKeyboardVisible) ? styles.selectedInput : styles.input}
                        onPress={() => {
                            OTPInputRef.current.focus();
                        }}
                    >{OTPInput.substring(0, 1)}</Text>

                    <Text
                        style={(OTPInput.length == 1 && isKeyboardVisible) ? styles.selectedInput : styles.input}
                        onPress={() => {
                            OTPInputRef.current.focus();
                        }}
                    >{OTPInput.substring(1, 2)}</Text>

                    <Text
                        style={(OTPInput.length == 2 && isKeyboardVisible) ? styles.selectedInput : styles.input}
                        onPress={() => {
                            OTPInputRef.current.focus();

                        }}
                    >{OTPInput.substring(2, 3)}</Text>

                    <Text
                        style={(OTPInput.length == 3 && isKeyboardVisible) ? styles.selectedInput : styles.input}
                        onPress={() => {
                            OTPInputRef.current.focus();
                        }}
                    >{OTPInput.substring(3, 4)}</Text>

                    <Text
                        style={(OTPInput.length == 4 && isKeyboardVisible) ? styles.selectedInput : styles.input}
                        onPress={() => {
                            OTPInputRef.current.focus();
                        }}
                    >{OTPInput.substring(4, 5)}</Text>

                    <Text
                        style={((OTPInput.length == 5 || OTPInput.length == 6) && isKeyboardVisible) ? styles.selectedInput : styles.input}
                        onPress={() => {
                            OTPInputRef.current.focus();
                        }}
                    >{OTPInput.substring(5, 6)}</Text>


                </View>


                <TextInput
                    maxLength={6}
                    inputMode="decimal"
                    ref={OTPInputRef}
                    autoFocus={true}
                    value={OTPInput}

                    style={{
                        width: 1,
                        height: 1,
                        opacity: 0
                    }}

                    onKeyPress={(event) => {
                        if (event.nativeEvent.key == "Backspace" && OTPInput.length == 0)
                            OTPInputRef.current.blur();

                    }}

                    onChangeText={(Text) => {
                        setCode(Text);

                        if (Text.length == 6)
                            OTPInputRef.current.blur();

                    }}
                />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",

                    }}
                >
                    <TouchableOpacity
                        disabled={!canResendCode}

                        onPress={() => {
                            setCode('');

                            timerRef.current = resendTime;
                            setTime(timerRef.current);
                            setCanResendCode(false);

                            timerId = setInterval(() => {
                                timerRef.current -= 1;

                                if (timerRef.current <= 0) {
                                    setCanResendCode(true);
                                    clearInterval(timerId);
                                } else {
                                    setTime(timerRef.current);
                                }
                            }, 1000);
                            return () => {
                                clearInterval(timerId);
                            };

                            console.log("Resend OTP Code");
                        }}
                    >
                        <Text style={{
                            fontWeight: "bold",
                            marginBottom: 189,
                            ...FONTS.h3

                        }}>{canResendCode ? "" : "Resend code in "}<Text
                            style={{ fontWeight: "bold", ...FONTS.h3, color: COLORS.green }}
                        >
                                {canResendCode ? "Resend Code" : time}
                            </Text> {canResendCode ? "" : "s"}
                        </Text>
                    </TouchableOpacity>

                </View>


                <Button
                    onPress={() => confirmCode()}
                    title="Verify"
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
                        marginVertical: 50,
                    }}
                />

            </View >
        </KeyboardAwareScrollView>
    )
}

