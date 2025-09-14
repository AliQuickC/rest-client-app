'use client';

import classes from './Header.module.css';
import { useState, useEffect, type JSX } from 'react';
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
  Flex,
  Group,
  ScrollArea,
  Select,
} from '@mantine/core';
import throttle from 'lodash/throttle';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from 'lucide-react';
import type { Lang } from '../../Types/Types';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { IconUserCircle } from '@tabler/icons-react';

export function Header(): JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [name, setName] = useState('unknown');
  const { isLogin } = useAppState();
  const { locale } = useAppState();
  const { login, logout, switchLanguage } = useActions();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled((prev) => {
        const scrollY = window.scrollY;
        if (!prev && scrollY > 55) return true;
        if (prev && scrollY < 45) return false;
        return prev;
      });
    }, 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (!isLogin) {
        login();
      }
      setName(user?.email ? user.email : 'unknown');
    } else {
      setName('unknown');
      logout();
    }
  });

  const handleLogout = () => {
    signOut(auth);
    console.log('user signOut');
  };

  return (
    <Box className={`${classes.headerBox} ${scrolled ? classes.scrolled : ''}`}>
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
              onChange={(value) => {
                if (value) {
                  switchLanguage(value as Lang);
                }
              }}
              w="70"
              rightSection={<ChevronDown size={16} strokeWidth={1.5} />}
              rightSectionWidth={30}
            />
            <Button
              variant="default"
              onClick={() => (isLogin ? handleLogout() : login())}
            >
              <NavLink
                to="/signIn"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {isLogin ? (
                  <FormattedMessage id="app.signOutButton" />
                ) : (
                  <FormattedMessage id="app.signInButton" />
                )}
              </NavLink>
            </Button>
            {!isLogin && (
              <Button>
                <NavLink
                  to="/login"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <FormattedMessage id="app.signUpButton" />
                </NavLink>
              </Button>
            )}
            {isLogin && (
              <Flex>
                {' '}
                <IconUserCircle />
                {name}
              </Flex>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
          <Group hiddenFrom="sm">
            <Select
              data={[
                { value: 'en', label: 'en' },
                { value: 'ru', label: 'ru' },
              ]}
              rightSection={<ChevronDown size={16} strokeWidth={1.5} />}
              rightSectionWidth={30}
              value={locale}
              clearable={false}
              checkIconPosition="right"
              onChange={(value) => {
                if (value) {
                  switchLanguage(value as Lang);
                }
              }}
              w="70"
              hiddenFrom="sm"
            />
            {isLogin && (
              <Flex>
                {' '}
                <IconUserCircle />
                {name}
              </Flex>
            )}
          </Group>
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
          <NavLink to="/" className={classes.link} onClick={closeDrawer}>
            <FormattedMessage id="app.navHome" />
          </NavLink>
          <NavLink to="/rest" className={classes.link} onClick={closeDrawer}>
            <FormattedMessage id="app.navRest" />
          </NavLink>
          <NavLink
            to="/variables"
            className={classes.link}
            onClick={closeDrawer}
          >
            <FormattedMessage id="app.navVariables" />
          </NavLink>
          <NavLink to="/history" className={classes.link} onClick={closeDrawer}>
            <FormattedMessage id="app.navHistory" />
          </NavLink>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="default"
              onClick={() => {
                if (isLogin) {
                  handleLogout();
                } else {
                  login();
                }
                closeDrawer();
              }}
            >
              <NavLink
                to="/signIn"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {isLogin ? (
                  <FormattedMessage id="app.signOutButton" />
                ) : (
                  <FormattedMessage id="app.signInButton" />
                )}
              </NavLink>
            </Button>
            {!isLogin && (
              <Button onClick={closeDrawer}>
                <NavLink
                  to="/login"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <FormattedMessage id="app.signUpButton" />
                </NavLink>
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
