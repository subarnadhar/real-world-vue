/* eslint-disable prettier/prettier */
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
      @input="updateValue"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin"; // import mixin
export default {
  mixins: [formFieldMixin], // register mixin
  props: {
    value: [String, Number],
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>
