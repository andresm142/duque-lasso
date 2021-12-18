import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../services/.config';

export default function AutocompletarCultivos(props) {
  const token = JSON.parse(localStorage.getItem('token'));
  const [listaCultivos, setListaCultivos] = useState([]);
    
  useEffect(() => {
      async function getListaCultios() {
      await axios.get(`${BASE_URL}cultivos/all/autocomplete`, {
          headers: {
              Authorization: `Bearer ${token.token}`
          }
      })
          .then(res => {
             
              setListaCultivos(
                  res.data.cultivos.map(cultivo => {
                      return {
                          label: cultivo.nombre,
                          value: cultivo.nombre,
                          id: cultivo._id
                      }
                  })
              )
          })
          .catch(err => {
              console.log(err);
          });
      }
      getListaCultios();
  }, [token.token]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={listaCultivos}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Seleccione un cultivo" size="small"
    
      />}

      onChange={(e, value) => {
        if (value) {
            props.handleCultivo(value.id);
        }


    }}
    />
  );
}

// Lista de Cultivos
// const listaCultivos = [
//   {
//     label: 'Cultivo 1'
//   },
//   {
//     label: 'Cultivo 2'
//   },
//   {
//     label: 'Cultivo 3'
//   },
// ];

