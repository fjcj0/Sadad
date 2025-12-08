import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SplashScreen from './tools/SplashScreen';
import AdsPage from './pages/AuthPages/AdsPage';
import LoginPage from './pages/AuthPages/Auth/LoginPage';
import CreateAccountPage from './pages/AuthPages/Auth/CreateAccountPage';
import ForgetPasswordPage from './pages/AuthPages/Auth/ForgetPasswordPage';
import VerifyCodePage from './pages/AuthPages/Auth/VerifyCodePage';
import ResetPasswordPage from './pages/AuthPages/Auth/ResetPasswordPage';
import AiLayout from './layouts/AiLayout';
import CategoriesPage from './pages/AiPages/CategoriesPage';
import CompaniesPage from './pages/AiPages/CompaniesPage';
import ScanPage from './pages/AiPages/ScanPage';
import AiPage from './pages/AiPages/AiPage';
import AiCallPage from './pages/AiPages/AiCallPage';
import ChatPage from './pages/AiPages/Chat/ChatPage';
import BillPage from './pages/AiPages/BillPage';
import { useUserStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';
import Error404 from './components/Error404';
const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
  const { isVerified, isCheckingVerify } = useUserStore();
  if (isCheckingVerify) {
    return <SplashScreen />;
  }
  if (!isVerified) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
const RedirectAuthnticatedUser = ({ children }: { children: ReactNode }) => {
  const { isVerified, isCheckingVerify } = useUserStore();
  if (isCheckingVerify) {
    return <SplashScreen />;
  }
  if (isVerified) {
    return <Navigate to="/dashboard/home" replace />;
  }
  return <>{children}</>;
}
function App() {
  const { checkAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="w-screen min-h-[100vh] font-cairo">
      <Toaster />
      <Routes>
        <Route path='/'>
          <Route index element={
            <RedirectAuthnticatedUser>
              <AdsPage />
            </RedirectAuthnticatedUser>
          } />
          <Route path='/login' element={
            <RedirectAuthnticatedUser>
              <LoginPage />
            </RedirectAuthnticatedUser>
          } />
          <Route path='/create-account' element={
            <RedirectAuthnticatedUser>
              <CreateAccountPage />
            </RedirectAuthnticatedUser>
          } />
          <Route path='/forget-password' element={
            <RedirectAuthnticatedUser>
              <ForgetPasswordPage />
            </RedirectAuthnticatedUser>
          } />
          <Route path='/verify-code' element={
            <RedirectAuthnticatedUser>
              <VerifyCodePage />
            </RedirectAuthnticatedUser>
          } />
          <Route path='/reset-password/:token' element={
            <RedirectAuthnticatedUser>
              <ResetPasswordPage />
            </RedirectAuthnticatedUser>
          } />
        </Route>
        <Route path='/dashboard' element={
          <ProtectedUserRoute>
            <AiLayout />
          </ProtectedUserRoute>
        }>
          <Route path='/dashboard/home' element={
            <ProtectedUserRoute>
              <CategoriesPage />
            </ProtectedUserRoute>
          } />
          <Route path='/dashboard/scan' element={
            <ProtectedUserRoute>
              <ScanPage />
            </ProtectedUserRoute>
          } />
          <Route path='/dashboard/companies/:id' element={
            <ProtectedUserRoute>
              <CompaniesPage />
            </ProtectedUserRoute>
          } />
          <Route path='/dashboard/ai' element={
            <ProtectedUserRoute>
              <AiPage />
            </ProtectedUserRoute>
          } />
          <Route path='/dashboard/call' element={
            <ProtectedUserRoute>
              <AiCallPage />
            </ProtectedUserRoute>
          } />
          <Route path='/dashboard/bill/:id' element={
            <ProtectedUserRoute>
              <BillPage />
            </ProtectedUserRoute>
          } />
        </Route>
        <Route path='/chat' element={
          <ProtectedUserRoute>
            <ChatPage />
          </ProtectedUserRoute>
        } />
        <Route path='*' element={
          <Error404 />
        } />
      </Routes>
    </div>
  );
}
export default App;