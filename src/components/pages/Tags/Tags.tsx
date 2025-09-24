import { PageHeader } from '@/components/layout/PageHeader'
import { theme } from '@/constants/theme'
import type { Tag } from '@/types/api'
import { Box, Card, Chip, Grid, styled, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { animate, createScope, Scope, stagger } from 'animejs'

type Props = {
  tags: Tag[]
}

export const Tags = ({ tags }: Props) => {
  const root = useRef(null)
  const scope = useRef<Scope>(null)

  useEffect(() => {
    if (tags.length === 0) return
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
  }, [tags])

  return (
    <>
      <PageHeader title="タグ一覧" />
      <Grid container spacing={4}>
        {tags.map((tag) => (
          <Grid key={tag.id} size={{ xs: 6, md: 3 }}>
            {/*  Active state styles を使えば，グレーアウトできる */}
            <Card sx={{ height: 180, opacity: 0 }} className="anime-card">
              <CardContents>
                <Chip label={tag.name} component={Link} to={`/tags/${tag.id}`} clickable />
                <Typography
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {tag.task_count}件のタスク
                </Typography>
                <Typography
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  TODO件のドキュメント
                </Typography>
              </CardContents>
            </Card>
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
