import { useAuth0Client } from '@common/hooks';
import { Layout } from '@common/ui';
import { DashboardContainer } from '@features/dashboard';

export function Home() {
  const { isAuthenticated } = useAuth0Client();

  return (
    <Layout>{isAuthenticated ? <DashboardContainer /> : 'Show landing page'}</Layout>
  );
}
