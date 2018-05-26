import Router from 'next/router'

export const mockRouter = () => {
  Router.router = { prefetch: () => {} }
}
