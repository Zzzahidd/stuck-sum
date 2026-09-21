import { createFileRoute } from '@tanstack/react-router'
import { StackApp } from '../components/stack-app'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <StackApp />
}
