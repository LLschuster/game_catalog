import { collection, getDocs, query } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { Game } from "../utils/types"
import db from "./firestore"

const gamesCollection = collection(db, "games")
export const useGetGameCatalog = () => {
  const [gameCatalog, setGameCatalog] = useState<Game[]>([])
    const fetchGames = useCallback(async () => {
      const q = query(gamesCollection)
      const results = await getDocs(q)
      const list: Game[] = results.docs.map(v => {
        const data = v.data();
        return ({
          ...data as Game,
          id: v.id,
        })
      })
      setGameCatalog(list)
    },[])
    
  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  return {gameCatalog, fetchGames}
}