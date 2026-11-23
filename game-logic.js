export const STYLES = Object.freeze([
  'Alien', 'Android', 'Dangerous', 'Heroic', 'Hot-Shot', 'Intrepid', 'Savvy'
]);

export const ROLES = Object.freeze([
  'Doctor', 'Envoy', 'Engineer', 'Explorer', 'Pilot', 'Scientist', 'Soldier'
]);

/** Validate the complete character profile accepted by the crew form. */
export function isValidCharacterProfile(profile) {
  return Boolean(
    profile
    && typeof profile.name === 'string'
    && profile.name.trim().length > 0
    && profile.name.trim().length <= 40
    && STYLES.includes(profile.style)
    && ROLES.includes(profile.role)
    && Number.isInteger(profile.number)
    && profile.number >= 2
    && profile.number <= 5
  );
}

export const ENCOUNTERS = Object.freeze([
  Object.freeze({
    title: 'A silent distress beacon',
    hook: 'A damaged courier ship repeats an old Consortium emergency code. Its cargo bay is sealed from the inside.',
    complication: 'The beacon keeps transmitting, even after the ship loses all power.'
  }),
  Object.freeze({
    title: 'Unexpected first contact',
    hook: 'A small alien vessel matches the Raptor’s speed and sends a message in a language no one recognises.',
    complication: 'The visitors seem to know Captain Darcy personally.'
  }),
  Object.freeze({
    title: 'The impossible signal',
    hook: 'A repeating signal comes from a planet that does not appear on any star chart.',
    complication: 'The signal is being broadcast from somewhere inside the Raptor.'
  }),
  Object.freeze({
    title: 'Trouble at the outpost',
    hook: 'A remote research station has gone quiet just as a valuable scientific discovery was announced.',
    complication: 'The station’s automated defence system identifies the crew as intruders.'
  }),
  Object.freeze({
    title: 'A diplomatic emergency',
    hook: 'Two rival alien delegations demand the Raptor’s help before a fragile peace agreement collapses.',
    complication: 'Both sides insist that the other delegation is an impostor.'
  }),
  Object.freeze({
    title: 'Something in the dark',
    hook: 'A huge unidentified object is drifting toward a populated Consortium world.',
    complication: 'It changes course whenever the crew looks directly at it.'
  })
]);

/** Return one fair six-sided die result. The random function is injectable for tests. */
export function rollD6(random = Math.random) {
  if (typeof random !== 'function') {
    throw new TypeError('random must be a function');
  }
  const sample = random();
  if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
    throw new RangeError('random must return a number from 0 (inclusive) to 1 (exclusive)');
  }
  return Math.floor(sample * 6) + 1;
}

/**
 * Roll the player's pool and apply the Lasers and Feelings under/over test.
 * A matching die triggers Laser Feelings and counts as one success.
 */
export function rollPlayerDice({
  number,
  approach,
  prepared = false,
  expert = false,
  random = Math.random
}) {
  if (!Number.isInteger(number) || number < 2 || number > 5) {
    throw new RangeError('number must be an integer from 2 to 5');
  }
  if (approach !== 'lasers' && approach !== 'feelings') {
    throw new RangeError('approach must be "lasers" or "feelings"');
  }
  const count = 1 + Number(Boolean(prepared)) + Number(Boolean(expert));
  const dice = Array.from({ length: count }, () => rollD6(random));
  const strictSuccesses = dice.filter((die) => (
    approach === 'lasers' ? die < number : die > number
  )).length;
  const laserFeelings = dice.includes(number);
  // In the current rules, a Laser Feelings result also counts as one success.
  const successes = strictSuccesses + Number(laserFeelings);
  const outcome = successes >= 3
    ? 'Critical success'
    : ['Failure', 'Partial success', 'Success'][successes];

  return { dice, successes, laserFeelings, outcome, approach, number };
}

/** Return the GM encounter associated with a known D6 result. */
export function encounterForRoll(roll) {
  if (!Number.isInteger(roll) || roll < 1 || roll > 6) {
    throw new RangeError('roll must be an integer from 1 to 6');
  }
  return { roll, ...ENCOUNTERS[roll - 1] };
}

/** Roll a D6 and return a ready-to-use random adventure hook. */
export function generateEncounter(random = Math.random) {
  return encounterForRoll(rollD6(random));
}
