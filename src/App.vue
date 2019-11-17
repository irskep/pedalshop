<template>
  <main>
    <nav>
      <button @click="travel">Next</button>
    </nav>

    <article v-if="pedal">
      <Gfx
        v-bind:aleaSavedState="aleaSavedState"
        v-bind:name="pedal.name"
        v-bind:brand="pedal.brand"
        v-bind:purpose="pedal.purpose"
        v-bind:color="pedal.color"
      ></Gfx>

      <h2 class="Brand">{{ pedal.brand }}</h2>
      <h1>{{ pedal.name }}</h1>

      <h3>{{ pedal.subtitle }}</h3>
      <p v-for="(t, i) in pedal.texts" v-bind:key="i">{{ t }}</p>
    </article>

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
    </footer>
  </main>
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
  setup() {
    const seed = ref(null);
    const pedal = ref(null);
    const aleaSavedState = ref(null);
    
    let _alea = null;

    function derive(shouldSetHash) {
      const alea = new Alea(seed.value);
      const {descGen, subGen} = makeImprovGenerators(alea);
      const model = {};
      const name = descGen.gen('name', model);
      const subtitle = subGen.gen('root', model);
      const desc = descGen.gen('root', model);
      const brand = descGen.gen('brand', model);
      console.log(model);
      aleaSavedState.value = alea.exportState();
      pedal.value = {
        name,
        subtitle,
        brand,
        purpose: subGen.gen('purpose', model),
        color: descGen.gen('color', model).toLowerCase(),
        texts: desc.split('\n\n').filter((s) => s),
      };
      if (shouldSetHash) {
        window.location.hash = `seed=${seed.value}`;
      }
      console.log(model);

      // for (let i=0; i<10; i++) {
      //   console.log(descGen.gen('name'));
      // }
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

    onBeforeUpdate(() => {
      _alea = Alea.importState(aleaSavedState.value);
    });

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
      pedal,
      travel,
      aleaSavedState,
    }
  }
}
</script>