const validate = (user) => {
  let errors = {};
  if (!user?.firstName || !/^[A-Za-z\s]{3,25}$/.test(user.firstName)) {
    errors.firstName =
      "El nombre debe contener de 3 a 25 caracteres";
  }

  if (!user?.lastName || !/^[A-Za-z\s]{3,25}$/.test(user.lastName)) {
    errors.lastName =
      "El apellido debe contener de 3 a 25 caracteres";
  }

  if (
    !user.email ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)
  ) {
    errors.email = "Ingrese una dirección de correo electrónico válida";
  }

  if (user.email && user.email.length > 35) {
    errors.email = "El correo electrónico no puede superar los 35 caracteres";
  }

  if (!user.password || !/.*\d+.*/.test(user.password)) {
    errors.password = "La contraseña debe tener al menos un número";
  }

  if (
    user.password &&
    (user.password.length < 6 || user.password.length > 10)
  ) {
    errors.password =
      "La contraseña debe tener un tamaño entre 6 y 10 caracteres";
  }

  return errors;
};

export default validate;
