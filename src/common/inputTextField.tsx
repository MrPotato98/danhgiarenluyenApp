import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {sizeFont} from '../helpers/size.helper';

export default React.memo(function InputTextField(props: any) {
  return (
    <View style={props.style}>
      <Text style={styles.inputTitle}>{props.title}</Text>
      <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}}>
        <TextInput
          placeholder={props.placeholderText}
          secureTextEntry={props.isSecure}
          style={styles.input}
          editable
          value={props.value}
          onChangeText={props.onChangeText}
        />
        {props.icon}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputTitle: {
    color: '#ABB4BD',
    fontSize: sizeFont(14),
  },
  input: {
    paddingVertical: 12,
    color: '#1D2029',
    fontSize: sizeFont(14),
    fontFamily: 'Avenir Next',
  },
});
