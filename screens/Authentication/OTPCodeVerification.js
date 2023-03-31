// import React from "react";
// import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native"
// import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"
// import { Button, Icon, Input } from '@rneui/themed';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { color } from "react-native-reanimated";


// export const OTPCodeVerification = ({ navigation }) => {
//     const [remember, setRemember] = React.useState(false);   
//     var textboxNum = 1;

//     const styles = StyleSheet.create({
//         input: {
//             position: "relative",
//             left: 0,
//             width: 60,
//             marginHorizontal: 20,
//             height: 60,
//             borderRadius: 20,
//             marginVertical: 10,
//             textAlign: "center",
//             borderWidth: 1,
//             fontSize: 25,
//             backgroundColor: COLORS.lightGray2,
//             borderColor: COLORS.lightGray2,
//             padding: 10,
//         },
//         selectedInput: {
//             fontSize: 25,
//             position: "relative",
//             left: 0,
//             height: 60,
//             width: 60,
//             textAlign: "center",
//             marginHorizontal: 20,
//             borderRadius: 20,
//             marginVertical: 10,
//             borderWidth: 1,
//             backgroundColor: COLORS.lightGreen2,
//             borderColor: COLORS.green,
//             padding: 10
//         },

//         inputProfileIcon: {
//             position: "relative",
//             left: 40,
//             zIndex: 30,
//             height: 20,
//             width: 20,
//             tintColor: COLORS.black
//         },

//         inputProfileIconSelected: {
//             position: "relative",
//             left: 40,
//             zIndex: 30,
//             height: 20,
//             width: 20,
//             tintColor: COLORS.green
//         },

//         inputVeiwStyle: {
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-evenly",
//             marginVertical: 50,
//             flex: 1,
//         },
//     });


//     return (
//         <KeyboardAwareScrollView
//             showsHorizontalScrollIndicator={false}
//             showsVerticalScrollIndicator={false}
//         >
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 30, backgroundColor: "white" }}>
//                 <TouchableOpacity onPress={() => { navigation.goBack() }}
//                     style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: SIZES.radius,
//                         backgroundColor: 'transparent',
//                         position: "absolute",
//                         left: 30,
//                         top: 60
//                     }}
//                 >
//                     <Image
//                         source={icons.arrow_back}
//                         style={{
//                             width: "100%",
//                             height: "100%"
//                         }}
//                     ></Image>
//                 </TouchableOpacity>

//                 <Text style={{
//                     position: "relative",
//                     left: 20,
//                     top: 20,
//                     marginVertical: 10,
//                     fontSize: 30,
//                     fontWeight: "bold",


//                 }}>OTP Code Verification </Text>


//                 <Image
//                     source={{ uri: 'https://cdn1.vectorstock.com/i/1000x1000/35/05/verified-emblem-flat-icon-shield-with-check-mark-vector-25913505.jpg' }}
//                     style={{
//                         width: 80,
//                         height: 80,
//                         marginBottom: 31,
//                         marginVertical: 30,
//                         borderRadius: 900
//                     }}
//                 />
//                 <View
//                     style={styles.inputVeiwStyle}
//                 >

//                     <TextInput
//                         maxLength={1}
//                         inputMode="decimal"

//                         onChangeText={() => {
//                             textboxNum = textboxNum + 1
//                             console.log(textboxNum)
//                         }}
//                         editable={textboxNum == 1 ? true : false}
//                         style={textboxNum == 1 ? styles.selectedInput : styles.input}
//                     />

//                     <TextInput
//                         maxLength={1}
//                         inputMode="decimal"
//                         onTouchStart={() => {

//                         }}

//                         onEndEditing={() => {
//                             textboxNum++
//                         }}
//                         editable={textboxNum == 2 ? true : false}
//                         style={textboxNum == 2 ? styles.selectedInput : styles.input}
//                     />

//                     <TextInput
//                         maxLength={1}
//                         inputMode="decimal"
//                         onTouchStart={() => {
//                         }}

//                         onEndEditing={() => {
//                             textboxNum++
//                         }}
//                         style={textboxNum == 3 ? styles.selectedInput : styles.input}
//                     />

//                     <TextInput
//                         maxLength={1}
//                         inputMode="decimal"
//                         onTouchStart={() => {
//                         }}

//                         onEndEditing={() => {
//                             textboxNum++
//                         }}
//                         style={textboxNum == 4 ? styles.selectedInput : styles.input}
//                     />
//                 </View>


//                 <View
//                     style={{
//                         flexDirection: "row",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         width: "100%",
                        
//                     }}
//                 >
//                    <Text style={{
//                      fontWeight: "bold", 
//                      marginBottom: 220,
//                      ...FONTS.h3 
//                     }} >Resend code in <Text
//                         style={{ fontWeight: "bold", ...FONTS.h3, color: COLORS.green}}
//                         >
//                             {60}
//                         </Text> s
//                     </Text>

//                 </View>


//                 <Button
//                     onPress={() => {
//                         console.log("Verify")
//                     }}
//                     title="Verify"
//                     titleStyle={{ fontWeight: '700' }}
//                     buttonStyle={{
//                         backgroundColor: COLORS.green,
//                         borderColor: 'transparent',
//                         borderWidth: 0,
//                         borderRadius: 30,
//                         height: 60,
//                     }}
//                     containerStyle={{
//                         width: "100%",
//                         marginHorizontal: 50,
//                         marginVertical: 50,
//                     }}
//                 />

//             </View >
//         </KeyboardAwareScrollView>
//     )
// }

