export const getCard = (base = API_PATH) => fetch(`${base}/cards/random`, {
	method: 'get',
}).then(res => res.text())
	.then(x => JSON.parse(x))
	.then(card => {
		// Some healthy love
		const type = card.type_line || '';
		const [superType, ...subTypes] = type.split('—').map(x => x.trim());

		return {
			...card,
			superType,
			subTypes,
		};
	});
