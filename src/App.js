import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import * as apiCRUD from "./services/api/apiCRUD";

function App() {
  const [filesData, setFilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState("Todos los registros");

  useEffect(() => {
    getListInit();
    getDataInfo({ fileName: undefined });
  }, []);

  const getListInit = async () => {
    await apiCRUD
      .getList()
      .then((res) => {
        setOptions(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataInfo = async ({ fileName }) => {
    setIsLoading(true);
    await apiCRUD
      .getData({ fileName: fileName })
      .then((res) => {
        setFilesData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerChange = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    getDataInfo({
      fileName: select === "Todos los registros" ? undefined : select,
    });
  }, [select]);

  return (
    <div className="container">
      <div className="p-10">
        <h1>
          React TEST
          <br></br>
          <span className="badge bg-secondary">Choice Técnico</span>
        </h1>
      </div>
      <select
        className="form-select select-class"
        value={select}
        onChange={handlerChange}
      >
        <option>Todos los registros</option>
        {options.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </select>
      <div className="container">
        {isLoading ? (
          <div className="center">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Text</th>
                <th scope="col">Number</th>
                <th scope="col">Hex</th>
              </tr>
            </thead>
            {filesData.map((item) => {
              return (
                <tbody key={item.file + Math.random()}>
                  {item.lines.map((e) => {
                    return (
                      <tr key={item.file + Math.random()}>
                        <th scope="row">{item.file}</th>
                        <td>{e.text}</td>
                        <td>{e.number}</td>
                        <td>{e.hex}</td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
