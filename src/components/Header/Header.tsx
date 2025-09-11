'use client';

import classes from './Header.module.css';
import { type JSX } from 'react';
import { NavLink } from 'react-router';
import { useAppState } from '../../redux/useAppSelector';
import { useActions } from '../../redux/useActions';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function Header(): JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { isLogin } = useAppState();
  const { login, logout } = useActions();

  return (
    <Box pb={60}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
            <NavLink to="/rest" className={classes.link}>
              Rest
            </NavLink>
            <NavLink to="/variables" className={classes.link}>
              Variables
            </NavLink>
            <NavLink to="/history" className={classes.link}>
              History
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            <Button
              variant="default"
              onClick={() => (isLogin ? logout() : login())}
            >
              {isLogin ? 'Sign Out' : 'Sign In'}
            </Button>
            <Button>Sign up</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <NavLink to="/" className={classes.link}>
            Home
          </NavLink>
          <NavLink to="/rest" className={classes.link}>
            Rest
          </NavLink>
          <NavLink to="/variables" className={classes.link}>
            Variables
          </NavLink>
          <NavLink to="/history" className={classes.link}>
            History
          </NavLink>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="default"
              onClick={() => (isLogin ? logout() : login())}
            >
              {isLogin ? 'Sign Out' : 'Sign In'}
            </Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
