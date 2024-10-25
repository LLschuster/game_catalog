/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
*/

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app"
import { getFirestore } from 'firebase-admin/firestore'
initializeApp();
const db = getFirestore()
const GAMES_COLLECTION = "games"

type AddGameBody = {
  name: string;
  releaseYear?: number;
  players: {
    min: number;
    max: number;
  };
  publisher: string;
  expansions?: string[];
  baseGame?: string;
  standalone?: boolean;
  type: 'BaseGame' | 'Expansion';
}

const onRequestOptions = { cors: [ /llschuster.github\.io$/ ] }


export const helloWorld = onRequest( (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const AddNewGame = onRequest(onRequestOptions, async (request, response) => {
  logger.info("AddNewGame ", {
    body: request.body,
    params: request.query
  })

  if (!request.body){
    response.status(404).json({
        message: "malformed request, body is required"
    })
    return
  }

  try {
      const newGameDoc: AddGameBody = JSON.parse(request.body)
      const result = await db.collection(GAMES_COLLECTION).add(newGameDoc)
      response.status(201).json({
        message: "new document added",
        id: result.id
      });
  } catch (error) {
    logger.error(error)
    response.status(500).json({
        message: "could not add new game"
    })
  }
});

export const DeleteGame = onRequest(onRequestOptions, async (request, response) => {
  logger.info("AddNewGame ", {
    body: request.body,
    params: request.query
  })

  if (!request.query.gameId){
    response.status(404).json({
        message: "malformed request, game id is required"
    })
    return
  }

  const gameId = request.query.gameId as string
  
  try {
      await db.collection(GAMES_COLLECTION).doc(gameId).delete()
  } catch (error) {
    logger.error(error)
    response.status(500).json({
        message: "could not delete game"
    })
    return
  }

  logger.info(`Deleted document with id ${gameId}`)
  response.status(200).json({
    message: "game was deleted",
  });
});