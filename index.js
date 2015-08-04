/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module retext:syllable
 * @fileoverview Count syllables in Retext.
 */

'use strict';

/*
 * Dependencies.
 */

var syllable = require('syllable');
var visit = require('unist-util-visit');
var nlcstToString = require('nlcst-to-string');

/**
 * Patch a `syllableCount` property on `node`.
 *
 * @param {NLCSTNode} node - Node.
 * @param {number} count - Syllable count inside `node`.
 */
function patch(node, count) {
    var data = node.data || {};

    data.syllableCount = count || 0;

    node.data = data;
}

/**
 * Patch a `syllableCount` property on `WordNode`s.
 *
 * @param {NLCSTNode} node - Node.
 */
function any(node) {
    patch(node, syllable(nlcstToString(node)));
}

/**
 * Factory to gather parents and patch them based on their
 * childrens directionality.
 *
 * @return {function(node, index, parent)} - Can be passed
 *   to `visit`.
 */
function concatenateFactory() {
    var queue = [];

    /**
     * Gather a parent if not already gathered.
     *
     * @param {NLCSTChildNode} node - Child.
     * @param {number} index - Position of `node` in
     *   `parent`.
     * @param {NLCSTParentNode} parent - Parent of `child`.
     */
    function concatenate(node, index, parent) {
        if (
            parent &&
            (!parent.data || !parent.data.syllableCount) &&
            queue.indexOf(parent) === -1
        ) {
            queue.push(parent);
        }
    }

    /**
     * Patch one parent.
     *
     * @param {NLCSTParentNode} node - Parent
     * @return {number} - Syllable count inside `node`.
     */
    function one(node) {
        var children = node.children;
        var length = children.length;
        var index = -1;
        var total = 0
        var count;
        var child;

        while (++index < length) {
            child = children[index];
            count = child.data && child.data.syllableCount;

            if (count) {
                total += count;
            }
        }

        return total;
    }

    /**
     * Patch all parents in reverse order: this means
     * that first the last and deepest parent is invoked
     * up to the first and highest parent.
     */
    function done() {
        var index = queue.length;

        while (index--) {
            patch(queue[index], one(queue[index]));
        }
    }

    concatenate.done = done;

    return concatenate;
}

/**
 * Transformer.
 *
 * @param {NLCSTNode} cst - Syntax tree.
 */
function transformer(cst) {
    var concatenate = concatenateFactory();

    visit(cst, 'WordNode', any);
    visit(cst, concatenate);

    concatenate.done();
}

/**
 * Attacher.
 *
 * @return {Function} - `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
