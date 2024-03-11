import { api } from "../plugins/api";

export async function getUser() {
    const resp = await api.get('me/');
    return resp.data;
}
