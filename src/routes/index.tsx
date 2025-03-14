import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const MarketsPage = lazy(() => import('../pages/markets'));
const MarketDetailPage = lazy(() => import('../pages/marketDetail'));
const NotFoundPage = lazy(() => import('../pages/notFound'));

const Main_ROUTE = {
  path: '/',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketsPage />
    </Suspense>
  ),
};

const Market_ROUTE = {
  path: '/markets',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: '/markets',
      element: (
        <Suspense>
          <MarketsPage />
        </Suspense>
      ),
    },
    {
      path: '/markets/:id',
      element: (
        <Suspense>
          <MarketDetailPage />
        </Suspense>
      ),
    },
  ],
};

const NOTFOUND_ROUTE = {
  path: '*',
  element: (
    <Suspense>
      <NotFoundPage />
    </Suspense>
  ),
};

const MAIN_LAYOUT = {
  path: '/',
  element: (
    <Suspense>
      <MainLayout />
      <Outlet />
    </Suspense>
  ),
  children: [Main_ROUTE, Market_ROUTE, NOTFOUND_ROUTE],
};

const router = [MAIN_LAYOUT];
const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Outlet />
      </QueryParamProvider>
    ),
    children: [...router],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={browserRouter} />
    </Suspense>
  );
};

export default AppRouter;
