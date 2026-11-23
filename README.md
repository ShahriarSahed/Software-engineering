# Raptor Crew Console — Lasers & Feelings

**Software Engineering Course Project · Fall 2026**  
**Student:** Shahriar Jaman Sahed

A responsive browser-based game companion for the crew of the interstellar scout ship Raptor. It provides character setup, player dice rolls and a GM encounter generator.

## Links

- **GitHub repository:** https://github.com/ShahriarSahed/Software-engineering
- **GitHub Pages URL (after deployment):** https://shahriarsahed.github.io/Software-engineering/

The repository includes a GitHub Actions workflow that runs the tests and deploys the static site. For the first deployment, open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the publishing source. The workflow will then publish on pushes to `main`. The Pages site is not considered published until a deployment run succeeds.

## Features

- Character name, style, role and number (2–5), with save/restore using this browser's local storage.
- Player D6 roll with a Lasers or Feelings approach.
- Optional prepared and expert dice.
- Rules-based success count, outcome and Laser Feelings insight.
- GM D6 encounter generator with six hooks and complications.
- Recent player roll history (current page session).
- Responsive, keyboard-accessible UI with screen-reader result announcements.

No account, backend or third-party JavaScript library is required. Character data stays in the current browser and is not synced to another device or shared with the GM.

## Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ShahriarSahed/Software-engineering.git
   cd Software-engineering
   ```
2. Run a local web server (ES modules work best over HTTP):
   ```bash
   python -m http.server 8000
   ```
3. Visit http://localhost:8000.

## Tests

Run the automated game-logic tests with Node.js 22 or newer:

```bash
npm test
```

The tests cover D6 boundaries and invalid inputs, Lasers and Feelings rolls, matching-number Laser Feelings, bonus dice, validation and all six GM encounter entries.

## Rules represented

- Choose a character number from **2 to 5**.
- Roll one D6. Add one die if prepared and one if an expert.
- **Lasers:** a die below your number is a success.
- **Feelings:** a die above your number is a success.
- A die matching your number triggers **Laser Feelings**, counts as one success, and lets you ask the GM one question.
- **0 successes:** failure; **1:** partial success; **2:** success; **3 or more:** critical success.

The GM decides what happens in the story. The dice procedure is based on the [Lasers & Feelings rules reference](https://games.rmwinslow.com/rules/rpg-lasers.html).

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Application structure |
| `styles.css` | Responsive visual design |
| `app.js` | Browser interactions, profile storage and result rendering |
| `game-logic.js` | Dice rules and encounter data |
| `tests/game-logic.test.js` | Automated tests |
| `package.json` | Test command |
| `.github/workflows/deploy-pages.yml` | Test and GitHub Pages deployment |
| `AI-USE.md` | AI assistance record |

---

# Sprint work report

## Sprint 1 planning

**Sprint goal:** deliver a minimum usable release where a player can use a modern browser to roll a D6, set their number and compare the result using the Lasers or Feelings approach. A simple GM random-adventure function is additional scope.

**Available time:** approximately 3 × 45 minutes = 135 minutes.

| Planned work | Estimate |
| --- | ---: |
| Browser-ready responsive application shell | 15 min |
| Player D6 roller and result display | 25 min |
| Character number and Lasers/Feelings comparison | 20 min |
| Character profile and browser-local saving | 25 min |
| GM D6 encounter generator | 20 min |
| Automated checks and README | 30 min |
| **Total** | **135 min** |

The minimum viable release is the browser application, player dice roller and number comparison. Character saving and the GM encounter generator were included as achievable additional scope.

## Product backlog

The three user stories originally listed as unprioritized were ordered and selected for implementation in this sprint. They have been moved into Sprint 1. No supplied product-backlog stories remain unselected.

## Sprint 1 backlog

- (Done) As a GM, I want to be able to use the software in a modern web browser, because it is easy to use and easily available.
- (Done) As a player, I want to be able to throw a dice, because the result of the throw determines if I succeed or not in whatever I am trying to do.
- (Done) As a player, I want to be able to set my number, so I can compare it with the result of my dice throw.
- (Done) As a player, I want the software to save my information (number, name, style and role), so I can use them in multiple playing sessions.
- (Done) As a GM, I want to be able to throw a dice, so I can create a random adventure.

## Sprint 2 backlog

These two stories were supplied for Sprint 2 and were also implemented as additional scope:

- (Done) As a player, I want to be able to give my character a name, because I want to be immersed into the game.
- (Done) As a player, I want to be able to choose a style and role for my character, so I can remember them.

## Daily scrum / implementation log

The final statuses below reflect functionality delivered and tested. These notes summarize the implementation sequence; they are not fabricated dated stand-up minutes.

1. **Browser shell:** created the responsive page structure and navigation. Done.
2. **Player dice:** implemented a D6 roll, selectable approach, result display and bonus dice. Done.
3. **Number comparison:** implemented the 2–5 number selection, strict under/over tests and matching-number Laser Feelings success. Done.
4. **Character details:** implemented the name, style and role selectors and local profile storage. Done.
5. **GM support:** implemented the GM D6 encounter table with six adventure hooks and complications. Done.
6. **Verification:** ran the automated test suite and JavaScript syntax checks. All 9 automated tests passed. Done.

## Sprint review

The application delivers all Sprint 1 stories and both character-creation stories supplied for Sprint 2. A player can set up a profile, roll with Lasers or Feelings, see their successes and review recent rolls. The GM can generate an adventure hook. The GitHub Actions deployment workflow is included.

**Publishing step:** configure the repository's Pages source as **GitHub Actions** under Settings → Pages. When the workflow has completed successfully, the application should be available at:

https://shahriarsahed.github.io/Software-engineering/

## Sprint retrospective

### Completed user stories

- As a GM, I want to be able to use the software in a modern web browser.
- As a player, I want to be able to throw a dice.
- As a player, I want to be able to set my number and compare it with the result of my dice throw.
- As a player, I want the software to save my number, name, style and role for use in multiple sessions.
- As a GM, I want to be able to throw a dice to create a random adventure.
- As a player, I want to give my character a name.
- As a player, I want to choose a style and role for my character.

### Reflection

**What went well:** using plain HTML, CSS and JavaScript kept the application small and easy to publish. Separating the dice rules into a module made them easy to test. Character saving and GM prompts add useful session support without requiring a server.

**What could be improved:** profiles are stored only in the current browser, not shared between players or devices. Future work could add shared sessions, ship information, adventure notes and more GM tools. End-to-end testing across browsers and assistive technologies would also improve confidence.

**AI use:** an AI language model assisted with drafting the implementation, tests and documentation. The student should review the code and understand it before presenting the work. See [AI-USE.md](AI-USE.md).

## Data dictionary

| Data | Description |
| --- | --- |
| Result | Latest die result is an integer from 1 to 6. |
| Character name | Space-adventure name, up to 40 characters. |
| Character style | Alien, Android, Dangerous, Heroic, Hot-Shot, Intrepid or Savvy. |
| Character role | Doctor, Envoy, Engineer, Explorer, Pilot, Scientist or Soldier. |
| Character number | An integer from 2 to 5, stored with the profile. |
| Approach | Lasers or Feelings, selected for each player roll. |
| Prepared / Expert | Optional flags that each add one D6 to a player roll. |

The supplied brief spells the first style as “Aline”; the application uses the conventional spelling “Alien”.
