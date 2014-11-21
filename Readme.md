# retext-syllable [![Build Status](https://img.shields.io/travis/wooorm/retext-syllable.svg?style=flat)](https://travis-ci.org/wooorm/retext-syllable) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-syllable.svg?style=flat)](https://coveralls.io/r/wooorm/retext-syllable?branch=master)

Count syllables with **[retext](https://github.com/wooorm/retext "Retext")**.

## Installation

npm:
```sh
$ npm install retext-syllable
```

Component:
```sh
$ component install wooorm/retext-syllable
```

Bower:
```sh
$ bower install retext-syllable
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit'),
    syllable = require('retext-syllable'),
    retext;

retext = new Retext()
    .use(visit)
    .use(syllable);

retext.parse('A yellow fresh banana.', function (err, tree) {
    tree.visitType(tree.WORD_NODE, function (node) {
        console.log(node.toString(), node.data.syllableCount);
    });
    /**
     * 'A', 1
     * 'yellow', 2
     * 'fresh', 1
     * 'banana', 3
     */

    tree.visitType(tree.SENTENCE_NODE, function (node) {
        console.log(node.toString(), node.data.syllableCount);
    });
    /* 'A yellow fresh banana.', 7 */
});
```

## API

None, **retext-syllable** automatically detects the syllable count of each word (using **[wooorm/syllable](https://github.com/wooorm/syllable)**) when it’s attached, removed, or changed, and stores the count in `wordNode.data.syllableCount`.

Additionally, all parents (such as sentences, paragraphs, root) also receive a `syllableCount` data property (`parent.data.syllableCount`).

## License

MIT © Titus Wormer
