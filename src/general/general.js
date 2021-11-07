import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as jwt from 'jsonwebtoken';

import { ENCRYPTION_SECRET_KEY } from '../config/config';

toast.configure()

export const showMessage = {
    error(msg, traza = "", id = "") {
        let mensaje = traza !== "" && traza !== null ? msg + ", " + traza : msg
        toast.error(mensaje, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    },
    success(msg) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    },
    information(msg) {
        toast.info('💬 ' + msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const regularExpressions = {
    password: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    numbersOnly: /.*?(\d)[^\d]*/,
    noEmpty: /^[^]+$/
}

export const session = {
    setItem(key, data) {
        sessionStorage.setItem(key, data);
    },
    getItem(key) {
        return sessionStorage.getItem(key);
    },
    destroy() {
        sessionStorage.clear();
        window.location.href = "/";
    },
    token: {
        getItem(key) {
            let dato;
            jwt.verify(sessionStorage.getItem("token"), ENCRYPTION_SECRET_KEY, (err, decoded) => {
                if (err) {
                    dato = '';
                } else {
                    dato = decoded[key];
                }
            });
            return dato;
        }
    }
}

export const isNullOrEmptyOrFalse = (value) => {
    let flag = false;
    if (value === false || value === undefined || value === "" || value === null) {
        flag = true;
    }
    return flag;
}

export const encryptSha256 = async (message) => {
    const msgUint8 = new TextEncoder().encode(message);                           // codificar como (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash el mensaje
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convierte el búfer en una matriz de bytes
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convertir bytes a cadena hexadecimal
    return hashHex;
}

export const changeCursorStyle = (elementId = '', style) =>{
    if (style === "pointer") {
        document.getElementById('root').style.cursor = "default";
    }else{
        document.getElementById('root').style.cursor = style;
    }
    document.getElementById(elementId).style.cursor = style;
}