import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
