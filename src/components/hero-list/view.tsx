import { memo } from 'react'

import type { Item } from '@/pages/api/items'
import { Box, Button, CircularProgress, Grid, Stack } from '@mui/material'

import HeroCard from '../hero-card'

const View = ({
  heroes,
  hasMore,
  loading,
  loadMore,
}: {
  heroes: Item[]
  hasMore: boolean
  loading: boolean
  loadMore: () => void
}) => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={1.5} className="!-ml-3">
        {heroes.map((hero) => (
          <Grid key={hero.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <HeroCard hero={hero} />
          </Grid>
        ))}
      </Grid>

      <Box className="text-center">
        {loading && <CircularProgress color="info" size="2rem" />}
        {hasMore && !loading && (
          <Button className="hero-list-load-more-btn" onClick={loadMore}>
            Load more
          </Button>
        )}
      </Box>
    </Stack>
  )
}

const memoView = memo(View)
memoView.displayName = 'HeroList'
export default memoView
