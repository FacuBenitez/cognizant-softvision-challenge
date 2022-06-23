import React from "react";
import {FiX} from "react-icons/fi";

import styles from "./CandidateInput.module.scss";

const CandidateInput = ({setOpen, open, handleSubmit, form, handleChange}) => {
  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit}>
      <input
        required
        className={styles.inputName}
        name="name"
        placeholder="Nombre"
        type="text"
        value={form.name}
        onChange={handleChange}
      />
      <input
        className={styles.inputComment}
        name="comments"
        placeholder="Comentario"
        type="text"
        value={form.comments}
        onChange={handleChange}
      />
      <div className={styles.submitContainer}>
        <input className={styles.btnSubmit} type="submit" value="Agregar Candidato" />
        <button className={styles.btnClose} onClick={() => setOpen(!open)}>
          <FiX  size={'14px'}/>
        </button>
      </div>
    </form>
  );
};

export default CandidateInput;
