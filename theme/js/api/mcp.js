import { apiv2 } from "../plugins/api";

const mcpUrl = "mcp/"

function fetch(params) {
    return apiv2.get(mcpUrl, {params})
    .then((resp) => resp.data);
}

export function fetchHtml() {
    return fetch().then(console.log('API'));
}
