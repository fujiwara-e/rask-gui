import { PageHeader } from '@/components/layout/PageHeader'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'
import type { Task } from '@/types/api'
import { Box, Button, Card, CardActionArea, Grid, Stack, styled, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, createScope, Scope, stagger } from 'animejs'

type Props = {
  tasks: Task[]
}

export const Tasks = ({ tasks }: Props) => {
  const root = useRef(null)
  const scope = useRef<Scope>(null)

  useEffect(() => {
    if (tasks.length === 0) return
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
  }, [tasks])

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageHeader title="タスク一覧" />
        <Box sx={{ mb: 5 }}>
          <Button variant="contained" href={path.newTask()}>
            作成
          </Button>
        </Box>
      </Stack>
      <Grid container spacing={4}>
        {tasks.map((task) => (
          <Grid key={task.id} size={{ xs: 6, md: 4 }}>
            <Card className="anime-card" sx={{ height: 180, opacity: 0 }}>
              <CardContents>
                <CardActionArea component={Link} to={`/tasks/${task.id}`}>
                  <Title>{task.content}</Title>
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
                      {task.description}
                    </Typography>
                  </Container>
                  <Footer>
                    <Typography>
                      {typeof task.assigner === 'string' ? task.assigner : task.assigner ? task.assigner.name : ''}
                    </Typography>
                    <Typography>{task.due_at ? `期限まで:${deadline(task.due_at)}日` : '期限なし'}</Typography>
                  </Footer>
                </CardActionArea>
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

const Title = styled(Typography)`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${theme.spacing(1)};
`

const Container = styled(Box)`
  min-height: 100px;
  gap: ${theme.spacing(1)};
`
const Footer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
`

const deadline = (due_at: string) => {
  const dueDate = new Date(due_at)
  const now = new Date()

  const diffTime = dueDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays)
}
