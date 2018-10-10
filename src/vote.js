import { h, render, Component } from 'preact';

export class Stat extends Component {
	constructor() {
		super();
		this.setState({
			id: `stat-${Date.now()}`,
		});
	}

	onChange(...args) {
		console.log(this, args);
	}

	render(props, state) {
		console.debug(props);
		return h('div', { class: 'form-field' }, [
			h('label', { for: state.id }, props['data-stat']),
			h('input', {
				value: -1,
				type: 'range',
				id: state.id,
				min: 0,
				max: 100,
				onChange: (...args) => this.onChange(args),
			}),
		])
	}
}

const writeStats = () => {
	const stats = [
		'flavor',
		'art',
		'power',
		'interaction',
		'skill',
		'fun',
		'persona'
	];

	return stats.map(stat => h(Stat, { 'data-stat': stat }));
};

export class Stats extends Component {
	render(props, state) {
		console.debug('stat props', props);
		return h('div', { class: 'stat' }, [
			...writeStats(),
		]);
	}
}

