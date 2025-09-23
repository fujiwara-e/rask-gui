import { PageHeader } from '@/components/layout/PageHeader'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'
import type { Tag as TagType } from '@/types/api'
import { Stack, Box, Button, Paper, Typography, styled, Grid, CardActionArea, Card } from '@mui/material'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

type Props = {
  tag: TagType
}
export const Tag = ({ tag }: Props) => {
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <PageHeader title={tag.name} />
        <Box sx={{ mb: 5 }}>
          <Button variant="contained" href={`/tags/${tag.id}/edit`}>
            編集
          </Button>
        </Box>
      </Stack>
      <Paper sx={{ padding: 4 }}>
        <Stack spacing={4}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              タスク一覧
            </Typography>
            <Grid container spacing={2}>
              {tag.tasks &&
                tag.tasks.map((task) => (
                  <Grid key={task.id} size={{ xs: 6, md: 4 }}>
                    {/*  Active state styles を使えば，グレーアウトできる */}
                    <CardActionArea component={Link} to={path.task(String(task.id))}>
                      <Card sx={{ height: 120 }}>
                        <CardContents>
                          <Title>{task.content}</Title>
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
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              文書一覧
            </Typography>
            <Grid container spacing={2}>
              {tag.documents &&
                tag.documents.map((document) => (
                  <Grid key={document.id} size={{ xs: 6, md: 4 }}>
                    {/*  Active state styles を使えば，グレーアウトできる */}
                    <CardActionArea component={Link} to={path.document(String(document.id))}>
                      <Card sx={{ height: 120 }}>
                        <CardContents>
                          <Title>{document.content}</Title>
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
          </StackContents>
        </Stack>
      </Paper>
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

const StackContents = styled(Stack)`
  height: 100%;
  display: flex;
`
