<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>

    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      >Next Page</router-link
    >

    <BaseIcon />
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/index.js";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1);
  store
    .dispatch("event/fetchEvents", {
      page: currentPage,
    })
    .then(() => {
      // pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage;
      next();
    });
}

export default {
  props: {
    page: {
      // current page gets passed in as a prop
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    // Before we enter the route
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    // Before we update the route
    getPageEvents(routeTo, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(["event", "user"]),
  },
};
</script>
