import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
        <Route path="/film"              element={<Home />}        />
        <Route path="/image"             element={<Photography />} />
        <Route path="/work"              element={<Navigate to="/film" replace />} />
        <Route path="/photography"       element={<Navigate to="/image" replace />} />
        <Route path="/project/:id"       element={<Project />}     />
        <Route path="/about"             element={<About />}       />
        <Route path="/experience"        element={<Experience />}  />
      </Routes>
    </>
  )
}
