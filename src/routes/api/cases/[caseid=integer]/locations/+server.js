import { getTitleFromTarget } from '/lib/server/convert.js';

// If the geo data exists we can generate a google maps url
// https://www.google.com/maps/@long,lat
export function GET() {
    const data = [
        {
			name: "Somestreet 123, Somecity",
			geo_loc: {
				long: 1.131,
				lat: 1.232
			},
            specification: "Home #1",

            target_info: {
                name: "John Doe",
                sex: 0,
                age: 32
            },
        },
    ]

    for (let i = 0; i < data.length; i++) {
        data[i]["target_title"] = getTitleFromTarget(data[i].target_info);
        delete data[i].target_info;
    }

    return new Response(JSON.stringify(data))
};
