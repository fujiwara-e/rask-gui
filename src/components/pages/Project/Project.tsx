import { PageHeader } from '@/components/layout/PageHeader'
import { theme } from '@/constants/theme'
import type { Project as ProjectType, Task } from '@/types/api'
import { Box, Button, Card, CardActionArea, Grid, Paper, Stack, styled, Typography } from '@mui/material'
import { Link } from "react-router-dom"

type Props = {
  project: ProjectType
  projectId: string
  filteredTasks?: Task[] | null
}

export const Project = ({ project, projectId, filteredTasks }: Props) => {
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <PageHeader title={project.name} />
        <Box sx={{ mb: 5 }} >
          <Stack direction={"row"} spacing={2} >
            <Button variant="contained" href={`/projects/${projectId}/edit`} >編集</Button>
            <Button variant="contained">削除</Button>
          </Stack>
        </Box>
      </Stack>
      <Paper sx={{ padding: 4 }}>
        <Stack spacing={4}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">作成者</Typography>
            <Typography >
              {project.user.name}
            </Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">タスク一覧</Typography>
            <Paper sx={{ padding: 4 }}>
              {filteredTasks && filteredTasks.length > 0 ? (
                <Grid container spacing={2}>
                  {filteredTasks.map((task) => (
                    <Grid key={task.id} size={{ xs: 6, md: 4 }}>
                      <CardActionArea component={Link} to={`/tasks/${task.id}`}>
                        <Card sx={{ height: 180 }}>
                          <CardContents>
                            <Title >{task.content}</Title>
                            <Container>
                              <Typography sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {task.description}
                              </Typography>
                            </Container>
                            <Footer>
                              <Typography>
                                {typeof task.assigner === "string"
                                  ? task.assigner
                                  : task.assigner
                                    ? task.assigner.name
                                    : ""}
                              </Typography>
                              <Typography>
                                {task.due_at
                                  ? `期限まで:${deadline(task.due_at)}日`
                                  : "期限なし"}
                              </Typography>
                            </Footer>
                          </CardContents>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography>タスクがありません</Typography>
              )}
            </Paper>
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