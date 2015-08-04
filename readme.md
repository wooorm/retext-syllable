# retext-syllable [![Build Status](https://img.shields.io/travis/wooorm/retext-syllable.svg)](https://travis-ci.org/wooorm/retext-syllable) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext-syllable.svg)](https://codecov.io/github/wooorm/retext-syllable)

Count syllables with [**retext**](https://github.com/wooorm/retext).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext-syllable
```

**retext-syllable** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](retext-syllable.js) and
[compressed](retext-syllable.min.js).

## Usage

```js
var retext = require('retext');
var inspect = require('unist-util-inspect');
var syllable = require('retext-syllable');

retext().use(syllable).use(function () {
    return function (cst) {
        console.log(inspect(cst));
    };
}).process('A yellow fresh banana.');
```

Yields:

```text
RootNode[1] [data={"syllableCount":7}]
└─ ParagraphNode[1] [data={"syllableCount":7}]
   └─ SentenceNode[8] [data={"syllableCount":7}]
      ├─ WordNode[1] [data={"syllableCount":1}]
      │  └─ TextNode: 'A'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"syllableCount":2}]
      │  └─ TextNode: 'yellow'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"syllableCount":1}]
      │  └─ TextNode: 'fresh'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"syllableCount":3}]
      │  └─ TextNode: 'banana'
      └─ PunctuationNode: '.'
```

## API

None, **retext-syllable** automatically detects the syllables of each
[`WordNode`](https://github.com/wooorm/nlcst#wordnode) (using
[**wooorm/syllable**](https://github.com/wooorm/syllable)), and stores the
count in `node.data.syllableCount`.

All parents (such as  sentences, paragraphs, root) also receive a
`syllableCount` property (`parent.data.syllableCount`).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
