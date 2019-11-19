<template>
  <main>
    <nav>
      <div>Page {{ seed }} of ∞</div>
      <button @click="travel">Next Page &rarr;</button>
    </nav>

    <div v-if="seed">
      <div class="Page" v-for="p in pages" v-bind:key="p">
        <Entry v-for="n in 2" v-bind:key="n" v-bind:seed="seed + ((p - 1) * 2) + n - 1"></Entry>
      </div>
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
    const pages = ref(4);

    const initialParsedHash = queryString.parse(window.location.hash);
    if (initialParsedHash.pages) {
      pages.value = parseInt(initialParsedHash.pages, 10);
    }

    function derive(shouldSetHash) {
      const newHash = `seed=${seed.value}`;
      if (shouldSetHash && newHash != window.location.hash) {
        window.location.hash = newHash;
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
      if (parsedHash.pages) {
        // pages.value = parseInt(parsedHash.pages, 10);
      }
      if (seed.value) {
        derive(shouldSetHash);
        return true;
      } else {
        return false;
      }
    }

    if (!reactToHash(queryString.parse(window.location.hash), true)) {
      travel();
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
      pages,
      // seeds: computed(() => {
      //   return [...Array(12)].map((_, i) => seed.value + i);
      // }),
    }
  }
}
</script>