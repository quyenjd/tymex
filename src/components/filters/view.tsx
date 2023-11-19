import { type Dispatch, memo, type SetStateAction, useMemo } from 'react'

import type { Item } from '@/pages/api/items'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Button, MenuItem, Select, Stack, Typography } from '@mui/material'

const View = ({
  category,
  setCategory,
  priceOrder,
  setPriceOrder,
}: {
  category?: Item['category']
  setCategory: Dispatch<SetStateAction<Item['category'] | undefined>>
  priceOrder: 'ascending' | 'descending'
  setPriceOrder: Dispatch<SetStateAction<'ascending' | 'descending'>>
}) => {
  const categories = useMemo(
    () => ({
      All: undefined,
      Common: 'common',
      Rare: 'rare',
      Epic: 'epic',
      Legendary: 'legendary',
      Mythic: 'mythic',
    }),
    [],
  )

  return (
    <Stack
      direction="row"
      gap={1.25}
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Stack direction="row" gap={1.25} flexWrap="wrap">
        {Object.entries(categories).map(([text, categoryValue]) => (
          <Button
            key={text}
            className={`${
              category === categoryValue ? 'bg-primary' : 'bg-disabled'
            } normal-case text-white px-3 py-2 rounded-md text-sm`}
            onClick={() => setCategory(categoryValue as Item['category'] | undefined)}
          >
            {text}
          </Button>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography className="text-sm text-white">Price:</Typography>
        <Select
          className="border border-solid border-[#3A3841] rounded-md text-sm text-white"
          SelectDisplayProps={{ className: 'pl-3 pr-8 py-2' }}
          value={priceOrder}
          IconComponent={() => (
            <ExpandMore className="absolute right-1 pointer-events-none" htmlColor="#D6D6D6" />
          )}
          onChange={(event) => {
            setPriceOrder(event.target.value as 'ascending' | 'descending')
          }}
        >
          <MenuItem value="ascending">Low to high</MenuItem>
          <MenuItem value="descending">High to low</MenuItem>
        </Select>
      </Stack>
    </Stack>
  )
}

const memoView = memo(View)
memoView.displayName = 'Filters'
export default memoView
