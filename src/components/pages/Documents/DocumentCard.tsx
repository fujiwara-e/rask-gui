import { Card, CardActionArea, Typography, Box, styled, Popover, IconButton } from '@mui/material'
import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Document } from '@/types/api'
import type { PopoverOrigin } from '@mui/material/Popover'
import dayjs from 'dayjs'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'
import { useState } from 'react'
import { DocumentPopoverContent } from './DocumentPopoverContent'

type Props = {
  document: Document
  columnIndex?: number // 何列目か（0始まり）
}

const getPopoverPosition = (columnIndex?: number): { anchorOrigin: PopoverOrigin; transformOrigin: PopoverOrigin } => {
  switch (columnIndex) {
    case 0:
      return {
        anchorOrigin: { vertical: 'center', horizontal: 'right' },
        transformOrigin: { vertical: 'center', horizontal: 'left' },
      }
    case 1:
      return {
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      }
    case 2:
      return {
        anchorOrigin: { vertical: 'center', horizontal: 'left' },
        transformOrigin: { vertical: 'center', horizontal: 'right' },
      }
    default:
      return {
        anchorOrigin: { vertical: 'center', horizontal: 'center' },
        transformOrigin: { vertical: 'center', horizontal: 'center' },
      }
  }
}

export const DocumentCard = ({ document, columnIndex }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const { anchorOrigin, transformOrigin } = getPopoverPosition(columnIndex)

  return (
    <>
      <Card sx={{ height: 180, opacity: 0, position: 'relative' }} className="anime-card">
        <CardActionArea component={Link} to={path.document(String(document.id))} sx={{ height: '100%' }}>
          <CardContents>
            <TitleRow>
              <Title>{document.content}</Title>
            </TitleRow>
            <IconButton
              size="small"
              onClick={handleInfoClick}
              sx={{
                position: 'absolute',
                top: 12,
                right: 8,
                zIndex: 1,
              }}
              aria-label="詳細情報を表示"
            >
              <Info size={18} />
            </IconButton>
            <Container>
              <Typography
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {document.description}
              </Typography>
            </Container>
            <Footer>
              <Typography>{document.creator_name}</Typography>
              <Typography>{dayjs(document.created_at).format('YYYY-MM-DD')}</Typography>
            </Footer>
          </CardContents>
        </CardActionArea>
      </Card>

      <Popover
        id="document-info-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={handlePopoverClose}
      >
        <DocumentPopoverContent document={document} />
      </Popover>
    </>
  )
}

const CardContents = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing(2)};
`

const TitleRow = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing(1)};
  padding-right: ${theme.spacing(4)};
`

const Title = styled(Typography)`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`

const Container = styled(Box)`
  gap: ${theme.spacing(1)};
`
const Footer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
