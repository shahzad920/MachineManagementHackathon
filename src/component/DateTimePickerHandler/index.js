import React, {forwardRef, useImperativeHandle, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

const DateTimePickerHandler = forwardRef((props, ref) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useImperativeHandle(ref, () => ({
    showDatePicker,
    hideDatePicker,
  }));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();

    props.onConfirm(Moment(date).utc().format('MM/DD/YYYY'));
  };

  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      // isDarkModeEnabled={true}
      themeVariant="light"
      isDarkModeEnabled={false}
    />
  );
});

export default DateTimePickerHandler;
