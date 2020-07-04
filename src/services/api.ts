declare const API_PATH: string;

type Card = {

}

export const getCard = (base = API_PATH): Promise<Card> => fetch(`${base}/cards/random`, {
	method: 'get',
}).then(res => res.text())
	.then((x: string) => JSON.parse(x))
	.then((card: any) => {
		// Some healthy love
		const type: string = card.type_line || '';
		const [superType, ...subTypes] = type.split('—').map(x => x.trim());

		console.log(card);

		return {
			...card,
			superType,
			subTypes,
		};
	});
