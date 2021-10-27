<template>
  <main :class="{ bot: bot }">
    <nav v-if="!bot">
      <p>
        <button @click="travel" style="font-size: 1rem;">
          Make another one
        </button>
      </p>
    </nav>

    <div class="Content">
      <Entry brand="" tags="" :buyButton="!bot" v-bind:seed="seed"></Entry>
    </div>

    <section v-if="!bot">
      <p><strong>What am I looking at here?</strong></p>
      <p>
        This is a silly art project that has two parts: some code that makes
        images of random guitar pedals using CSS, and a text generator that uses
        grammars to create imaginary marketing copy for those guitar pedals.
      </p>
      <p>
        I made it because I was browsing a music gear catalog and I thought it
        was cute how all the descriptions of audio equipment use the same
        sentence structure and vocabulary. This was during
        <a href="https://procjam.com">Procjam</a>, the perfect excuse to invest
        a ton of time making this page.
      </p>
      <p>
        Unlike most other "This X Does Not Exist" sites, there is no fancy
        machine learning here.
        <a
          href="https://blog.steveasleep.com/lets-generate-some-imaginary-guitar-pedals"
          >Read the technical deep dive</a
        >
        if you want the details, or just
        <a
          href="https://github.com/irskep/pedalshop/tree/master/src/improvgrammar"
          >peek at the grammar files!</a
        >
      </p>
    </section>

    <footer v-if="!bot">
      <strong>Tools used to make this site:</strong>

      <div>
        <a href="https://sweetwater.com/">
          Sweetwater
        </a>
        for inspiration.
      </div>

      <div>
        <a href="https://improv.readthedocs.io/">Improv</a> for generating text.
      </div>

      <div>
        The
        <a
          href="https://www.cooperhewitt.org/open-source-at-cooper-hewitt/cooper-hewitt-the-typeface-by-chester-jenkins/"
        >
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
import { ref, computed, onMounted, onBeforeUpdate } from "@vue/composition-api";

import CoverPage from "./CoverPage.vue";
import Gfx from "./Gfx.vue";
import Entry from "./Entry.vue";
import { shuffle } from "./util";

import makeImprovGenerators from "./makeImprovGenerators";
import queryString from "query-string";
import omniGrammar from "./improvgrammar/all";

const purposeOptions = omniGrammar.purpose.groups.map(({ tags, phrases }) => [
  tags[0],
  phrases[0],
]);

const brandOptions = omniGrammar.brandname.groups[0].phrases;

function chunk(len, arr) {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
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
    const numBrandRepetitions = parseInt(
      initialParsedHash.numBrandRepetitions || "1",
      10
    );
    const catalog = initialParsedHash.catalog || false;
    const bot = initialParsedHash.bot || false;
    document.body.className = bot ? "bot" : "";

    const sections = computed(() => {
      if (!catalog) return [];
      const alea = new Alea(seed.value);
      return purposeOptions.map(([tag, title]) => ({
        title,
        tags: [tag],
        brands: chunk(
          8,
          shuffle(brandOptions, alea).flatMap((b) => {
            return [...Array(numBrandRepetitions)].map((_, i) => ({
              bindings: { brand: b },
              key: b.replace(" ", "") + tag.join("") + i,
            }));
          })
        ),
      }));
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
        seed.value = parseInt(parsedHash.seed, 10);
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
      bot,
      // seeds: computed(() => {
      //   return [...Array(12)].map((_, i) => seed.value + i);
      // }),
    };
  },
};
</script>
