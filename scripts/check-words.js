#!/usr/bin/env node
// Checks the word lists in content.js. Run it before you open a pull request:
//
//   node scripts/check-words.js
//
// It fails if an entry is not a valid pattern, if an example below stops
// lighting up, or if a sentence that must stay plain gets highlighted.
// When you add a word or phrase, add an example sentence for it here too.

"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// Each example: a sentence, then every phrase in it that must light up,
// marked "strong:" (green) or "soft:" (fainter green). Matching ignores case.
const SHOULD_MATCH = [
  // academic-paper-style guide
  ["Moreover, these findings highlight the importance of disclosure.", "strong:moreover", "strong:highlight the importance of"],
  ["We leverage LLMs to delve into the nuanced, multifaceted tapestry of the AI landscape.",
    "strong:leverage", "strong:delve", "strong:nuanced", "strong:multifaceted", "strong:tapestry", "strong:landscape"],
  ["Emotion plays a crucial role in shaping market perceptions.", "strong:plays a crucial role in shaping"],
  // Wikipedia: Signs of AI writing
  ["The festival stands as a testament to the town's enduring legacy, setting the stage for a broader shift.",
    "strong:stands as", "strong:testament", "strong:enduring legacy", "strong:setting the stage for"],
  ["It's not just a festival, it's a movement.", "strong:it's not just a festival, it's"],
  ["I hope this helps! Would you like me to expand it?", "strong:i hope this helps", "strong:would you like me to"],
  ["Source: example.com/?utm_source=chatgpt.com and contentReference[oaicite:1]",
    "strong:utm_source=chatgpt.com", "strong:contentreference[oaicite:1]"],
  // GPTZero AI vocabulary
  ["The study aims to provide valuable insights with far-reaching implications.",
    "strong:provide valuable insights", "strong:far-reaching implications"],
  ["These results shed light on a delicate balance and pave the way for a deeper understanding.",
    "strong:shed light on", "strong:a delicate balance", "strong:pave the way for", "strong:a deeper understanding"],
  // r/Professors threads
  ["Students embark on a journey into the realm of paramount ideas.",
    "strong:embark on", "soft:journey", "strong:realm", "strong:paramount"],
  ["Honestly? Utilize a holistic approach tailored to your needs.",
    "strong:honestly?", "strong:utilize", "strong:holistic approach", "strong:tailored to your needs"],
  // Hunting the Muse
  ["But here's the thing: no fluff. The result? Hot take: that's the real unlock.",
    "strong:but here's the thing", "strong:no fluff", "strong:the result?", "strong:hot take:", "strong:that's the real unlock"],
  ["No fluff. No filler. Just results.", "strong:no fluff. no filler. just"],
  ["She opened the book—its pages brittle.", "strong:—"],
  // Everyday words (fainter)
  ["We explore various key settings to ensure the results hold.", "soft:explore", "soft:various", "soft:key", "soft:ensure"],
];

// Sentences that must stay completely plain.
const SHOULD_NOT_MATCH = [
  "Negative shifts are associated with lower CAR.",
  "We report robust standard errors, and the results are robust to alternative specifications.",
  "Firms with high leverage are highly leveraged; the coefficient on leverage is negative.",
  "The loss landscape is flat. Reward shaping helps.",
  "The Highlights section lists results. Use an underscore in file names.",
  "The coefficient is statistically significant at the 5% level and significant at the 10% level.",
  "We compare the statistic with critical values, using grounded theory.",
  "These are important results from 2010–2020.",
  "However, the dynamic model is open in Excel.",
];

// Load content.js the way Chrome would, minus the browser. Its page code
// stops straight away when there is no browser highlighting support.
const source = fs.readFileSync(path.join(__dirname, "..", "content.js"), "utf8");
const context = vm.createContext({});
vm.runInContext(source, context, { filename: "content.js" });
const { STRONG, SOFT, buildPattern } = vm.runInContext("({ STRONG, SOFT, buildPattern })", context);

const problems = [];
const seen = new Map();
for (const [listName, list] of [["STRONG", STRONG], ["SOFT", SOFT]]) {
  for (const entry of list) {
    if (seen.has(entry)) problems.push(`"${entry}" is in ${seen.get(entry)} and ${listName}.`);
    seen.set(entry, listName);
    if (/ [?*]/.test(entry)) {
      problems.push(`"${entry}": a space followed by ? or * needs \\s* instead (a plain space means one or more spaces).`);
    }
    let re;
    try {
      re = new RegExp("(?:" + entry.replace(/ /g, "\\s+") + ")", "i");
    } catch (err) {
      problems.push(`"${entry}" is not a valid pattern: ${err.message}`);
      continue;
    }
    if (re.test("")) problems.push(`"${entry}" can match empty text.`);
  }
}

let pattern;
try {
  pattern = buildPattern();
} catch (err) {
  // A broken entry is already reported above. Otherwise say why, briefly.
  if (!problems.some((p) => p.includes("is not a valid pattern"))) {
    problems.push(`The combined pattern does not build: ${err.message.slice(-120)}`);
  }
}

if (pattern) {
  const found = (text) =>
    [...text.matchAll(pattern)].map(
      (m) => (m.groups.soft !== undefined ? "soft:" : "strong:") + m[0].replace(/\s+/g, " ").toLowerCase()
    );
  for (const [text, ...expected] of SHOULD_MATCH) {
    const got = found(text);
    for (const want of expected) {
      if (!got.includes(want.toLowerCase())) {
        problems.push(`Expected ${want} in: "${text}"\n    Highlighted: ${JSON.stringify(got)}`);
      }
    }
  }
  for (const text of SHOULD_NOT_MATCH) {
    const got = found(text);
    if (got.length) problems.push(`Should stay plain: "${text}"\n    Highlighted: ${JSON.stringify(got)}`);
  }
}

if (problems.length) {
  console.error(`${problems.length} problem(s):\n- ` + problems.join("\n- "));
  process.exit(1);
}
console.log(
  `OK: ${STRONG.length} strong and ${SOFT.length} soft entries, ` +
    `${SHOULD_MATCH.length} examples that should light up and ${SHOULD_NOT_MATCH.length} that should stay plain.`
);
