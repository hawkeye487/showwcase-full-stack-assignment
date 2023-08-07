// src/query/queryClient.tsx

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const QueryClientWrapper: React.FC = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
