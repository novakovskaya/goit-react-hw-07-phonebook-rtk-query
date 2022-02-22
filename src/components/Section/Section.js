import PropTypes from 'prop-types';
import styles from './Section.module.scss';

export const Section = ({ title, children }) => {
  return (
    <section className={styles.Section}>
      <h1 className={styles.Title}>{title}</h1>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
};
