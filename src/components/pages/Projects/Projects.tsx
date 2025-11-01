import { PageHeader } from '@/components/layout/PageHeader'
import { path } from '@/constants/application'
import type { Project } from '@/types/api'
import { Box, Button, Grid, Stack } from '@mui/material'
import { useEffect, useRef } from 'react'
import { animate, createScope, Scope, stagger } from 'animejs'
import { ProjectCard } from './ProjectCard'

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
            <ProjectCard project={project} onDelete={onDelete} isDeleting={isDeleting} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
