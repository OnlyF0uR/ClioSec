import { getTitleFromTarget } from '/lib/server/convert.js';

const data = [
    {
        id: "9f0207d4-7ca9-4d1b-8948-239d56089071",
        name: "John Doe",
        age: 32,
        sex: 0,
        highlight: true,
        relations: [{
            type: "Wife",
            id: "d698bc35-7d5b-4054-bbe0-f856275e6c39",
        }, {
            type: "Accomplice",
            id: "9f08234-7ca9-32ds-2231-239o92689071",
            illicit: true
        }, {
            type: "Son",
            id: "cf3b6e68-bdd4-4eaf-ab44-24ae23f16afb"
        }],
        aliases: [
            "The harsh"
        ],
        importance: 0
    },
    {
        id: "9f08234-7ca9-32ds-2231-239o92689071",
        name: "Nohj Eod",
        age: 31,
        sex: 0,
        highlight: true,
        relations: [{
            type: "Accomplice",
            id: "9f0207d4-7ca9-4d1b-8948-239d56089071",
            illicit: true
        }, {
            type: "Paramour",
            id: "d698bc35-7d5b-4054-bbe0-f856275e6c39",
            illicit: true
        }, {
            type: "Bastard Son",
            id: "54b1aca7-62ea-45e7-838b-f2d94e3d1d35",
            illicit: true
        }],
        importance: 0
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
            id: "54b1aca7-62ea-45e7-838b-f2d94e3d1d35",
            illicit: true
        }, {
            type: "Paramour",
            id: "9f08234-7ca9-32ds-2231-239o92689071",
            illicit: true
        }],
        name: "Jane Doe",
        age: 33,
        sex: 1,
        importance: 1
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
        sex: 1,
        importance: 1
    },
    {
        id: "54b1aca7-62ea-45e7-838b-f2d94e3d1d35",
        name: "Dragon Doe",
        relations: [{
            type: "Mother",
            id: "d698bc35-7d5b-4054-bbe0-f856275e6c39"
        }, {
            type: "Illegitimate Father",
            id: "9f08234-7ca9-32ds-2231-239o92689071",
            illicit: true
        }, {
            type: "Father",
            id: "9f0207d4-7ca9-4d1b-8948-239d56089071"
        }],
        age: 15,
        sex: 0,
        importance: 2
    },
]

export function GET() {
    const result = {
        primary: [],
        secondary: [],
        tertiary: []
    };

    // Loop through targets
    for (let i = 0; i < data.length; i++) {
        const res = {
            id: data[i].id,
            title: getTitleFromTarget(data[i]),
        };

        // Add originial information if required
        if (data[i].highlight === true) res["hightlight"] = true;
        if (data[i].aliases != null && data[i].aliases.length > 0) res["aliases"] = data[i].aliases;
        if (data[i].relations != null && data[i].relations.length > 0) {
            const newRelations = [];

            // Loop through target's relations
            for (let j = 0; j < data[i].relations.length; j++) {
                let rel_res = {
                    type: data[i].relations[j].type,
                };

                // Find the target data for this relation
                const rel_target = data.find(rt => rt.id === data[i].relations[j].id);
                rel_res["title"] = getTitleFromTarget(rel_target);

                if (data[i].relations[j].illicit === true) rel_res["illicit"] = true;

                newRelations.push(rel_res);
            }

            res["relations"] = newRelations;
        }
        if (data[i].metadata != null && data[i].metadata.length > 0) res["metadata"] = data[i].metadata;

        // Put tmp in the right category
        switch (data[i].importance) {
            case 0:
                result.primary.push(res);
                break;
            case 1:
                result.secondary.push(res);
                break;
            case 2:
                result.tertiary.push(res);
                break;
            default:
                console.log(`Target (${res.id}): Invalid importance level (only 0, 1 and 2 are allowed).`)
        }
    }

    return new Response(JSON.stringify(result));
};