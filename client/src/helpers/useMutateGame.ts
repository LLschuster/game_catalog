import { Game } from "../utils/types"

const api_url = "https://<METHOD>-r4c5ltz7ga-uc.a.run.app"

export const useMutateGame = () => {

  const addNewGame = async (newGame: Omit<Game, 'id'>) => {
    const url = api_url.replace("<METHOD>", "addnewgame")
    try {
      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newGame)
      })
      
      const responseBody = await result.json()

      return responseBody.id
    } catch (error) {
      console.log(error)
      return
    }
  }

    const deleteGame = async (gameId: string) => {
    const url = `${api_url.replace("<METHOD>", "deletegame")}?gameId=${gameId}`
    try {
      await fetch(url, {
        method: 'DELETE',
      })
      
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return {
    addNewGame,
    deleteGame
  }
}