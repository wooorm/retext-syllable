'use strict';

var syllable,
    content,
    visit,
    Retext,
    assert,
    tree,
    counts,
    parentCount,
    otherWords,
    otherCounts,
    otherParentCount;

syllable = require('..');
content = require('retext-content');
Retext = require('retext');
visit = require('retext-visit');
assert = require('assert');

tree = new Retext()
    .use(visit)
    .use(content)
    .use(syllable)
    .parse('A simple, english, sentence');

counts = [1, 2, 2, 2];
otherWords = ['A', 'yellow', 'fresh', 'banana'];
otherCounts = [1, 2, 1, 3];
parentCount = 7;
otherParentCount = 7;

describe('syllable()', function () {
    it('should be of type `function`', function () {
        assert(typeof syllable === 'function');
    });

    it('should export an attach method of type `function`', function () {
        assert(typeof syllable.attach === 'function');
    });

    it('should count each `WordNode`', function () {
        var iterator = -1;

        tree.visitType(tree.WORD_NODE, function (wordNode) {
            assert('syllableCount' in wordNode.data);
            assert(wordNode.data.syllableCount === counts[++iterator]);
        });
    });

    it('should count `syllableCount` in parents', function () {
        assert(tree.data.syllableCount === parentCount);
        assert(tree.head.data.syllableCount === parentCount);
        assert(tree.head.head.data.syllableCount === parentCount);
    });

    it('should set each `syllableCount` to `0` when a WordNode (no ' +
        'longer?) has a value', function () {
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.removeContent();

                assert(wordNode.data.syllableCount === 0);
            });
        }
    );

    it('should reset `syllableCount` in parents', function () {
        assert(tree.data.syllableCount === 0);
        assert(tree.head.data.syllableCount === 0);
        assert(tree.head.head.data.syllableCount === 0);
    });

    it('should automatically re-count `WordNode`s when their values change',
        function () {
            var iterator = -1;

            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.replaceContent(otherWords[++iterator]);

                assert(wordNode.data.syllableCount === otherCounts[iterator]);
            });
        }
    );

    it('should re-count `syllableCount` in parents', function () {
        assert(tree.data.syllableCount === otherParentCount);
        assert(tree.head.data.syllableCount === otherParentCount);
        assert(tree.head.head.data.syllableCount === otherParentCount);
    });
});
