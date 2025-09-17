import { Suspense, useState, type FormEvent } from 'react'
import { NewProject } from './NewProject'
import { useCreateProject } from './useCreateProject'
import { useNavigate } from 'react-router-dom'
import { path } from '@/constants/application'

const NewProjectAdapter = () => {
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState<string>('')
  const { createProject, isLoading } = useCreateProject()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!projectName.trim()) return

    await createProject(projectName)
    navigate(path.projects())
  }

  return (
    <NewProject
      projectName={projectName}
      onProjectNameChange={setProjectName}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}

export const NewProjectAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewProjectAdapter />
    </Suspense>
  )
}
