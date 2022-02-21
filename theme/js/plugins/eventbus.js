import mitt from "mitt";

export const bus = mitt();

// emitter.on("*", (type, e) => console.log(type, e));

export const install = (app) => {
  app.config.globalProperties.$bus = bus;
};

export default install;
