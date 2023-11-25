import RestClient from '@nelreina/rest-client';
import 'dotenv/config';

const TRANSLATION_API = process.env['TRANSLATION_API'];
const TRANSLATION_ENABLED = process.env['TRANSLATION_ENABLED'];

const SERVICE_NAME = process.env['SERVICE_NAME'];
const transApi = new RestClient(TRANSLATION_API);

export const getTranslations = async (lang) => {
	if (!TRANSLATION_ENABLED === 'true') {
		return {};
	}
	const translations = await transApi.get(`/api/translation/${SERVICE_NAME}/${lang}`);
	return translations;
};
