<template>
  <div class="Entry">
    <div>
      <Gfx
        v-bind:seed="seed"
        v-bind:aleaSavedState="aleaSavedState"
        v-bind:name="pedal.name"
        v-bind:brand="pedal.brand"
        v-bind:purpose="pedal.purpose"
        v-bind:color="pedal.color"
      ></Gfx>
      <h3 class="PedalPrice left">{{ pedal.price }}</h3>
    </div>

    <div>
      <h2 class="Brand">{{ pedal.brand }}</h2>
      <h1 class="PedalName">{{ pedal.name }}</h1>
      <h3 class="PedalPrice above">{{ pedal.price }}</h3>

      <h3 class="PedalSubtitle">{{ pedal.subtitle }}</h3>
      <p v-for="(t, i) in pedal.texts" v-bind:key="i">{{ t }}</p>

      <div class="BuyButton"><a href="https://quickfiction.bandcamp.com" target="_">Buy Now</a></div>
    </div>

  </div>
</template>

<style>

.Page {
  page-break-inside: avoid;
  break-inside: avoid;
}

@media screen and (min-width: 768px) {
  .Entry > h1, .Entry > h2, h3.PedalPrice {
    text-align: left !important;
  }

  .Pedal {
    width: auto !important;
  }

  .Entry {
    display: flex;
    align-items: flex-start;
  }
}

@media screen and (max-width: 500px) {
  .Pedal {
    font-size: 0.7rem;
  }
}

@media print {
  .Entry {
    display: flex;
    align-items: flex-start;
  }

  .Entry > h1, .Entry > h2, h3.PedalPrice {
    text-align: left !important;
  }

  .Pedal {
    width: auto !important;
    margin-bottom: 0 !important;
  }
}

/* catalog layout */

main.catalog {
  width: 100% !important;
  max-width: 100% !important;
}

.catalog .Content {
  columns: 24rem;
}

.catalog h1.PedalName, .catalog .Brand, .catalog .PedalPrice {
  font-size: 1.2rem;
}

.catalog .Pedal {
  font-size: 0.7rem;
}

/* text stuff */

.Brand {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1em;
  font-style: italic;
  font-size: 1.5rem;
}

h1.PedalName {
  margin-bottom: 0;
  margin-top: 0;
}

.PedalSubtitle {
  font-size: 1.2rem;
  margin: 0;
}

h3.PedalPrice, .BuyButton a {
  color: #c00;
  font-family: "Cooper Hewitt Heavy";
  margin-top: 0;
}

.BuyButton {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.Entry {
  position: relative;
}

.PedalPrice.above {
  margin-bottom: 0.5em;
}

.PedalPrice.left {
  display: none;
}

.Pedal {
  display: flex;
  justify-content: center;
  margin-right: 2rem;
  margin-bottom: 2rem;
  overflow-x: visible;
  width: 100%;

  /* transform-origin: bottom center;
  transform: scale(0.7); */
}

.Pedal .Label {
  font-size: 0.5em;
  line-height: 1em;
}

.ThreeSectionStompbox {
  --outsidePadding: 0.4em;

  min-width: 10em;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  background-color: var(--bg);
  color: var(--textOnBg);

  border-radius: 0.3em;
  /* padding: var(--outsidePadding); */
  flex-shrink: 0;
}

.Controls {
  background-color: var(--bg2);
  color: var(--textOnBg2);
  margin: var(--outsidePadding);
  padding: 0.4em;
  border-radius: 0.2em;
  margin-bottom: 0.4em;
  min-height: 5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.Controls__Spacer {
  height: 1px;
  content: " ";
}

.CheckLED {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5em;
}

.Knobs__StraightRow {
  min-height: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.Knobs__Pair {
  min-height: 2em;
  display: flex;
  justify-content: space-around;
}

.Knobs__Pair .Knob {
  margin: 0 1em;
}

.Knobs__TriangleUp {
  min-height: 5em;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.Knobs__TriangleUp > * {
  margin-right: 5px;
  margin-left: 5px;
}

.Knobs__TriangleUp > *:nth-child(2) {
  align-self: flex-start;
}

.Knobs__TriangleDown {
  min-height: 5em;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.Knobs__TriangleDown > * {
  margin-right: 5px;
  margin-left: 5px;
}

.Knobs__TriangleDown > *:nth-child(2) {
  align-self: flex-end;
}
</style>

<script>
import Alea from "alea";
import { ref, computed, onMounted, onBeforeUpdate } from '@vue/composition-api';

import Gfx from './Gfx.vue';

import makeImprovGenerators from './makeImprovGenerators';
import queryString from 'query-string';

export default {
  components: {
    Gfx,
  },

  props: ['seed', 'bindings'],

  computed: {
    alea: function() { return new Alea(this.$props.seed); },
    context: function() {
      const alea = new Alea(this.$props.seed);
      const {descGen, subGen} = makeImprovGenerators(alea);
      const model = {
        bindings: this.$props.bindings || [],
      };
      const name = descGen.gen('name', model);
      const subtitle = subGen.gen('root', model);
      const desc = descGen.gen('root', model);
      const brand = descGen.gen('brand', model);
      const aleaSavedState = alea.exportState();
      console.log(model);
      const pedal = {
        name,
        subtitle,
        brand,
        purpose: subGen.gen('purpose', model),
        color: descGen.gen('color', model).toLowerCase(),
        texts: desc.split('\n\n').filter((s) => s),
        price: descGen.gen('price', model),
      };
      return {aleaSavedState, pedal};
    },
    pedal: function() { return this.context.pedal; },
    aleaSavedState: function() { return this.context.aleaSavedState; },
  },
}
</script>