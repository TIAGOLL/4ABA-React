import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/index.js';
import AuthProvider from './contexts/auth'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
