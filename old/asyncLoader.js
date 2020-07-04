import fp from 'lodash/fp';
import { CircularProgress, Typography } from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { h } from 'preact';

const defaultError = fp.constant(h(Typography, { error: true }, 'An error occured.'));
const defaultPlaceholder = h(CircularProgress);

export const AsyncLoader = memo(({
	promise,
	placeholder = defaultPlaceholder,
	error = defaultError,
	children,
}) => {
	const [state, setState] = useState({ state: 'pending' });

	useEffect(() => {
		// Leave it in pending state if nothing passed yet
		if (!promise) {
			if (state.state !== 'pending') {
				setState({ state: 'pending' });
			}
			return () => {};
		}

		let canUse = true;
		promise.then(
			value => {
				if (canUse) {
					setState({ state: 'fulfilled', value });
				}
			},
			reason => {
				if (canUse) {
					setState({ state: 'rejected', reason });
				}
			}
		);

		return () => {
			canUse = false;
			if (state.state !== 'pending') {
				setState({ state: 'pending' });
			}
		}
	}, [promise]);

	switch (state.state) {
		case 'pending': return placeholder;
		case 'fulfilled': return children(state.value);
		case 'rejected': return error(state.reason);
		default: return error('Unknown State');
	}
});