import type { Document } from '@/types/api'
import { Box, Paper, Stack, Typography, styled } from '@mui/material'
import dayjs from 'dayjs'
import Markdown from 'react-markdown'

type Props = {
  document: Document
}

export const DocumentPopoverContent = ({ document }: Props) => {
  return (
    <Box sx={{ minWidth: 400, maxWidth: 400, maxHeight: 500, p: 2, overflow: 'auto' }}>
      <Paper sx={{ padding: 4, backgroundColor: 'background.paper' }}>
        <Stack spacing={4}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              所属プロジェクト
            </Typography>
            <Typography>{document.project ? document.project.name : ''}</Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              期間
            </Typography>
            <Typography>{formatDateRange(document.start_at, document.end_at)}</Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              タグ
            </Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              文書内容
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
              <Markdown>{document.description}</Markdown>
            </Paper>
          </StackContents>
        </Stack>
      </Paper>
    </Box>
  )
}

const formatDateRange = (start: string, end: string) => {
  const startdate = dayjs(start)
  const enddate = dayjs(end)

  return startdate.isSame(new Date(), 'year')
    ? `${startdate.format('MM/DD HH:mm')} ~ ${enddate.format('MM/DD HH:mm')}`
    : `${startdate.format('YYYY/MM/DD HH:mm')} ~ ${enddate.format('YYYY/MM/DD HH:mm')}`
}

const StackContents = styled(Stack)`
  height: 100%;
  display: flex;
`
