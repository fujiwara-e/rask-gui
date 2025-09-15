import { Suspense } from "react";
import { useFetchProjects } from "./useFetchProjects";
import { Projects } from "./Projects";

export const ProjectsAdapter = () => {
  const projects = useFetchProjects();

  return projects ? <Projects projects={projects} /> : null
}

export const ProjectsAdapterWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProjectsAdapter />
  </Suspense>
)