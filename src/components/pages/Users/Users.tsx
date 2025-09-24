import { PageHeader } from '@/components/layout/PageHeader'
import { path } from '@/constants/application'
import { theme } from '@/constants/theme'
import type { User } from '@/types/api'
import { Stack, Box, Button, Grid, Typography, CardActionArea, Card, styled, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
  users: User[]
}
export const Users = ({ users }: Props) => {
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageHeader title="ユーザ一覧" />
      </Stack>
      <Grid container spacing={4}>
        {users.map((user) => (
          <Grid key={user.id} size={{ xs: 6, md: 4 }}>
            <Card sx={{ height: 140 }}>
              <CardContents>
                <CardActionArea component={Link} to={path.user(String(user.id))}>
                  <Stack spacing={1} padding={1} direction={'row'}>
                    <Typography>氏名:</Typography>
                    <Typography>{user.name}</Typography>
                  </Stack>
                  <Stack spacing={1} padding={1} direction={'row'}>
                    <Typography>アカウント名:</Typography>
                    <Typography>{user.screen_name}</Typography>
                  </Stack>
                </CardActionArea>
                <Footer>
                  <CardActions>
                    <Button size="small">編集</Button>
                  </CardActions>
                </Footer>
              </CardContents>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const CardContents = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing(2)};
`

const Footer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
