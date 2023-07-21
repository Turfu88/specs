import Cookies from 'js-cookie'
import { getUserId } from './user'

export default async function request(url: string, method = "POST", values: any, includeCookie = false) {
    let myHeaders = new Headers()
    if (method === "PATCH") {
        myHeaders.append("Content-Type", "application/merge-patch+json")
    } else {
        myHeaders.append("Content-type", "application/json")
    }

    const userId = getUserId();
    if (null !== userId) {
        myHeaders.append("userid", userId.toString())
    }
    
    if (includeCookie === true) {
        myHeaders.append("Authorization", 'Bearer ' + Cookies.get('token'))
    }
    let requestOptions
    if (null !== values) {
        requestOptions = {
            method: method,
            headers: myHeaders,
            body: ''
        }
        // const raw = JSON.stringify(values);
        requestOptions.body = JSON.stringify(values); // raw
    } else {
        requestOptions = {
            method: method,
            headers: myHeaders,
        }
    }

    let status, json
    json = await fetch(url, requestOptions)
        .then(response =>{
            status = response.status;
            return response.text();
        })
        .then(result => {
            if (result) return JSON.parse(result);
            return
        })
        .catch(result => 
            console.error(result)
        );

    return {status, json};
}
