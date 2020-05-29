import React from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import Section from "../Common/Section";
import Loader from "../Common/Loader";
import Message from "../Common/Message";
import Poster from "../Common/Poster";
import { Movie, TV } from "lib/types";

const Container = styled.div`
  padding: 0px 10px 0px 30px;
  @media (max-width: 768px) {
    padding: 0px 10px 0px 10px;
  }
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

interface ISearch{
  movieResults:Array<Movie> | null,
  tvResults:Array<TV> | null,
  loading:boolean,
  error:string,
  handleSubmit:(event: React.FormEvent<HTMLFormElement>)=>void,
  searchTerm:string,
  updateTerm:(event: React.ChangeEvent<HTMLInputElement>)=>void,
}

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  error,
  handleSubmit,
  searchTerm,
  updateTerm,
}:ISearch) => {
  return (
    <Container>
      <Helmet>
        <title>Search | DSflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Show!"
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map((movie) => (
                <Poster
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title="Show Results">
              {tvResults.map((show) => (
                <Poster
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {error && <Message text={error} color={"#e74c3c"} />}
          {movieResults &&
            tvResults &&
            movieResults.length === 0 &&
            tvResults.length === 0 && (
              <Message text={"Not Found"} color={"#bdc3c7"} />
            )}
        </>
      )}
    </Container>
  );
};

export default SearchPresenter;
