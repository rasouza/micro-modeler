/* eslint-disable react/jsx-props-no-spreading */
import { NavbarProps, Navbar as MantineNavbar, Button } from '@mantine/core';
import { HomeIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

export default function Navbar(props: Omit<NavbarProps, 'children'>) {
  return (
    <MantineNavbar {...props}>
      <Button variant="subtle" component={Link} to="/">
        <HomeIcon size={24} />
      </Button>
    </MantineNavbar>
  );
}
