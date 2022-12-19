import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';

export interface InputProps extends TextInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  containerStyle?: StyleProp<ViewStyle>;
  errorMsg?: string;
}
const MaterialTextField = ({
  errorMsg,
  containerStyle,
  value,
  onChangeText,
  ...rest
}: InputProps) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        {...rest}
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
      />
    </View>
  );
};

export default MaterialTextField;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    height: 70,
  },

  textInput: {
    fontSize: 16,
    alignSelf: 'center',
    height: '90%',
    width: '99%',
  },
});
