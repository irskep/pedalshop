<template>
  <article>
    <Gfx
      v-bind:aleaSavedState="aleaSavedState"
      v-bind:name="pedal.name"
      v-bind:brand="pedal.brand"
      v-bind:purpose="pedal.purpose"
      v-bind:color="pedal.color"
    ></Gfx>

    <h2 class="Brand">{{ pedal.brand }}</h2>
    <h1 class="PedalName">{{ pedal.name }}</h1>
    <h3 class="PedalPrice">{{ pedal.price }}</h3>

    <h3>{{ pedal.subtitle }}</h3>
    <p v-for="(t, i) in pedal.texts" v-bind:key="i">{{ t }}</p>

    <div class="BuyButton"><a href="https://quickfiction.bandcamp.com" target="_">Buy Now</a></div>
  </article>
</template>

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

  props: ['seed', 'travel'],

  computed: {
    alea: function() { return new Alea(this.$props.seed); },
    context: function() {
      const alea = new Alea(this.$props.seed);
      const {descGen, subGen} = makeImprovGenerators(alea);
      const model = {};
      const name = descGen.gen('name', model);
      const subtitle = subGen.gen('root', model);
      const desc = descGen.gen('root', model);
      const brand = descGen.gen('brand', model);
      const aleaSavedState = alea.exportState();
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