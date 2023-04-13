import Cookies from 'js-cookie'
import { getAccountId } from './account'

export default async function request(url: string, method = "POST", values: any, includeCookie = false) {
    let myHeaders = new Headers()
    if (method === "PATCH") {
        myHeaders.append("Content-Type", "application/merge-patch+json")
    } else {
        myHeaders.append("Content-type", "application/json")
    }

    const accountId = getAccountId();
    if (null !== accountId) {
        myHeaders.append("accountid", accountId.toString())
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
            // console.log('response : ', response)
            status = response.status;
            return response.text();
        })
        .then(result => {
            // console.log("result : ", result)
            if (result) return JSON.parse(result);
            return
        })
        .catch(result => 
            console.log(result)
        );

    return {status, json};
}
