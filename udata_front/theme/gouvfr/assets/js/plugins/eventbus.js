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

They require theses parameters :
 * @typedef {{[search in SearchEvents]: {type?: string, value: string}}} SearchEventsParameters

Mitt handlers must use the proper parameters for each event.
 * @typedef {SearchEventsParameters} Events

Events are type checked.
 * @typedef {keyof Events} UdataEventType
*/

import mitt from "mitt";

const SEARCH_EVENT = "search";

/** @type {SearchEvents} */
export const RESOURCES_SEARCH = "resourcesSearch";

/**
 * @type {import("mitt").Emitter<Events>} Emitter of
 */
export const bus = mitt();

export const install = (app) => {
  app.config.globalProperties.$bus = bus;
};

export default install;
