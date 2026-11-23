import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ENCOUNTERS,
  encounterForRoll,
  generateEncounter,
  rollD6,
  rollPlayerDice
} from '../game-logic.js';

test('rollD6 returns each possible face from one to six', () => {
  const samples = [0, 0.17, 0.34, 0.5, 0.67, 0.999999];
  assert.deepEqual(samples.map((sample) => rollD6(() => sample)), [1, 2, 3, 4, 5, 6]);
});

test('rollD6 rejects invalid random samples', () => {
  for (const sample of [-0.1, 1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(() => rollD6(() => sample), RangeError);
  }
  assert.throws(() => rollD6(null), TypeError);
});

test('Lasers succeeds only on dice strictly below the character number', () => {
  const values = [1, 2, 3];
  const result = rollPlayerDice({ number: 3, approach: 'lasers', prepared: true, expert: true, random: () => (values.shift() - 0.5) / 6 });
  assert.deepEqual(result.dice, [1, 2, 3]);
  assert.equal(result.successes, 3);
  assert.equal(result.outcome, 'Critical success');
  assert.equal(result.laserFeelings, true);
});

test('Feelings succeeds only on dice strictly above the character number', () => {
  const values = [3, 4, 6];
  const result = rollPlayerDice({ number: 3, approach: 'feelings', prepared: true, expert: true, random: () => (values.shift() - 0.5) / 6 });
  assert.deepEqual(result.dice, [3, 4, 6]);
  assert.equal(result.successes, 3);
  assert.equal(result.outcome, 'Critical success');
  assert.equal(result.laserFeelings, true);
});

test('matching the character number triggers Laser Feelings and counts as one success', () => {
  const result = rollPlayerDice({ number: 4, approach: 'lasers', random: () => 3.5 / 6 });
  assert.deepEqual(result.dice, [4]);
  assert.equal(result.successes, 1);
  assert.equal(result.laserFeelings, true);
  assert.equal(result.outcome, 'Partial success');
});

test('prepared and expert each add one die', () => {
  const result = rollPlayerDice({ number: 5, approach: 'lasers', prepared: true, expert: true, random: () => 0 });
  assert.equal(result.dice.length, 3);
  assert.deepEqual(result.dice, [1, 1, 1]);
  assert.equal(result.successes, 3);
  assert.equal(result.outcome, 'Critical success');
});

test('player dice validation checks the number and approach', () => {
  assert.throws(() => rollPlayerDice({ number: 1, approach: 'lasers' }), RangeError);
  assert.throws(() => rollPlayerDice({ number: 6, approach: 'lasers' }), RangeError);
  assert.throws(() => rollPlayerDice({ number: 3, approach: 'both' }), RangeError);
});

test('every D6 encounter result has a unique hook', () => {
  for (let roll = 1; roll <= 6; roll += 1) {
    const encounter = encounterForRoll(roll);
    assert.equal(encounter.roll, roll);
    assert.ok(encounter.title.length > 0);
    assert.ok(encounter.hook.length > 0);
    assert.ok(encounter.complication.length > 0);
  }
  assert.equal(ENCOUNTERS.length, 6);
  assert.throws(() => encounterForRoll(0), RangeError);
  assert.throws(() => encounterForRoll(7), RangeError);
});

test('generateEncounter uses its injected random source', () => {
  const encounter = generateEncounter(() => 5.5 / 6);
  assert.equal(encounter.roll, 6);
  assert.equal(encounter.title, ENCOUNTERS[5].title);
});
