// CSS, which should get injected as a style or extracted with min in prod
import './index.css';

import { h, render } from 'preact';
import {
	AppBar,
	Box,
	Grid,
	Container,
	Typography,
	Toolbar,
	IconButton,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { memo, useMemo, useCallback } from 'react';

import { AsyncLoader } from './asyncLoader';

import { Stats } from './vote';
import { getCard } from './api';

const NormalCard = memo(({ card }) => {
	return h(Box, { display: 'flex', flexDirection: 'column', maxWidth: '400px' }, [
		// Header line
		h(Box, { display: 'flex', justifyContent: 'space-between', mb: 2 }, [
			h(Box, { mr: 5 }, [
				h(Typography, { variant: 'subtitle1' }, card.name)
			]),
			h(Typography, { variant: 'subtitle1' }, card.mana_cost),
		]),
		// Type Line
		h(Box, { mb: 2 }, [
			h(Typography, { variant: 'subtitle2' }, card.type_line),
		]),
		// Oracle
		h(Box, { mb: 2 }, [
			h(Typography, { variant: 'body1' }, card.oracle_text),
		]),
		// Flavor
		h(Box, { mb: 2 }, [
			h(Typography, { variant: 'caption' }, card.flavor_text),
		]),
	])
});

const SplitCard = memo(({ card }) => {
	return h(Box, { display: 'flex', flexDirection: 'column' }, [
		h(Typography, { variant: 'h6', }, card.name),
		h(Box, { display: 'flex' }, [
			h(NormalCard, { card: card.card_faces[0] }),
			h(NormalCard, { card: card.card_faces[1] }),
		]),
	]);
});

// @see https://scryfall.com/docs/api/cards
const writeCard = card => {
	switch (card.layout) {
		case 'normal':
			return h(NormalCard, { card });
		case 'split':
			return h(SplitCard, { card });
		default:
			console.log('@todo: layout for', card);
			return [
				h('div', { class: 'name' }, card.name),
				h('div', { class: 'oracle_text' }, card.oracle_text),
			];
	}
};

const VoteUi = memo(({ onVote }) => {
	return 'Vote Here';
});

import useMediaQuery from '@material-ui/core/useMediaQuery';
const VoteCard = memo(({ card, onVote }) => {
	const matches = useMediaQuery(theme => theme.breakpoints.up('lg'));

	return h(Grid, { container: true, spacing: 2 }, [
		// https://scryfall.com/docs/api/images
		h(Grid, { item: true, xs: 12, md: 8, lg: 5 }, [
			h('img', { src: card.image_uris.normal })
		]),
		matches && h(Grid, { item: true, lg: 4 }, [
			writeCard(card),
		]),
		h(Grid, { item: true, xs: 12, md: 4, lg: 3 }, [
			h(VoteUi, { onVote }),
		]),
	]);
});



/*************************
 * VoteFlow
 *
 * Handles db interaction and loading cards
 */
const VoteFlow = () => {
	const cardPromise = useMemo(() => getCard(), []);

	const onVote = useCallback((results) => {
		console.debug('Record vote', { results });
	}, []);

	return h(AsyncLoader, { promise: cardPromise }, card => {
		console.debug(card);
		return h(VoteCard, { card, onVote });
	});
};




import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
	// @todo: theme overrides
});
/*************************
 * App
 *
 * In charge of rendering the outer shell / navigation
 */
const App = () => h('div', {}, [
	h(ThemeProvider, { theme }, [
		h(AppBar, { position: 'static' }, [
			h(Toolbar, {}, [
				h(IconButton , { edge: 'start' }, [ h(MenuIcon) ]),
				h(Typography , { variant: 'h6' }, 'mtg-vote'),
			]),
		]),
		h(Container, { display: 'flex' }, [
			h(VoteFlow, {}),
		]),
	]),
]);

// Kick it off
render(h(App), document.body);
