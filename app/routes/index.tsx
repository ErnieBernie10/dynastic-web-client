import React from "react";
import { HeroContainer } from "@ui/common";
import { Title, Button } from "@mantine/core";
import { useAppTranslation } from "~/util/hooks";
import { Link } from "@remix-run/react";

export default function Index() {
  const { t } = useAppTranslation();
  return (
    <HeroContainer size="xs" px="xs">
      <div>
        <Title
          order={1}
          sx={(theme) => ({
            color: theme.primaryColor,
          })}
        >
          {t("common.dynastic")}
        </Title>
        <Title order={2}>{t("home.description")}</Title>
      </div>
      <div>
        <Button component={Link} to="/dashboard">
          {t("home.join")}
        </Button>
      </div>
    </HeroContainer>
  );
}
