import { PageHeader } from '@/components/layout/PageHeader'
import type { DocumentPayload, Project } from '@/types/api'
import { Paper, Stack, Typography, Select, MenuItem, Box, TextareaAutosize, Button, styled, Modal } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useState, type FormEvent } from 'react'
import Markdown from 'react-markdown'

type Props = {
  onSubmit: (payload: DocumentPayload) => void
  isCreating: boolean
  projects: Project[] | null
}
export const NewDocument = ({ onSubmit, isCreating, projects }: Props) => {
  const [form, setForm] = useState<DocumentPayload>({
    content: '',
    description: '',
    project_id: undefined,
    start_at: '',
    end_at: '',
    location: '',
    tag_names: '',
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <>
      <PageHeader title="文書作成" />
      <Paper sx={{ padding: 4 }}>
        <Stack spacing={4} component="form">
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              文書名
            </Typography>
            <TextareaAutosize
              minRows={1}
              value={form.content}
              style={{ width: 300, fontSize: 18, padding: 4 }}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              開始時刻
            </Typography>
            <Box sx={{ maxWidth: 250 }}>
              <DateTimePicker
                slotProps={{ textField: { size: 'small' } }}
                value={form.start_at ? dayjs(form.start_at) : null}
                onChange={(data) => {
                  setForm({ ...form, start_at: data ? data.toISOString() : '' })
                }}
              />
            </Box>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              終了時刻
            </Typography>
            <Box sx={{ maxWidth: 250 }}>
              <DateTimePicker
                slotProps={{ textField: { size: 'small' } }}
                value={form.end_at ? dayjs(form.end_at) : null}
                onChange={(data) => {
                  setForm({ ...form, end_at: data ? data.toISOString() : '' })
                }}
              />
            </Box>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              場所
            </Typography>
            <TextareaAutosize
              minRows={1}
              value={form.location}
              style={{ width: 300, fontSize: 20 }}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
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
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="h6" fontWeight="bold">
                詳細
              </Typography>
              <Button onClick={handleOpen} variant="contained" size="small">
                詳細を入力
              </Button>
            </Box>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
              <Markdown
                components={{
                  h1: ({ ...props }) => <Typography variant="h5" fontWeight="bold" gutterBottom {...props} />,
                  h2: ({ ...props }) => <Typography variant="h6" fontWeight="bold" gutterBottom {...props} />,
                  h3: ({ ...props }) => <Typography variant="subtitle1" fontWeight="bold" gutterBottom {...props} />,
                  p: ({ ...props }) => <Typography variant="body1" sx={{ fontSize: 16 }} gutterBottom {...props} />,
                  li: ({ ...props }) => (
                    <li>
                      <Typography component="span" variant="body1" sx={{ fontSize: 16 }} {...props} />
                    </li>
                  ),
                }}
              >
                {form.description}
              </Markdown>
            </Paper>
          </StackContents>
          <DescriptionEditor
            open={open}
            handleClose={handleClose}
            description={form.description ?? ''}
            setDescription={(desc: string) => setForm({ ...form, description: desc })}
          />
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
type DescriptionEditorProps = {
  open: boolean
  handleClose: () => void
  description: string
  setDescription: (desc: string) => void
}

const DescriptionEditor = ({ open, handleClose, description, setDescription }: DescriptionEditorProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display={'flex'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          minWidth: 1200,
          minHeight: 600,
        }}
      >
        <Paper sx={{ flex: 1, p: 2, minHeight: 350, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            入力
          </Typography>
          <TextareaAutosize
            minRows={12}
            value={description}
            style={{ width: '100%', fontSize: 16, flex: 1, minHeight: 250 }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Paper>
        <Paper sx={{ flex: 1, p: 2, minHeight: 350, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            プレビュー
          </Typography>
          <Box sx={{ flex: 1, minHeight: 250, overflow: 'auto' }}>
            <Paper sx={{ backgroundColor: 'grey.100', minHeight: 650, p: 2 }}>
              <Markdown
                components={{
                  h1: ({ ...props }) => <Typography variant="h5" fontWeight="bold" gutterBottom {...props} />,
                  h2: ({ ...props }) => <Typography variant="h6" fontWeight="bold" gutterBottom {...props} />,
                  h3: ({ ...props }) => <Typography variant="subtitle1" fontWeight="bold" gutterBottom {...props} />,
                  p: ({ ...props }) => <Typography variant="body1" sx={{ fontSize: 16 }} gutterBottom {...props} />,
                  li: ({ ...props }) => (
                    <li>
                      <Typography component="span" variant="body1" sx={{ fontSize: 16 }} {...props} />
                    </li>
                  ),
                }}
              >
                {description}
              </Markdown>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Modal>
  )
}
