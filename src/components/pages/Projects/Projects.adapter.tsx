import { Suspense } from 'react'
import { useFetchProjects } from './useFetchProjects'
import { Projects } from './Projects'
import { useDeleteProject } from '../Project/useDeleteProject'

export const ProjectsAdapter = () => {
  const { projects, refetch } = useFetchProjects()
  const { deleteProject, isLoading } = useDeleteProject()

  const handleDelete = async (id: string) => {
    await deleteProject(id)
    refetch()
  }

  return projects ? <Projects projects={projects} onDelete={handleDelete} isDeleting={isLoading} /> : null
}

export const ProjectsAdapterWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProjectsAdapter />
  </Suspense>
)
