<template>
  <main v-bind:class="{catalog: catalog}">
    <nav>
      <div>Page {{ seed }} of ∞</div>
      <button @click="travel">Next Page &rarr;</button>
    </nav>

    <CoverPage></CoverPage>

    <div class="Category" v-for="s in sections" v-bind:key="s.title">
      <h1>{{ s.title }} Pedals</h1>
      <div
          class="Content"
          v-for="(brandchunks, i) in s.brands" v-bind:key="i + s.title">
        <Entry
          v-for="b in brandchunks"
          v-bind:key="b.key"
          v-bind:bindings="b.bindings"
          v-bind:tags="s.tags"
          v-bind:seed="seed + b.key"></Entry>
      </div>
    </div>

    <div class="Content" v-if="seed && !catalog">
      <div class="Page" v-for="p in pages" v-bind:key="p">
        <Entry
          v-for="n in 2"
          brand=""
          tags=""
          v-bind:key="n"
          v-bind:seed="seed + ((p - 1) * 2) + n - 1"></Entry>
      </div>
    </div>

    <footer>
      <strong>Tools used to make this site:</strong>

      <div>
        <a href="https://improv.readthedocs.io/">Improv</a> for generating text.
      </div>name

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

import CoverPage from './CoverPage.vue';
import Gfx from './Gfx.vue';
import Entry from './Entry.vue';
import {shuffle} from './util';

import makeImprovGenerators from './makeImprovGenerators';
import queryString from 'query-string';
import subtitleGrammar from './improvgrammar/subtitle.yaml';
import descGrammar from './improvgrammar/desc.yaml';

const purposeOptions = subtitleGrammar.purpose.groups
  .map(({tags, phrases}) => [tags[0], phrases[0]]);
console.log(purposeOptions);

const brandOptions = descGrammar.brandname.groups[0].phrases;
console.log(purposeOptions);

function chunk (len, arr) {
  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

export default {
  components: {
    CoverPage,
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
    const numBrandRepetitions =
      parseInt(initialParsedHash.numBrandRepetitions || '1', 10);
    const catalog = initialParsedHash.catalog || false;

    const sections = computed(() => {
      if (!catalog) return [];
      const alea = new Alea(seed.value);
      return purposeOptions.map(([tag, title]) => ({
        title,
        tags: [tag],
        brands: chunk(8, shuffle(brandOptions, alea).flatMap((b) => {
          return [...Array(numBrandRepetitions)].map((_, i) => ({
            bindings: {'brand': b},
            key: b.replace(' ', '') + tag.join('') + i,
          }));
        })),
      }))
    });

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
      sections,
      catalog,
      // seeds: computed(() => {
      //   return [...Array(12)].map((_, i) => seed.value + i);
      // }),
    };
  }
}
</script>