import style from "./ShoppingCart.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ShoppingCart = () => {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      setListProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  return (
    <main className={style.mainContent}>
      <div className={style.cartContainer}>
        <div className={style.cartGrid}>
          <table className={style.cartTable}>
            <thead>
              <tr>
                <th></th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {listProducts.length > 0 ? (
                listProducts.map((product) => (
                  <tr className={style.cartItem} key={product.id}>
                    <td>
                      <img
                        src={`http://localhost:3000/img/${product.img}`}
                        alt={product.name}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={style.cartCheckout}>
            <h4>
              TOTAL: $
              {listProducts.reduce(
                (total, product) => total + product.price,
                0
              )}
            </h4>
            <button>Continuar al pago</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
