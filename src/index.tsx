import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import App from './App';
import './index.css';
import GlobalStyles from './components/GlobalStyles';
import { ChakraProvider } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <HelmetProvider>
            <ChakraProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <GlobalStyles Children={App} />
                    </PersistGate>
                </Provider>
            </ChakraProvider>
        </HelmetProvider>
    </React.StrictMode>,
);
