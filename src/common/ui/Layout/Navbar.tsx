import {
  Flex,
  Link,
  Select,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth0Client } from '@common/hooks';
import { useContext } from 'react';
import { IntlContext } from '@common/context/CustomIntlProvider';
import { useIntl } from 'react-intl';
import { CommonIntl } from '../../intl/CommonIntl';

export function Navbar() {
  const { auth0Client, isAuthenticated } = useAuth0Client();
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();
  const [locale, setLocale] = useContext(IntlContext);

  return (
    <Flex p={5} justifyContent="space-between">
      <Flex>
        <Link as={RouterLink} to="/">
          {formatMessage(CommonIntl.home)}
        </Link>
      </Flex>
      <Flex justifyContent="end">
        <Select value={locale} onChange={(e) => setLocale(e.target.value)}>
          <option value="en">{formatMessage(CommonIntl.en)}</option>
          <option value="nl">{formatMessage(CommonIntl.nl)}</option>
        </Select>
        {isAuthenticated ? (
          <Link
            mr={8}
            onClick={() => auth0Client.logout({ returnTo: window.location.origin })}
          >
            {formatMessage(CommonIntl.logout)}
          </Link>
        ) : (
          <Link mr={8} onClick={() => auth0Client.loginWithRedirect()}>
            {formatMessage(CommonIntl.login)}
          </Link>
        )}
        {formatMessage(CommonIntl.darkMode)}
        <Switch
          colorScheme="green"
          onChange={toggleColorMode}
          isChecked={colorMode === 'dark'}
        />
      </Flex>
    </Flex>
  );
}
