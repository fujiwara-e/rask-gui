import { Suspense, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProject } from '../Project/useFetchProject'
import { useEditProject } from './useEditProject'
import { path } from '@/constants/application'
import { EditProject } from './EditProject'

const EditProjectAdapter = () => {
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState<string>('')
  const { editProject, isLoading } = useEditProject()

  const { id } = useParams<{ id: string }>()

  if (typeof id !== 'string') {
    throw new Error('unexpected error')
  }

  const project = useFetchProject(id)
  if (project && projectName === '') {
    setProjectName(project.name)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!projectName.trim()) return

    await editProject(id, projectName)
    navigate(path.projects())
  }

  return (
    <EditProject
      projectName={projectName}
      onProjectNameChange={setProjectName}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}

export const EditProjectAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProjectAdapter />
    </Suspense>
  )
}
