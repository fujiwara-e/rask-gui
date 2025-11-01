import { Card, CardActionArea, Typography, Box, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Document } from '@/types/api'
import dayjs from 'dayjs'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'

type Props = {
  document: Document
}

export const DocumentCard = ({ document }: Props) => {
  return (
    <CardActionArea component={Link} to={path.document(String(document.id))}>
      <Card sx={{ height: 180, opacity: 0 }} className="anime-card">
        <CardContents>
          <Title>{document.content}</Title>
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
      </Card>
    </CardActionArea>
  )
}

const CardContents = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing(2)};
`

const Title = styled(Typography)`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Container = styled(Box)`
  gap: ${theme.spacing(1)};
`
const Footer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
