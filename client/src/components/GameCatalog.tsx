import React, { useState } from 'react';
import "../index.css"

import { Game, PlayerCount } from '../utils/types';
import { useGetGameCatalog } from '../helpers/useGetGameCatalog';
import { useMutateGame } from '../helpers/useMutateGame';

export const GameCatalog: React.FC = () => {
  const {gameCatalog, fetchGames} = useGetGameCatalog();
  const { addNewGame, deleteGame } = useMutateGame()
  const [newGame, setNewGame] = useState<Partial<Game>>({
    name: '',
    releaseYear: undefined,
    players: { min: 1 },
    publisher: '',
    type: 'BaseGame',
  });
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const gameToAdd: Omit<Game, 'id'> = {
      name: newGame.name || '',
      releaseYear: newGame.releaseYear,
      players: { min: newGame.players?.min || 1, max: newGame.players?.max },
      publisher: newGame.publisher || '',
      type: newGame.type || 'BaseGame',
      baseGame: newGame.type === 'Expansion' ? newGame.baseGame : undefined,
    };

    const result = await addNewGame(gameToAdd);
    if (!result){
      alert("error while adding game")
      return
    }

    fetchGames()
  };

  const handleDeleteGame = async (id: string) => {
    const result = await deleteGame(id)
    if (!result){
      alert("error while deleting game")
      return
    }

    fetchGames()
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewGame(prev => {
      const handlePlayers = () => {
        if (name === "min"){
          return ({
            ...prev.players,
            [name]: parseInt(value)
          }) as PlayerCount
        } else if (name === "max"){
          return ({
              ...prev.players,
              [name]: parseInt(value) || undefined
            }) as PlayerCount
        }
        return prev.players
      }

      return ({
      ...prev,
      [name]: name === 'releaseYear' || name === 'min' || name === 'max' ? parseInt(value) || undefined : value,
      players: handlePlayers(),
    })});
  };

  const renderGameType = (type: Game["type"]) => {
    let className = 'game-type '
    if (type === "BaseGame"){
      className += "background-green"
    } else {
      className += "background-purple"
    }
    return (
      <p className={className}>{type}</p>
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCatalog = gameCatalog.filter(game => game.name.toLowerCase().includes(searchTerm));

  return (
    <div className="container">
      <h1>Game Catalog</h1>
      <input
        type="text"
        placeholder="Search games..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="game-grid">
        {filteredCatalog.map(game => (
          <div key={game.id} className="game-card">
            <h3>{game.name}</h3>
            <p><strong>Year:</strong> {game.releaseYear || 'N/A'}</p>
            <p><strong>Players:</strong> {game.players.min} - {game.players.max || 'N/A'}</p>
            <p><strong>Publisher:</strong> {game.publisher}</p>
            {renderGameType(game.type)}
            {game.type === 'Expansion' && <p><strong>Base Game ID:</strong> {game.baseGame}</p>}
            <button onClick={() => handleDeleteGame(game.id)} className="button">Delete</button>
          </div>
        ))}
      </div>

      <h2>Add a New Game</h2>
      <form onSubmit={handleAddGame} className="add-game-form">
        <input type="text" name="name" placeholder="Game Name" value={newGame.name || ''} onChange={handleChange} required />
        <input type="number" name="releaseYear" placeholder="Release Year" value={newGame.releaseYear || ''} onChange={handleChange} required />
        <input type="text" name="publisher" placeholder="Publisher" value={newGame.publisher || ''} onChange={handleChange} required />
        <input type="number" name="min" placeholder="Min Players" value={newGame.players?.min || ''} onChange={handleChange} required />
        <input type="number" name="max" placeholder="Max Players" value={newGame.players?.max || ''} onChange={handleChange} />
        <select name="type" value={newGame.type} onChange={handleChange}>
          <option value="BaseGame">Base Game</option>
          <option value="Expansion">Expansion</option>
        </select>
        {newGame.type === 'Expansion' && (
          <input type="text" name="baseGame" placeholder="Base Game ID" value={newGame.baseGame || ''} onChange={handleChange} />
        )}
        <button type="submit" className="button">Add Game</button>
      </form>
    </div>
  );
};

