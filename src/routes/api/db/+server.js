import { readJson, updateJson } from '$lib/server/jsonhandler';

export async function GET() {
    try {
        const data = await readJson();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response('Failed to read JSON', { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const updates = await request.json(); // Expect an object with key-value pairs
        const result = await updateJson(updates);
        return new Response(result, { status: 200 });
    } catch (error) {
        return new Response('Failed to update JSON', { status: 500 });
    }
}
