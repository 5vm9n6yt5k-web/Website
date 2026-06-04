import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Landing    from './pages/Landing'
import Home       from './pages/Home'
import Project    from './pages/Project'
import Photography from './pages/Photography'
import About      from './pages/About'
import Experience from './pages/Experience'

export default function App() {
  const location = useLocation()
  const path = location.pathname
  const darkNav = path === '/' || path === '/image' || path.startsWith('/project')

  return (
    <>
      <Nav dark={darkNav} />
      {/* key forces remount on route change, triggering page-enter animation */}
      <Routes location={location} key={location.pathname}>
        <Route path="/"                  element={<Landing />}     />
        <Route path="/work"              element={<Home />}        />
        <Route path="/project/:id"       element={<Project />}     />
        <Route path="/photography"       element={<Photography />} />
        <Route path="/about"             element={<About />}       />
        <Route path="/experience"        element={<Experience />}  />
      </Routes>
    </>
  )
}
