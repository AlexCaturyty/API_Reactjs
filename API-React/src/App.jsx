import React, { useEffect, useState } from 'react';

function App() {


  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [inputCep, setInputCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [starWarsCharacterName, setStarWarsCharacterName] = useState('');
  const [starWarsCharacterData, setStarWarsCharacterData] = useState(null);

  const handleSearch = () => {
    if (pokemonName.trim() !== '') {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokémon não encontrado');
          }
          return response.json();
        })
        .then(data => setPokemonData(data))
        .catch(error => {
          console.error('Erro na busca do Pokémon:', error);
          setPokemonData(null);
        });
    }
  };

  const handleCepSearch = () => {
    if (inputCep.trim() !== '') {
      fetch(`https://viacep.com.br/ws/${inputCep}/json/`)
        .then(response => response.json())
        .then(data => setCepData(data))
        .catch(error => {
          console.error('Erro na busca do CEP:', error);
          setCepData(null);
        });
    }
  };

  const handleStarWarsSearch = () => {
    if (starWarsCharacterName.trim() !== '') {
      fetch(`https://swapi.dev/api/people/?search=${starWarsCharacterName}`)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            setStarWarsCharacterData(data.results[0]);
          } else {
            setStarWarsCharacterData(null);
          }
        })
        .catch(error => {
          console.error('Erro na busca do personagem de Star Wars:', error);
          setStarWarsCharacterData(null);
        });
    }
  };


    return (
      <div>
        <h1>Buscar Pokémon por Nome</h1>
        <input
          type="text"
          value={pokemonName}
          onChange={e => setPokemonName(e.target.value)}
          placeholder="Digite o nome do Pokémon"
        />
        <button onClick={handleSearch}>Buscar</button>

        {pokemonData && (
          <div>
            <h2>{pokemonData.name}</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </div>
        )}

        <h1>Consultar CEP</h1>
        <input
          type="text"
          value={inputCep}
          onChange={e => setInputCep(e.target.value)}
          placeholder="Digite o CEP"
        />
        <button onClick={handleCepSearch}>Consultar</button>

        {cepData && (
          <div>
            <p>CEP: {cepData.cep}</p>
            <p>Rua: {cepData.logradouro}</p>
          </div>
        )}

<h1>Buscar Personagem de Star Wars</h1>
      <input
        type="text"
        value={starWarsCharacterName}
        onChange={e => setStarWarsCharacterName(e.target.value)}
        placeholder="Digite o nome do personagem de Star Wars"
      />
      <button onClick={handleStarWarsSearch}>Buscar</button>

      {starWarsCharacterData && (
        <div>
          <h2>{starWarsCharacterData.name}</h2>
          <p>Gênero: {starWarsCharacterData.gender}</p>
          <p>Ano de nascimento: {starWarsCharacterData.birth_year}</p>
        </div>
      )}

      </div>
    );


  }

  export default App;
