export const path = {
  root: () => '/',
  welcome: () => '/welcome',
  tasks: () => '/tasks',
  task: (id: string) => `/tasks/${id}`,
  users: () => '/users',
  editTask: (id: string) => `/tasks/${id}/edit`,
  projects: () => '/projects',
}
