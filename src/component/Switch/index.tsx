import React, {useState} from 'react';
import {View, Switch, Text} from 'react-native';
import {Metrics, Colors} from '../../theme';
import Block from '../Block';

function index(props) {
  const {label, onValueChange, value} = props;
  const [isEnabled, setIsEnabled] = useState(value);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (onValueChange) onValueChange(!isEnabled);
  };

  return (
    <Block row mVertical={Metrics.smallMargin}>
      <Switch
        trackColor={{false: '#767577', true: Colors.PRIMARY}}
        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text
        style={{
          marginLeft: Metrics.smallMargin,
          marginTop: Metrics.smallMargin,
        }}>
        {label}
      </Text>
    </Block>
  );
}

export default index;
