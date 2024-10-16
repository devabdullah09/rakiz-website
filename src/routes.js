import { useRoutes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import ContactUsPage from './pages/ContactUsPage';
import { AccountSettingsPage, ForgetpasswordPage, LandingPage, LoginPage, MyGamesPage } from './pages';
import DashboardPage from './pages/DashboardPage';
import { RegisterForm } from './sections';
import TeamStatsPage from './pages/TeamStatsPage';
import QuestionPage from './pages/QuestionPage';
import Answer from './sections/team/Answer';
import Result from './sections/team/Result';
import CongratsCard from './components/CongratsCard';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LoginPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterForm />,
        },
        {
          path: '/forget-password',
          element: <ForgetpasswordPage />,
        },
        {
          path: '/how-to-play',
          element: <LandingPage />,
        },
        {
          path: '/account-settings',
          element: <AccountSettingsPage />,
        },
        {
          path: '/my-games',
          element: <MyGamesPage />,
        },
        {
          path: '/start-game',
          element: <DashboardPage />,
        },
        {
          path: '/contact-us',
          element: <ContactUsPage />,
        },
        // safe route
        {
          path: '*',
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '/team-score',
      element: <TeamStatsPage />,
    },
    {
      path: '/question',
      element: <QuestionPage />,
    },
    {
      path: '/answer',
      element: <Answer />,
    },
    {
      path: '/result',
      element: <Result />,
    },
    {
      path: '/congrats',
      element: <CongratsCard />,
    },
  ]);
  return routes;
}
