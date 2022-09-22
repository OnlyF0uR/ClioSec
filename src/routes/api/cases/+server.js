import { json } from '@sveltejs/kit';

export function GET({ url }) {
    const data = [
        { id: 0, name: "Sample data", },
        { id: 1, name: "Sample data 2", }
    ];
    return new Response(JSON.stringify(data))
}