import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { animate, eases } from 'animejs'
import { useEffect, useRef } from 'react'

export const Header = () => {
  const raskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (raskRef.current) {
      animate(raskRef.current, {
        opacity: [0, 1],
        duration: 2000,
        ease: eases.inQuad,
      })
    }
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton color="inherit" href="/">
              <Typography variant="h5" fontWeight="bold" component="div" ref={raskRef} sx={{ opacity: 0 }}>
                Rask
              </Typography>
            </IconButton>
            <Button color="inherit" href="/projects">
              プロジェクト
            </Button>
            <Button color="inherit" href="/tasks">
              タスク一覧
            </Button>
            <Button color="inherit" href="/documents">
              文書一覧
            </Button>
            <Button color="inherit" href="/tags">
              タグ一覧
            </Button>
            <Button color="inherit" href="/users">
              ユーザ一覧
            </Button>
            <Button color="inherit" href="/api_tokens">
              APIトークン一覧
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
