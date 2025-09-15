import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
export const Header = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }} >
          <IconButton color='inherit' href='/'>
            <Typography variant="h6" component="div" >
              Rask
            </Typography>
          </IconButton>
          <Button color="inherit" href='/projects'>プロジェクト</Button>
          <Button color="inherit" href='/tasks'>タスク一覧</Button>
          <Button color="inherit" href='/documents'>文書一覧</Button>
          <Button color="inherit" href='/tags'>タグ一覧</Button>
          <Button color="inherit" href='/users'>ユーザ一覧</Button>
          <Button color="inherit" href='/api_tokens' >APIトークン一覧</Button>
        </Box>
        <Button color="inherit" >login</Button>
      </Toolbar>
    </AppBar>
  </Box >
)
