// User type for creator and assigner
export interface User {
  id: number;
  name: string;
}

// Project type
export interface Project {
  id: number;
  name: string;
}

// Tag type
export interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Task State type
export interface TaskState {
  id: number;
  name: string;
  priority: number;
  about?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

// Main Task type based on backend implementation
export interface Task {
  id: number;
  content: string;
  description?: string;
  due_at?: string;
  created_at: string;
  updated_at: string;
  creator: User;
  assigner: User;
  project?: Project;
  state: TaskState;
  tags: Tag[];
  url: string;
}

// Task creation/update payload
export interface TaskPayload {
  content: string;
  description?: string;
  due_at?: string;
  assigner_id: number;
  project_id?: number;
  task_state_id: number;
  tag_ids?: number[];
}

// Task search/filter parameters
export interface TaskSearchParams {
  q?: {
    content_or_assigner_screen_name_or_description_or_project_name_cont?: string;
    s?: string;
  };
  page?: number;
}

// API Response types
export interface TaskListResponse {
  tasks: Task[];
  pagination?: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
}