
export async function postCredentials(bodyData) {
        return await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: bodyData,
        });
}