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
var Retext = require('retext');
var visit = require('retext-visit');
var inspect = require('retext-inspect');
var syllable = require('retext-syllable');

var retext = new Retext()
    .use(visit)
    .use(inspect)
    .use(syllable);

retext.parse('A yellow fresh banana.', function (err, tree) {
    /* Log the first sentence and its words, note its data: */
    console.log(tree.head.head);

    /**
     * SentenceNode[8] [data={"syllableCount":7}]
     * ├─ WordNode[1] [data={"syllableCount":1}]
     * │  └─ TextNode: 'A'
     * ├─ WhiteSpaceNode: ' '
     * ├─ WordNode[1] [data={"syllableCount":2}]
     * │  └─ TextNode: 'yellow'
     * ├─ WhiteSpaceNode: ' '
     * ├─ WordNode[1] [data={"syllableCount":1}]
     * │  └─ TextNode: 'fresh'
     * ├─ WhiteSpaceNode: ' '
     * ├─ WordNode[1] [data={"syllableCount":3}]
     * │  └─ TextNode: 'banana'
     * └─ PunctuationNode: '.'
     */
});
```

## API

None, **retext-syllable** automatically detects the syllable count of each word (using **[wooorm/syllable](https://github.com/wooorm/syllable)**), and stores the count in `wordNode.data.syllableCount`.

Additionally, all parents (such as sentences, paragraphs, root) also receive a `syllableCount` data property (`parent.data.syllableCount`).

## License

MIT © [Titus Wormer](http://wooorm.com)
