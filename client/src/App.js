import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profiles" element={<Profiles />} />
              <Route exact path="/profile/:id" element={<Profile />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <PrivateRoute exact path="/dashboard" element={<Dashboard />} />
            <PrivateRoute exact path="/create-profile" element={<CreateProfile />} />
            <PrivateRoute exact path="/edit-profile" element={<EditProfile />} />
            <PrivateRoute exact path="/add-experience" element={<AddExperience />} />
            <PrivateRoute exact path="/add-education" element={<AddEducation />} />
            <PrivateRoute exact path="/posts" element={<Posts />} />
            <PrivateRoute exact path="/posts/:id" element={<Post />} />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
