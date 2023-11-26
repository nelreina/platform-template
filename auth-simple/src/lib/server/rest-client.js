import RestClient from '@nelreina/rest-client';
import 'dotenv/config';
import logger from '$lib/server/logger.js';

const TRANSLATION_API = process.env['TRANSLATION_API'];
const TRANSLATION_ENABLED = process.env['TRANSLATION_ENABLED'] || 'false';

const SERVICE_NAME = process.env['SERVICE_NAME'];
const transApi = new RestClient(TRANSLATION_API);

export const getTranslations = async (lang) => {
	if (TRANSLATION_ENABLED !== 'true') {
		logger.info(`Translation is disabled for ${SERVICE_NAME}`);
		return {};
	} else {
		// console.log('LOG:  ~ file: rest-client.js:30 ~ getTranslations ~ lang', lang);
		const translations = await transApi.get(`/api/translation/${SERVICE_NAME}/${lang}`);
		return translations;
	}
};
