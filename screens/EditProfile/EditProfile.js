import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomInput from '/Users/mufu/Documents/GitHub/Team-Refrigerator/components/CustomInput.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import {icons} from '../../constants'; 
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';



const EditProfile = () => {


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [text, setText] = useState("Date of Birth");

    const [gender, setGender] = useState("Gender");

    const [dateColor, setDateColor] = useState('#c7c7cd')

    const [genderColor, setGenderColor] = useState('#c7c7cd')
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setText(moment(date.toString()).format('M/D/YYYY'));
        setDateColor('black');
        hideDatePicker();
    };



    return (
        <View style = {{
        flex: 1, justifyContent: "center", alignItems: "center"
        }} >
            <Text>
        EditProfile
            </Text>

            <CustomInput placeholder='Full Name'/>

            <CustomInput placeholder='Nickname'/>

            <DateTimePicker
                isVisible={isDatePickerVisible}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                />
            
            {/* Date Picker */}
            <View style = {styles.container}>
                <TouchableOpacity onPress={showDatePicker} styles={styles.touch}>
                    <Text style = {{color: dateColor}}>{text}</Text>
                    <Image style = {{width: 40, height: 40, resizeMode: 'contain', padding: 10}} 
                source = {icons.calendar}/>
                </TouchableOpacity>
                
            </View>

            {/* Gender Picker */}
            <View style = {styles.container}>
                <Menu onSelect = {text => [setGender(text), setGenderColor('black')]}>
                    <MenuTrigger>
                        <Text style={{color: genderColor}}>{gender}</Text>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption value={'Male'} text='Male' />
                        <MenuOption value={'Female'} text='Female' />
                        <MenuOption value={'Transgender'} text='Transgender' />
                        <MenuOption value={'Non-binary/non-conforming'} text='Non-binary/non-conforming' />
                        <MenuOption value={'Prefer not to say'} text='Prefer not to say' />
                    </MenuOptions>
                </Menu>
                <Image style = {{width:30, height: 30, resizeMode: 'contain', marginLeft: 215, marginVertical: -6}}
                 source = {icons.black_down_arrow}/>
            </View>

            <CustomInput placeholder={'example@gmail.com'} />  
            <CustomInput placeholder={'Phone Number'} />  
            
            {/* Horizontal Line */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: '#F3F9F5'}} />
            </View>

            
                <TouchableOpacity
                style={styles.confirm}
                //onPress={() => this.submitSuggestion(this.props)}
                >
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight:'bold',
                    fontSize: 20,
                    paddingTop: 8,
                    }}>Update</Text>
                </TouchableOpacity>
            


        
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        width: '80%',
        height: '5%',
        borderRadius: 13,
        paddingHorizontal: 10,
        paddingVertical: 13,
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'left',
    },

    placeholderColor:{
        color: '#c7c7cd'
    },
    
    submit:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
    },

    confirm: {
        backgroundColor: '#19AC4B',
        width: '100%',
        height: '8%',
        borderRadius: 40,
        paddingHorizontal: 140,
        paddingVertical: 30,
        marginVertical: 15,
    },

    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginLeft: 175,
        marginVertical: -12
    },

    touch: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
    },


});

export default EditProfile