import { useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import {
  useFetchContactsQuery,
  useAddContactMutation,
} from 'redux/contacts/contactsSlice';
import styles from './ContactForm.module.scss';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: contacts } = useFetchContactsQuery();

  const [addContact, { isLoading }] = useAddContactMutation();

  const handleInput = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contactFind = contacts.find(contact => contact.name === name);

    contactFind
      ? toast(`❗️ ${name} is already in contacts.`)
      : addContact({ name, number });

    resetInput();
  };

  const resetInput = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <label className={styles.Label}>
        Name
        <input
          className={styles.Input}
          id={nanoid()}
          type="text"
          name="name"
          value={name}
          onChange={handleInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={styles.Label}>
        Number
        <input
          className={styles.Input}
          type="tel"
          name="number"
          value={number}
          onChange={handleInput}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={styles.Button} disabled={isLoading}>
        Add contact
      </button>
    </form>
  );
};
