import React, { useState, useRef } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native"
import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';



export const OTPCodeVerification = ({ navigation, route }) => {
    const [remember, setRemember] = useState(false);
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    //phone number
    const phoneNumber = route.params.test;

    var [textNum, setTextNum] = React.useState(1);
    //Refferences to 4 textInputs for OTP code
    const ref_input1 = React.useRef();
    const ref_input2 = React.useRef();
    const ref_input3 = React.useRef();
    const ref_input4 = React.useRef();

    //Values of the  4 OTP input textBoxes
    var [inputVal1, setInputVal1] = React.useState("");
    var [inputVal2, setInputVal2] = React.useState("");
    var [inputVal3, setInputVal3] = React.useState("");
    var [inputVal4, setInputVal4] = React.useState("");


    //Concatination of all teh 4 input textBoxes
    var [OTP_CODE, setOTP_CODE] = React.useState("312352");
    React.useEffect(() => {
        console.log(OTP_CODE)
        console.log(phoneNumber)
    }, [OTP_CODE]);

    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

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

    async function confirmCode() {
        const confirmation = auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        try {
          await confirm.confirm(OTP_CODE);
        } catch (error) {
          console.log('Invalid code.');
        }
      }

    const styles = StyleSheet.create({
        input: {
            position: "relative",
            left: 0,
            width: 60,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 20,
            marginVertical: 10,
            textAlign: "center",
            borderWidth: 1,
            fontSize: 25,
            backgroundColor: COLORS.lightGray2,
            borderColor: COLORS.lightGray2,
            padding: 10,
        },
        selectedInput: {
            fontSize: 25,
            position: "relative",
            left: 0,
            height: 60,
            width: 60,
            textAlign: "center",
            marginHorizontal: 20,
            borderRadius: 20,
            marginVertical: 10,
            borderWidth: 1,
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
            justifyContent: "space-evenly",
            marginVertical: 50,
            flex: 1,
        },
    });


    return (
        <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
                        marginBottom: 31,
                        marginVertical: 30,
                        borderRadius: 900
                    }}
                />
                <View
                    style={styles.inputVeiwStyle}

                >

                    <TextInput

                        maxLength={1}
                        inputMode="decimal"
                        blurOnSubmit={false}
                        caretHidden={true}
                        autoFocus={true}
                        ref={ref_input1}
                        cursorColor={COLORS.green}
                        value={inputVal1}


                        onFocus={() => {
                            switch (textNum) {
                                case 1:
                                    ref_input1.current.focus()
                                    break;
                                case 2:
                                    ref_input2.current.focus()
                                    break;
                                case 3:
                                    ref_input3.current.focus()
                                    break;
                                case 4:
                                    ref_input4.current.focus()
                                    break;
                                default:
                                    ref_input1.current.focus();
                                    break;
                            }
                        }}


                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}

                        onKeyPress={(event) => {
                            if (event.nativeEvent.key == "Backspace") {
                                if (inputVal1 != "") {
                                    setInputVal1("")
                                } else setOTP_CODE(OTP_CODE.slice(0, -1))

                            } else {
                                setOTP_CODE(OTP_CODE + event.nativeEvent.key)
                                setInputVal1(event.nativeEvent.key)
                                setTextNum(textNum + 1)

                                if ((event.nativeEvent.key != "Backspace"))
                                    ref_input2.current.focus()
                            }
                        }}

                        style={textNum == 1 && isKeyboardVisible ? styles.selectedInput : styles.input}
                    />

                    <TextInput
                        maxLength={1}
                        inputMode="decimal"
                        blurOnSubmit={false}
                        caretHidden={true}
                        cursorColor={COLORS.green}
                        ref={ref_input2}
                        value={inputVal2}

                        onFocus={() => {

                            switch (textNum) {
                                case 1:
                                    ref_input1.current.focus()
                                    break;
                                case 2:
                                    ref_input2.current.focus()
                                    break;
                                case 3:
                                    ref_input3.current.focus()
                                    break;
                                case 4:
                                    ref_input4.current.focus()
                                    break;
                                default:
                                    ref_input1.current.focus();
                                    break;
                            }
                        }}

                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}


                        onKeyPress={(event) => {
                            if (event.nativeEvent.key == "Backspace") {
                                if (inputVal2 == "") {
                                    ref_input1.current.focus()
                                    setTextNum(textNum - 1)
                                    setOTP_CODE(OTP_CODE.slice(0, -1))
                                    setInputVal1("")
                                } else setInputVal2("")

                            } else {
                                setInputVal2(event.nativeEvent.key)
                                setOTP_CODE(OTP_CODE + event.nativeEvent.key)
                                setTextNum(textNum + 1)
                                ref_input3.current.focus()
                            }
                        }}

                        style={textNum == 2 && isKeyboardVisible ? styles.selectedInput : styles.input}
                    />

                    <TextInput
                        maxLength={1}
                        inputMode="decimal"
                        blurOnSubmit={false}
                        caretHidden={true}
                        cursorColor={COLORS.green}
                        ref={ref_input3}
                        value={inputVal3}

                        onFocus={() => {
                            switch (textNum) {
                                case 1:
                                    ref_input1.current.focus()
                                    break;
                                case 2:
                                    ref_input2.current.focus()
                                    break;
                                case 3:
                                    ref_input3.current.focus()
                                    break;
                                case 4:
                                    ref_input4.current.focus()
                                    break;
                                default:
                                    ref_input1.current.focus();
                                    break;
                            }
                        }}

                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}

                        onKeyPress={(event) => {
                            if (event.nativeEvent.key == "Backspace") {
                                if (inputVal3 == "") {
                                    ref_input2.current.focus()
                                    setTextNum(textNum - 1)
                                    setOTP_CODE(OTP_CODE.slice(0, -1))
                                    setInputVal2("")
                                } else setInputVal3("")
                            } else {
                                setInputVal3(event.nativeEvent.key)
                                setOTP_CODE(OTP_CODE + event.nativeEvent.key)
                                setTextNum(textNum + 1)
                                ref_input4.current.focus()
                            }

                        }}

                        style={textNum == 3 && isKeyboardVisible ? styles.selectedInput : styles.input}
                    />

                    <TextInput
                        maxLength={1}
                        inputMode="decimal"
                        cursorColor={COLORS.green}
                        caretHidden={true}
                        blurOnSubmit={false}
                        ref={ref_input4}
                        value={inputVal4}


                        onFocus={() => {
                            switch (textNum) {
                                case 1:
                                    ref_input1.current.focus()
                                    break;
                                case 2:
                                    ref_input2.current.focus()
                                    break;
                                case 3:
                                    ref_input3.current.focus()
                                    break;
                                case 4:
                                    ref_input4.current.focus()
                                    break;
                                default:
                                    ref_input1.current.focus();
                                    break;
                            }
                        }}

                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}

                        onKeyPress={(event) => {
                            if (event.nativeEvent.key == "Backspace") {
                                if (inputVal4 == "") {
                                    ref_input3.current.focus()
                                    setTextNum(textNum - 1)
                                    setInputVal3("")
                                } else setInputVal4("")
                                setOTP_CODE(OTP_CODE.slice(0, -1))
                            } else {
                                setInputVal4(event.nativeEvent.key)
                                setOTP_CODE(OTP_CODE + event.nativeEvent.key)
                                ref_input4.current.blur()
                            }
                        }}

                        style={textNum == 4 && isKeyboardVisible ? styles.selectedInput : styles.input}
                    />
                </View>


                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",

                    }}
                >
                    <Text style={{
                        fontWeight: "bold",
                        marginBottom: 220,
                        ...FONTS.h3
                    }} >Resend code in <Text
                        style={{ fontWeight: "bold", ...FONTS.h3, color: COLORS.green }}
                    >
                            {60}
                        </Text> s
                    </Text>

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

