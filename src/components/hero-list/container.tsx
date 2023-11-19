import { useHero } from '@/providers/hero'

import View from './view'

const Container = () => {
  const { heroes, hasMore, loading, loadMore } = useHero()
  return <View heroes={heroes} hasMore={hasMore} loading={loading} loadMore={loadMore} />
}

export default Container
