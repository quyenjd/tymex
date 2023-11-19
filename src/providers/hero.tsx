import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import axios from 'axios'

import type { Item, ItemResponse } from '@/pages/api/items'

export type HeroContext = {
  heroes: Item[]
  hasMore: boolean
  loading: boolean
  loadMore: () => void
  category: Item['category'] | undefined
  setCategory: Dispatch<SetStateAction<Item['category'] | undefined>>
  priceOrder: 'ascending' | 'descending'
  setPriceOrder: Dispatch<SetStateAction<'ascending' | 'descending'>>
}

const HeroContext = createContext<HeroContext>({
  heroes: [],
  hasMore: false,
  loading: false,
  loadMore: () => null,
  category: undefined,
  setCategory: () => null,
  priceOrder: 'ascending',
  setPriceOrder: () => null,
})

const HeroProvider = ({ children }: PropsWithChildren) => {
  const [heroes, setHeroes] = useState<Item[]>([])
  const [itemCount, setItemCount] = useState(Infinity)
  const [loading, setLoading] = useState(false)

  const [category, setCategory] = useState<Item['category']>()
  const [priceOrder, setPriceOrder] = useState<'ascending' | 'descending'>('ascending')

  const hasMore = heroes.length < itemCount

  const loadMore = useCallback(async () => {
    if (loading) return

    setLoading(true)

    const { data } = await axios.get<ItemResponse>('/api/items', {
      params: {
        category,
        limit: 8,
        offset: heroes.length,
        order: priceOrder,
      },
    })

    if ('error' in data) {
      throw new Error(`Failed to retrieve items: ${data.error}`)
    }

    setHeroes((heroes) => [...heroes, ...data.items])
    setItemCount(data.itemCount)

    setLoading(false)
  }, [category, heroes, loading, priceOrder])

  useEffect(() => {
    setHeroes([])
    setItemCount(Infinity)
  }, [category, priceOrder])

  useEffect(() => {
    if (!heroes.length && hasMore) {
      loadMore()
    }
  }, [hasMore, heroes, loadMore])

  const contextValue = useMemo<HeroContext>(
    () => ({
      heroes,
      hasMore,
      loading,
      loadMore,
      category,
      setCategory,
      priceOrder,
      setPriceOrder,
    }),
    [category, hasMore, heroes, loadMore, loading, priceOrder],
  )

  return <HeroContext.Provider value={contextValue}>{children}</HeroContext.Provider>
}

export const useHero = () => useContext(HeroContext)

export default HeroProvider
