<template>
  <main>
    <nav>
      <div>Page {{ seed }} of ∞</div>
      <button @click="travel">Next Page &rarr;</button>
    </nav>

    <div v-if="seed">
      <Entry v-for="s in seeds" v-bind:key="s" v-bind:seed="s"></Entry>
    </div>

    <footer>
      <strong>Tools used to make this site:</strong>

      <div>
        <a href="https://improv.readthedocs.io/">Improv</a> for generating text.
      </div>

      <div>
        The
        <a href="https://www.cooperhewitt.org/open-source-at-cooper-hewitt/cooper-hewitt-the-typeface-by-chester-jenkins/">
          Cooper Hewitt
        </a>
        typeface.
      </div>

      <div>
        <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">
          A Complete Guide to Flexbox
        </a>
        for reference.
      </div>

      <div>
        <a href="https://vuejs.org/">
          Vue.js
        </a>
        for HTML rendering.
      </div>

    </footer>
  </main>
</template>

<script>
import Alea from "alea";
import { ref, computed, onMounted, onBeforeUpdate } from '@vue/composition-api';

import Gfx from './Gfx.vue';
import Entry from './Entry.vue';

import makeImprovGenerators from './makeImprovGenerators';
import queryString from 'query-string';

export default {
  components: {
    Gfx,
    Entry,
  },
  setup() {
    const seed = ref(null);

    function derive(shouldSetHash) {
      if (shouldSetHash) {
        window.location.hash = `seed=${seed.value}`;
      }
    }

    function travel() {
      seed.value = Date.now();
      console.log("Traveling to", seed.value);
      derive(true);
    }

    function reactToHash(parsedHash, shouldSetHash) {
      if (parsedHash.seed && !isNaN(parseInt(parsedHash.seed, 10))) {
        seed.value = parseInt(parsedHash.seed, 10)
        console.log("Set seed:", seed.value);
      }
      if (seed.value) {
        derive(shouldSetHash);
        return true;
      } else {
        return false;
      }
    }

    onMounted(() => {
      if (!reactToHash(queryString.parse(window.location.hash), true)) {
        travel();
      }

      window.onhashchange = () => {
        reactToHash(queryString.parse(window.location.hash), false);
      };
    });

    return {
      seed,
      travel,
      seeds: computed(() => {
        return [...Array(10)].map((_, i) => seed.value + i);
      }),
    }
  }
}
</script>