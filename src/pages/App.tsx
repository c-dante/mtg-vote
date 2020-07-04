import React from 'react';
import {
	AppBar,
	Container,
	Typography,
	Toolbar,
	IconButton,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from '../styles';

export const App = (): JSX.Element => (
	<ThemeProvider theme={theme}>
		<AppBar position='static'>
			<Toolbar>
				<IconButton edge='start'><MenuIcon /></IconButton>
				<Typography variant='h1'>mtg-vote</Typography>
			</Toolbar>
		</AppBar>
		<Container>
			@todo: vote flow
		</Container>
	</ThemeProvider>
);
