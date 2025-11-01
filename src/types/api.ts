// User type for creator and assigner
export interface User {
  id: number
  provider: string
  uid: string
  name: string
  screen_name: string
  avatar_url?: string
  password_digest?: string
  active?: boolean
  created_at: string
  updated_at: string
  assigned_tasks?: Task[]
  tasks?: Task[]
  projects?: Project[]
  // api_tokens?: ApiToken[];
  documents?: Document[]
}

// Project type
export interface Project {
  id: number
  name: string
  user: User
}

// Tag type
export interface Tag {
  id: number
  name: string
  tasks?: Task[]
  documents?: Document[]
  task_count: number
  created_at: string
  updated_at: string
}

// Task State type
export interface TaskState {
  id: number
  name: string
  priority: number
  about?: string
  color?: string
  created_at: string
  updated_at: string
}

// Main Task type based on backend implementation
export interface Task {
  id: number
  content: string
  description?: string
  due_at?: string
  created_at: string
  updated_at: string
  creator: User
  assigner: User
  project?: Project
  state: TaskState
  tags: Tag[]
  url: string
}

// Task creation/update payload
export interface TaskPayload {
  content: string
  description?: string
  due_at?: string
  assigner_id: number
  project_id?: number
  task_state_id: number
  tag_ids?: number[]
}

// Task search/filter parameters
export interface TaskSearchParams {
  q?: {
    content_or_assigner_screen_name_or_description_or_project_name_cont?: string
    s?: string
  }
  page?: number
}

// API Response types
export interface TaskListResponse {
  tasks: Task[]
  pagination?: {
    current_page: number
    total_pages: number
    total_count: number
  }
}

export interface Document {
  id: number
  content: string
  creator_id: number
  creator_name: string
  description: string | null
  created_at: string
  updated_at: string
  project_id: number | null
  project_name?: string
  start_at: string
  end_at: string
  location: string
  url: string
  tags: Tag[]
  creator?: User
  project?: Project
}

export interface DocumentResponse {
  id: number
  content: string
  creator: { id: number; name: string }
  project?: { id: number; name: string }
  description: string | null
  created_at: string
  updated_at: string
  start_at: string
  end_at: string
  location: string
  url: string
  tags: Tag[]
}

export interface DocumentPayload {
  content: string
  description?: string
  project_id?: number
  start_at: string
  end_at: string
  location: string
  tag_names?: string
}
