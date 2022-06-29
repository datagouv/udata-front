/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const axios = require('axios').default;

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message)

      return null
    },
    table(message) {
      console.table(message)

      return null
    },
    sitemapLocations() {
      return getLocations(`${config.baseUrl}/sitemap.xml`).then(locations =>
        Promise.all(locations.map(url => getLocations(url))).then(result => result.flat())
      );
    },
  })
}

const getLocations = (url) => axios.get(url, {
method: 'GET',
headers: {
  'Content-Type': 'application/xml',
},
})
.then(res => res.data)
.then(xml => {
  const locs = [...xml.matchAll(`<loc>(.|\n)*?</loc>`)].map(([loc]) =>
    loc.replace('<loc>', '').replace('</loc>', ''),
  )
  return locs;
});