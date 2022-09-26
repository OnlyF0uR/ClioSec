export function getTitleFromTarget(targetInfo) {
    let title = "Unknown";

    if (targetInfo.name) title = targetInfo.name;
    else if (targetInfo.aliases != null && targetInfo.aliases.length) title = targetInfo.aliases[0];

    if (targetInfo.age) {
        if (targetInfo.sex === 0) {
            title += ` (${targetInfo.age}M)`;
        } else if (targetInfo.sex === 1) {
            title += ` (${targetInfo.age}F)`;
        } else {
            title += ` (${targetInfo.age})`;
        }
    } else {
        if (targetInfo.sex === 0) {
            title += ` (M)`;
        } else if (targetInfo.sex === 1) {
            title += ` (F)`;
        } else {
            title += ` (${targetInfo.age})`;
        }
    }

    return title;
}