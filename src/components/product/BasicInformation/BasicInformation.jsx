import "./BasicInformation.css";

export default function BasicInformation({
  product,
  setProduct,
}) {
  const handleChange = (e) => {
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
          />

        </div>

      </div>

    </div>
  );
}