import { h, render, Component } from 'preact';
import { opt } from './util';

export class Stat extends Component {
	constructor(props) {
		super();

		this.setState({
			id: `stat-${Date.now()}`,
			value: 0,
			pristine: true,
		});

		this.onChange = (event) => {
			const value = isNaN(event.target.value)
				? this.state.value
				: +event.target.value;

			this.setState({
				...this.state,
				value,
				pristine: false,
			});

			props.onChange({ name: this.props.name, value });
		}
	}

	render({
		name,
		onChange,
	} = {}, state) {
		return h('div', { class: 'form-field' }, [
			h('label', { for: state.id }, name),
			h('div', { class: 'form-input' }, [
				h('input', {
					value: state.value,
					type: 'range',
					id: state.id,
					name,
					min: 0,
					max: 100,
					// @todo: https://github.com/developit/linkstate
					onChange: e => this.onChange(e),
				}),
				opt(!state.pristine, h('span', { class: 'form-value' }, state.value)),
			]),
		])
	}
}

// Helper to write the stats children
const writeStats = (onChange) => {
	const stats = [
		'flavor',
		'art',
		'power',
		'interaction',
		'skill',
		'fun',
		'personal',
	];

	return stats.map(stat => h(Stat, {
		name: stat,
		onChange,
	}));
};


/**
 * Stats component -- collects stats and broadcasts them up.
 *
 * @param props
 * @param state
 * @returns {undefined}
 */
export class Stats extends Component {
	constructor({
		onChange = (() => {}), // no-op
	} = {}) {
		super();
		this.setState({});

		this.changeCollector = ({ name, value }) => {
			console.debug(this.state);
			this.setState({
				...this.state,
				[name]: value
			});
			onChange(this.state);
		};
	}

	render() {
		return h('div', { class: 'stat' }, [
			...writeStats(this.changeCollector),
		]);
	}
};

