import { useHero } from '@/providers/hero'

import View from './view'

const Container = () => {
  const { category, setCategory, priceOrder, setPriceOrder } = useHero()

  return (
    <View
      category={category}
      setCategory={setCategory}
      priceOrder={priceOrder}
      setPriceOrder={setPriceOrder}
    />
  )
}

export default Container
