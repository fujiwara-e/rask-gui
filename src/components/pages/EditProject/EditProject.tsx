import { PageHeader } from '@/components/layout/PageHeader'
import { Paper, Stack, Typography, TextField, Button, styled } from '@mui/material'
import type { FormEvent } from 'react'

type Props = {
  projectName: string
  onProjectNameChange: (name: string) => void
  onSubmit: (e: FormEvent) => void
  isLoading: boolean
}

export const EditProject = ({ projectName, onProjectNameChange, onSubmit, isLoading }: Props) => {
  return (
    <>
      <PageHeader title="プロジェクト編集" />
      <Paper sx={{ padding: 4, maxWidth: 600 }}>
        <Stack spacing={4} component="form" onSubmit={onSubmit}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              プロジェクト名
            </Typography>
            <TextField
              size="small"
              label="プロジェクト名"
              variant="outlined"
              sx={{ maxWidth: 300 }}
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
            />
          </StackContents>
          <StackContents spacing={1}>
            <Button variant="contained" type="submit" sx={{ maxWidth: 100, mt: 4 }} disabled={isLoading}>
              {isLoading ? '保存中...' : '保存'}
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
