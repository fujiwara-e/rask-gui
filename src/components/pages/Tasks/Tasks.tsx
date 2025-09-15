import { PageHeader } from "@/components/layout/PageHeader"
import { theme } from "@/constants/theme"
import type { Task } from "@/types/api"
import { Box, Card, CardActionArea, Grid, styled, Typography } from "@mui/material"
import { Link } from "react-router-dom"

type Props = {
  tasks: Task[]
}

export const Tasks = ({ tasks }: Props) => {
  return (
    <>
      <PageHeader title="タスク一覧" />
      <Grid container spacing={4} >
        {tasks.map((task) => (
          <Grid key={task.id} size={{ xs: 6, md: 4 }}>
            {/*  Active state styles を使えば，グレーアウトできる */}
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

const deadline = (due_at: string) => {
  const dueDate = new Date(due_at)
  const now = new Date()

  const diffTime = dueDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays)
}
