import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./UpdateProduct.module.css";
import axios from "axios";
import validate from "./validate";

const UpdateProduct = ({
  product,
  setShowBackdrop,
  setShowUpdate,
  handleClose,
}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); 

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    sizes: product?.sizes || [],
    description: product?.description || "",
    quantity: product?.quantity || 1,
    img: product?.img || "",

  });

  const reload = () => {
    window.location.reload(false);
  };
  
  useEffect(() => {
    setForm({
      name: product?.name || "",
      price: product?.price || 0,
      sizes: product?.sizes || [],
      description: product?.description || "",
      quantity: product?.quantity || 1,
      img: product?.img || "",

    });
  }, [product]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevForm.sizes, value]
            : prevForm.sizes.filter((size) => size !== value)
          : value,
    }));
    setErrors(validate({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validate(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:3000/edit/${product.id}`, form);
      setShowBackdrop(false);
      setShowUpdate(false);
      navigate("/admin");
      setTimeout(reload, 1000);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formBox}>
          <h2>Editar Producto</h2>
          <div>
            <input
              className={style.ctrl}
              type="text"
              name="name"
              placeholder="Nombre del producto"
              value={form.name}
              onChange={handleChange}
              required
            />
             {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <input
              type="text"
              className={style.ctrl}
              name="description"
              placeholder="Descripción del producto"
              value={form.description}
              onChange={handleChange}
              required
            />
             {errors.description && <p>{errors.description}</p>}
          </div>
          {/* <div>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={style.ctrl}
              // required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p>{errors.category}</p>}
          </div> */}
          <div>
            <input
              className={style.ctrl}
              type="number"
              name="price"
              placeholder="Precio"
              value={form.price}
              onChange={handleChange}
              required
            />
            {errors.price && <p>{errors.price}</p>}
          </div>
          {/* <div>
            <input
              className={style.ctrl}
              type="number"
              name="quantity"
              min="1"
              max="10"
              placeholder="Cantidad"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div> */}
          <div>
            {["S", "M", "L", "XL"].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={form.sizes.includes(size)}
                  onChange={handleChange}
                />{" "}
                {size}
              </label>
            ))}
            {errors.sizes && <p>{errors.sizes}</p>}
          </div>
          <div>
            <p>Imagen:</p>
            <img
              alt="Imagen actual del producto"
              width="100px"
              src={`http://localhost:3000/img/${form.img}`}
            />
            <input type="file" name="img" id="img" />
          </div>
          <div className={style.btnContainer}>
            <button className={style.btn} onClick={handleClose}>
              Cancelar
            </button>
            <button className={style.btn} type="submit">
              Editar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
