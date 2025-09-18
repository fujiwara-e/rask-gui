import { useNavigate, useParams } from 'react-router-dom'
import { Project } from './Project'
import { Suspense } from 'react'
import { useFetchProject } from './useFetchProject'
import { useFetchTasksByProject } from './useFetchTasksByProject'
import { useDeleteProject } from './useDeleteProject'

const ProjectAdapter = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { deleteProject, isLoading } = useDeleteProject()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const project = useFetchProject(id)
  const filteredTasks = useFetchTasksByProject(project?.name || '')

  const handleDelete = async (id: string) => {
    await deleteProject(id)
    navigate('/projects')
  }

  return project ? (
    <Project
      project={project}
      projectId={id}
      filteredTasks={filteredTasks}
      onDelete={handleDelete}
      isDeleting={isLoading}
    />
  ) : null
}

export const ProjectAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectAdapter />
    </Suspense>
  )
}
