export default function seededRandomGenerator(seedNum) {
  let seed = seedNum;
  return function(min = 0, max = 1) {
    seed = (seed * 9301 + 49297) % 233280; // This numbers are not arbitraty. There is mathematical reason.
    return min + (seed / 233280) * (max - min);
  };
}
