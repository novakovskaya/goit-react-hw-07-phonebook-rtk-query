import { createReducer } from '@reduxjs/toolkit';
import { filterContacts } from './contacts-actions';

export const filter = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});
