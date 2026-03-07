import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App'
import Home from './components/Home'
import Stock from './components/Stock'
import Pricing from './components/Pricing'
import Finalise from './components/Finalise'
import Pos from './components/Pos'
import Summary from './components/Summary'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="stock" element={<Stock />} />
    <Route path="pricing" element={<Pricing />} />
    <Route path="finalise" element={<Finalise />} />
    <Route path="pos/:id" element={<Pos />} />
    <Route path="summary" element={<Summary />} />
  </Route>,
)

const router = createBrowserRouter(routes)

export default router
