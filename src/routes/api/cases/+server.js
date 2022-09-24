const data = [
    { id: 0, name: "Sample data", },
    { id: 1, name: "Sample data 2", }
];

export function GET() {
    return new Response(JSON.stringify(data))
};