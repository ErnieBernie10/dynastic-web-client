import * as React from "react";
import { FunctionComponent } from "react";
import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Text,
  Title,
} from "@mantine/core";
import { secondaryColor } from "~/util/fn/colorLevels";
import { useAppTranslation } from "~/util/hooks";
import { IconArrowRight, IconSearch, IconSocial } from "@tabler/icons";
import {Link} from "@remix-run/react";

interface NoDynastiesDashboardContainerProps {}

export const NoDynastiesDashboardContainer: FunctionComponent<
  NoDynastiesDashboardContainerProps
> = () => {
  const { classes, cx } = useStyles();
  const { t } = useAppTranslation();
  return (
    <Container size="md">
      <Box
        sx={(theme) => ({
          position: "relative",
          width: 70,
          height: 70,
          top: 135,
          left: "calc(100% / 2 - 35px)",
          textAlign: "center",
          borderRadius: "100%",
          backgroundColor: `${theme.colors.dark[7]}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <Text size={30}>{t("common.or").toUpperCase()}</Text>
      </Box>
      <Grid columns={2}>
        <Grid.Col span={1}>
          <div className={cx(classes.cardContainer, classes.primaryCard)}>
            <Title order={2}>{t("dashboard.create.title")}</Title>
            <Text>{t("dashboard.create.description")}</Text>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button component={Link} to="/dynasty/create" rightIcon={<IconArrowRight />}>
                {t("dashboard.create.button")}
              </Button>
            </Box>
          </div>
        </Grid.Col>
        <Grid.Col span={1}>
          <div className={cx(classes.cardContainer, classes.secondaryCard)}>
            <div>
              <Title order={2}>{t("dashboard.join.title")}</Title>
              <Text>{t("dashboard.join.description")}</Text>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Button rightIcon={<IconSocial />}>
                {t("dashboard.join.inviteCode")}
              </Button>
              <Button
                rightIcon={<IconSearch />}
                styles={{ root: { marginLeft: 8 } }}
              >
                {t("dashboard.join.search")}
              </Button>
            </Box>
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  primaryCard: {
    backgroundColor: secondaryColor(theme),
    borderRadius: "20px",
  },
  secondaryCard: {
    border: `2px solid ${secondaryColor(theme)}`,
    borderRadius: "20px",
  },
  cardContainer: {
    height: 200,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "16px 35px 16px 35px"
  },
}));
