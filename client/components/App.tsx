import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
