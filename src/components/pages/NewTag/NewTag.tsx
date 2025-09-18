import { PageHeader } from '@/components/layout/PageHeader'
import { Paper, Stack, Typography, TextField, Button, styled } from '@mui/material'

type Props = {
  tagName: string
  onTagNameChange: (name: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

export const NewTag = ({ tagName, onTagNameChange, onSubmit, isLoading }: Props) => {
  return (
    <>
      <PageHeader title="タグ作成" />
      <Paper sx={{ padding: 4, maxWidth: 600 }}>
        <Stack spacing={4} component="form" onSubmit={onSubmit}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              タグ名
            </Typography>
            <TextField
              size="small"
              label="タグ名"
              variant="outlined"
              sx={{ maxWidth: 300 }}
              value={tagName}
              onChange={(e) => onTagNameChange(e.target.value)}
            />
          </StackContents>
          <StackContents spacing={1}>
            <Button variant="contained" type="submit" sx={{ maxWidth: 100, mt: 4 }} disabled={isLoading}>
              {isLoading ? '作成中...' : '作成'}
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
