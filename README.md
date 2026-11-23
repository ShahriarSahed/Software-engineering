# Raptor Crew Console — Lasers & Feelings

**Software Engineering Course Project · Fall 2026**  
**Student:** Shahriar Jaman Sahed

A responsive browser-based game companion for the crew of the interstellar scout ship Raptor. It provides character setup, player dice rolls and a GM encounter generator.

## Links

- **GitHub repository:** https://github.com/ShahriarSahed/Software-engineering
- **Expected GitHub Pages URL:** https://shahriarsahed.github.io/Software-engineering/

The application is committed and the automated test job passes. **Publication is still blocked:** GitHub Actions cannot create the Pages site because the connected GitHub integration lacks permission to enable Pages. A repository administrator must open **Settings → Pages → Build and deployment**, select **GitHub Actions** as the publishing source, and save. Then rerun the workflow. The URL above is the intended address, not a verified live deployment.

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

## Sprint 2 planning

**Sprint goal:** complete character creation and deliver a publishable release that lets a player create a character profile with a name, style and role, keep the profile for future sessions, and use the existing player and GM tools.

**Sprint end stated in the assignment:** Monday, 19 October 2026 at 10:00.

**Capacity estimate:** 180 minutes (within the activity's suggested 150–225 minutes).

| Planned work | Estimate |
| --- | ---: |
| Character name field, required input and clear feedback | 25 min |
| Style and role selectors with the exact brief options | 20 min |
| Save and restore the complete character profile | 30 min |
| Validate names, style, role and number before saving | 25 min |
| Add automated character-profile tests | 35 min |
| Responsive layout, keyboard and screen-reader checks | 25 min |
| Regression testing, README and release preparation | 20 min |
| **Total** | **180 min** |

**Publishable-release decision:** both supplied Sprint 2 stories are selected. Together with the existing Sprint 1 dice roller, number comparison and GM encounter generator, they complete the main player setup and game loop. The profile is stored locally in the browser; cross-device synchronisation is not part of this release.

### Sprint 2 backlog

The stories were placed in the sprint as **(Not started)** during planning. After implementation and verification, the final status is shown below.

- (Done) As a player, I want to be able to give my character a name, because I want to be immersed into the game.
- (Done) As a player, I want to be able to choose a style and role for my character, so I can remember them.

**Acceptance criteria**

- Character name is required, trimmed and limited to 40 characters.
- Style is one of Alien, Android, Dangerous, Heroic, Hot-Shot, Intrepid or Savvy.
- Role is one of Doctor, Envoy, Engineer, Explorer, Pilot, Scientist or Soldier.
- A player can save and reload their character profile in the same browser.
- Invalid or missing profile data is not saved as a valid character.

## Sprint 2 daily scrum / implementation log

The activity instructions describe daily scrum updates, but no dated meeting notes from class were supplied. The following is an implementation sequence and status record based on the code and tests in this repository; it is not presented as fabricated dated meeting minutes.

1. **Character naming — (In progress → Done):** checked the name field, required input, trimming and 40-character limit. Saving and restoring the name works through the character profile.
2. **Style and role — (In progress → Done):** checked both selectors against the seven styles and seven roles in the project brief.
3. **Profile validation — (In progress → Done):** extracted validation into the game-logic module so allowed name, style, role and number values can be tested independently.
4. **Regression tests — (In progress → Done):** extended the automated suite to cover all style and role choices and invalid character profiles.
5. **Release preparation — (In progress → Done):** checked the application files and updated the sprint report. GitHub Pages publication remains blocked until the repository Pages source is enabled manually.

## Sprint 2 review

### Completed user stories

- As a player, I want to be able to give my character a name, because I want to be immersed into the game.
- As a player, I want to be able to choose a style and role for my character, so I can remember them.

The character form supports both stories. It includes a required character name, the seven styles and seven roles from the brief, a player number, profile saving and profile restoration. Validation is shared with the game-logic module and covered by automated tests.

**Verification:** the automated test suite now contains 12 tests covering D6 outcomes, both approaches, matching-number Laser Feelings, bonus dice, GM encounters, the allowed character choices and invalid profile data. All 12 tests must pass in the latest Actions run. The Pages deployment step is separate and has not succeeded yet.

**Application URL:** https://shahriarsahed.github.io/Software-engineering/

**Publication status:** this is the intended GitHub Pages URL, but it is not yet confirmed live. The last deployment attempt failed because GitHub rejected the workflow's request to enable Pages (Resource not accessible by integration). A repository administrator must enable Pages with **Settings → Pages → Build and deployment → GitHub Actions**, save, and rerun the workflow before submitting this as a published application.

## Sprint 2 retrospective

**What went well:** the existing project already had the character form and browser-local profile storage. Extracting profile validation made its rules easier to test without opening the browser. The extra regression tests now protect the exact character options from the brief.

**What could be improved:** profile data is local to one browser and is not shared with other players. The next iteration could add a shared session, GM-managed crew list, export/import and more browser-level end-to-end checks.

**Release limitation:** the code and tests are committed, but GitHub Pages has not published the site because the repository's Pages feature must be enabled by an administrator. The intended URL is documented above but must not be represented as live until a successful deployment is visible in GitHub Actions.

**Timing and reporting note:** the stated Sprint 2 end date (19 October 2026) has passed. This README was updated on 23 November 2026 based on the current repository state. The implementation log is a status summary, not a claim that dated daily scrum meetings occurred on particular days.

**AI use:** an AI language model assisted with the implementation, tests and documentation. Review the code and be prepared to explain it before presenting the work. See [AI-USE.md](AI-USE.md).

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
