import * as admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'
import toFinite from 'lodash/toFinite'
import toSafeInteger from 'lodash/toSafeInteger'
import toString from 'lodash/toString'
import type { NextApiRequest, NextApiResponse } from 'next'
import { animals, names, uniqueNamesGenerator } from 'unique-names-generator'

const app =
  (getApps()[0] as admin.app.App) ??
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  })

export type Item = {
  id: string
  name: string
  art: 'dj' | 'assassin' | 'neon-guy' | 'mafia' | 'basketball-girl'
  category: 'epic' | 'common' | 'rare' | 'legendary' | 'mythic'
  price: number
  seller_name: string
}

export type ItemResponse =
  | {
      itemCount: number
      items: Item[]
      limit: number
      offset: number
    }
  | {
      error: string
    }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ItemResponse>) {
  const queryCategory = toString(req.query.category)
  const queryLimit = toSafeInteger(req.query.limit)
  const queryOffset = toSafeInteger(req.query.offset)
  const queryPriceDescending = req.query.order === 'descending'

  const response: ItemResponse = {
    itemCount: 0,
    items: [],
    limit: queryLimit,
    offset: queryOffset,
  }

  switch (req.method) {
    case 'GET':
      const itemsRef = app.firestore().collection('items') as admin.firestore.CollectionReference<
        Omit<Item, 'id'>
      >
      const query = (
        queryCategory ? itemsRef.where('category', '==', queryCategory) : itemsRef
      ).orderBy('price', queryPriceDescending ? 'desc' : 'asc')

      res.status(200).send({
        ...response,
        itemCount: (await query.count().get()).data().count,
        items: (await query.limit(queryLimit).get()).docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      } as ItemResponse)

      break
    case 'POST':
      const name = toString(req.body.name)
      const art = toString(req.body.art)
      const category = toString(req.body.category)
      const price = toFinite(req.body.price)

      const sellerName = uniqueNamesGenerator({
        dictionaries: [names, animals],
        length: 2,
        separator: ' ',
        style: 'capital',
      })

      if (!['dj', 'assassin', 'neon-guy', 'mafia', 'basketball-girl'].includes(art)) {
        res.status(400).json({ error: 'Invalid art' })
        break
      }

      if (!['epic', 'common', 'rare', 'legendary', 'mythic'].includes(category)) {
        res.status(400).json({ error: 'Invalid category' })
        break
      }

      const itemRef = await app.firestore().collection('items').add({
        name,
        art,
        category,
        price,
        seller_name: sellerName,
      })
      const itemData = (await itemRef.get()).data()

      if (itemData) {
        res.status(200).json({
          itemCount: 1,
          items: [
            {
              id: itemRef.id,
              name: itemData.name,
              art: itemData.art,
              category: itemData.category,
              price: itemData.price,
              seller_name: itemData.seller_name,
            },
          ],
          limit: 0,
          offset: 0,
        })
      } else {
        res.status(500).send({ error: 'Failed to add new item' })
      }

      break
    default:
      res.status(200).json(response)
  }
}
