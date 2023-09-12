import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import ConsultsByName from '../pages/consults/[name]';
import Rpassword from '../pages/rPassword/index.js';
import Private from './private';

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path='/register' element={<Register />} />
      <Route path='/rpassword' element={<Rpassword/>} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path='/consults/:id' element={<Private><ConsultsByName/></Private>} />
      <Route path='/consults/create' element={<Private><createConsult/></Private>} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  )
}

export default RoutesApp;
