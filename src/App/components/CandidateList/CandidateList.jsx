import React from "react";
import {BiChevronRight, BiChevronLeft} from "react-icons/bi";
import {FiEdit, FiTrash} from "react-icons/fi";

import styles from "./CandidateList.module.scss";

const CandidateList = ({data, candidateStep, updateCandidateStep, handleDelete}) => {
  return (
    <>
      {data &&
        data.map((d) => {
          return (
            <div key={d.id} className={`${styles.Card} background-tertiary`}>
              <div className={styles.textContainer}>
                <div className={styles.text}>
                  <h2 className="text-card">{d.name}</h2>
                  <p className={`text-subtitle ${styles.subtitle}`}>{d.comments}</p>
                </div>
                <div className={styles.buttons}>
                  {candidateStep !== 0 && (
                    <button
                      className={styles.btn}
                      onClick={() => updateCandidateStep(d.id, candidateStep, "substract")}
                    >
                      <BiChevronLeft />
                    </button>
                  )}
                  {candidateStep !== 4 && (
                    <button
                      className={styles.btn}
                      onClick={() => updateCandidateStep(d.id, candidateStep, "add")}
                    >
                      <BiChevronRight />
                    </button>
                  )}
                </div>
              </div>
              <div className={`${styles.deleteContainer} background-tertiary `}>
                <button className={styles.btn} onClick={() => handleDelete(d.id)}>
                  <FiTrash />
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CandidateList;
