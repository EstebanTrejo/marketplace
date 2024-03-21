import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CreateProduct.module.css";
import axios from "axios";
import validate from "./validate";

const CreateProduct = ({
  handleClose,
  setShowCreate,
  setShowBackdropCreate,
}) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 1,
    sizes: [],
    img: null,
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({}); 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const reload = () => {
    window.location.reload(false);
  };
  
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const newValue =
      type === "checkbox"
        ? checked
          ? [...form.sizes, value]
          : form.sizes.filter((size) => size !== value)
        : type === "file"
        ? files[0]
        : value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "category" ? parseInt(value) : newValue,
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
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("sizes", JSON.stringify(form.sizes));
      formData.append("img", form.img);
      formData.append("category", form.category);

      await axios.post(`http://localhost:3000/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowBackdropCreate(false);
      setShowCreate(false);
      navigate("/admin");
      setTimeout(reload, 1000);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };
  return (
    <div>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formBox}>
          <h2>Crear Producto</h2>
          <div>
            <input
              className={style.ctrl}
              type="text"
              name="name"
              placeholder="Nombre del producto"
              value={form.name}
              onChange={handleChange}
              // required
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
              // required
            />
            {errors.description && <p>{errors.description}</p>}
          </div>
          <div>
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
          </div>
          <div>
            <input
              className={style.ctrl}
              type="number"
              name="price"
              placeholder="Precio"
              value={form.price}
              onChange={handleChange}
              // required
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
                // required
              />
            </div> */}
          <div >
            <div className={style.talles}>
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

            </div>
            {errors.sizes && <p>{errors.sizes}</p>}
          </div>
          <div className={style.imgFile}>
            {/* <p>Imagen:</p> */}
            <input type="file" name="img" id="img" onChange={handleChange} />
            {/* {errors.img && <p>{errors.img}</p>} */}
          </div>
        </div>
        <div className={style.btnContainer}>
          <button className={style.btn} onClick={handleClose}>
            Cancelar
          </button>
          <button className={style.btn} type="submit">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
