import { useParams } from "react-router-dom";
import { Project } from "./Project";
import { Suspense } from "react";
import { useFetchProject } from "./useFetchProject";
import { useFetchTasksByProject } from "./useFetchTasksByProject";

const ProjectAdapter = () => {
  const { id } = useParams<{ id: string }>()

  if (typeof id !== "string") {
    throw new Error("unexpected error")
  }

  const project = useFetchProject(id)
  const filteredTasks = useFetchTasksByProject(project?.name || "")

  return project ? <Project project={project} projectId={id} filteredTasks={filteredTasks} /> : null
}

export const ProjectAdapterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectAdapter />
    </Suspense>
  )
}

