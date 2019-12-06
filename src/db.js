import * as idb from 'idb';

const VOTE_STORE = 'votes';

export const dbPromise = idb.openDB('mtg-vote', 1, {
	upgrade(db, oldVer, newVer, txn) {
		console.debug('upgrade', { db, oldVer, newVer, txn });
		const voteStore = db.createObjectStore(VOTE_STORE, {
			keyPath: 'id',
			autoIncrement: true,
		});

		// Make some simple indexes
		[
			// core-api
			'name', 'artist', 'type_line', 'set', 'set_name',
			// added
			'supertype'
		].forEach(field => {
			voteStore.createIndex(field, field, { unique: false });
		});

		// Make some special indexes
		voteStore.createIndex('subtypes', 'subtypes', { unique: false, multiEntry: true });
	}
});

export const vote = (args) => {
	console.debug(...args);
	return Promise.reject('@todo');
};
