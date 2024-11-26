import { API_URL } from "./constants.js"

export async function ask_ai_no_thread(data) {
    const response = await fetch(`${API_URL}/ask_ai_no_thread`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response
}
