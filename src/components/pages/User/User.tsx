import { PageHeader } from '@/components/layout/PageHeader'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'
import type { User as UserType } from '@/types/api'
import { Stack, Box, Paper, Typography, styled, Grid, CardActionArea, Card, Button } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
  user: UserType
}
export const User = ({ user }: Props) => {
  // 期限順（due_at昇順、期限なしは最後）でソート
  const sortedTasks = user.assigned_tasks
    ? [...user.assigned_tasks].sort((a, b) => {
        if (!a.due_at && !b.due_at) return 0
        if (!a.due_at) return 1
        if (!b.due_at) return -1
        return new Date(a.due_at).getTime() - new Date(b.due_at).getTime()
      })
    : []

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <PageHeader title={user.screen_name} />
        <Box sx={{ mb: 5 }}>
          <Button variant="contained" href={`/users/${user.id}/edit`}>
            編集
          </Button>
        </Box>
      </Stack>
      <Paper sx={{ padding: 4, backgroundColor: 'background.paper' }}>
        <Stack spacing={4}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              氏名
            </Typography>
            <Typography>{user.name}</Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              最新タスク
            </Typography>
            <Grid container spacing={2}>
              {sortedTasks.map((task) => (
                <Grid key={task.id} size={{ xs: 6, md: 4 }}>
                  {/*  Active state styles を使えば，グレーアウトできる */}
                  <CardActionArea component={Link} to={`/tasks/${task.id}`}>
                    <Card sx={{ height: 150 }}>
                      <CardContents>
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
                            {typeof task.assigner === 'string'
                              ? task.assigner
                              : task.assigner
                                ? task.assigner.name
                                : ''}
                          </Typography>
                          <Typography>{task.due_at ? `期限まで:${deadline(task.due_at)}日` : '期限なし'}</Typography>
                        </Footer>
                      </CardContents>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
            <Button size="small" sx={{ maxWidth: 110 }} variant="text" href={path.tasks()}>
              タスク一覧へ
            </Button>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              API トークン
            </Typography>
            <Typography>TBD</Typography>
          </StackContents>
        </Stack>
      </Paper>
    </>
  )
}

const StackContents = styled(Stack)`
  height: 100%;
  display: flex;
`

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

const deadline = (due_at: string) => {
  const dueDate = new Date(due_at)
  const now = new Date()

  const diffTime = dueDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays)
}
