import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  MantineProvider,
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import icon from '../../assets/icon.svg';
import Home from './Home';
import Navbar from './Navbar';

export default function App() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
      <Router>
        <Home />
      </Router>
    </MantineProvider>
  );
}
