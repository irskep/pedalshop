<template>
  <div class="LED" v-bind:class="cssClass"></div>
</template>

<style scoped>
.LED {
  --ledSize: 0.6rem;
}

.LEDRed {
  width: var(--ledSize);
  height: var(--ledSize);
  background-color: #F00;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;
}

.LEDYellow {
  width: var(--ledSize);
  height: var(--ledSize);
  background-color: #FF0;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 12px;
}

.LEDGreen {
  width: var(--ledSize);
  height: var(--ledSize);
  background-color: #ABFF00;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px;
}

.LEDBlue {
  width: var(--ledSize);
  height: var(--ledSize);
  background-color: #24E0FF;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #006 0 -1px 9px, #3F8CFF 0 2px 14px;
}
</style>

<script>
import {choiceItem} from './util.js';

export default {
  props: [
    'randomNumber',
  ],

  computed: {
    cssClass: function() {
      return choiceItem(this.$props.randomNumber, ['LEDRed', 'LEDGreen', 'LEDYellow', 'LEDBlue']);
    }
  },

  setup() {
    return {

    };
  },
}
</script>