import fp from 'lodash/fp';
import { h, render, Component } from 'preact';

const getCard = () => fetch('/api/cards/random', {
	method: 'get',
}).then(res => res.text())
	.then(x => JSON.parse(x));

const getCardT = () => new Promise((res, rej) => setTimeout(() => res(getCard()), 10));

class Card extends Component {
	constructor() {
		super();

		this.setState({
			loading: true,
		});

		getCardT().then(
			card => this.setState({
				loading: false,
				card,
			}),
			error => this.setState({
				loading: false,
				error,
			}),
		)
	}

	render(_, { loading, card, error } = {}) {
		let time = new Date().toLocaleTimeString();

		const children = [];

		if (loading) {
			children.push('loading');
		} else if (error) {
			children.push('ERROR');
		} else if (card) {
			console.debug(card);
			children.push(h('div', { id: card.id }, [
				...['name', 'mana_cost', 'oracle_text'].map(txt => h('div', { class: txt }, card[txt])),
			]));
		}

		return h('div', {}, children);
	}
}

const App = ({ } = {}) => h('div', {}, [
	h('h3', {}, 'Some cards...'),
	...(new Array(5).fill(undefined)).map(() => h(Card, {})),
]);

render(h(App), document.body);

