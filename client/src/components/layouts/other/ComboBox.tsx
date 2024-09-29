import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ComboBoxProps {
  data: { label: string }[];
  placeholder: string;
  onChange: (value: string) => void; // Add onChange prop
}

const ComboBox: React.FC<ComboBoxProps> = ({ data, placeholder, onChange }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      onChange={(_, value) => onChange(value?.label || '')} // Call onChange with the selected value
      renderInput={(params) => <TextField {...params} label={placeholder} />}
    />
  );
}

export default ComboBox;
