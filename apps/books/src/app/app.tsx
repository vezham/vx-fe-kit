import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from '../layouts/sidebar/index'
import Dash from '../pages/dashboard'
import Home from '../pages/home'
import Sales from '../pages/sales'
import Widget from '../pages/widgets'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes with Sidebar Layout */}
          <Route path="/" element={<Sidebar />}>
            <Route path="home" element={<Home />} />
            <Route path="wid" element={<Widget />} />
            <Route path="sales" element={<Sales />} />
            <Route path="dashboard" element={<Dash />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
