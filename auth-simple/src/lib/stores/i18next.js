import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import { getLanguage } from './language.js';
import Backend from 'i18next-http-backend';
import { base } from '$app/paths';

i18next.use(Backend).init({
	lng: getLanguage(),
	fallbackLng: 'en',
	backend: {
		loadPath: `${base}/locales/{{lng}}/{{ns}}`
	},
	interpolation: {
		escapeValue: false // not needed for svelte as it escapes by default
	}
});

export const changeLang = (lang) => {
	i18next.changeLanguage(lang);
};

export const i18n = createI18nStore(i18next);
