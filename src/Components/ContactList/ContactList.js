import shortid from "shortid";
import PropTypes from "prop-types";
import s from "./ContactList.module.css";

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={shortid.generate()} className={s.item}>
          {name}: {number}
          <button
            className={s.button}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
