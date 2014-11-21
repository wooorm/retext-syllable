'use strict';

/**
 * Dependencies.
 */

var syllable,
    content,
    visit,
    inspect,
    Retext,
    assert;

syllable = require('./');
content = require('retext-content');
Retext = require('retext');
visit = require('retext-visit');
inspect = require('retext-inspect');
assert = require('assert');

/**
 * Retext.
 */

var retext;

retext = new Retext()
    .use(visit)
    .use(inspect)
    .use(content)
    .use(syllable);

/**
 * Fixtures.
 */

var sentence,
    counts,
    parentCount,
    otherWords,
    otherCounts,
    otherParentCount;

sentence = 'A simple, english, sentence';
counts = [1, 2, 2, 2];
otherWords = ['A', 'yellow', 'fresh', 'banana'];
otherCounts = [1, 2, 1, 3];
parentCount = 7;
otherParentCount = 7;

/**
 * Tests.
 */

describe('syllable()', function () {
    var tree;

    before(function (done) {
        retext.parse(sentence, function (err, node) {
            tree = node;

            done(err);
        });
    });

    it('should be a `function`', function () {
        assert(typeof syllable === 'function');
    });

    it('should count each `WordNode`', function () {
        var index;

        index = -1;

        tree.visit(tree.WORD_NODE, function (node) {
            index++;

            assert('syllableCount' in node.data);
            assert(node.data.syllableCount === counts[index]);
        });
    });

    it('should count `syllableCount` in parents', function () {
        assert(tree.data.syllableCount === parentCount);
        assert(tree.head.data.syllableCount === parentCount);
        assert(tree.head.head.data.syllableCount === parentCount);
    });

    it('should set each `syllableCount` to `0` when a `WordNode` has no ' +
        'value',
        function () {
            tree.visit(tree.WORD_NODE, function (node) {
                node.removeContent();

                assert(node.data.syllableCount === 0);
            });
        }
    );

    it('should reset `syllableCount` in parents', function () {
        assert(tree.data.syllableCount === 0);
        assert(tree.head.data.syllableCount === 0);
        assert(tree.head.head.data.syllableCount === 0);
    });

    it('should re-count `WordNode`s when their values change', function () {
        var index;

        index = -1;

        tree.visit(tree.WORD_NODE, function (node) {
            index++;

            node.replaceContent(otherWords[index]);

            assert(node.data.syllableCount === otherCounts[index]);
        });
    });

    it('should re-count `syllableCount` in parents', function () {
        assert(tree.data.syllableCount === otherParentCount);
        assert(tree.head.data.syllableCount === otherParentCount);
        assert(tree.head.head.data.syllableCount === otherParentCount);
    });
});
