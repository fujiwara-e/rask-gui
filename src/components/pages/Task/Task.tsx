import { PageHeader } from "@/components/layout/PageHeader"
import { ChipsArray } from "@/components/ui/ChipsArray"
import type { Task as TaskType } from "@/types/api"
import { Box, Button, Paper, Stack, styled, Typography } from "@mui/material"

type Props = {
  task: TaskType
  taskId: string
}

export const Task = ({ task, taskId }: Props) => {
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}
        alignItems={"center"}>
        <PageHeader title="タスク詳細" />
        <Box sx={{ mb: 5 }} >
          <Stack direction={"row"} spacing={2} >
            <Button variant="contained" href={`/tasks/${taskId}/edit`} >編集</Button>
            <Button variant="contained">削除</Button>
          </Stack>

        </Box>
      </Stack >
      <Paper sx={{ padding: 4 }}>
        <Stack spacing={4}>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">担当者</Typography>
            <Typography >
              {typeof task.assigner === "string"
                ? task.assigner
                : task.assigner
                  ? task.assigner.name
                  : ""}
            </Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">期限</Typography>
            <Typography >
              {new Date(task.due_at ?? "").toLocaleString()}
            </Typography>
          </StackContents>
          <StackContents spacing={1}>
            <Typography variant="h6" fontWeight="bold">タグ</Typography>
            <ChipsArray chipsdata={task.tags.map((tag, index) => ({ key: index, label: tag.name }))} deletable={false} />
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