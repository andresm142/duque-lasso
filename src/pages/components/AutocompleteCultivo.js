import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompletarCultivos() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={listaCultivos}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Seleccione un cultivo" size="small"
        onChange={(event) => {
          // props.onChange(event.target.value);
          console.log(event.target.value);
        }}
      />}

      onChange={(e, value) => {
        // props.onChange(value);
        console.log(value)
      }}
    />
  );
}

// Lista de Cultivos
const listaCultivos = [
  {
    label: 'Cultivo 1'
  },
  {
    label: 'Cultivo 2'
  },
  {
    label: 'Cultivo 3'
  },
];

