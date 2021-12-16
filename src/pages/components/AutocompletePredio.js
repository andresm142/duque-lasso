import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompletarPredios(props) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listaPredios}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Seleccione un predio" size="small"
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
const listaPredios = [
    {
        label: 'Predio 1'
    },
    {
        label: 'Predio 2'
    },
    {
        label: 'Predio 3'
    },
];
