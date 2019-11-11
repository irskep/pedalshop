<template>
  <main>
    <nav>
      <button @click="travel">Next</button>
    </nav>

    <article v-if="pedal">
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
import { ref, computed, onMounted } from '@vue/composition-api';
import makeImprovGenerators from './makeImprovGenerators';
import queryString from 'query-string';

export default {
  setup() {
    const parsedHash = queryString.parse(window.location.hash);

    const seed = ref(null);
    const pedal = ref(null);

    function derive() {
      const alea = new Alea(seed.value);
      const {nameGen, subGen, descGen} = makeImprovGenerators(alea);
      const model = {};
      const name = nameGen.gen('name', model);
      const subtitle = subGen.gen('root', model);
      const desc = descGen.gen('root', model);
      pedal.value = {
        name,
        subtitle,
        texts: desc.split('\n\n').filter((s) => s),
      };
      window.location.hash = `seed=${seed.value}`;
      console.log(model);

      for (let i=0; i<10; i++) {
        console.log(nameGen.gen('name'));
      }
    }

    function travel() {
      seed.value = Date.now();
      console.log("Traveling to", seed.value);
      derive();
    }

    onMounted(() => {
      if (parsedHash.seed && !isNaN(parseInt(parsedHash.seed, 10))) {
        seed.value = parseInt(parsedHash.seed, 10)
        console.log("Set seed:", seed.value);
      }
      if (seed.value) {
        derive();
      } else {
        travel();
      }
    });

    return {
      seed,
      pedal,
      travel,
    }
  }
}
</script>