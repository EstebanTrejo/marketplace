import style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import validate from "./validate";
const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
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

  const reload = () => {
    window.location.reload(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validate(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/users/login`,
        form
      );
      const { success, userId } = response.data;
      if (success) {
        navigate(`/users/${userId}`);
        setTimeout(reload, 3000);
      } else {
        console.log("No puedes entrar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.mainContent}>
      <section className={style.formRegister}>
        <p>INICIAR SESIÓN</p>

        <form onSubmit={handleSubmit}>
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
            <input type="checkbox" name="rememberme" id="rememberme" />
            <label>Recordar mi sesión</label>
          </div>
          <div>
            <button className={style.btn} type="submit">
              Ingresar
            </button>
          </div>
        </form>
        <p>ó inicia sesión con:</p>
        <a href="">
          <i className="fa-brands fa-google"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <p>
          Aún no tienes cuenta?{" "}
          <NavLink to="/register">Registrate Aquí</NavLink>
        </p>
      </section>
    </div>
  );
};

export default Login;
