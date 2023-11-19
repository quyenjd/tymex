import Filters from '@/components/filters'
import HeroList from '@/components/hero-list'
import { Stack } from '@mui/material'

export default function Home() {
  return (
    <Stack className="p-4" spacing={2}>
      <Filters />
      <HeroList />
    </Stack>
  )
}
