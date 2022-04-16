import { useAuth0Client } from "@common/hooks";
import { Layout } from "@common/ui";
import { DashboardContainer } from "../features/dashboard/containers/DashboardContainer";

export const Home = () => {
  const { isAuthenticated } = useAuth0Client();

  return (
    <Layout>
      {isAuthenticated ? <DashboardContainer /> : "Show landing page"}
    </Layout>
  );
};
