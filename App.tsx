import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';
import { AppProvider } from './src/state/AppContext';
import { AuthProvider } from './src/state/AuthContext';

const queryClient = new QueryClient();

export default function App() {
 return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <RootNavigator />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
