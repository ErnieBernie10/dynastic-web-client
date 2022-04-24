import { Box, Button, Flex, Link, Select, Switch, useColorMode } from '@chakra-ui/react';
import { IntlContext } from '@common/context/CustomIntlProvider';
import { useAuth0Client } from '@common/hooks';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { CommonIntl } from '../../intl/CommonIntl';

export function Navbar() {
  const { auth0Client, isAuthenticated } = useAuth0Client();
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();
  const [locale, setLocale] = useContext(IntlContext);

  return (
    <Flex p={5} justifyContent="space-between">
      <Flex width="50%">
        <Link as={RouterLink} to="/">
          {formatMessage(CommonIntl.home)}
        </Link>
      </Flex>
      <Flex justifyContent="end" width="50%">
        <Box mr={8}>
          <Select value={locale} onChange={(e) => setLocale(e.target.value)}>
            <option value="en">{formatMessage(CommonIntl.en)}</option>
            <option value="nl">{formatMessage(CommonIntl.nl)}</option>
          </Select>
        </Box>
        <Box mr={8}>
          {isAuthenticated ? (
            <Button
              mr={8}
              onClick={() => auth0Client.logout({ returnTo: window.location.origin })}
            >
              {formatMessage(CommonIntl.logout)}
            </Button>
          ) : (
            <Button
              mr={8}
              colorScheme="green"
              onClick={() => auth0Client.loginWithRedirect()}
            >
              {formatMessage(CommonIntl.login)}
            </Button>
          )}
        </Box>
        <Box mr={8}>
          {formatMessage(CommonIntl.darkMode)}
          <Switch
            colorScheme="green"
            onChange={toggleColorMode}
            isChecked={colorMode === 'dark'}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
