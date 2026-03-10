import { AuthProvider, useAuth } from './AuthContext';
import { Login, Home, Profile } from './Components';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) return <Login />;

  return (
    <main style={{ padding: '2rem' }}>
      <Home />
      <hr />
      <Profile />
    </main>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;