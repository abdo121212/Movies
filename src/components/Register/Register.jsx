import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  const [errorValidtion, setErrorValiation] = useState(null);
  const [clicedBut, setClicedBut] = useState(false);
  const [errorApr, setErrorApr] = useState(null);
  function getUser(e) {
    const values = e.target.value;
    const objId = e.target.id;
    setErrorValiation(null);
    setErrorApr(null);

    const newUser = { ...user };
    newUser[objId] = values;
    setUser(newUser);
  }
  async function submitForm(e) {
    setClicedBut(true);
    e.preventDefault();
    // check data
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(20).required(),
      last_name: Joi.string().min(3).max(100).required(),
      age: Joi.number().min(16).max(100).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.number().min(3).required(),
    });
    const resulteOfSchema = schema.validate(user, { abortEarly: false });
    if (resulteOfSchema.error === undefined) {
      // backend
      const res = await axios.post(
        "https://movies-back-end-iota.vercel.app/auth/register",
        user
      );
      if (res.data.message === "Tmam") {
        // setIfLoggedIn(true);
        $(".alert-success")
          .fadeIn(1500)
          .fadeOut(1000, function () {
            navigate("/login");
          });
        // navigate("/login");
      } else {
        setErrorApr(res.data.message);
      }
    } else {
      setErrorValiation(resulteOfSchema.error.details);
    }
    setClicedBut(false);
  }

  // function getSpecifiedError(key) {
  //   if (errorValidtion !== null) {
  //     for (let i = 0; i < errorValidtion.length; i++) {
  //       if (key === errorValidtion[i].context.key) {
  //         return errorValidtion.message;
  //       }
  //     }
  //   }
  //   return "";
  // }
  return (
    <>
      <h2 className="text-center mt-3">Register Form</h2>

      <form onSubmit={submitForm} className="w-75  m-auto my-4">
        <div
          style={{ display: "none" }}
          className="alert alert-success text-center"
        >
          Register Succesedded
        </div>

        {errorValidtion
          ? errorValidtion.map((err, id) => (
              <div key={id} className=" text-center alert alert-danger">
                {err.message}
              </div>
            ))
          : ""}
        {errorApr ? (
          <div className="alert alert-danger text-center"> {errorApr} </div>
        ) : (
          ""
        )}
        <label>first_name</label>
        <input
          onChange={getUser}
          type="text"
          id="first_name"
          placeholder="first_name"
          className="form-control mb-4"
        />

        <label>last_name</label>
        <input
          onChange={getUser}
          type="text"
          id="last_name"
          placeholder="last_name"
          className="form-control mb-4"
        />

        <label>age</label>
        <input
          onChange={getUser}
          type="number"
          id="age"
          placeholder="age"
          className="form-control mb-4"
        />

        <label>email</label>
        <input
          onChange={getUser}
          type="email"
          id="email"
          placeholder="email"
          className="form-control mb-4"
        />

        <label>password</label>
        <input
          onChange={getUser}
          type="password"
          id="password"
          placeholder="password"
          autoComplete="on"
          className="form-control mb-4"
        />

        <button className="btn btn-outline-info">
          {clicedBut ? (
            <span className="fa-spinner fa-spin fa-solid  fa-2x"></span>
          ) : (
            "Resgister.."
          )}
        </button>
      </form>
    </>
  );
}

export default Register;
