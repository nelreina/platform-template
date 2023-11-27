import { readable } from 'svelte/store';
import { pb } from '$lib/pocketbase';
import { browser } from '$app/environment';

export const getPbRealtimeDataStore = (data, collection, recordId = 'id') => {
	if (!browser) {
		return readable(data, () => {}); // noop
	}
	const highlightTime = 300;
	const findAndUpdateSession = async (sessions, record, highlight, action) =>
		sessions.map((session) => {
			if (session[recordId] === record[recordId]) {
				return { ...record, highlight };
			}
			return session;
		});

	return readable(data, (set) => {
		let sessions = data;
		pb.collection(collection).subscribe('*', async (coll) => {
			const { action, record } = coll;
			switch (action) {
				case 'create':
					sessions = [{ ...record, highlight: true }, ...sessions];
					break;

				case 'update':
					sessions = await findAndUpdateSession(sessions, record, true, action);
					// console.log('LOG:  ~ file: pb-store.js:34 ~ pb.collection ~ record:', record);
					setTimeout(async () => {
						sessions = await findAndUpdateSession(sessions, record, false, action);
						set(sessions);
					}, highlightTime);
					break;

				case 'delete':
					sessions = sessions.filter((s) => s[recordId] !== record[recordId]);
					break;

				default:
					break;
			}

			set(sessions);
		});
		return () => {
			pb.collection(collection).unsubscribe();
		}; // noop
	});
};
