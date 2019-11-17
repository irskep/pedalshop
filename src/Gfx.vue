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

        <Ports
          v-bind:name="name"
          v-bind:brand="brand"
          v-bind:inputLabels="pedalWords.inputLabels"
          v-bind:outputLabels="pedalWords.outputLabels"></Ports>

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

import {choiceItem} from './util';
import makeImprovGenerators from './makeImprovGenerators';

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

const knobColors = [
  '#e84118',
  '#ff5A24',
  '#fbc531',
  '#44bd32',
  '#273c75',
  '#8c7ae6',
  '#FDA7DF',
  '#111',
  '#ffffff',
];

const knobColors2 = [
  '#ff6138',
  '#EE5A24',
  '#ffe551',
  '#64cd52',
  '#475c95',
  '#ac9aff',
  '#Ffc7fF',
  '#222',
  '#f5f6fa',
];

const knobColorsTick = [
  '#d1d8e0',
  '#d1d8e0',
  '#333',
  '#d1d8e0',
  '#d1d8e0',
  '#d1d8e0',
  '#333',
  '#d1d8e0',
  '#333',
];

const fontFamilies = [
  'Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
  'Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif',
  '"Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif',
  'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif',
  'Consolas, "Andale Mono WT", "Andale Mono", "Menlo", "SF Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
  '"Cooper Hewitt", sans-serif',
  '"Cooper Hewitt Medium", sans-serif',
];

const fontSizes = [
  '0.9rem',
  '0.9rem',
  '0.9rem',
  '1.2rem',
  '0.9rem',
  '0.9rem',
  '0.9rem',
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

    pedalWords: function() {
      const model = {};
      const {pedalWordsGen} = makeImprovGenerators(this.getRandom);

      return {
        knobLabels: (new Array(20)).map(() => pedalWordsGen.gen('knobLabel', model)),
        switchLabels: (new Array(5)).map(() => pedalWordsGen.gen('switchLabel', model)),
        outputLabels: pedalWordsGen.gen('output', model).split('/'),
        inputLabels: pedalWordsGen.gen('input', model).split('/'),
      };
    },

    ledColorNumber: function() { return this.getRandom(); },

    knobConfigName: function() {
      return choiceItem(this.getRandom(), knobConfigs);
    },

    rawStyle: function() {
      const fontChoiceNumber = this.getRandom();
      const knobChoiceNumber = this.getRandom();
      return `
        <style>
          .Pedal {
            --bg: ${colorMap[this.$props.color]};
            --textOnBg: ${textColorMap[this.$props.color]};
            --footContact: #2f3640;
            --knob: ${choiceItem(knobChoiceNumber, knobColors)};
            --knob2: ${choiceItem(knobChoiceNumber, knobColors2)};
            --knobTick: ${choiceItem(knobChoiceNumber, knobColorsTick)};
            --bg2: #353b48;
            --textOnBg2: #ffffff;

            --name-font: ${choiceItem(fontChoiceNumber, fontFamilies)};
            --name-font-size: ${choiceItem(fontChoiceNumber, fontSizes)};

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