import { Container } from './components/Container';
import { Section } from './components/Section';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { Filter } from './components/Filter';
import { useFetchContactsQuery } from 'redux/contacts/contactsSlice';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';

const App = () => {
  const { data: contacts, isFetching, isError } = useFetchContactsQuery();

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts">
        <Filter />
        {isFetching && (
          <TailSpin
            heigth="80"
            width="80"
            color="#A5CED0"
            ariaLabel="loading"
          />
        )}
        {isError && toast.error('We were unable to load contacts!')}

        {contacts && <ContactList />}
      </Section>
      <ToastContainer autoClose={1500} />
    </Container>
  );
};

export default App;
