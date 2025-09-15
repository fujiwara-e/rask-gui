import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import styled from '@emotion/styled'

export const Container = () => (
  <div>
    <Header />
    <Content >
      <Outlet />
    </Content >
  </div>
)

const Content = styled.div`
  max-width: 920px;
  margin: auto;
  padding: 48px 16px;
  box-sizing: border-box;

  /* ヘッダーの高さを引いたサイズ */
  min-height: calc(100vh - 72px);
`
