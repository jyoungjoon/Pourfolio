import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { StoreProvider } from './utils/GlobalState';
import Home from './pages/Home';
import Cellar from './pages/Cellar';
import Signup from './pages/Signup';
import Setting from './pages/Setting';
import Search from './pages/Search';

import AppLayout from './ui/AppLayout';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cellar" element={<Cellar />} />
              </Route>
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
