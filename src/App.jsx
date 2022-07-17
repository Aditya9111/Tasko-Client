// import { Center } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import BoardDetails from "./pages/BoardDetails";
import Boards from "./pages/Boards";
import Login from "./pages/Login";
import { setAuth } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if ("login" in localStorage) {
      const login = JSON.parse(localStorage.getItem("login"));
      axios.defaults.headers.common["authorization"] = `Bearer ${login.token}`;
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn }));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Switch>
        <PrivateRoute exact path="/">
          <Layout>
            <Boards />
          </Layout>
        </PrivateRoute>
        <PrivateRoute path="/boards/:id">
          <Layout>
            <BoardDetails />
          </Layout>
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </>
  );
}

export default App;
