import { readJson } from '$lib/server/jsonhandler.js'

export async function load() {
    const data = await readJson()
    return {
        ...data
    }
}