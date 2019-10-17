import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
// import axiosWithAuth from '../axios';

// const [movies, setMovies] = useState([]);
// const [currentMovieId, setCurrentMovieId] = useState(null);

// const getAllMovies = () => {
//   axiosWithAuth().get()
//     .then(res => {
//       setMovies(res.data);
//     })
//     .catch(err => {
//       alert(err);
//     });
// };

// useEffect(() => {
//   getAllMovies();
// }, []);

const validate = ({ title, director, metascore, stars, id }) => {
  return {};
};

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
  id: ""
}

const moviesApi = "http://localhost:5000/api/movies/"


export const UpdateMovie = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    axios
    .get(`${moviesApi}${props.match.params.id}`)
    .then(response => {
      debugger
      setFormValues(
        {
          title: response.data.title,
          director: response.data.director,
          metascore: response.data.metascore,
          stars: response.data.stars,
          id: response.data.id

        }
      )
    })
    .catch(error => {
      console.log(error.message)
    })
  }, [props.match.params.id]);

  // const getCurrentMovie = () => {
  //   const currentMovie = movies.find(movie => movie.id === currentMovieId);
  //   return currentMovie;
  // };
 const submitMovie = event => {
   event.preventDefault();
   axios
   .put(`${moviesApi}${props.match.params.id}`, 
   {
      formValues
   })
   .then(res => {
     props.history.push("/")
   })
   .catch(error => {
     console.log(error.message)
   })
 }

  return(
    <div>
      <h3>Update Movie</h3>
      <Formik 
      initialValues = {
      formValues
    }
    // key={}
    validate={validate}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={() => (
        <Form>
          <label htmlFor="title">Title</label>
          <Field name="title" placeholder="Title" />
          <ErrorMessage name='title' component='span' />

          <label htmlFor="director">Director</label>
          <Field name="director" placeholder="Director" />
          <ErrorMessage name='director' component='span' />

          <label htmlFor="metascore">Metascore</label>
          <Field name="metascore" placeholder="Metascore" />
          <ErrorMessage name='metascore' component='span' />

          <label htmlFor="stars">Stars</label>
          <Field name="stars" placeholder="Stars" />
          <ErrorMessage name='stars' component='span' />

          <button type="submit" onClick={submitMovie}>Submit</button>
        </Form>
      )}
   

      
      />
      
    </div>
  )
}

