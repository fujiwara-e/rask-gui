import { PageHeader } from '@/components/layout/PageHeader'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'
import type { Project } from '@/types/api'
import { Box, Button, Card, CardActionArea, CardActions, Grid, Stack, styled, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
  projects: Project[]
  onDelete: (id: string) => Promise<void>
  isDeleting: boolean
}

export const Projects = ({ projects, onDelete, isDeleting }: Props) => {
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageHeader title="プロジェクト一覧" />
        <Box sx={{ mb: 5 }}>
          <Button variant="contained" href={path.newProject()}>
            作成
          </Button>
        </Box>
      </Stack>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid key={project.id} sx={{ xs: 6, md: 4 }}>
            <Card sx={{ height: 180 }}>
              <CardContents>
                <CardActionArea component={Link} to={`/projects/${project.id}`}>
                  <Title>{project.name}</Title>
                  <Container>
                    <Typography>達成率</Typography>
                  </Container>
                </CardActionArea>
                <Footer>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button size="small" href={path.editProject(String(project.id))}>
                      編集
                    </Button>
                    <Button size="small" onClick={() => onDelete(String(project.id))} disabled={isDeleting}>
                      削除
                    </Button>
                  </CardActions>
                </Footer>
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
`

const Container = styled(Box)`
  gap: ${theme.spacing(1)};
`
const Footer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
