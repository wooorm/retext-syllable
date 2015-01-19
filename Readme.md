# retext-syllable [![Build Status](https://img.shields.io/travis/wooorm/retext-syllable.svg?style=flat)](https://travis-ci.org/wooorm/retext-syllable) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-syllable.svg?style=flat)](https://coveralls.io/r/wooorm/retext-syllable?branch=master)

Count syllables with **[retext](https://github.com/wooorm/retext "Retext")**.

## Installation

npm:

```bash
$ npm install retext-syllable
```

Component:

```bash
$ component install wooorm/retext-syllable
```

Bower:

```bash
$ bower install retext-syllable
```

## Usage

```javascript
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

None, **retext-syllable** automatically detects the syllable count of each [`WordNode`](https://github.com/wooorm/textom/tree/master#textomwordnode-nlcstwordnode) (using **[wooorm/syllable](https://github.com/wooorm/syllable)**), and stores the count in `node.data.syllableCount`.

Additionally, all parents (such as sentences, paragraphs, root) also receive a `syllableCount` data property (`parent.data.syllableCount`).

## Performance

On a MacBook Air, **retext** performs about 40% slower with **retext-syllable**.

```text
           retext w/o retext-syllable
  225 op/s » A paragraph (5 sentences, 100 words)
   25 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)

           retext w/ retext-syllable
  136 op/s » A paragraph (5 sentences, 100 words)
   14 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
```

## License

MIT © [Titus Wormer](http://wooorm.com)
