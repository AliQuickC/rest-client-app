'use client';

import classes from './Header.module.css';
import { type JSX } from 'react';
import { NavLink } from 'react-router';
import { useAppState } from '../../redux/useAppSelector';
import { useActions } from '../../redux/useActions';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Select,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { Lang } from '../../Types/Types';

export function Header(): JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { isLogin } = useAppState();
  const { locale } = useAppState();
  const { login, logout, switchLanguage } = useActions();

  return (
    <Box pb={60}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to="/" className={classes.link}>
              <FormattedMessage id="app.navHome" />
            </NavLink>
            <NavLink to="/rest" className={classes.link}>
              <FormattedMessage id="app.navRest" />
            </NavLink>
            <NavLink to="/variables" className={classes.link}>
              <FormattedMessage id="app.navVariables" />
            </NavLink>
            <NavLink to="/history" className={classes.link}>
              <FormattedMessage id="app.navHistory" />
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            <Select
              data={[
                { value: 'en', label: 'en' },
                { value: 'ru', label: 'ru' },
              ]}
              value={locale}
              clearable={false}
              checkIconPosition="right"
              onChange={(value) => switchLanguage(value as Lang)}
              w="70"
            />
            <Button
              variant="default"
              onClick={() => (isLogin ? logout() : login())}
            >
              {isLogin ? (
                <FormattedMessage id="app.signOutButton" />
              ) : (
                <FormattedMessage id="app.signInButton" />
              )}
            </Button>
            <Button>
              <FormattedMessage id="app.signUpButton" />
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
          <Select
            data={[
              { value: 'en', label: 'en' },
              { value: 'ru', label: 'ru' },
            ]}
            value={locale}
            clearable={false}
            checkIconPosition="right"
            onChange={(value) => switchLanguage(value as Lang)}
            w="70"
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<FormattedMessage id="app.navHeading" />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <NavLink to="/" className={classes.link}>
            <FormattedMessage id="app.navHome" />
          </NavLink>
          <NavLink to="/rest" className={classes.link}>
            <FormattedMessage id="app.navRest" />
          </NavLink>
          <NavLink to="/variables" className={classes.link}>
            <FormattedMessage id="app.navVariables" />
          </NavLink>
          <NavLink to="/history" className={classes.link}>
            <FormattedMessage id="app.navHistory" />
          </NavLink>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="default"
              onClick={() => (isLogin ? logout() : login())}
            >
              {isLogin ? (
                <FormattedMessage id="app.signOutButton" />
              ) : (
                <FormattedMessage id="app.signInButton" />
              )}
            </Button>
            <Button>
              <FormattedMessage id="app.signUpButton" />
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
