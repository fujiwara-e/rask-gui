import { Card, CardActionArea, CardActions, Button, Typography, Box, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import { theme } from '@/constants/theme'
import { path } from '@/constants/application'
import type { Project } from '@/types/api'

type Props = {
  project: Project
  onDelete: (id: string) => Promise<void>
  isDeleting: boolean
}

export const ProjectCard = ({ project, onDelete, isDeleting }: Props) => {
  return (
    <CardActionArea component={Link} to={`/projects/${project.id}`}>
      <Card className="anime-card" sx={{ position: 'relative', height: 180, opacity: 0 }}>
        <CardContents>
          <Title>{project.name}</Title>
          <Container>
            <Typography>達成率</Typography>
          </Container>
          <Footer>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small" href={path.editProject(String(project.id))} onClick={(e) => e.stopPropagation()}>
                編集
              </Button>
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(String(project.id))
                }}
                disabled={isDeleting}
              >
                削除
              </Button>
            </CardActions>
          </Footer>
        </CardContents>
      </Card>
    </CardActionArea>
  )
}

const CardContents = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing(2)};
`

const Title = styled(Typography)`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Container = styled(Box)`
  gap: ${theme.spacing(1)};
`
const Footer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
