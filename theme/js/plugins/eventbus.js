/**
# Events

Events are dispatched in different parts of the app to allow component interactions or even interaction between multiple vue instances.

Our emitter is available directly by importing `bus` const from this file.
It allows us to listen to all events or to a single event type.

```listen.js
import {bus} from "../../plugins/eventbus";
bus.on("*", (type, e) => console.log(type, e));
bus.on("someType", (e) => console.log(e));
```

## Dispatch event

A new event can be dispatched with the dispatch method.

```listen.js
import {bus} from "../../plugins/eventbus";
bus.dispatch("someType", "someValue");
```

## Event list

The following events are used :
*/
/**
 * @typedef {"resourcesSearch"} SearchEvents On new search, with the query as param (see {@link SearchEventsParameters})
 * @typedef {`${SearchEvents}ResultsUpdated`} SearchResultsUpdatedEvents - on search result update, with the type and count as param (see {@link SearchResultsUpdatedEventsParameters})
 * @typedef {`${SearchEvents}ResultsTotal`} SearchResultsTotalEvents - after all searchResultsUpdated event, with the total count as param (see {@link SearchResultsTotalEventsParameters})
 * @typedef {"discussionsStartThread"} DiscussionsStartThreadEvents - when user want to start a new discussion thread without param (see {@link DiscussionsStartThreadEventsParameters})

They require theses parameters :
 * @typedef {{[search in SearchEvents]: string}} SearchEventsParameters
 * @typedef {{[updates in SearchResultsUpdatedEvents]: {type: string, count: number}}} SearchResultsUpdatedEventsParameters
 * @typedef {{[totals in SearchResultsTotalEvents]: number}} SearchResultsTotalEventsParameters
 * @typedef {{[D in DiscussionsStartThreadEvents]: unknown}} DiscussionsStartThreadEventsParameters

Mitt handlers must use the proper parameters for each event.
 * @typedef {SearchEventsParameters & SearchResultsUpdatedEventsParameters & SearchResultsTotalEventsParameters & DiscussionsStartThreadEventsParameters} Events

Events are type checked.
 * @typedef {keyof Events} UdataEventType

Some events are linked to each others, e.g. searchs with their results updates and totals
 * @typedef {{[K in SearchEvents]: {search: K, resultsUpdated: `${K}ResultsUpdated` & UdataEventType, resultsTotal: `${K}ResultsTotal` & UdataEventType}}} UdataSearchEventsType
*/

import mitt from "mitt";

/** @type {DiscussionsStartThreadEvents} */
export const DISCUSSIONS_START_THREAD = "discussionsStartThread";

const SEARCH_EVENT = "search";
const RESULTS_UPDATED_EVENT = "resultsUpdated";
const RESULTS_TOTAL_EVENT = "resultsTotal";

/** @type {SearchEvents} */
export const RESOURCES_SEARCH = "resourcesSearch";
const RESOURCES_SEARCH_RESULTS_UPDATED = "resourcesSearchResultsUpdated";
const RESOURCES_SEARCH_RESULTS_TOTAL = "resourcesSearchResultsTotal";

/** @type {UdataSearchEventsType} */
export const SEARCH_EVENTS = {
  [RESOURCES_SEARCH]: {
    [SEARCH_EVENT]: RESOURCES_SEARCH,
    [RESULTS_UPDATED_EVENT]: RESOURCES_SEARCH_RESULTS_UPDATED,
    [RESULTS_TOTAL_EVENT]: RESOURCES_SEARCH_RESULTS_TOTAL
  }
};

/**
 * @type {import("mitt").Emitter<Events>} Emitter of
 */
export const bus = mitt();

export const install = (app) => {
  app.config.globalProperties.$bus = bus;
};

export default install;
