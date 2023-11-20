

export async function postCredentials(bodyData) {
        return await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: bodyData,
        });
}

export async function getUserProfile() {

  const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch( 'http://localhost:3001/api/v1/user/profile', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
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
      throw new Error('Could not reach backend', {cause: error});
    }
  }

export async function putUserInfo(userName) {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch( 'http://localhost:3001/api/v1/user/profile', {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({userName})
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
    throw new Error('Could not reach backend', {cause: error});
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