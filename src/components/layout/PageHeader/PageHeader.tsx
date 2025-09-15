import { Typography } from "@mui/material"
import type { TypographyProps } from "@mui/material"
import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  variant?: TypographyProps['variant']
  children?: ReactNode
}

export const PageHeader = ({
  title,
  variant = "h4",
  children
}: PageHeaderProps) => {
  return (
    <>
      <Typography variant={variant} fontWeight="bold" gutterBottom sx={{ mb: 5 }}>
        {title}
      </Typography>
      {children}
    </>
  )
}
