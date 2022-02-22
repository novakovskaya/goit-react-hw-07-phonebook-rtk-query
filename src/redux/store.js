import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { contactsApi } from './contacts/contactsSlice';
import { filter } from './contacts/contacts-reducer';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);
