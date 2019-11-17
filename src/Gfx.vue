<template>
  <div class="Pedal">
    <div v-html="rawStyle"></div>

    <div class="ThreeSectionStompbox">

        <div class="Controls">
          <div class="CheckLED">
            <div class="Label">CHECK</div>
            <LED v-bind:randomNumber="ledColorNumber"></LED>
          </div>

          <div
              v-if="knobConfigName === 'StraightRow'" 
              class="Knobs__StraightRow">
            <Knob></Knob>
            <Knob></Knob>
            <Knob></Knob>
            <Knob></Knob>
          </div>

          <div v-if="knobConfigName === 'Pair'" class="Knobs__Pair">
            <Knob></Knob>
            <Knob></Knob>
          </div>

          <div v-if="knobConfigName === 'TriangleUp'" class="Knobs__TriangleUp">
            <Knob></Knob>
            <Knob></Knob>
            <Knob></Knob>
          </div>

          <div v-if="knobConfigName === 'TriangleDown'" class="Knobs__TriangleDown">
            <Knob></Knob>
            <Knob></Knob>
            <Knob></Knob>
          </div>


          <div class="Controls__Spacer"></div>
        </div>

        <Ports v-bind:name="name" v-bind:brand="brand"></Ports>

        <div class="Pusher">
          <div class="Pusher__Inner">
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUpdate } from '@vue/composition-api';
import Alea from 'alea';
import {choiceItem} from './util.js';
import Knob from './Knob.vue';
import LED from './LED.vue';
import Ports from './Ports.vue';

const colorMap = {
  red: '#e84118',
  orange: '#EE5A24',
  yellow: '#fbc531',
  green: '#44bd32',
  blue: '#273c75',
  purple: '#8c7ae6',
  pink: '#FDA7DF',
  black: '#111',
  white: '#f5f6fa',
};

const textColorMap = {
  red: '#ffffff',
  orange: '#ffffff',
  yellow: '#000000',
  green: '#ffffff',
  blue: '#ffffff',
  purple: '#ffffff',
  pink: '#000000',
  black: '#ffffff',
  white: '#000000',
};

const fontFamilies = [
  'Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
  'Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif',
  '"Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif',
  'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif',
  'Consolas, "Andale Mono WT", "Andale Mono", "Menlo", "SF Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
  '"Cooper Hewitt", sans-serif',
  '"Cooper Hewitt Medium", sans-serif',
];

const flexJustifyContent = [
  'center',
  'space-between',
];

const flexDirectionRow = [
  'row',
  'row-reverse',
];

const knobConfigs = [
  'StraightRow',
  'Pair',
  'TriangleUp',
  'TriangleDown',
];

export default {
  components: {
    Knob,
    LED,
    Ports,
  },

  props: [
    'aleaSavedState',
    'name',
    'color',
    'purpose',
    'brand',
  ],

  computed: {
    getRandom: function() {
      return Alea.importState(this.$props.aleaSavedState);
    },

    ledColorNumber: function() { return this.getRandom(); },

    knobConfigName: function() {
      return choiceItem(this.getRandom(), knobConfigs);
    },

    rawStyle: function() {
      console.log(this);
      return `
        <style>
          .Pedal {
            --bg: ${colorMap[this.$props.color]};
            --textOnBg: ${textColorMap[this.$props.color]};
            --footContact: #2f3640;
            --knob: #718093;
            --knob2: #a5b1c2;
            --knobTick: #d1d8e0;
            --bg2: #353b48;
            --textOnBg2: #ffffff;

            --name-font: ${choiceItem(this.getRandom(), fontFamilies)};

            --name-flex-justify-content: ${choiceItem(this.getRandom(), flexJustifyContent)};
            --name-flex-direction: ${choiceItem(this.getRandom(), flexDirectionRow)};
            --name2-flex-justify-content: ${choiceItem(this.getRandom(), flexJustifyContent)};
            --name2-flex-direction: ${choiceItem(this.getRandom(), flexDirectionRow)};
          }
        </style>
      `;
    }
  },

  setup() {
    return {
    };
  }
}
</script>