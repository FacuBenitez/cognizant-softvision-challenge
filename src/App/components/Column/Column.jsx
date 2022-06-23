import React, {useState} from "react";
import {BiPlus} from "react-icons/bi";

import CandidateInput from "../CandidateInput/CandidateInput";
import CandidateList from "../CandidateList/CandidateList";

import styles from "./Column.module.scss";

const Column = ({title, data, candidateStep, updateCandidateStep, setCandidates, candidates}) => {
  const initialValues = {
    id: Number(new Date()),
    name: "",
    step: "Entrevista inicial",
    comments: "",
  };

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    const {name, value} = e.target;
    const newForm = {...form, [name]: value};

    setForm(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCandidates((candidates) => candidates.concat(form));
    setOpen(!open);
    setForm(initialValues);
  };

  const handleDelete = (c) => {
    setCandidates((candidates) => candidates.filter((candidate) => candidate.id !== c));
  };

  return (
    <div className={`background-secondary ${styles.Column}`}>
      <h1 className={`text-title ${styles.title}`}>{title}</h1>

      <div className={styles.candidatesContainer}>
        {candidateStep === 0 &&
          (open ? (
            <CandidateInput
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              open={open}
              setOpen={setOpen}
              type="add"
            />
          ) : (
            <button
              className={`${styles.button} btn background-secondary`}
              onClick={() => setOpen(!open)}
            >
              <BiPlus className="text-title" />
            
            </button>
          ))}

        <CandidateList
          candidateStep={candidateStep}
          data={data}
          handleDelete={handleDelete}
          updateCandidateStep={updateCandidateStep}
        />
      </div>
    </div>
  );
};

export default Column;
