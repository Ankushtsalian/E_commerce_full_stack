import { useEffect, useState } from "react";
import axios from "axios";

import Cookies from "js-cookie";

// const rootUrl = process.env.REACT_APP_URL;
// const rootUrl = "http://localhost:5000";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useState(null);
  const [state, setState] = useState("");

  const authFetch = axios.create({
    baseURL: "/",
  });

  /**------------------------AXIOS INTERCEPTORS------------------------*/

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state}`;
      return config;
    },
    (error) => {
      console.log("REQUEST ERROR");
      fetchLogout();
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      console.log("AUTH RESPONSE");
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("RESPONSE ERROR");
        fetchLogout();
      }
      return Promise.reject(error);
    }
  );

  /**------------------------AXIOS INTERCEPTORS------------------------*/

  const login = async () => {
    const url = `/api/v1/auth/login`;

    try {
      const res = await authFetch.post(
        url,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setState(res.data.tokenTest);
    } catch (error) {
      console.log(error);
    }
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const fetchTesting = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const url = `/api/v1/auth/register`;

      const res = await axios.post(
        url,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllUser = async (e) => {
    e.preventDefault();

    try {
      const url = `/api/v1/auth`;

      const res = await axios.delete(url);
      Cookies.remove("token");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleUser = async (e) => {
    e.preventDefault();

    try {
      const url = `/api/v1/users/63bad9ce883fe7b91f9bbd6b`;

      const res = await authFetch.get(url);
      console.log(res.data);
    } catch (error) {
      console.log(`SINGLE USER  ERROR ${error}`);
      // console.log(error);
    }
  };

  useEffect(() => {
    const cookieValue = getCookie("token");
    setCookie(cookieValue);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/api/v1`;

    try {
      const res = await axios.get(url, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLogout = async () => {
    const url = `/api/v1/auth/logout`;

    // Cookies.remove("token");

    try {
      const res = await authFetch.get(url, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h4>login form</h4>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-input email-input"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input email-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-input password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block submit-btn">
          SubmitTest
        </button>
      </form>
      <div className="container">
        <button className="btn testing-btn" onClick={fetchTesting}>
          Register
        </button>
        <button className="btn logout-btn" onClick={fetchLogout}>
          Logout
        </button>
        <button className="btn testing-btn" onClick={deleteAllUser}>
          DeleteUser
        </button>
        <button className="btn testing-btn" onClick={login}>
          login
        </button>
        <button className="btn testing-btn" onClick={getSingleUser}>
          User
        </button>
      </div>
    </>
  );
}

export default App;
