import { Paper, ListItem, Chip, Box } from '@mui/material'
import { useState } from 'react'

type ChipData = {
  key: number
  label: string
}

type ChipsArrayProps = {
  chipsdata: ChipData[]
  deletable?: boolean
  onDelete?: (key: number) => void
}

export const ChipsArray = ({ chipsdata, deletable = true, onDelete }: ChipsArrayProps) => {
  return (
    <Box component="ul" sx={{ display: 'flex', gap: 0.5, listStyle: 'none', p: 0 }}>
      {chipsdata.map((data) => (
        <li key={data.key}>
          <Chip size="small" label={data.label} onDelete={deletable ? () => onDelete?.(data.key) : undefined} />
        </li>
      ))}
    </Box>
  )
}
