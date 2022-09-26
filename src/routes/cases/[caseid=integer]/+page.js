import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const caseData = await fetch(`/api/cases/${params.caseid}`).then((r) => r.json());

    if (!caseData["ok"]) throw error(404, "Case could not be found.");
    caseData["id"] = params.caseid;

    return caseData;
}