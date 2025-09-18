import { PageHeader } from '@/components/layout/PageHeader'
import type { Project, TaskPayload, User } from '@/types/api'
import { Paper, Stack, Typography, Select, MenuItem, Box, TextareaAutosize, Button, styled } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useState, type FormEvent } from 'react'

type Props = {
  onSubmit: (payload: TaskPayload) => void
  isCreating: boolean
  users: User[]
  projects: Project[] | null
}
export const NewTask = ({ onSubmit, isCreating, users, projects }: Props) => {
  const [form, setForm] = useState<TaskPayload>({
    content: '',
    assigner_id: 0,
    task_state_id: 1,
    description: '',
    due_at: '',
    project_id: undefined,
    tag_ids: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <>
      <PageHeader title="タスク作成" />
      <Paper sx={{ padding: 4 }}>
        <Stack spacing={4} component="form">
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              状態
            </Typography>
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
            <Typography variant="h6" fontWeight="bold">
              担当者
            </Typography>
            <Select
              size="small"
              value={form.assigner_id}
              onChange={(e) => {
                setForm({ ...form, assigner_id: e.target.value as number })
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
            <Typography variant="h6" fontWeight="bold">
              期限
            </Typography>
            <Box sx={{ maxWidth: 250 }}>
              <DateTimePicker
                slotProps={{ textField: { size: 'small' } }}
                value={form.due_at ? dayjs(form.due_at) : null}
                onChange={(data) => {
                  setForm({ ...form, due_at: data ? data.toISOString() : '' })
                }}
              />
            </Box>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              タグ
            </Typography>
            {/* <ChipsArray
              chipsdata={task.tags
                .filter((tag) => form.tag_ids?.includes(tag.id))
                .map((tag) => ({ key: tag.id, label: tag.name }))}
              deletable={true}
              onDelete={(tagId: number) => {
                setForm({ ...form, tag_ids: (form.tag_ids ?? []).filter((id) => id !== tagId) })
              }}
            /> */}
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              内容
            </Typography>
            <TextareaAutosize
              minRows={3}
              value={form.content}
              style={{ width: 200 }}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              詳細
            </Typography>
            <TextareaAutosize
              minRows={3}
              value={form.description}
              style={{ width: 200 }}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              所属プロジェクト
            </Typography>
            <Select
              size="small"
              value={form.project_id}
              onChange={(e) => {
                setForm({ ...form, project_id: e.target.value as number })
              }}
              sx={{ maxWidth: 200 }}
            >
              {projects &&
                projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
            </Select>
          </StackContents>
          <StackContents spacing={1}>
            <Button variant="contained" onClick={handleSubmit} sx={{ maxWidth: 100, mt: 4 }} disabled={isCreating}>
              {isCreating ? '保存中...' : '保存'}
            </Button>
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
