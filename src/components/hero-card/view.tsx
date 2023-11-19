import { memo } from 'react'

import capitalize from 'lodash/capitalize'
import Image from 'next/image'

import type { Item } from '@/pages/api/items'
import { Box, Stack, Typography } from '@mui/material'

import ResponsiveImage from '../base/ResponsiveImage'

const View = (hero: Item) => {
  return (
    <Stack className="rounded-xl p-4" bgcolor="rgba(58, 56, 65, 0.6)" spacing={3}>
      <Stack className={`rounded-md bg-gradient-${hero.category}`}>
        <Stack className="p-2" direction="row" alignItems="center" justifyContent="space-between">
          <Box bgcolor="rgba(49, 59, 69, 0.5)" className="rounded-md px-3 py-1 text-xs leading-5">
            {capitalize(hero.category)}
          </Box>
          <Image alt="heart" src="heart.svg" height={16} width={16} />
        </Stack>
        <Box className="relative pb-[100%]">
          <Image alt={hero.art} src={`/arts/${hero.art}.svg`} fill objectFit="cover" />
        </Box>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography className="text-base text-white">{hero.name}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ResponsiveImage alt="ethereum" src="ethereum.svg" className="w-2" />
            <span className="text-sm text-white">{hero.price} ETH</span>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box className="rounded-full">
            <ResponsiveImage alt="avatar" src="avatar.svg" className="w-8" />
          </Box>
          <Typography className="text-xs leading-3">{hero.seller_name}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

const memoView = memo(View)
memoView.displayName = 'HeroCard'
export default memoView
