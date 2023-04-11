import React, {useState}  from 'react';
import {View, TextInput, StyleSheet} from 'react-native';



const CustomInput = ({placeholder}) => {
  const[val, setVal] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
      onChangeText={(text) => setVal(text)}
      placeholder={placeholder}
      style={styles.input}
      />
    </View>
  )
  }

  const styles = StyleSheet.create({

    container: {backgroundColor: 'white',
    width: '80%',
    height: '5%',
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 13,
    marginVertical: 15,
    },

    input: {},

  });

  export default CustomInput;