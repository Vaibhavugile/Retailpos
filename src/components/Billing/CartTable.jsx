import "./CartTable.css";

export default function CartTable({
  cart,
  setCart,
}) {

  const totalQty = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const increaseQty = (index) => {

    setCart((prev) =>
      prev.map((item, i) => {

        if (i !== index) return item;

        if (item.qty >= item.stock) return item;

        return {
          ...item,
          qty: item.qty + 1,
        };

      })
    );

  };

  const decreaseQty = (index) => {

    setCart((prev) => {

      const item = prev[index];

      if (item.qty === 1) {

        return prev.filter((_, i) => i !== index);

      }

      return prev.map((item, i) =>

        i === index
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item

      );

    });

  };

  const removeItem = (index) => {

    setCart((prev) =>
      prev.filter((_, i) => i !== index)
    );

  };

  if (cart.length === 0) {

    return (

      <div className="cart-card">

        <div className="cart-empty">

          <div className="cart-empty-icon">
            🛒
          </div>

          <h2>Cart is Empty</h2>

          <p>
            Search or scan a product to start billing.
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="cart-card">

      <div className="cart-header">

        <h2>🛒 Billing Cart</h2>

        <span>
          {cart.length} Products | {totalQty} Qty
        </span>

      </div>

      {cart.map((item, index) => (

        <div
          className="cart-item"
          key={item.variantId}
        >

          <img
            className="cart-image"
            src={
              item.image ||
              "/images/no-image.png"
            }
            alt={item.productName}
          />

          <div className="cart-info">

            <h3>{item.productName}</h3>

            <p>{item.variantName}</p>

            <small>
              Product :
              {" "}
              {item.productCode}
            </small>

            <br />

            <small>
              Barcode :
              {" "}
              {item.barcode}
            </small>

            <br />

            <small>
              Stock :
              {" "}
              {item.stock}
            </small>

            <div className="price-row">

              ₹
              {" "}
              {Number(item.sellingPrice).toFixed(2)}

            </div>

          </div>

          <div className="cart-actions">

            <div className="qty-box">

              <button
                onClick={() =>
                  decreaseQty(index)
                }
              >
                −
              </button>

              <span>
                {item.qty}
              </span>

              <button
                disabled={
                  item.qty >= item.stock
                }
                onClick={() =>
                  increaseQty(index)
                }
              >
                +
              </button>

            </div>

            <div className="item-total">

              ₹
              {" "}
              {(
                item.qty *
                item.sellingPrice
              ).toFixed(2)}

            </div>

            <button
              className="remove-btn"
              onClick={() =>
                removeItem(index)
              }
            >
              Remove
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}