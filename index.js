'use strict';

/*
 * Dependencies.
 */

var getSyllableCount;

getSyllableCount = require('syllable');

/**
 * Change handler.
 *
 * @param {Node} node
 * @param {number} difference
 */
function onchange(node, difference) {
    if (!node || !difference) {
        return;
    }

    node.data.syllableCount = (node.data.syllableCount || 0) + difference;

    onchange(node.parent, difference);
}

/**
 * Handler for node insertions.
 *
 * @this {Child}
 */
function oninsert() {
    onchange(this.parent, this.data.syllableCount || 0);
}

/**
 * Handler for node deletions.
 *
 * @this {Child}
 */
function onremove(previousParent) {
    onchange(previousParent, -(this.data.syllableCount || 0));
}

/**
 * Handler for node value changes.
 *
 * @this {WordNode}
 */
function onchangeinside() {
    var self,
        currentCount,
        syllableCount;

    self = this;
    currentCount = self.data.syllableCount || 0;
    syllableCount = getSyllableCount(self.toString());

    self.data.syllableCount = syllableCount;

    onchange(self.parent, -currentCount + syllableCount);
}

/**
 * Define `syllable`.
 *
 * @param {Retext} retext
 */
function syllable(retext) {
    var TextOM;

    TextOM = retext.TextOM;

    TextOM.WordNode.on('changeinside', onchangeinside);
    TextOM.Child.on('insert', oninsert);
    TextOM.Child.on('remove', onremove);
}

/*
 * Expose `syllable`.
 */

module.exports = syllable;
