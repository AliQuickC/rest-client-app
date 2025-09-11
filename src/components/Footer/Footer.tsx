import { Anchor, Box, Group, Image, Stack } from '@mantine/core';
import type { JSX } from 'react';
import classes from './Footer.module.css';
import { IconBrandGithub } from '@tabler/icons-react';

export function Footer(): JSX.Element {
  return (
    <Box pt="60" pb="20" w="100%">
      <footer className={classes.footer}>
        <Group justify="space-around" align="center">
          <Stack gap="0">
            <Anchor href="https://github.com/aliquickc">
              <Group>
                <IconBrandGithub />
                aliquickc
              </Group>
            </Anchor>
            <Anchor href="https://github.com/xomkalol">
              <Group>
                <IconBrandGithub />
                xomkalol
              </Group>
            </Anchor>
            <Anchor href="https://github.com/sashawl">
              <Group>
                <IconBrandGithub />
                sashawl
              </Group>
            </Anchor>
          </Stack>
          <Box>©2025</Box>
          <Box>
            <Anchor href="https://rs.school/courses/reactjs">
              <Image
                src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/260b39cca721aa5c822ed2b026d6584a78948b0d/react/assets/rss-logo.svg"
                alt="rs-logo"
                w="xl"
              />
            </Anchor>
          </Box>
        </Group>
      </footer>
    </Box>
  );
}
