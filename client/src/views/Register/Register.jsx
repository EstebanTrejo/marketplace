import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "../Login/Login.module.css";
import axios from "axios";
import validate from "./validate";

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    img: null,
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  // const reload = () => {
  //   window.location.reload(false);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validate(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("img", form.img);
      await axios.post(`http://localhost:3000/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.mainContent}>
      <section className={style.formRegister}>
        <p>REGISTRATE</p>

        <form onSubmit={handleSubmit}>
          <input
            className={style.ctrl}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Nombre"
            onChange={(event) => handleChange(event)}
            // required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
          <input
            className={style.ctrl}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Apellido"
            onChange={(event) => handleChange(event)}
            // required
          />
          {errors.lastName && <p>{errors.lastName}</p>}
          <input
            className={style.ctrl}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(event) => handleChange(event)}
            // required
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            className={style.ctrl}
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onChange={(event) => handleChange(event)}
            // required
          />
          {errors.password && <p>{errors.password}</p>}
          <div>
            <p>Imagen:</p>
            <input type="file" name="img" id="img" onChange={handleChange} />
          </div>
          <button className={style.btn} type="submit">
            Registrate
          </button>
          <p>
            Ya tienes una cuenta? <NavLink to="/login">Ingresá aquí</NavLink>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;
