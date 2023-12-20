import { readable } from 'svelte/store';
import { pb } from '$lib/pocketbase';
import { browser } from '$app/environment';
import { setContext } from 'svelte';

export const createPbRealtimeDataStore = (data, collection, user, toastStore, toastMessage) => {
	const recordId = 'id';
	let state;
	if (!browser) {
		state = readable(data, () => {}); // noop
		setContext(collection, state);
		return state;
	}
	const highlightTime = 500;
	const findAndUpdateSession = async (sessions, record, highlight, action) =>
		sessions.map((session) => {
			if (session[recordId] === record[recordId]) {
				return { ...record, highlight };
			}
			return session;
		});

	const notify = (action, record) => {
		let message = `${action} ${collection} ${record[recordId]}`;
		if (!toastStore) return;
		if (toastMessage) {
			message = toastMessage[action].message;
			if (toastMessage[action].field) {
				message += ` ${record[toastMessage[action].field]}`;
			}
		}
		toastStore.trigger({ message, timeout: 7000, background: 'variant-glass-secondary' });
	};

	state = readable(data, (set) => {
		let sessions = data;
		pb.authStore.save(user.token, user);
		pb.collection(collection).subscribe('*', async (coll) => {
			const { action, record } = coll;
			notify(action, record);
			switch (action) {
				case 'create':
					sessions = [{ ...record, highlight: true }, ...sessions];
					setTimeout(async () => {
						sessions = await findAndUpdateSession(sessions, record, false, action);
						set(sessions);
					}, highlightTime);
					break;

				case 'update':
					sessions = await findAndUpdateSession(sessions, record, true, action);
					setTimeout(async () => {
						sessions = await findAndUpdateSession(sessions, record, false, action);
						set(sessions);
					}, highlightTime);
					// console.log('LOG:  ~ file: pb-store.js:34 ~ pb.collection ~ record:', record);
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
			pb.authStore.clear();
		}; // noop
	});
	setContext(collection, state);
	return state;
};
