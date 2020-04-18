import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";
import EventList from "../views/EventList.vue";
import NProgress from "nprogress";
import store from "@/store/index.js";
import NotFound from "@/views/NotFound.vue";
import NetworkIssue from "@/views/NetworkIssue.vue";
import Example from "@/views/Example.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/example",
      component: Example,
    },
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true,
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("event/fetchEvent", routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event; // <--- Set the event we retrieved
            next();
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              next({
                name: "404",
                params: { resource: "event" },
              });
            } else {
              next({ name: "network-issue" });
            }
          });
      },
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate,
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue,
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      props: true,
    },
    {
      // Here's the new catch all route
      path: "*",
      redirect: { name: "404", params: { resource: "page" } },
    },
  ],
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
