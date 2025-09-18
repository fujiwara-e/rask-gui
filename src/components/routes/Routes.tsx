import { useRoutes } from 'react-router-dom'
import { path } from '@/constants/application'
import { Welcome } from '@/components/pages/Welcome'
import { Container } from '@/components/layout/Container'
import { Tasks } from '@/components/pages/Tasks'
import { Task } from '@/components/pages/Task'
import { Users } from '../pages/Users'
import { EditTask } from '../pages/EditTask'
import { Projects } from '../pages/Projects'
import { Project } from '../pages/Project'
import { NewProject } from '../pages/NewProject'
import { EditProject } from '../pages/EditProject'
import { NewTag } from '../pages/NewTag'
import { Tags } from '../pages/Tags'

export const Routes = () => {
  return useRoutes([
    {
      path: path.root(),
      element: <Container />,
      children: [
        {
          index: true,
          element: <Tasks />,
        },
        {
          path: path.welcome(),
          element: <Welcome />,
        },
        {
          path: path.tasks(),
          element: <Tasks />,
        },
        {
          path: path.task(':id'),
          element: <Task />,
        },
        {
          path: path.users(),
          element: <Users />,
        },
        {
          path: path.editTask(':id'),
          element: <EditTask />,
        },
        {
          path: path.projects(),
          element: <Projects />,
        },
        {
          path: path.project(':id'),
          element: <Project />,
        },
        {
          path: path.newProject(),
          element: <NewProject />,
        },
        {
          path: path.editProject(':id'),
          element: <EditProject />,
        },
        {
          path: path.tags(),
          element: <Tags />,
        },
        {
          path: path.newTag(),
          element: <NewTag />,
        },
      ],
    },
  ])
}
