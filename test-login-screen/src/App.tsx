import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import '@ant-design/v5-patch-for-react-19';

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    </>
  )
}

export default App
