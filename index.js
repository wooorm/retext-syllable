/**
 * Dependencies.
 */

var Retext = require('wooorm/retext');
var syllable = require('wooorm/retext-syllable');

/**
 * Retext.
 */

var retext = new Retext().use(syllable);

/**
 * DOM elements.
 */

var $input = document.getElementsByTagName('textarea')[0];
var $output = document.getElementsByTagName('output')[0];

/**
 * Events
 */

function oninputchange() {
    retext.parse($input.value, function (err, tree) {
        if (err) throw err;

        $output.textContent = tree.data.syllableCount || '0';
    });
}

$input.addEventListener('input', oninputchange);

oninputchange();
