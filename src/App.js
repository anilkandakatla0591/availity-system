import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import NoPage from './components/404';
import Welcome from './components/welcome';
import UserList from './components/user';
import UserUpdate from './components/user/user-update';
import UserCreate from './components/user/user-create';
import UserDetail from './components/user/user-detail';
import EnrollFile from './components/enroll-files';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/user/create' element={<UserCreate />} />
          <Route path='/user/update/:id' element={<UserUpdate />} />
          <Route path='/user/detail/:id' element={<UserDetail />} />
          <Route path='/enroll-files' element={<EnrollFile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;