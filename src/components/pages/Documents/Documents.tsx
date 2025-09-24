import { PageHeader } from '@/components/layout/PageHeader'
import { theme } from '@/constants/theme'
import { Stack, Box, Button, Grid, CardActionArea, Card, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Document } from '@/types/api'
import dayjs from 'dayjs'
import { path } from '@/constants/application'
import { useEffect, useRef } from 'react'
import { animate, createScope, Scope, stagger } from 'animejs'

type Props = {
  documents: Document[]
}
export const Documents = ({ documents }: Props) => {
  const root = useRef(null)
  const scope = useRef<Scope>(null)

  useEffect(() => {
    if (documents.length === 0) return
    scope.current = createScope({ root: root.current! }).add(() => {
      animate('.anime-card', {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(100),
        duration: 600,
        easing: 'easeOutQuad',
      })
    })
    return () => {
      if (scope.current) {
        scope.current.revert()
      }
    }
  }, [documents])

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageHeader title="文書一覧" />
        <Box sx={{ mb: 5 }}>
          <Button variant="contained" href={path.newdocument()}>
            作成
          </Button>
        </Box>
      </Stack>
      <Grid container spacing={4}>
        {documents.map((document) => (
          <Grid key={document.id} size={{ xs: 6, md: 4 }}>
            {/*  Active state styles を使えば，グレーアウトできる */}
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
          </Grid>
        ))}
      </Grid>
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
