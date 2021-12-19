import axios from "axios";
import { Fragment, useEffect, useState } from 'react';
import BASE_URL from "../services/.config";

export default async function Permisos(props) {

    const token = JSON.parse(localStorage.getItem('token'));
    const datos = {
        pagina: props
    }

    axios.post(BASE_URL + 'permisos/', datos, {

        headers: {
            Authorization: `Bearer ${token.token}`
        },

    })
        .then(res => {
            // console.log(res);
         
        })
        .catch(err => {
            if (err.response) {
                
                console.log(err.response.data.message);
                if (err.response.status === 401) {
  
                    window.location.href = "/accessDenied";

                }

            } else {
                // setPermitir(false);
                // setMenssage("Error, contacte con el administrador");
                alert("Error, contacte con el administrador");
            }
        });

    return (
        true
    );
}

