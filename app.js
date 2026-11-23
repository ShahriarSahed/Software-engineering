import { STYLES, ROLES, rollPlayerDice, generateEncounter } from './game-logic.js';

const PROFILE_KEY = 'raptor-crew-profile-v1';
const DEFAULT_PROFILE = Object.freeze({ name: 'Jim Powers', style: 'Alien', role: 'Explorer', number: 3 });
const byId = (id) => document.getElementById(id);

const profileForm = byId('profile-form');
const nameInput = byId('character-name');
const styleInput = byId('character-style');
const roleInput = byId('character-role');
const numberInput = byId('character-number');
const numberOutput = byId('number-output');
const profileStatus = byId('profile-status');
const rollingAs = byId('rolling-as');
const playerResult = byId('player-result');
const historyList = byId('roll-history');
const gmResult = byId('gm-result');

let currentProfile = { ...DEFAULT_PROFILE };
let rollHistory = [];

function setStatus(message, type = '') {
  profileStatus.textContent = message;
  profileStatus.className = `inline-status${type ? ` status-${type}` : ''}`;
}

function isValidProfile(value) {
  return value
    && typeof value.name === 'string'
    && value.name.trim().length > 0
    && value.name.trim().length <= 40
    && STYLES.includes(value.style)
    && ROLES.includes(value.role)
    && Number.isInteger(value.number)
    && value.number >= 2
    && value.number <= 5;
}

function populateProfile(profile) {
  currentProfile = { ...profile };
  nameInput.value = profile.name;
  styleInput.value = profile.style;
  roleInput.value = profile.role;
  numberInput.value = String(profile.number);
  numberOutput.value = String(profile.number);
  numberOutput.textContent = String(profile.number);
  updateRollingAs();
}

function updateRollingAs() {
  const label = nameInput.value.trim() || 'Crew member';
  rollingAs.textContent = `${label} · Number ${numberInput.value}`;
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (!saved) {
      populateProfile(DEFAULT_PROFILE);
      return;
    }
    const parsed = JSON.parse(saved);
    if (!isValidProfile(parsed)) {
      localStorage.removeItem(PROFILE_KEY);
      populateProfile(DEFAULT_PROFILE);
      setStatus('Saved profile was invalid and has been reset.', 'error');
      return;
    }
    populateProfile(parsed);
    setStatus('Saved profile loaded from this browser.', 'success');
  } catch (error) {
    populateProfile(DEFAULT_PROFILE);
    setStatus('Browser storage is unavailable. You can still play this session.', 'error');
  }
}

function saveProfile(event) {
  event.preventDefault();
  const profile = {
    name: nameInput.value.trim(),
    style: styleInput.value,
    role: roleInput.value,
    number: Number(numberInput.value)
  };
  if (!isValidProfile(profile)) {
    setStatus('Enter a name (1–40 characters) and check your character details.', 'error');
    nameInput.focus();
    return;
  }
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    populateProfile(profile);
    setStatus('Character saved on this device.', 'success');
  } catch (error) {
    populateProfile(profile);
    setStatus('Character updated for this session, but browser storage is unavailable.', 'error');
  }
}

function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_KEY);
    populateProfile(DEFAULT_PROFILE);
    setStatus('Saved profile cleared. Edit the example profile and save when ready.');
  } catch (error) {
    populateProfile(DEFAULT_PROFILE);
    setStatus('Profile reset for this session. Browser storage is unavailable.', 'error');
  }
}

function selectedApproach() {
  return document.querySelector('input[name="approach"]:checked')?.value || 'lasers';
}

function outcomeClass(outcome) {
  if (outcome === 'Failure') return 'failure';
  if (outcome === 'Partial success') return 'partial';
  return '';
}

function renderPlayerResult(result) {
  const mode = result.approach === 'lasers' ? 'LASERS' : 'FEELINGS';
  const dice = result.dice.map((die) => {
    const isInsight = die === result.number;
    const isSuccess = isInsight || (result.approach === 'lasers' ? die < result.number : die > result.number);
    const classes = ['die-face', isSuccess ? 'success' : '', isInsight ? 'insight' : ''].filter(Boolean).join(' ');
    return `<span class="${classes}" aria-label="${die}${isSuccess ? ', success' : ', not a success'}">${die}</span>`;
  }).join('');
  const insight = result.laserFeelings
    ? '<p class="insight-note"><strong>LASER FEELINGS!</strong> You matched your number. Ask the GM one question and get an honest answer.</p>'
    : '';
  playerResult.innerHTML = `
    <div class="result-topline"><span class="result-mode">${mode} · NUMBER ${result.number}</span><span class="result-outcome ${outcomeClass(result.outcome)}">${result.outcome}</span></div>
    <div class="dice-row" aria-label="Dice results">${dice}</div>
    <p class="result-summary">${result.successes} ${result.successes === 1 ? 'success' : 'successes'} from ${result.dice.length} ${result.dice.length === 1 ? 'die' : 'dice'}.</p>
    ${insight}`;
}

function renderHistory() {
  historyList.replaceChildren();
  if (rollHistory.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'history-empty';
    empty.textContent = 'Your dice history will appear here.';
    historyList.append(empty);
    return;
  }
  for (const item of rollHistory) {
    const row = document.createElement('li');
    row.className = 'history-item';
    const description = document.createElement('span');
    description.textContent = `${item.name} · ${item.approach} · ${item.dice.join(', ')}`;
    const score = document.createElement('strong');
    score.textContent = `${item.successes} ${item.successes === 1 ? 'success' : 'successes'}`;
    const outcome = document.createElement('span');
    outcome.className = 'history-outcome';
    outcome.textContent = item.outcome;
    row.append(description, score, outcome);
    historyList.append(row);
  }
}

function handlePlayerRoll() {
  const liveNumber = Number(numberInput.value);
  const result = rollPlayerDice({
    number: liveNumber,
    approach: selectedApproach(),
    prepared: byId('prepared').checked,
    expert: byId('expert').checked
  });
  renderPlayerResult(result);
  rollHistory.unshift({
    name: nameInput.value.trim() || 'Crew member',
    approach: result.approach === 'lasers' ? 'Lasers' : 'Feelings',
    dice: result.dice,
    successes: result.successes,
    outcome: result.outcome
  });
  rollHistory = rollHistory.slice(0, 5);
  renderHistory();
}

function handleGmRoll() {
  const encounter = generateEncounter();
  gmResult.replaceChildren();
  const die = document.createElement('span');
  die.className = 'gm-roll-number';
  die.textContent = String(encounter.roll);
  die.setAttribute('aria-label', `D6 result ${encounter.roll}`);
  const content = document.createElement('div');
  const kicker = document.createElement('p');
  kicker.className = 'gm-result-kicker';
  kicker.textContent = 'NEXT ENCOUNTER';
  const title = document.createElement('strong');
  title.textContent = encounter.title;
  const hook = document.createElement('p');
  hook.textContent = encounter.hook;
  const complication = document.createElement('p');
  complication.textContent = `Complication: ${encounter.complication}`;
  content.append(kicker, title, hook, complication);
  gmResult.append(die, content);
}

numberInput.addEventListener('input', () => {
  numberOutput.value = numberInput.value;
  numberOutput.textContent = numberInput.value;
  updateRollingAs();
});
nameInput.addEventListener('input', updateRollingAs);
profileForm.addEventListener('submit', saveProfile);
byId('clear-profile').addEventListener('click', clearProfile);
byId('player-roll').addEventListener('click', handlePlayerRoll);
byId('gm-roll').addEventListener('click', handleGmRoll);
byId('clear-history').addEventListener('click', () => {
  rollHistory = [];
  renderHistory();
});

loadProfile();
renderHistory();
