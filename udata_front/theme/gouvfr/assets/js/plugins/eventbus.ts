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
export type SearchEvents = "resourcesSearch";

export type SearchEventsParameters = {
[search in SearchEvents]: { type?: string; value: string; };
};

export type Events = SearchEventsParameters;

export type UdataEventType = keyof Events;

import mitt from "mitt";
import type { App } from "vue";

export const SEARCH_EVENT = "search";

export const RESOURCES_SEARCH: SearchEvents = "resourcesSearch";

export const bus = mitt<Events>();

export const install = (app: App) => {
  app.config.globalProperties.$bus = bus;
};

export default install;
