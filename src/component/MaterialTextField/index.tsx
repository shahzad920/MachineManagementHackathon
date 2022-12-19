import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle, Alert} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';

export interface InputProps extends TextInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  containerStyle?: StyleProp<ViewStyle>;
  errorMsg?: string;
  rightIcon?: string;
  onPresss?: void;
  disabled?: boolean;
}
const MaterialTextField = ({
  errorMsg,
  containerStyle,
  value,
  onChangeText,
  rightIcon,
  onPress,
  disabled,
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
        onPressIn={() => (disabled ? onPress() : undefined)}
        // pointerEvents={'none'}
        // right={<TextInput.Icon icon={rightIcon} onPress={onPressIcon} />}
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
