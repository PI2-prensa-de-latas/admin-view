import React from 'react'
import DateTimePicker from 'react-datetime-picker';

const DatePickerField = ({ name, value, onChange }) => {
    return (
        <DateTimePicker
            value={(value && new Date(value)) || null}
            onChange={val => {
                onChange(name, val);
            }}
        />
    );
};

export default DatePickerField;