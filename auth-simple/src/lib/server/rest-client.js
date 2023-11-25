import RestClient from '@nelreina/rest-client';
import 'dotenv/config';

const TRANS_API = process.env['TRANS_API'];
// const API_TOKEN = process.env['API_TOKEN'];
const SERVICE_NAME = process.env['SERVICE_NAME'];
const transApi = new RestClient(TRANS_API);

export const getTranslations = async (lang) => {
	const translations = await transApi.get(`/api/translation/${SERVICE_NAME}/${lang}`);
	return translations;
};
