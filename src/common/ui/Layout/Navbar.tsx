import {
  Flex,
  Link,
  SelectField,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { CommonIntl } from "../../intl/CommonIntl";
import { useIntl } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0Client } from "@common/hooks";

export const Navbar = () => {
  const { auth0Client, isAuthenticated } = useAuth0Client();
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();

  return (
    <Flex p={5} justifyContent="space-between">
      <Flex>
        <Link as={RouterLink} to="/">
          {formatMessage(CommonIntl.home)}
        </Link>
      </Flex>
      <Flex justifyContent="end">
        {/* <SelectField value={locale} onChange={(e) => setLocale(e.target.value)}>
          <option value="en">{CommonIntl.en}</option>
          <option value="nl">{CommonIntl.nl}</option>
        </SelectField> */}
        {isAuthenticated ? (
          <Link
            mr={8}
            onClick={() =>
              auth0Client.logout({ returnTo: window.location.origin })
            }
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
          isChecked={colorMode === "dark"}
        />
      </Flex>
    </Flex>
  );
};
