import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';



const CustomInput = (value, setValue, placeholder) => {

constructor(props); {
    super(props);
    this.state = {value: ''};
}


  return (
    <View style={styles.container}>
      <TextInput
      value={value}
      onChangeText={(setValue) => this.setState(value , setValue)}
      placeholder={placeholder}
      style={styles.input}
      />
    </View>
  )
  }

  const styles = StyleSheet.create({

    container: {backgroundColor: 'white',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 15,
    },

    input: {},

  });

  export default CustomInput;