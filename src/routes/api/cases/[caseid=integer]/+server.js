const db = {
    "0": {
        name: "Operation Placeholder",
        desc: "Hello, world!"
    },
    "1": {
        name: "Assignment",
        desc: "Some example case appeared"
    }
};

export function GET({ params }) {
    const caseId = params["caseid"];
    
    // Check if case exists
    if (caseId in db) {
        const obj = db[caseId];
        obj["ok"] = true;

        return new Response(JSON.stringify(obj))
    }

    return new Response("{\"ok\": false}");
};