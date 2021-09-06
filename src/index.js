import './sass/main.scss';

import refs from './js/refs';
import API from './js/fetchCountries';
import previewCountryTpl from './templates/preview-country.hbs'
import countryTpl from './templates/countryTemplate.hbs'

import debounce from 'lodash.debounce';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const searchInput = e => {
    const searchQuery = e.target.value;
    refs.countriesMrkp.innerHTML = '';

    if (searchQuery.length < 1 && searchQuery === " " && searchQuery=== ".")
        return;
    
        API.fetchCountries(searchQuery)
            .then(dataShow)
            .catch(noticeInfo);

};

const dataShow = countries => {
    if (countries.length > 10) {
        error({
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 5000,
        });  
    };
    
     if (countries.status === 404) {
        errorMessage('Nothing was found for your query!');
            }
    if (countries.length > 1 && countries.length < 10) {
        refs.countriesMrkp.innerHTML = previewCountryTpl(countries);
    };
    if (countries.length === 1) {
        refs.countriesMrkp.innerHTML = countryTpl(...countries);
    };
    
};

function errorMessage(message) {
    error ({
            title:`${message}`,
            delay: 2000,    
        });
}
const noticeInfo = () => {
        notice({
            text: 'Invalid entered value',
            delay: 2000,
        });
    }
refs.search.addEventListener('input', debounce(searchInput, 500));





