// npm i axios
// install axios library and import
import axios from "axios";

// create a call back function
// function definition commonrequest
export const commonRequest = async (method, url, body) => {

    // request configuration
    let reqConfig = {
        url,
        method,
        data: body,
        headers: {
            // normal string,number format data
            "content-type": "application/json"
                           // multipart form data----eg:any uploading files
        }
    }

    // api call using axios library
    // return or save in variable
    return await axios(reqConfig).then((response) => {
        return response
    }).catch((error) => {
        return error
    })

}

