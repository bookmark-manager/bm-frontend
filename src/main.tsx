import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { App } from './App';
import { RootProvider } from './RootProvider';

createRoot(document.getElementById('root')!).render(
  <RootProvider>
    <App />
  </RootProvider>,
);
