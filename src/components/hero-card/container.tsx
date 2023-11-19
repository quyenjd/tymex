import type { Item } from '@/pages/api/items'

import View from './view'

const Container = ({ hero }: { hero: Item }) => <View {...hero} />

export default Container
