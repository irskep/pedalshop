// 0-indexed
export function choiceIndex(randVal, outOf) {
  return Math.floor(randVal * outOf);
}

export function choiceItem(randVal, list) {
  return list[choiceIndex(randVal, list.length)];
}

export function star2tags(starSystem) {
  if (starSystem.stars.length == 1) {
    return [
      ['numstars', '1'],
      ['star1type', starSystem.stars[0].starType],
    ];
  }
  else {
    return [
      ['numstars', '2'],
      ['star1type', starSystem.stars[0].starType],
      ['star2type', starSystem.stars[1].starType],
    ];
  }
}

export function precision(n, val) {
  return parseFloat(val.toPrecision(n));
}

export function decimal(n, val) {
  return parseFloat((Math.round(val * 100) / 100).toFixed(n));
}
