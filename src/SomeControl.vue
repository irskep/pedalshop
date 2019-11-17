<template>
  <div class="SomeControl">
    <div v-if="appearance === 'led'" class="CheckLED">
      <div v-if="label.trim() !== '&nbsp;'" class="Label">{{ label }}</div>
      <LED v-bind:randomNumber="randomNumber2"></LED>
    </div>

    <Knob v-if="appearance === 'knob'" v-bind:label="label"></Knob>

    <FingerSwitch v-if="appearance === 'switch'" v-bind:label="label"></FingerSwitch>
  </div>
</template>

<style scoped>
.SomeControl {
  min-width: 2.4rem;
}
</style>

<script>
import {choiceItem} from './util';
import LED from './LED';
import Knob from './Knob';
import FingerSwitch from './FingerSwitch';

const appearances = [
  'knob',
  'knob',
  'knob',
  'knob',
  'switch',
  'led',
];

export default {
  components: {
    LED,
    Knob,
    FingerSwitch,
  },

  props: [
    'label',
    'randomNumber1',
    'randomNumber2',
  ],

  computed: {
    appearance: function() {
      return choiceItem(this.$props.randomNumber1, appearances);
    },
  },

  setup() {
    return {

    };
  },
}
</script>