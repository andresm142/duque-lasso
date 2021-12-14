import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompleteSearch(props) {
    return (

        <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={lista.map((option) => option.title)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Buscar..."
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                    size="small"
                    onChange={(event) => {
                        // props.onChange(event.target.value);
                        console.log(event.target.value);
                    }}
                />
            )}

            onChange={(e, value) => {
                // props.onChange(value);
                console.log(value)
            }}
        />

    );
}

//   Lista de cultivos o predios

const lista = [
    {
        title: 'Cultivo 1',
        subtitle: 'Cultivo 1',
        img: 'https://source.unsplash.com/random',
    },
    {
        title: 'Cultivo 2',
        subtitle: 'Cultivo 2',
        img: 'https://source.unsplash.com/random',
    },
    {
        title: 'Cultivo 3',
        subtitle: 'Cultivo 3',
        img: 'https://source.unsplash.com/random',
    }
];
