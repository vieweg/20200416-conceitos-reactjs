import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";
import Header from "./components/Header";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      const repositories = await api.get("/repositories");
      setRepositories(repositories.data);
    }
    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = await api.post("/repositories", {
      title: `Novo Repo ${Date.now()}`,
      url: "http://github.com/url",
      techs: ["Node.js", "reactJs"],
    });
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`/repositories/${id}`);

    if (result.status === 204) {
      const filteredRepositories = repositories.filter(
        (repository) => repository.id !== id
      );
      setRepositories(filteredRepositories);
    }
  }

  return (
    <div>
      <Header title="Repositórios" />
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
