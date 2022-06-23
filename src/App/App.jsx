import React from "react";
import {useEffect, useState, useMemo} from "react";

import api from "../api";
import "./_reset.scss";

import styles from "./App.module.scss";
import Column from "./components/Column/Column";

import {BiMoon, BiSun} from "react-icons/bi";

const steps = ["Entrevista inicial", "Entrevista técnica", "Oferta", "Asignacion", "Rechazo"];

function App() {
  const [status, setStatus] = useState("init");
  const [candidates, setCandidates] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("THEME") || "light");
  const data = useMemo(() => {
    return candidates.reduce((acc, candidate) => {
      const step = candidate.step;

      if (acc[step] === undefined) acc[step] = [];
      acc[step].push(candidate);

      return acc;
    }, {});
  }, [candidates]);

  useEffect(() => {
    api.candidates
      .list()
      .then((candidates) => {
        setCandidates(candidates);
      })
      .finally(setStatus("resolved"));
  }, []);

  useEffect(() => {
    localStorage.setItem("THEME", theme);
  }, [theme]);

  useEffect(() => {
    api.candidates.save(candidates);
  }, [candidates]);

  if (status === "init") {
    return <span>Cargando...</span>;
  }

  const updateCandidateStep = (id, stepData, action) => {
    setCandidates((candidates) =>
      candidates.map((candidate) => {
        if (candidate.id === id) {
          return {
            ...candidate,
            step: action === "add" ? steps[stepData + 1] : steps[stepData - 1],
          };
        }

        return candidate;
      }),
    );
  };

  return (
    <div className={`${theme} ${styles.theme}`}>
      <div className={`background-primary ${styles.App}`}>
        <button
          className={`button background-tertiary ${styles.btn}`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <BiSun /> : <BiMoon />}
        </button>
        <main className={`${styles.columnsContainer} `}>
          {steps.map((step, candidateStep) => {
            return (
              <Column
                key={step}
                candidateStep={candidateStep}
                candidates={candidates}
                data={data[step] || []}
                setCandidates={setCandidates}
                title={step}
                updateCandidateStep={updateCandidateStep}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
