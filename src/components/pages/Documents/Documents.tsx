import { PageHeader } from '@/components/layout/PageHeader'
import { Stack, Box, Button, Grid } from '@mui/material'
import { DocumentCard } from './DocumentCard'
import type { Document } from '@/types/api'
import { path } from '@/constants/application'
import { useEffect, useRef } from 'react'
import { animate, createScope, Scope, stagger } from 'animejs'

type Props = {
  documents: Document[]
}
export const Documents = ({ documents }: Props) => {
  const root = useRef(null)
  const scope = useRef<Scope>(null)

  useEffect(() => {
    if (documents.length === 0) return
    scope.current = createScope({ root: root.current! }).add(() => {
      animate('.anime-card', {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(100),
        duration: 600,
        easing: 'easeOutQuad',
      })
    })
    return () => {
      if (scope.current) {
        scope.current.revert()
      }
    }
  }, [documents])

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageHeader title="文書一覧" />
        <Box sx={{ mb: 5 }}>
          <Button variant="contained" href={path.newdocument()}>
            作成
          </Button>
        </Box>
      </Stack>
      <Grid container spacing={4}>
        {documents.map((document) => (
          <Grid key={document.id} size={{ xs: 4, md: 4 }}>
            <DocumentCard document={document} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
