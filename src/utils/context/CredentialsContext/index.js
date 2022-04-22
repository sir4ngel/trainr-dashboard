import {createContext} from 'react';

export const CredentialsContext = createContext({user: {}, auth: () => {}});