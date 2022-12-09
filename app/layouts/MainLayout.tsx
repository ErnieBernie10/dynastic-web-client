import * as React from "react";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { Center, Container } from "@mantine/core";
import { Shell, TopNavbarLink } from "@ui/common";
import { useActionData } from "@remix-run/react";
import { ActionJsonResponse } from "~/util/fn/jsonResponse";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

interface MainLayoutProps {}

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = ({ children }) => {
  const data = useActionData<ActionJsonResponse>();

  useEffect(() => {
    if (data?.target === "toast") {
      if (data?.type === "success") {
        showNotification({
          title: "Success",
          message: data?.message ?? "The action was successful",
          icon: <IconCheck size={18} />,
        });
      } else {
        showNotification({
          title: "Something went wrong",
          message: data?.message ?? "The action was unsuccessful",
          icon: <IconX size={18} />,
          color: "red",
        });
      }
    }
  }, [data]);

  return (
    <Shell
      headerSection={
        <Center>
          <TopNavbarLink label="Dynasty" to="/dynasty" />
        </Center>
      }
    >
      <main style={{ height: "100%" }}>
        <Container
          size="lg"
          px="xs"
          mt={16}
          sx={{
            height: "100%",
          }}
        >
          {children}
        </Container>
      </main>
    </Shell>
  );
};
