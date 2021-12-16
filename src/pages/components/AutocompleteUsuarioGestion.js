import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompletarUsuarioGestion() {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={listaUsuarios}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Seleccione un usuario" size="small" />}
      />
    );
  }

// Lista de Cultivos
const listaUsuarios = [
    {
        label: 'Usuario 1'
    },
    {
        label: 'Usuario 2'
    },
    {
        label: 'Usuario 3'
    },
];
