import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from 'redux/contacts/contactsSlice';
import { contactsSelectors } from 'redux/contacts';
import styles from './ContactList.module.scss';

export const ContactList = () => {
  const filtered = useSelector(contactsSelectors.getFilter);
  const { data: contacts, isSuccess } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const getFilteredContacts = () => {
    const normalizedFilter = filtered.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      {isSuccess && (
        <ul className={styles.List}>
          {getFilteredContacts().map(({ id, name, number }) => (
            <li key={id} className={styles.Item}>
              <p className={styles.Contact}>{name}:</p>
              <p className={styles.Number}>{number}</p>

              <button
                type="button"
                className={styles.Button}
                onClick={() => deleteContact(id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
