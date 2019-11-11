import Improv from 'improv';
import nameGrammar from './improvgrammar/name.yaml';
import subtitleGrammar from './improvgrammar/subtitle.yaml';
import descGrammar from './improvgrammar/desc.yaml';

const augmentedDescGrammar = Object.assign({}, nameGrammar, descGrammar);

function dryness() {
  return function (group) {
    const self = this;
    const newPhrases = group.phrases.filter(function (phrase) {
      if (!phrase)
        return true;
      return self.history.indexOf(phrase) === -1;
    });
    const newGroup = Object.create(group);
    newGroup.phrases = newPhrases;
    return [0, newGroup];
  };
}

const builtins = {
  uncap (str) {
    if (str.length < 3) return str;
    return str.toLocaleLowerCase();
  },
  oldify (str) {
    return str.slice(1);
  },
  id: (str) => str,
};

export default function makeImprovGenerators(alea) {
  const nameGen = new Improv(nameGrammar, {
    filters: [
      Improv.filters.mismatchFilter(),
      Improv.filters.partialBonus(),
      Improv.filters.fullBonus(),
      dryness(),
    ],
    builtins,
    reincorporate: true,
    // audit: true,
    persistence: false,
    rng: alea,
  });

  const subGen = new Improv(subtitleGrammar, {
    filters: [
      Improv.filters.mismatchFilter(),
      Improv.filters.partialBonus(),
      Improv.filters.fullBonus(),
      dryness(),
    ],
    builtins,
    reincorporate: true,
    // audit: true,
    persistence: false,
    rng: alea,
  });

  const descGen = new Improv(augmentedDescGrammar, {
    filters: [
      Improv.filters.mismatchFilter(),
      Improv.filters.partialBonus(),
      Improv.filters.fullBonus(),
      dryness(),
    ],
    builtins,
    reincorporate: true,
    // audit: true,
    persistence: false,
    rng: alea,
  });

  return { nameGen, descGen, subGen };
}