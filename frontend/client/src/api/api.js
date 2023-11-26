import { getToken } from "../helpers/localStorage";

export async function postCredentials(bodyData) {
        return await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: bodyData,
        });
}

export async function getUserProfile() {

    try {
      const response = await fetch( 'http://localhost:3001/api/v1/user/profile', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
      });
      if (!response.ok){
        if(response.status === 404){
          throw new Error(`Backend responded with ${response.status} error: ${response.statusText}`)
        }
        if(response.status === 500){
          throw new Error(`Backend responded with ${response.status} error: Server error`)
        }
        if(response.status === 401){
          throw new Error(`Backend responded with ${response.status} error:\nUnauthorized!\nToken is not valid or has expired.\n\nPlease login again!`)
        }
        throw new Error(`Backend responded with ${response.status} error: ${await response.text()}`);
      }
      const contentType = response.headers.get("content-type")
      if(!contentType || !contentType.includes("application/json")){
        throw new TypeError("Did not received Json!")
      }
      if(response.ok){
        const responseJson =  await response.json()
        return responseJson
        }
    } catch (error) {
      return error
    }
  }

export async function putUserInfo(userName) {
  try {
    const response = await fetch( 'http://localhost:3001/api/v1/user/profile', {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${getToken()}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({userName})
    });
    if (!response.ok){
      if(response.status === 404){
        throw new Error(`Backend responded with ${response.status} error: ${response.statusText}`)
      }
      if(response.status === 500){
        throw new Error(`Backend responded with ${response.status} error: Server error`)
      }
      if(response.status === 401){
        throw new Error(`Backend responded with ${response.status} error:\nUnauthorized!\nToken is not valid or has expired.\n\nPlease login again!`)
      }
      throw new Error(`Backend responded with ${response.status} error: ${await response.text()}`);
    }
    const contentType = response.headers.get("content-type")
    if(!contentType || !contentType.includes("application/json")){
      throw new TypeError("Did not received Json!")
    }
    if(response.ok){
      const responseJson =  await response.json()
      return responseJson
      }
  } catch (error) {
    return error
  }
}

export async function postNewUser(bodyData){
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/signup', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: bodyData,
      });
      if (!response.ok) throw new Error(`Backend responded with ${response.status} error: ${await response.text()}`);
      const contentType = response.headers.get("content-type")
      if(!contentType || !contentType.includes("application/json")){
        throw new TypeError("Did not received Json!")
      }
      if(response.ok){
        const responseJson =  await response.json()
        return responseJson
      }
  } catch (error) {
    return error.message
  }
}