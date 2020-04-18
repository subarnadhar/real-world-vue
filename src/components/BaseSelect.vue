<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <option
        v-for="option in options"
        :selected="option === value"
        :value="option"
        :key="option"
        >{{ option }}</option
      >
    </select>
  </div>
</template>
<script>
import { formFieldMixin } from "../mixins/formFieldMixin"; // import mixin
export default {
  mixins: [formFieldMixin], // register mixin
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: [String, Number],
  },
};
</script>
