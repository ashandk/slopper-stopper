// Slopper Stopper, by Ashan Dhananjaya
//
// Tints AI-sounding words and phrases on any web page. Strong tells are green.
// Everyday words that also appear on the AI lists get a fainter green, so the
// strong tells stand out. The page itself is never edited: highlights are
// drawn with the browser's CSS Custom Highlight API, so editors such as
// Overleaf keep working normally while you type.
//
// How the lists work: each line is matched as whole words, ignoring case, and
// a space matches any run of spaces or line breaks. To add a word, add a line
// such as "game changer", save, then reload the extension in
// chrome://extensions and refresh your tabs. To silence a word, delete its line.

// Em dashes are marked as a strong sign too. Change true to false to stop.
const HIGHLIGHT_EM_DASHES = true;

// --------------------------------------------------------------- STRONG (green)
const STRONG = [
  // From the academic-paper-style skill
  "highlight(s|ed|ing)? (the|its|their|this) (importance|significance)( of)?",
  "underscor(e|es|ed|ing) (the|its|their|this) (importance|significance|need)( of| for)?",
  "highlight(s|ed)?(?= (the|that|how|why|what|this|these|those|its|their|our|both|key|a|an)\\b)",
  "underscor(e|es|ed)(?= (the|that|how|why|what|this|these|those|its|their|our|both|key|a|an)\\b)",
  "leverag(es|ing)",
  "(?<=\\b(to|we|they|can|could|may|might|will|would|should|must|also|further|which|who) )leverage(d)?",
  "(play(s|ed|ing)? (a|an) )?(critical|crucial|vital|pivotal|significant|key) (roles?|moments?)( in shaping)?",
  "(novel|valuable) insights?",
  "powerful signals?",
  "shap(e|es|ed|ing)( (market|investor|public))? (perceptions?|outcomes?|opinion|discourse)",
  "(?<!(reward|traffic|noise|pulse|beam|signal) )shaping",
  "shap(es|ed)(?= (the|how|our|their|its)\\b)",
  "nuanced( understanding)?",
  "multi-?faceted",
  "(?<!(loss|fitness|optimi[sz]ation|energy|error|reward)[\\s-]+)landscapes?",
  "delv(e|es|ed|ing)",
  "tapestr(y|ies)",
  "(it is |it['’]s )?worth noting",
  "importantly",
  "interestingly",
  "moreover",
  "furthermore",
  "additionally",
  "not only",
  "but also",
  "(serv(e|es|ed|ing)|stand(s|ing)?|stood) as( an? (stark |powerful |poignant |sobering )?reminder)?",

  // From Wikipedia: Signs of AI writing (words to watch, AI vocabulary by era,
  // chatbot phrases, hedging disclaimers, chatbot markup)
  "testaments?",
  "(is|was|are|were) a (stark |powerful |poignant |sobering )?reminder",
  "reflect(s|ed|ing)? (the )?broader",
  "symboli[sz]ing",
  "(enduring|lasting|ongoing) (legacy|impact|significance|relevance|influence|importance)",
  "(set|sets|setting) the stage( for)?",
  "(represents?|represented|representing|marks?|marked|marking|signals?|signall?ed|signall?ing) a (significant |major |fundamental |profound |notable |broader )?shift",
  "turning points?",
  "ever-?evolving",
  "focal points?",
  "indelible( mark)?",
  "deeply rooted",
  "deep roots",
  "(this|the|that) (distinction|nuance) (matters|is important)",
  "independent coverage",
  "media outlets?",
  "trade publications?",
  "profiled in",
  "leading experts?",
  "(an )?active social media presence",
  "highlighting",
  "underscoring",
  "emphasi[sz]ing",
  "cultivating",
  "foster(s|ed|ing)?",
  "encompassing",
  "enhanc(e|es|ed|ing)",
  "align(s|ed|ing)? with",
  "resonat(e|es|ed|ing)( with)?",
  "boast(s|ed|ing)?",
  "vibrant",
  "rich (tapestry|history|heritage|legacy|tradition|cultural)",
  "profound(ly)?",
  "showcas(e|es|ed|ing)",
  "exemplif(y|ies|ied|ying)",
  "natural beauty",
  "nestled",
  "in the heart of",
  "groundbreaking",
  "renowned",
  "diverse array",
  "industry reports",
  "observers have (cited|noted|argued|pointed out|observed)",
  "experts (argue|say|believe|suggest|note|agree)",
  "(some )?critics (argue|say|contend|note)",
  "several (sources|publications)",
  "despite (these|those|such|the|its|their|this) challenges?",
  "despite facing",
  "fac(e|es|ed|ing) (several|numerous|many|significant|considerable|various|a number of) challenges",
  "challenges and legacy",
  "future (outlook|prospects)",
  "awards and recognition",
  "bolster(s|ed|ing)?",
  "crucial(ly)?",
  "deep dives?",
  "garner(s|ed|ing)?",
  "interplay",
  "intricac(y|ies)",
  "intricate(ly)?",
  "meticulous(ly)?",
  "pivotal",
  "dependable",
  "echoed",
  "quietly",
  "universally",
  "(it['’]s|it is|this is|that['’]s|that is) not( (just|only|merely|simply|about))? [^.!?\\n]{1,60}?[.,;:—–] (it['’]s|it is|this is|that['’]s)",
  "no [^,.;!?\\n]{1,30}[,.] no [^,.;!?\\n]{1,30}[,.] just",
  "(i )?hope this helps",
  "of course!",
  "certainly!",
  "you['’]re absolutely right",
  "would you like (me )?to",
  "is there anything else",
  "more detailed breakdown",
  "here(['’]s| is) (an?|the|your) (revised|rewritten|polished|refined|updated|improved|draft|summary|breakdown|version|overview)",
  "(i )?(hope|trust) (this|that|my|the)( (message|email|essay|letter|note))? finds you well",
  "i understand your concerns?",
  "apologi[sz]e for any inconvenience",
  "carefully reviewed",
  "specific details (are|remain) (limited|scarce)",
  "not widely (available|documented|disclosed|reported|known)",
  "(in|from|within) the (provided|available) (sources|search results|information|documents)",
  "based on (the )?available information",
  "by (itself|themselves),? establish",
  "(it['’]s|it is) (important|vital|crucial|essential) (to|that we) (note|remember|consider|recogni[sz]e|understand|emphasi[sz]e|acknowledge|highlight)",
  "maintains? a low profile",
  "keeps? (his|her|their|its) personal (life|details|information) private",
  "(up to|as of) my last (training|knowledge) (update|cutoff|cut-off)",
  "in summary",
  "in conclusion",
  "as an ai( language)? model",
  "as a large(-scale)? language model",
  "i['’]m sorry,? but (i|as)",
  "contentreference\\[oaicite:\\d+\\]",
  "oaicite",
  "utm_source=(chatgpt\\.com|openai|copilot\\.com)",
  "referrer=grok\\.com",
  "\\[cite:\\s*\\d+\\]",

  // From GPTZero's top 100 AI phrases (October 2026)
  "(provid(e|es|ed|ing)|offer(s|ed|ing)?) (a |an )?valuable( insights?)?",
  "(a )?stark (reminder|contrast)",
  "(stands?|stood|standing) in stark contrast",
  "broad(er)? implications?",
  "(important|significant|profound|far-reaching|wide-ranging) implications?",
  "implications? (of|for) (the|these|our|this|such) (findings?|study|results?|research)",
  "implications? for (our )?understanding",
  "unwavering",
  "(the |a )?complex interplay",
  "navigat(e|es|ed|ing) (the )?(complex(ities|ity)?|intricacies|challenges|landscape|nuances)",
  "ability to navigate",
  "continu(e|es|ed|ing) to (inspire|captivate|resonate|shape|evolve)",
  "(a )?deeper understanding",
  "gain(s|ed|ing)? (an? |valuable |deeper |further |new )?insights?",
  "transformative",
  "hold(s|ing)? (a )?significant",
  "particularly (a )?concern(ing)?",
  "relentless",
  "emphasi[sz](e|es|ed) the (need|importance|significance|role|value)",
  "targeted interventions?",
  "(a )?significant milestone",
  "potential risks? associated with",
  "(leave|leaves|left|leaving) a lasting",
  "lasting (impact|impression|mark|change)",
  "add(s|ed|ing)? (a|an|another) (new |extra |additional |further )?layer( of)?",
  "(pave|paves|paved|paving) the way( for)?",
  "(a )?(significant|major|crucial|important|giant) step forward",
  "fac(e|es|ed|ing) (a )?significant",
  "rais(e|es|ed|ing) (an? )?(important|critical|crucial|intriguing|interesting) questions?",
  "informed decisions?",
  "particularly with regard to",
  "comprehensive (framework|overview|understanding|analysis|guide|approach|review|examination|exploration)",
  "(provid(e|es|ed|ing)|offer(s|ed|ing)?) a comprehensive",
  "of (the )?utmost importance",
  "important to consider",
  "(a )?unique blend",
  "(couldn['’]t|could not|can['’]t|cannot) help but",
  "framework for understanding",
  "the journey begins",
  "understanding the fundamentals?",
  "(a )?delicate balance",
  "the path (ahead|forward)",
  "(lay|lays|laid|laying) the groundwork",
  "renew(s|ed|ing)? (a )?sense of",
  "aim(s|ed|ing)? to explore",
  "(presents?|presented|presenting|poses?|posed|posing) (a |an )?(unique|significant|formidable) challenges?",
  "(address(es|ed|ing)?|tackl(e|es|ed|ing)) the root causes?",
  "loom(s|ed|ing)? large",
  "approach ensures",
  "(an )?ongoing dialogue",
  "carr(y|ies|ied|ying) (a )?(significant |considerable |great )?weight",
  "shed(s|ding)? (new )?light on",
  "diverse perspectives?",
  "fac(e|es|ed|ing) adversity",
  "potentially lead(s|ing)? to",
  "(a )?broad(er)? understanding",
  "contribut(e|es|ed|ing) to (the|our|a) (better |deeper |broader )?understanding",
  "particularly noteworthy",
  "evidence base for",
  "areas? (of|for) improvement",
  "(undergo(es|ing|ne)?|underwent) (a )?(significant|major|profound|dramatic) (transformation|change|shift)s?",
  "initiatives? aims? to",
  "offer(s|ed|ing)? (a )?unique",
  "(a )?new avenues?",
  "embrac(e|es|ed|ing)",
  "societal expectations?",
  "(in )?today['’]s fast-paced( world)?",
  "fast-paced",

  // From the two r/Professors threads
  "(dive|dives|dived|diving|dove) (deep(er)? )?into",
  "elevat(e|es|ing)",
  "delineat(e|es|ed|ing)",
  "laud(s|ed|ing)?",
  "embark(s|ed|ing)?( on)?",
  "enrich(es|ing)?",
  "unveil(s|ed|ing)?",
  "poised",
  "revolutioni[sz](e|es|ed|ing)",
  "to the forefront",
  "paramount",
  "intriguing(ly)?",
  "realms?",
  "illuminat(e|es|ed|ing)",
  "drawing from",
  "captivat(e|es|ed|ing)",
  "circumnavigat(e|es|ed|ing)",
  "tableaux?",
  "what['’]s more",
  "holistic( approach)?",
  "bustling",
  "exacerbat(e|es|ed|ing)",
  "elucidat(e|es|ed|ing)",
  "not merely",
  "effectively illustrat(e|es|ed|ing)",
  "juxtapos(e|es|ed|ing|ition|itions)",
  "(the )?complexities( of)?",
  "utili[sz](e|es|ed|ing|ation)",
  "tailored to (your|their|the|our) (specific |unique |individual )?needs",
  "guide you through",
  "inclusive society",
  "iconic",
  "honestly\\?",
  "changes how we (understand|think about|see|view)",

  // From Hunting the Muse, "How to spot when writing is AI" (including the
  // University of Helsinki word list it quotes)
  "(but )?here['’]s the (thing|deal)",
  "here['’]s why",
  "then i reali[sz]ed:",
  "the result\\?",
  "hot take:",
  "that['’]s the real [a-z]+",
  "unlock(s|ed|ing)?",
  "empower(s|ed|ing|ment)?",
  "master [^.!?\\n]{1,40}? in \\d+ days",
  "(in )?the (dynamic|ever-changing|ever-evolving|rapidly evolving|fast-paced) (landscape|world|realm) of",
  "as the world continu(es|ed) to (evolve|change)",
  "in today['’]s (digital |modern |ever-changing |rapidly changing |interconnected )?(world|age|era|landscape|society)",
  "shout(s|ed|ing)? into the void",
  "no fluff",
  "looming challenges?",
  "chart(s|ed|ing)? (a|the|our|their|your) (new )?(course|path)",
  "north star",
];

// ------------------------------------------------------ SOFT (fainter green)
// Everyday words that are on the same lists but are common in ordinary
// academic writing, so on their own they are a weak sign.
const SOFT = [
  "key",
  "valuable",
  "robust(?! (standard errors?|to\\b|regressions?|estimat|optimi[sz]ation|control))",
  "complex(ity)?",
  "explor(e|es|ed|ing)",
  "ensur(e|es|ed|ing)",
  "various",
  "such as",
  "overall",
  "hence",
  "consequently",
  "notably",
  "depth",
  "deeply",
  "grasp(s|ed|ing)?",
  "echo(es|ing)?",
  "navigat(e|es|ed|ing)",
  "elevated",
  "enriched",
  "rich",
  "featuring",
  "features an?",
  "(offers?|offered|maintains?|maintained) an?",
  "(functions|functioned|operates|operated) as",
  "(represents?|represented|marks|marked) an?",
  "refers? to",
  "contribut(e|es|ed|ing) to",
  "reflecting",
  "commitment to",
  "featured in",
  "was identified by",
  "in (connection|association) (with|to)",
  "should not be confused with",
  "let me know",
  "i am writing to",
  "rather than",
  "not just",
  "tension between",
  "the logic of",
  "at the forefront",
  "drawing (on|upon)",
  "journey",
  "challenges?",
  "clearer",
  "matters",
  "practical(ly)?",
  "prioriti[sz](e|es|ed|ing)",
  "steady",
  "comprehensive",
  "emphasi[sz](e|es|ed)",
  "aligns",
  "diverse sample",
  "make (it |them )?(more )?accessible",
  "understand(ing)? the behaviou?r",
  "(with|in) regard to",
  // From Hunting the Muse and the Helsinki word list ("statistically
  // significant", "significant at the 5% level" and "critical values" are left alone)
  "(?<!statistically )significant(ly)?(?! at\\b)",
  "critical(ly)?(?! values?\\b)",
  "potential",
  "grounded(?! theory)",
  "road(-|\\s*)maps?",
  "advantages and disadvantages",
];

// Builds one regular expression from the lists. Phrases are tried before
// single words, so "plays a crucial role" is highlighted as one phrase rather
// than just "crucial". scripts/check-words.js tests this same function.
function buildPattern() {
  const prepare = (list) =>
    list
      .map((w, i) => ({ w, i, phrase: w.includes(" ") }))
      .sort((a, b) => b.phrase - a.phrase || a.i - b.i)
      .map(({ w }) => "(?:" + w.replace(/ /g, "\\s+") + ")")
      .join("|");
  return new RegExp(
    "(?<!\\w)(?:(?<strong>" + prepare(STRONG) + ")|(?<soft>" + prepare(SOFT) + "))(?!\\w)" +
      (HIGHLIGHT_EM_DASHES ? "|—" : ""),
    "gi"
  );
}

(() => {
  "use strict";

  // Chrome 105 and later. Older browsers simply get no highlights.
  if (typeof Highlight !== "function" || !CSS.highlights) return;

  const PATTERN = buildPattern();
  // Text inside these is never shown as page text, so it is not scanned.
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "TEMPLATE", "TITLE", "OPTION", "SELECT"]);

  const strong = new Highlight();
  const soft = new Highlight();
  strong.priority = 1;
  CSS.highlights.set("slopper-stopper", strong);
  CSS.highlights.set("slopper-stopper-soft", soft);
  const found = new Map(); // text node -> [{ range, highlight }]

  function forget(node) {
    const entries = found.get(node);
    if (!entries) return;
    for (const { range, highlight } of entries) highlight.delete(range);
    found.delete(node);
  }

  function scanText(node) {
    forget(node);
    const parent = node.parentNode;
    if (!parent || SKIP.has(parent.nodeName.toUpperCase())) return;
    const text = node.data;
    if (text.length < 3) return;
    // In editable text the highlight has to follow the word as you type, so
    // it gets a live range. Elsewhere a static range is enough and costs the
    // page nothing when it changes.
    const live = parent.isContentEditable === true;
    PATTERN.lastIndex = 0;
    let match;
    let entries = null;
    while ((match = PATTERN.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      let range;
      if (live) {
        range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, end);
      } else {
        range = new StaticRange({ startContainer: node, startOffset: start, endContainer: node, endOffset: end });
      }
      const highlight = match.groups.soft !== undefined ? soft : strong;
      highlight.add(range);
      (entries ||= []).push({ range, highlight });
    }
    if (entries) found.set(node, entries);
  }

  // Text nodes wait in a queue and are scanned in short slices, so even a
  // very long page stays responsive while it is being scanned.
  const queue = [];
  let head = 0;
  let pumpScheduled = false;

  function collect(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      queue.push(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && SKIP.has(root.nodeName.toUpperCase())) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (n.nodeType === Node.TEXT_NODE) return NodeFilter.FILTER_ACCEPT;
        return SKIP.has(n.nodeName.toUpperCase()) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
      },
    });
    let n;
    while ((n = walker.nextNode())) queue.push(n);
  }

  function pump() {
    pumpScheduled = false;
    const stopAt = performance.now() + 30;
    while (head < queue.length) {
      const node = queue[head++];
      if (node.isConnected) scanText(node);
      if (performance.now() > stopAt) break;
    }
    if (head < queue.length) schedulePump();
    else queue.length = head = 0;
  }

  function schedulePump() {
    if (!pumpScheduled) {
      pumpScheduled = true;
      setTimeout(pump, 0);
    }
  }

  // Pages change after loading (typing, chat replies, infinite scroll), so
  // changed text is rescanned in small batches.
  const pending = new Set();
  let removedSomething = false;
  let timer = 0;

  function flush() {
    timer = 0;
    if (removedSomething) {
      removedSomething = false;
      for (const node of found.keys()) if (!node.isConnected) forget(node);
    }
    for (const node of pending) if (node.isConnected) collect(node);
    pending.clear();
    schedulePump();
  }

  new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "characterData") {
        pending.add(record.target);
      } else {
        for (const node of record.addedNodes) pending.add(node);
        if (record.removedNodes.length) removedSomething = true;
      }
    }
    if (!timer) timer = setTimeout(flush, 200);
  }).observe(document.documentElement, { childList: true, characterData: true, subtree: true });

  collect(document.body || document.documentElement);
  schedulePump();
})();
