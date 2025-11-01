import { PageHeader } from '@/components/layout/PageHeader'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'
import type { Project } from '@/types/api'
import { Box, Button, Card, CardActionArea, CardActions, Grid, Stack, styled, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, createScope, Scope, stagger } from 'animejs'

type Props = {
  projects: Project[]
  onDelete: (id: string) => Promise<void>
  isDeleting: boolean
}

export const Projects = ({ projects, onDelete, isDeleting }: Props) => {
  const root = useRef(null)
  const scope = useRef<Scope>(null)

  useEffect(() => {
    if (projects.length === 0) return
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
  }, [projects])

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
          <Grid key={project.id} sx={{ xs: 4, md: 4 }}>
            <CardActionArea component={Link} to={`/projects/${project.id}`}>
              <Card className="anime-card" sx={{ position: 'relative', height: 180, opacity: 0 }}>
                <CardContents>
                  <Title>{project.name}</Title>
                  <Container>
                    <Typography>達成率</Typography>
                  </Container>
                  <Footer>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button
                        size="small"
                        href={path.editProject(String(project.id))}
                        onClick={(e) => e.stopPropagation()}
                      >
                        編集
                      </Button>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(String(project.id))
                        }}
                        disabled={isDeleting}
                      >
                        削除
                      </Button>
                    </CardActions>
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
