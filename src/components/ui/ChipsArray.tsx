import { Paper, ListItem, Chip, Box } from "@mui/material";
import { useState } from "react";

type ChipData = {
  key: number
  label: string
}

type ChipsArrayProps = {
  chipsdata: ChipData[]
  deletable?: boolean
}

export const ChipsArray = ({ chipsdata, deletable = true }: ChipsArrayProps) => {
  const [chipData, setChipData] = useState<ChipData[]>(
    chipsdata.map((data, index) => ({ key: index, label: data.label }))
  )

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))
  }

  return (
    <Box component="ul" sx={{ display: "flex", gap: 0.5, listStyle: "none", p: 0 }} >
      {chipData.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              size="small"
              label={data.label}
              onDelete={deletable ? handleDelete(data) : undefined}
            />
          </li>
        )
      }
      )}
    </Box>
  )
}

