"use strict";

var app = app || {};
const ENTER_KEY = 13;
const ESC_KEY = 27;
const API_URL = "http://localhost:9102";

window.onload = function () {

    //bind to search field and button
    var searchField = $('input#search');
    var searchButton = $('button#searchButton');
    var searchType = 'fls';



    searchField.keydown(function (e) {

        if (searchField.val().length > 0) {
            searchButton.prop('enabled', true);
            if (e.keyCode === ENTER_KEY) {
                search(searchField.val(), searchType);
            }
        }
        else {
            searchButton.prop('disabled', true);
        }
    });

    searchButton.click(function (e) {
        search(searchField.val(), searchType);
    });

};

/**
 * search for gurbani
 *
 * @param value
 * @param searchType
 */
function search(value, searchType) {
    console.debug('Searching for', value);

    jQuery.getJSON({
        url: API_URL + "/search/" + searchType + "/" + value,
        success: function (data) {
            renderSearchResults(data);
        }
    });
}

function renderSearchResults(data) {
    //pre-compile dust.js templates
    let template = document.getElementById('tpl-search-results').textContent;
    var compiled = dust.compile(template, 'search-results');
    dust.loadSource(compiled);   // Register the template with Dust

    // Render the search results template
    dust.render('search-results', data, function (err, out) {
        //TODO catch err
        document.getElementById('results').innerHTML = out;
    });
}