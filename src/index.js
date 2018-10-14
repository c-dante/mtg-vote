// CSS, which should get injected as a style or extracted with min in prod
import './index.css';

import fp from 'lodash/fp';
import { h, render, Component } from 'preact';

import { Stats } from './vote';

const getCard = (base = API_PATH) => fetch(`${base}/cards/random`, {
	method: 'get',
}).then(res => res.text())
	.then(x => JSON.parse(x));

const getCardT = () => new Promise(
	(res, rej) => setTimeout(() => res(getCard()), 10)
);

// @see https://scryfall.com/docs/api/cards
const writeCard = card => {
	switch (card.layout) {
		case 'normal':
			return [
				...[
					['name', 'mana_cost'],
					['type_line'],
					['oracle_text'],
					['flavor_text'],
				].map(row => h('div', { class: 'card--row' }, [
					...row.filter(x => card[x]).map(txt => h('div', { class: txt }, card[txt]))
				])),
			];
		default:
			console.log('@todo: layout for', card);
			return [
				h('div', { class: 'name' }, card.name),
				h('div', { class: 'oracle_text' }, card.oracle_text),
			];
	}
}


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

	render(_, {
		loading = false,
		card = {},
		error,
	} = {}) {
		let time = new Date().toLocaleTimeString();

		const children = (() => {
			if (loading) {
				return h('div', {}, 'loading');
			}

			if (error) {
				return 'ERROR';
			}

			if (card) {
				return writeCard(card);
			}
		})();

		return h('div', { class: 'card', id: card.id }, children);
	}
}

const VoteCard = () => h('div', { class: 'vote-card' }, [
	h(Card),
	h(Stats, {
		onChange(state) {
			console.debug('!!!', state);
		},
	}),
	h('button', {
		onClick(e) {
			console.debug('!', e);
		},
	}, 'Submit'),
]);

const App = ({} = {}) => h('div', {}, [
	h('h3', {}, 'Some cards...'),
	h('div', { class: 'cards' }, [
		...(new Array(1).fill(undefined)).map(() => h(VoteCard, {})),
	]),
]);

render(h(App), document.body);

