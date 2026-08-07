import "./BasicInformation.css";
import { useLocation } from "react-router-dom";
export default function BasicInformation({
  product,
  setProduct,
}) {
  const location = useLocation();

const isView =
  location.pathname.startsWith("/products/view");
  const handleChange = (e) => {
  if (isView) return;

  const { name, value } = e.target;

  setProduct((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  return (
    <div className="product-card">

      <div className="product-card-header">

        <h2>Basic Information</h2>

        <p>
          Enter the basic details about your
          product.
        </p>

      </div>

      <div className="product-card-body">

        <div className="form-group">

          <label>
            Product Name
          </label>

          <input
  type="text"
  name="name"
  placeholder="Enter product name"
  value={product.name}
  onChange={handleChange}
  readOnly={isView}
/>

        </div>

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
  rows="5"
  name="description"
  placeholder="Write product description..."
  value={product.description}
  onChange={handleChange}
  readOnly={isView}
/>

        </div>

      </div>

    </div>
  );
}