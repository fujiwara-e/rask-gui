import { PageHeader } from '@/components/layout/PageHeader'
import { ChipsArray } from '@/components/ui/ChipsArray'
import { Stack, Box, Button, Paper, Typography, styled } from '@mui/material'
import type { Document as DocumentType } from '@/types/api'
import dayjs from 'dayjs'
import Markdown from 'react-markdown'

type Props = {
  document: DocumentType
  onDelete: (id: string) => Promise<void>
  isDeleting?: boolean
}

export const Document = ({ document, onDelete, isDeleting }: Props) => {
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <PageHeader title={document.content} />
        <Box sx={{ mb: 5 }}>
          <Stack direction={'row'} spacing={2}>
            <Button variant="contained" href={`/documents/${document.id}/edit`}>
              編集
            </Button>
            <Button variant="contained" onClick={() => onDelete(String(document.id))} disabled={isDeleting}>
              削除
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Paper sx={{ padding: 4, backgroundColor: 'background.paper' }}>
        <Stack spacing={4}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              作成者
            </Typography>
            <Typography>{document.creator_name}</Typography>
          </StackContents>
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
            <ChipsArray
              chipsdata={document.tags ? document.tags.map((tag, index) => ({ key: index, label: tag.name })) : []}
              deletable={false}
            />
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
    </>
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
