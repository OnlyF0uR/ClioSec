const data = [
    {
        id: "9f0207d4-7ca9-4d1b-8948-239d56089071",
        name: "John Doe",
        relation: "Unsub",
        age: 32,
        sex: 0,
        highlight: true,
        aliases: [
            "Abc",
            "wow"
        ]
    },
    {
        id: "d698bc35-7d5b-4054-bbe0-f856275e6c39",
        relation: "Wife",
        name: "Jane Doe",
        age: 33,
        sex: 1,
    },
    {
        id: "54b1aca7-62ea-45e7-838b-f2d94e3d1d35",
        name: "Placeholder",
        relation: "Bastard Child",
        age: 15,
        sex: 0,
    },
    {
        id: "cf3b6e68-bdd4-4eaf-ab44-24ae23f16afb",
        relation: "Child",
        name: "Placeholder",
        age: 12,
        // sex: 1,
    },
    {
        id: "77e9cbe9-fd07-4c18-bfb2-163946da2f7e",
        relation: "Sibling",
        name: "Placeholder",
        // age: 28,
        sex: 0,
    }
];

export function GET() {
    return new Response(JSON.stringify(data))
};