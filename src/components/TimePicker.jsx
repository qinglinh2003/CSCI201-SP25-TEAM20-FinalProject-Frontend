import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function CustomTimePicker({
     label = "Select Time",
     value,
     onChange,
     minTime,
     maxTime,
     ampm = false,
     disabled = false,
     size = "small",
     width=180,
 }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopTimePicker
                label={label}
                value={value}
                onChange={onChange}
                minTime={minTime}
                maxTime={maxTime}
                ampm={ampm}
                disabled={disabled}
                renderInput={(params) => <TextField {...params} size={size} sx={{ width:width }}/>}
            />
        </LocalizationProvider>
    );
}