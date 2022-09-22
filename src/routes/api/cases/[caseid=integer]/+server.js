import { json } from '@sveltejs/kit';

export function GET({ url }) {
    const data = { name: "Operation Placeholder", desc: "Hello world" };
    return new Response(JSON.stringify(data))
}