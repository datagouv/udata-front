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
    /**
     * This task use the sitemap to get pages.
     * It limits the number of datasets, reuses and organisations visited to 200
     * This logic should be removed when we use fixtures for testing
     * instead of the development instance.
     * @returns {Promise<Array<string>>}
     */
    sitemapLocations() {
      console.log('Starting script');
      return getLocations(`${config.baseUrl}/sitemap.xml`).then(locations =>
        Promise.all(locations.map(url => getLocations(url)))
          .then(result => result.flat())
          .then(urls => {
            let countDatasets = 0;
            let countReuses = 0;
            let countOrganizations = 0;
            return urls.filter(url =>
              (!url.includes('/datasets/') || ++countDatasets <= 200) &&
              (!url.includes('/reuses/') || ++countReuses <= 200) &&
              (!url.includes('/organizations/') || ++countOrganizations <= 200)
            );
          })
      );
    },
  })
}

/**
 * Loads Sitemap and extracts urls
 * @param {string} url 
 * @returns {Promise<Array<string>>}
 */
const getLocations = (url) => {
  console.log(`Getting locations from ${url}`);
  return axios.get(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  })
    .then(res => res.data)
    .then(xml => {
      const locs = [...xml.matchAll(`<loc>(.|\n)*?</loc>`)].map(([loc]) =>
        loc.replace('<loc>', '').replace('</loc>', ''),
      );
      console.log(`Found ${locs.length} locations`);
      return locs;
    });
}