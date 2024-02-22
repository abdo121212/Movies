import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ getUserToken }) {
  const navigate = useNavigate();

  const [errorValidation, setErrorValidation] = useState(null);
  const [errorApi, setErrorApi] = useState(null);
  const [clicedBut, setClicedBut] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function getUser(e) {
    const objId = e.target.id;
    const resultValues = e.target.value;
    let newUser = { ...user };
    newUser[objId] = resultValues;
    setUser(newUser);
  }
  async function submitOfForm(e) {
    setClicedBut(true);

    e.preventDefault();
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({
          maxDomainSegments: 2,
          tlds: ["com", "email"],
        })
        .required(),
      password: Joi.string().min(3).required(),
    }).required();
    const resultOfSchema = schema.validate(user, { abortEarly: false });
    if (resultOfSchema.error === undefined) {
      // back end
      const { data } = await axios.post(
        "https://movies-back-end-iota.vercel.app/auth/login",
        user
      );
      if (data.message === "Tmam") {
        localStorage.setItem("token", data.token);
        getUserToken();
        navigate("/movies");
      } else {
        setErrorApi(data.message);
      }
    } else {
      setErrorValidation(resultOfSchema.error.details);
    }
    setClicedBut(false);
  }
  return (
    <>
      <h2 className="text-center my-4">Login Form</h2>

      <form onSubmit={submitOfForm} className="w-75 m-auto my-5">
        {errorApi ? (
          <div className="alert alert-danger text-center">{errorApi}</div>
        ) : (
          ""
        )}
        {errorValidation
          ? errorValidation.map((err, id) => (
              <div key={id} className="alert alert-danger text-center">
                {err.message}
              </div>
            ))
          : ""}
        <label className="my-3">Email</label>
        <input
          onChange={getUser}
          className="form-control"
          placeholder="Enter Your Email"
          type="email"
          id="email"
        />

        <label className="my-3">Password</label>
        <input
          autoComplete="on"
          onChange={getUser}
          className="form-control"
          placeholder="Enter Your Password"
          type="password"
          id="password"
        />

        <button className="btn btn-outline-info mt-3">
          {clicedBut ? (
            <span className="fa-spinner fa-spin fa-solid  fa-2x"></span>
          ) : (
            "Login.."
          )}
        </button>
      </form>
    </>
  );
}

export default Login;
