import { API_URL } from "./constants.js"

export async function askStep1(data) {
    const response = await fetch(`${API_URL}/step1`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response
}