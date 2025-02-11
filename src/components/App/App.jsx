import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import s from './App.module.css';

const Navigation = lazy(() => import("../Navigation/Navigation"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <div className={s.container}>
      <Navigation />
      
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:id' element={<MovieDetailsPage />}>
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
