import Improv from 'improv';
import omniGrammar from './improvgrammar/all';

// const usedSymbols = {};
// function uniquify(grammar) {
//   for (let k of Object.keys(grammar)) {
//     if (usedSymbols[k]) {
//       throw new Error(`Duplicate symbol: ${k}`);
//     }
//     usedSymbols[k] = true;
//   }
// }
// uniquify(subtitleGrammar);
// uniquify(descGrammar);
// uniquify(nounsGrammar);
// uniquify(adjsVerbsGrammar);
// uniquify(nameOfMusicianGrammar);
// uniquify(pedalWordsGrammar);

// const omniGrammar = Object.assign(
//   {},
//   subtitleGrammar,
//   descGrammar,
//   nounsGrammar,
//   adjsVerbsGrammar,
//   nameOfMusicianGrammar,
//   pedalWordsGrammar);

console.log(
  omniGrammar.desc1.groups[0].phrases.length,
  omniGrammar.extra.groups[0].phrases.length,
  omniGrammar.desc1.groups[0].phrases.length *
    omniGrammar.extra.groups[0].phrases.length);

function dryness() {
  return function (group) {
    if (group.dry === false) {
      return 0;
    }

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
    const spaceSplits = str.split(' ');
    const dashSplits = str.split('-');
    const v2Words = [
      'V2',
      '+',
    ];
    if (spaceSplits.length > 1) {
      if (v2Words.indexOf(spaceSplits[spaceSplits.length - 1]) !== -1) {
        return spaceSplits.slice(0, spaceSplits.length - 1).join(' ');
      } else {
        return spaceSplits.slice(1).join(' ');
      }
    } else if (dashSplits.length > 1) {
      return str.slice(1);
    } else {
      return str.slice(1);
    }
  },
  id: (str) => str,
  The: (str) => {
    if (str.toLowerCase().startsWith('the ')) {
      return str;
    } else {
      return `The ${str}`;
    }
  },
  the: (str) => {
    if (str.toLowerCase().startsWith('the ')) {
      return str;
    } else {
      return `the ${str}`;
    }
  }
};

export default function makeImprovGenerators(alea) {
  const subGen = new Improv(omniGrammar, {
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

  const pedalWordsGen = new Improv(omniGrammar, {
    filters: [
      Improv.filters.mismatchFilter(),
      Improv.filters.partialBonus(),
      Improv.filters.fullBonus(),
      Improv.filters.dryness(),
    ],
    builtins,
    reincorporate: true,
    // audit: true,
    persistence: true,
    rng: alea,
  });

  const descGen = new Improv(omniGrammar, {
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

  return { descGen, subGen, pedalWordsGen };
}