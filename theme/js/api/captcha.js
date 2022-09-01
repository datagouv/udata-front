import { apiv2 } from "../plugins/api";

const captchEtatUrl = "/captchetat/"
/**
 * @param {{ get: string; c: string; }} params
 */
function fetch(params) {
    return apiv2.get(captchEtatUrl, {params})
    .then((resp) => resp.data);
}

/**
 * @param {string} style
 */
export function fetchHtml(style) {
    return fetch({get: 'html', c: style}).then(html =>
        html.replace("/api/simple-captcha-endpoint", apiv2.defaults + captchEtatUrl)
    );
}