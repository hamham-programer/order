import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import defaultOptions from './configs/reactQuery';
import Layout from './layouts/Layout';
import { UserProvider } from './router/UserContext';
import { CartProvider } from './router/CartContext';


function App() {
  const queryClient = new QueryClient({defaultOptions: defaultOptions})
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <CartProvider>
    <UserProvider>
    <Layout >
      <Router />
    </Layout>
    </UserProvider>
    </CartProvider>
    </BrowserRouter>
    <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
