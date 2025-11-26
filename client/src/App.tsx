import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
function App() {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoadingPage) {
    return <SplashScreen />;
  }
  return (
    <div className="w-screen min-h-[100vh] font-cairo">
      <Routes>
        <Route path='/'>
          <Route index element={
            <AdsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-account' element={<CreateAccountPage />} />
          <Route path='/forget-password' element={<ForgetPasswordPage />} />
          <Route path='/verify-code' element={<VerifyCodePage />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        </Route>
        <Route path='/dashboard' element={<AiLayout />}>
          <Route path='/dashboard/home' element={<CategoriesPage />} />
          <Route path='/dashboard/scan' element={<ScanPage />} />
          <Route path='/dashboard/companies' element={<CompaniesPage />} />
          <Route path='/dashboard/ai' element={<AiPage />} />
          <Route path='/dashboard/call' element={<AiCallPage />} />
          <Route path='/dashboard/bill/:id' element={<BillPage />} />
        </Route>
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </div>
  );
}
export default App;