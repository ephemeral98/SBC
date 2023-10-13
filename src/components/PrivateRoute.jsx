import { Navigate, Outlet } from 'react-router-dom';
import { localMemory } from '../utils/localMemory';

export function PrivateRoute() {
  const loginInfo = localMemory.getItem('auth') || {};
  const role = loginInfo?.role || '';

  return role === '' ? <Navigate to={'/login'} /> : <Outlet />;
}
