const data = [
    {
        id: "9f0207d4-7ca9-4d1b-8948-239d56089071",
        name: "John Doe",
        age: 32,
        sex: 0,
        highlight: true,
        relations: [{
            type: "Wife",
            id: "d698bc35-7d5b-4054-bbe0-f856275e6c39"
        }, {
            type: "Accomplice",
            id: "9f08234-7ca9-32ds-2231-239o92689071"
        }, {
            type: "Son",
            id: "cf3b6e68-bdd4-4eaf-ab44-24ae23f16afb"
        }],
        aliases: [
            "The harsh"
        ]
    },
    {
        id: "9f08234-7ca9-32ds-2231-239o92689071",
        name: "Nohj Eod",
        age: 31,
        sex: 0,
        highlight: true,
        relations: [{
            type: "Accomplice",
            id: "9f0207d4-7ca9-4d1b-8948-239d56089071"
        }, {
            type: "Paramour",
            id: "d698bc35-7d5b-4054-bbe0-f856275e6c39"
        }, {
            type: "Bastard Son",
            id: "54b1aca7-62ea-45e7-838b-f2d94e3d1d35"   
        }],
    },
    {
        id: "d698bc35-7d5b-4054-bbe0-f856275e6c39",
        relations: [{
            type: "Husband",
            id: "9f0207d4-7ca9-4d1b-8948-239d56089071"
        }, {
            type: "Son",
            id: "cf3b6e68-bdd4-4eaf-ab44-24ae23f16afb"
        }, {
            type: "Bastard Son",
            id: "54b1aca7-62ea-45e7-838b-f2d94e3d1d35"   
        }, {
            type: "Paramour",
            id: "9f08234-7ca9-32ds-2231-239o92689071"
        }],
        name: "Jane Doe",
        age: 33,
        sex: 1,
    },
    {
        id: "54b1aca7-62ea-45e7-838b-f2d94e3d1d35",
        name: "Dragon Doe",
        relations: [{
            type: "Mother",
            id: "d698bc35-7d5b-4054-bbe0-f856275e6c39"
        }, {
            type: "Illegitimate Father",
            id: "9f08234-7ca9-32ds-2231-239o92689071"
        }, {
            type: "Father",
            id: "9f0207d4-7ca9-4d1b-8948-239d56089071"
        }],
        age: 15,
        sex: 0,
    },
    {
        id: "cf3b6e68-bdd4-4eaf-ab44-24ae23f16afb",
        relations: [
            {
                type: "Father",
                id: "9f0207d4-7ca9-4d1b-8948-239d56089071"
            },
            {
                type: "Mother",
                id: "d698bc35-7d5b-4054-bbe0-f856275e6c39"
            },
        ],
        name: "Iodiote Doe",
        age: 12,
    },
];

export function GET() {
    // This will later on combine the different search queries into a more
    // concise result like the placeholder above
    return new Response(JSON.stringify(data))
};