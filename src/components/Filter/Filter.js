import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { contactsSelectors, contactsActions } from 'redux/contacts';
import styles from './Filter.module.scss';

export const Filter = () => {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  const onFindContact = event =>
    dispatch(contactsActions.filterContacts(event.target.value));

  return (
    <label className={styles.Label}>
      Find contacts by name
      <input
        type="text"
        value={value}
        className={styles.Input}
        onChange={onFindContact}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
};
