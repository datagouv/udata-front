import mitt from "mitt";

const emitter = mitt();

const registerEventHandler = emitter.on;

const eventsWaitingForHandlers = new Map();

/*
  For each event listener, we check for events dispatch before the listener registration.
 */
emitter.on = (type, handler) => {
  registerEventHandler(type, handler);
  const keys = eventsWaitingForHandlers.keys();
  for(let key of keys) {
    let events = eventsWaitingForHandlers.get(key);
    const handlers = emitter.all.get(key);
    if(handlers) {
      eventsWaitingForHandlers.set(key, []);
      for(let handler of handlers) {
        for(let queuedEvent of events) {
          handler(queuedEvent);
        }
      }
    }
  }
}

/*
  For each event type, we create a queue of emitted events when there is no listener.
  When an event occurred, we check if there is a new listener for our queued events.
  If this is the case, we call our listener with the queued events.
 */
emitter.on("*", (type, currentEvent) => {
  const eventsWaitingForType = eventsWaitingForHandlers.get(type);
  const handlersForType = emitter.all.get(type);
  if(!handlersForType) {
    if(eventsWaitingForType) {
      eventsWaitingForType.push(currentEvent);
    } else {
      eventsWaitingForHandlers.set(type, [currentEvent]);
    }
  }
});

export const install = (app) => {
  app.config.globalProperties.$bus = emitter;
};

export default install;
