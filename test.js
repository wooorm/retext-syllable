'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var retext = require('retext');
var visit = require('unist-util-visit');
var syllable = require('./');

/*
 * Methods.
 */

var equal = assert.equal;

/*
 * Fixtures.
 */

var fixture = 'A yellow fresh banana.\n1.';

var syllables = [
    7,
    7,
    7,
    1,
    undefined,
    undefined,
    2,
    undefined,
    undefined,
    1,
    undefined,
    undefined,
    3,
    undefined,
    undefined,
    undefined,
    0,
    0,
    0
];

/*
 * Tests.
 */

describe('syllable()', function () {
    var tree;

    before(function (done) {
        retext.use(syllable).process(fixture, function (err, file) {
            tree = file.namespace('retext').cst;

            done(err);
        });
    });

    it('should work', function () {
        var index = -1;

        visit(tree, function (node) {
            equal(node.data && node.data.syllableCount, syllables[++index]);
        });
    });
});
