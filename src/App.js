import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/index.js';
import AuthProvider from './contexts/auth'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='h-full bg-zinc-300 w-full'>
          <RoutesApp />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
