export function GET() {
    const data = { name: "Operation Placeholder", desc: "Hello world" };
    return new Response(JSON.stringify(data))
}