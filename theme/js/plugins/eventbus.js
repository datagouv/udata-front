/*
---
name: Events
category: 6 - Technical
---

# Events

Events are dispatched in different parts of the app to allow component interactions or even interaction between multiple vue instances.

Our emitter is available in instance as `$bus` or directly by importing `eventbus.js` file.
It allows us to listen to all events or to a single event type.

```listen.js
import {bus} from "../../plugins/eventbus";
bus.on("*", (type, e) => console.log(type, e));
bus.on("someType", (e) => console.log(e));

// or, inside a component
this.$bus.on("*", (type, e) => console.log(type, e));
this.$bus.on("someType", (e) => console.log(e));
```

## Dispatch event

A new event can be dispatched with the dispatch method.

```listen.js
import {bus} from "../../plugins/eventbus";
bus.dispatch("someType", "someValue");

// or, inside a component
this.$bus.dispatch("someType", "someValue");
```

## Event list

The following events are used :

Type | Parameter | Emitted
--- | --- | ---
`discussions.startThread` | none | when user want to start a new discussion thread
`suggest.startSearch` | none | when user want to start a new suggest search
`resources.search` | search input value | when a new resource search is submitted
`resources.search.results.updated` | {type: the resource type <br/> count : the number of resources for this type} | when search results are received from API
`resources.search.results.total` | total of search results | when search count are received from event `resources.search.results.updated`

*/

import mitt from "mitt";

export const DISCUSSIONS_START_THREAD = "discussionsStartThread";

export const SEARCH_EVENT = "search";
export const RESULTS_UPDATED_EVENT = "resultsUpdated";
export const RESULTS_TOTAL_EVENT = "resultsTotal";

export const RESOURCES_SEARCH = "resourcesSearch";
export const RESOURCES_SEARCH_RESULTS_UPDATED = "resourcesSearchResultsUpdated";
export const RESOURCES_SEARCH_RESULTS_TOTAL = "resourcesSearchResultsTotal";

/** @type {UdataResourceSearchEventsType} */
export const RESOURCES_SEARCH_EVENTS = {
  [SEARCH_EVENT]: RESOURCES_SEARCH,
  [RESULTS_UPDATED_EVENT]: RESOURCES_SEARCH_RESULTS_UPDATED,
  [RESULTS_TOTAL_EVENT]: RESOURCES_SEARCH_RESULTS_TOTAL
};

/**
 * @typedef {DISCUSSIONS_START_THREAD | RESOURCES_SEARCH | RESOURCES_SEARCH_RESULTS_UPDATED | RESOURCES_SEARCH_RESULTS_TOTAL} UdataEventType
 * @typedef {RESOURCES_SEARCH} UdataSearchEventType
 * @typedef {RESOURCES_SEARCH_RESULTS_UPDATED} UdataSearchResultUpdatedEventType
 * @typedef {RESOURCES_SEARCH_RESULTS_TOTAL} UdataSearchResultTotalEventType
*/
/**
 * @template {UdataSearchEventType} X
 * @template {UdataSearchResultUpdatedEventType} Y
 * @template {UdataSearchResultTotalEventType} Z
 *
 * @typedef {{search: X, resultsUpdated: Y, resultsTotal: Z}} UdataSearchEventsType
 */
/**
 * @typedef {UdataSearchEventsType<RESOURCES_SEARCH, RESOURCES_SEARCH_RESULTS_UPDATED, RESOURCES_SEARCH_RESULTS_TOTAL>} UdataResourceSearchEventsType
 */

/**
 * @typedef {object} Events
 * @property {unknown} discussionsStartThread - on new discussions thread
 * @property {string} resourcesSearch - on new resource search, with the query as param
 * @property {{type: string, count: number}} resourcesSearchResultsUpdated - on resource search result update, with the resource type and count as param
 * @property {number} resourcesSearchResultsTotal - after all resourcesSearchResultsUpdated event, with the total count as param
 */

/**
 * @type {import("mitt").Emitter<Events>} Emitter of
 */
export const bus = mitt();

export const install = (app) => {
  app.config.globalProperties.$bus = bus;
};

export default install;
