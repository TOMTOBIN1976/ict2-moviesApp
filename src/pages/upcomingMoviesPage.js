import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getMoviesUpcoming } from "../api/tmdb-api";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'


const UpcomingMoviesPage  = () => {
  const {  data, error, isLoading, isError }  = useQuery('discoverUpcoming', getMoviesUpcoming)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // These three lines are redundant; we will replace them laterg.
  const favourites = movies.filter(m => m.favouurite)
  localStorage.setItem('favourites', JSON.stringify(favourites))

  return (
    <PageTemplate
      title="Discover Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
);
};

export default UpcomingMoviesPage ;