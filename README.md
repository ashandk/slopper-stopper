# Slopper Stopper

Created by [Ashan Dhananjaya](https://github.com/ashandk).

A Chrome extension that highlights AI-sounding words and phrases ("AI slop") in green on any web page.

- **Strong tells** get a green highlight. Examples are *delve*, *tapestry*, *plays a crucial role*, *it's not X, it's Y*, *I hope this helps* and em dashes.
- **Everyday words** that are also on the AI lists get a fainter green, so the strong tells stand out. Examples are *key*, *complex*, *ensure*, *explore* and *rather than*.
- It never changes the page. The highlights are drawn by the browser, so editors such as Overleaf keep working normally while you type.

It doesn't work in Google Docs, which draws its pages as images, or in PDFs opened in Chrome's built-in viewer.

## Install

1. Download this repository (**Code → Download ZIP**) and unzip it, or clone it.
2. In Chrome, go to `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and choose the folder that contains `manifest.json`.
4. Refresh any tabs that were already open.

To update, pull or download the latest version, click the reload arrow on the extension's card in `chrome://extensions`, and refresh your tabs.

## Settings

- **Colours.** Edit `highlight.css`. To make every word the same green, give both rules the same number.
- **Em dashes.** Set `HIGHLIGHT_EM_DASHES` to `false` near the top of `content.js`.
- **Turn it off.** Use the switch on the extension's card in `chrome://extensions`.

## Where the words come from

- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing). The "words to watch" lists, the AI-vocabulary lists for each model era, chatbot phrases, hedging disclaimers and leftover chatbot markup.
- [GPTZero's top AI phrases](https://gptzero.me/ai-vocabulary) (October 2026). 96 of the 100 phrases. The other 4 are not real phrases, such as "reply in tone".
- [Hunting the Muse: How to spot when writing is AI](https://huntingthemuse.net/library/how-to-tell-if-writing-is-ai), including the University of Helsinki word list it quotes.
- Two r/Professors threads, "Common Words in AI-Generated Student Papers" and "How do you spot AI writing instantly? What are your go-to red flags when grading?".
- An academic house-style guide's list of stock phrases.

Some words are left out on purpose:

- **associated with**, **empirical**, **causal** and **correlate** are standard terms in empirical research.
- **important** and **these** did not rise significantly in the Helsinki study.
- Wikipedia's edit-summary words, such as *refined* and *clarity*, only apply to Wikipedia edits.
- Technical uses stay plain, for example *robust standard errors*, *robust to*, *statistically significant*, *critical values*, *grounded theory*, *loss landscape*, *reward shaping*, and *leverage* as a noun.

## Contributing

1. Add the word or phrase to `content.js`:
   - put strong tells in `STRONG` and everyday words in `SOFT`
   - each line is matched as whole words, ignoring case
   - a space matches one or more spaces or line breaks, so write `\\s*` where a space is optional
   - entries are regular expressions, so `delv(e|es|ed|ing)` covers every form of *delve*
2. Add an example sentence for it to `scripts/check-words.js`. If the word has a legitimate technical use, add a sentence that must stay plain too.
3. Run the check. It needs Node.js 18 or later.

   ```
   node scripts/check-words.js
   ```

4. Open a pull request. Say where the word comes from: a source, a study or what you have seen in real writing.

The same check runs automatically on every push and pull request.
