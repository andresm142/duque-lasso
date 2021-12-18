import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../services/.config';

export default function AutocompletarPrediosPropios(props) {
    
    const token = JSON.parse(localStorage.getItem('token'));
    const [listaPredios, setListaPredios] = useState([]);
    const idUsurio = JSON.parse(localStorage.getItem('datosUser')).id;

    // Obtener lista de predios asignados al usuario
    useEffect(() => {
        async function getListaPredios() {

            await axios.get(`${BASE_URL}predios/asignados/${idUsurio}`, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then(res => {

                    setListaPredios(
                        res.data.predios.map(predio => {
                            return {
                                label: predio.nombre,
                                value: predio.nombre,
                                id: predio._id
                            }
                        })
                    )
                })
                .catch(err => {
                    console.log(err);
                });

        }
        getListaPredios();
      
    }, [idUsurio, token.token]);

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listaPredios}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Seleccione un predio" size="small"

            />}
            onChange={(e, value) => {
                if (value) {
                    props.handlePredio(value.id);
                }


            }}
        />
    );
}

// Lista de Cultivos

// const listaPredios = [
//     {
//         label: 'Predio 1'
//     },
//     {
//         label: 'Predio 2'
//     },
//     {
//         label: 'Predio 3'
//     },
// ];

