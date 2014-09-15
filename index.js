'use strict';

exports = module.exports = function () {};

var syllable = require('syllable');

function onchange(node, sillableDifference) {
    if (!node || !sillableDifference) {
        return;
    }

    node.data.syllableCount =
        (node.data.syllableCount || 0) + sillableDifference;

    onchange(node.parent, sillableDifference);
}

function oninsert() {
    onchange(this.parent, this.data.syllableCount || 0);
}

function onremove(previousParent) {
    onchange(previousParent, -(this.data.syllableCount || 0));
}

function onchangetextinside() {
    var self = this,
        currentSyllableCount = self.data.syllableCount || 0,
        sillableCount = syllable(self.toString());

    self.data.syllableCount = sillableCount;

    onchange(self.parent, -currentSyllableCount + sillableCount);
}

function attach(retext) {
    var TextOM = retext.TextOM;

    TextOM.WordNode.on('changetextinside', onchangetextinside);
    TextOM.WordNode.on('removeinside', onchangetextinside);
    TextOM.WordNode.on('insertinside', onchangetextinside);
    TextOM.Child.on('insert', oninsert);
    TextOM.Child.on('remove', onremove);
}

exports.attach = attach;
