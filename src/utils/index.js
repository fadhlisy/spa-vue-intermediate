import { saveAs } from 'file-saver';
import { URL_API } from '../constans';

export const kirimData = async (url, data) => {
    const respon = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(_ => _.ok ? _.json() : null)

    return respon
}

export const unduhKode = async (url, data) => {
    const respon = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(_ => _.ok ? _.blob() : null) // cek harus di return atau tidak
        .then(blob => blob ? saveAs(blob, `kode-${ new Date().getTime() }.png`) : null)

    return respon
}

export const dapatkanOpsi = async () => {
    return fetch(`${ URL_API }/options`)
        .then(_ => _.ok ? _.json() : null)
}

export const validator = (nilai) => {
    return typeof nilai === 'string' || nilai === null
}