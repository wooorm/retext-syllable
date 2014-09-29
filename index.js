/**
 * Dependencies.
 */

var syllable,
    Retext;

syllable = require('wooorm/retext-syllable');
Retext = require('wooorm/retext');

/**
 * Retext.
 */

var retext;

retext = new Retext().use(syllable);

/**
 * DOM elements.
 */

var $input,
    $output;

$input = document.getElementsByTagName('textarea')[0];
$output = document.getElementsByTagName('output')[0];

/**
 * DOM elements.
 */

function oninputchange() {
    retext.parse($input.value, function (err, tree) {
        if (err) throw err;

        $output.textContent = tree.data.syllableCount || '0';
    });
}

$input.addEventListener('input', oninputchange);

oninputchange();
