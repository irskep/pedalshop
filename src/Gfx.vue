<template>
  <div class="Pedal">
    <div v-html="rawStyle"></div>

    <div class="ThreeSectionStompbox">

        <div class="Controls">
          <div v-if="shouldHaveCheckLED" class="CheckLED">
            <div class="Label">CHECK</div>
            <LED v-bind:randomNumber="ledColorNumber"></LED>
          </div>

          <div
              v-if="knobConfigName === 'StraightRow'" 
              class="Knobs__StraightRow">
            <SomeControl
              v-for="n in 4"
              v-bind:key="n"
              v-bind:randomNumber1="pedalWords.randomNumbers[n - 1]"
              v-bind:randomNumber2="pedalWords.randomNumbers[n]"
              v-bind:label="pedalWords.knobLabels[n-1]"></SomeControl>
          </div>

          <div
              v-if="knobConfigName === 'NByTwo'" 
              class="Knobs__StraightRow">
            <SomeControl
              v-for="n in numAcross"
              v-bind:key="n"
              v-bind:randomNumber1="pedalWords.randomNumbers[numAcross + n - 1]"
              v-bind:randomNumber2="pedalWords.randomNumbers[numAcross + n]"
              v-bind:label="pedalWords.knobLabels[numAcross + n - 1]"></SomeControl>
          </div>

          <div
              v-if="knobConfigName === 'NByTwo'" 
              class="Knobs__StraightRow">
            <SomeControl
              v-for="n in numAcross"
              v-bind:key="n"
              v-bind:randomNumber1="pedalWords.randomNumbers[n - 1]"
              v-bind:randomNumber2="pedalWords.randomNumbers[n]"
              v-bind:label="pedalWords.knobLabels[n-1]"></SomeControl>
          </div>

          <div v-if="knobConfigName === 'Pair'" class="Knobs__Pair">
            <SomeControl
              v-for="n in 2"
              v-bind:key="n"
              v-bind:randomNumber1="pedalWords.randomNumbers[n - 1]"
              v-bind:randomNumber2="pedalWords.randomNumbers[n]"
              v-bind:label="pedalWords.knobLabels[n-1]"></SomeControl>
          </div>

          <div v-if="knobConfigName === 'TriangleUp'" class="Knobs__TriangleUp">
            <SomeControl
              v-for="n in 3"
              v-bind:key="n"
              v-bind:randomNumber1="pedalWords.randomNumbers[n - 1]"
              v-bind:randomNumber2="pedalWords.randomNumbers[n]"
              v-bind:label="pedalWords.knobLabels[n-1]"></SomeControl>
          </div>

          <div v-if="knobConfigName === 'TriangleDown'" class="Knobs__TriangleDown">
            <SomeControl
              v-for="n in 3"
              v-bind:key="n"
              v-bind:randomNumber1="pedalWords.randomNumbers[n - 1]"
              v-bind:randomNumber2="pedalWords.randomNumbers[n]"
              v-bind:label="pedalWords.knobLabels[n-1]"></SomeControl>
          </div>


          <div class="Controls__Spacer"></div>
        </div>

        <Ports
          v-bind:name="name"
          v-bind:brand="brand"
          v-bind:inputLabels="pedalWords.inputLabels"
          v-bind:outputLabels="pedalWords.outputLabels"></Ports>

        <BottomArea
          v-bind:name1="name1"
          v-bind:name2="name2"
          v-bind:footConfig="footConfig"
          v-bind:footSwitchStyle="footSwitchStyle"
          v-bind:numFootSwitches="numFootSwitches"
          v-bind:shouldRotateLogo="shouldRotateLogo"
          v-bind:layoutRandomNumber="nameLayoutRandomNumber"
          v-bind:pedalWords="pedalWords"
        ></BottomArea>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUpdate } from '@vue/composition-api';
import Alea from 'alea';

import {choiceItem} from './util';
import makeImprovGenerators from './makeImprovGenerators';

import BottomArea from './BottomArea.vue';
import FootSwitch from './FootSwitch.vue';
import Knob from './Knob.vue';
import LED from './LED.vue';
import Ports from './Ports.vue';
import FingerSwitch from './FingerSwitch.vue';
import SomeControl from './SomeControl.vue';

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
  '#dE4A24',
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
  'NByTwo'
];

const footConfigs = [
  'Pusher',
  'Pusher',
  'OneSwitch',
  'MultiSwitch',
];

const footSwitchStyles = [
  'hex',
  'circle',
];

const bg2Colors = [
  // '#353b48',
  'rgba(0, 0, 0, 0.8)',
  'rgba(255, 255, 255, 0.8)',
  // '#dadadf',
  'rgba(0, 0, 0, 0.0)'
];

const bg2TextColors = [
  '#fff',
  '#000',
  'var(--textOnBg)',
];

export default {
  components: {
    BottomArea,
    FingerSwitch,
    FootSwitch,
    Knob,
    LED,
    Ports,
    SomeControl,
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

    shouldHaveCheckLED: function() { return this.getRandom() > 0.3 },

    pedalWords: function() {
      const model = {};
      const {pedalWordsGen} = makeImprovGenerators(this.getRandom);

      const w = {
        knobLabels: [...Array(20)].map(() => pedalWordsGen.gen('knobLabel', model)),
        switchLabels: [...Array(5)].map(() => pedalWordsGen.gen('switchLabel', model)),
        outputLabels: pedalWordsGen.gen('output', model).split('/'),
        inputLabels: pedalWordsGen.gen('input', model).split('/'),

        randomNumbers: [...Array(20)].map(() => this.getRandom()),
      };
      console.log(w);
      return w;
    },

    ledColorNumber: function() { return this.getRandom(); },
    
    numAcross: function() { return 1 + Math.floor(this.getRandom() * 6); },
    numFootSwitches: function() {
      return choiceItem(this.getRandom(), [
        2, 2, 2,
        3, 3, 3,
        4,
      ])
    },

    footSwitchStyle: function() {
      return choiceItem(this.getRandom(), footSwitchStyles);
    },

    footConfig: function() {
      return choiceItem(this.getRandom(), footConfigs);
    },

    nameNumber: function() { return this.getRandom() },
    name1: function() {
      return choiceItem(this.nameNumber, [this.$props.brand, this.$props.name]);
    },
    name2: function() {
      return choiceItem(this.nameNumber, [this.$props.name, this.$props.brand]);
    },
    shouldRotateLogo: function() { return this.getRandom() < 0.3; },
    nameLayoutRandomNumber: function() { return this.getRandom(); },

    knobConfigName: function() {
      return choiceItem(this.getRandom(), knobConfigs);
    },

    rawStyle: function() {
      const fontChoiceNumber = this.getRandom();
      const knobChoiceNumber = this.getRandom();
      const bg2ChoiceNumber = this.getRandom();
      return `
        <style>
          .Pedal {
            --bg: ${colorMap[this.$props.color]};
            --textOnBg: ${textColorMap[this.$props.color]};
            --footContact: #2f3640;
            --knob: ${choiceItem(knobChoiceNumber, knobColors)};
            --knob2: ${choiceItem(knobChoiceNumber, knobColors2)};
            --knobTick: ${choiceItem(knobChoiceNumber, knobColorsTick)};
            --bg2: ${choiceItem(bg2ChoiceNumber, bg2Colors)};
            --textOnBg2: ${choiceItem(bg2ChoiceNumber, bg2TextColors)};

            --name-font: ${choiceItem(fontChoiceNumber, fontFamilies)};
            --name-font-size: ${choiceItem(fontChoiceNumber, fontSizes)};

            --name-flex-justify-content: ${choiceItem(this.getRandom(), flexJustifyContent)};
            --name-flex-direction: 'row';
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