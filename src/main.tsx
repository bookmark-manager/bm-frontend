import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import { App } from './App';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 1000 * 60,
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </QueryClientProvider>,
);
