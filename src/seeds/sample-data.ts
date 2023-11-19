import axios from 'axios'
import random from 'lodash/random'
import sample from 'lodash/sample'
import { animals, starWars, uniqueNamesGenerator } from 'unique-names-generator'

import type { ItemResponse } from '@/pages/api/items'

const seedSampleData = async (numOfSamples: number) => {
  let succeeded = 0
  let failed = 0

  while (numOfSamples--) {
    const heroName = uniqueNamesGenerator({
      dictionaries: [starWars, animals],
      length: 1,
      style: 'capital',
    })
    const heroArt = sample(['dj', 'assassin', 'mafia', 'basketball-girl', 'neon-guy'])
    const heroCategory = sample(['common', 'epic', 'rare', 'legendary', 'mythic'])
    const heroPrice = random(1, 200)

    const hero = {
      name: heroName,
      art: heroArt,
      category: heroCategory,
      price: heroPrice,
    }

    console.log('adding hero', hero)
    const { data } = await axios.post<ItemResponse>('/api/items', hero)

    if ('error' in data) {
      console.error('error', data.error)
      ++failed
    } else {
      ++succeeded
    }
  }

  console.log('seeded', succeeded, '- failed', failed)
}

export default seedSampleData
