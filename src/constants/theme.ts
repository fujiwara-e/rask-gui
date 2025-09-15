import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'
import type { } from '@mui/x-date-pickers/themeAugmentation'

export const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
  components: {
    MuiDatePicker: {
      defaultProps: {
        displayWeekNumber: true,
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
    },
  },
})
