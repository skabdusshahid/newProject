// // App.jsx

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import FormPage from './FormPage';
// import ViewPage from './ViewPage';

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/form" element={<FormPage />} />
//                 <Route path="/view" element={<ViewPage />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;



// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './Login';
import FormPage from './FormPage';
import ViewPage from './ViewPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/form" element={<ProtectedRoute element={<FormPage />} />} />
          <Route path="/view" element={<ProtectedRoute element={<ViewPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

