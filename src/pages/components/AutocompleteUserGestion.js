import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../services/.config';

export default function AutocompletarUserGestion(props) {
  const token = JSON.parse(localStorage.getItem('token'));
  const [listaUsuarios, setListaUsuarios] = useState([]);
    
  useEffect(() => {
      async function getListaUser() {
      await axios.get(`${BASE_URL}users/all/gestion/autocomplete`, {
          headers: {
              Authorization: `Bearer ${token.token}`
          }
      })
          .then(res => {
             
              setListaUsuarios(
                  res.data.usuarios.map(usuarios => {
                      return {
                          label: usuarios.nombre + " " + usuarios.apellido,
                          value: usuarios.nombre,
                          id: usuarios._id
                      }
                  })
              )
          })
          .catch(err => {
              console.log(err);
          });
      }
      getListaUser();
  }, [token.token]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={listaUsuarios}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Seleccione un usuarios" size="small"
        onChange={(event) => {
          // props.onChange(event.target.value);
          console.log(event.target.value);
        }}
      />}

      onChange={(e, value) => {
        if (value) {
          props.handleUsuarioGestion(value.id);
      }
      }}
    />
  );
}