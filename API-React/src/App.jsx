import React, { useEffect, useState } from 'react';

function App() {
  

  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [inputCep, setInputCep] = useState('');
  const [cepData, setCepData] = useState(null);




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

  const handleNumberFactSearch = () => {
    if (numberFact.trim() !== '') {
      fetch(`http://numbersapi.com/${numberFact}`)
        .then(response => response.text())
        .then(data => setNumberFactData(data))
        .catch(error => {
          console.error('Erro na busca de curiosidade numérica:', error);
          setNumberFactData('');
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



      </div>
  );

  
}

export default App;
