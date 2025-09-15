import { PageHeader } from "@/components/layout/PageHeader"
import type { Tag, Task, TaskState, User } from "@/types/api"
import { Box, Menu, MenuItem, Paper, Select, Stack, styled, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"

type Props = {
  task: Task
  users: User[]
}

type FormData = {
  content: string;
  assigner: User
  due_at?: string | null
  tags: Tag[]
  description?: string
  task_state_id: number;
}

export const EditTask = ({ task, users }: Props) => {
  const [form, setForm] = useState<FormData>({
    content: task.content,
    assigner: task.assigner,
    due_at: task.due_at || null,
    tags: task.tags || [],
    description: task.description || "",
    task_state_id: task.state.id
  })
  return (
    <>
      <PageHeader title="タスク編集" />
      <Paper sx={{ padding: 4 }}>
        <Stack spacing={4} component="form">
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">状態</Typography>
            <Select
              size="small"
              value={form.task_state_id}
              onChange={(e) => {
                setForm({ ...form, task_state_id: e.target.value })
              }}
              sx={{ maxWidth: 200 }}
            >
              <MenuItem value={1}>todo</MenuItem>
              <MenuItem value={2}>done</MenuItem>
              <MenuItem value={3}>draft</MenuItem>
            </Select>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">担当者</Typography>
            <Select
              size="small"
              value={form.assigner ? form.assigner.id : ""}
              onChange={(e) => {
                const selectedUser = users.find(user => user.id === e.target.value)
                setForm({ ...form, assigner: selectedUser || form.assigner })
              }}
              sx={{ maxWidth: 200 }}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">期限</Typography>
            <Box sx={{ maxWidth: 250 }}>
              <DatePicker slotProps={{ textField: { size: "small" } }} />
            </Box>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">タグ</Typography>
            {/* タグを取得する処理を書く必要がある */}
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">内容</Typography>
            <Typography >{task.content}</Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">詳細</Typography>
            <Typography >{task.description}</Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">所属プロジェクト</Typography>
            <Typography >{task.project ? task.project.name : ""}</Typography>
          </StackContents>

        </Stack>
      </Paper>
    </>
  )
}

const StackContents = styled(Stack)`
  height: 100%;
  display: flex;
`