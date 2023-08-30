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
import { Toaster } from 'react-hot-toast';

import { StoreProvider } from './utils/GlobalState';
import Home from './pages/Home';
import Cellar from './pages/Cellar';
import Signup from './pages/Signup';
import Setting from './pages/Setting';
import Search from './pages/Search';
import About from './pages/About';

import AppLayout from './ui/AppLayout';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 62.5%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
`;

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
        <GlobalStyle />
        <StoreProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cellar" element={<Cellar />} />
              <Route path="/about" element={<About />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Routes>
        </StoreProvider>
      </Router>
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 2500,
          },
          style: {
            fontSize: '5rem',
            maxWidth: '1000px',
            padding: '16px 24px',
            backgroundColor: 'white',
            borderRadius: '10px',
            color: '#00434d',
          },
        }}
      />
    </ApolloProvider>
  );
}

export default App;
