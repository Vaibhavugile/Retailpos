import "./CartTable.css";

export default function CartTable({
  cart,
  setCart,
}) {

  const increaseQty = (index) => {

    const updatedCart = [...cart];

    updatedCart[index].qty += 1;

    updatedCart[index].total =
      updatedCart[index].qty *
      updatedCart[index].sellingPrice;

    setCart(updatedCart);

  };

  const decreaseQty = (index) => {

    const updatedCart = [...cart];

    if (updatedCart[index].qty > 1) {

      updatedCart[index].qty -= 1;

      updatedCart[index].total =
        updatedCart[index].qty *
        updatedCart[index].sellingPrice;

      setCart(updatedCart);

    }

  };

  const removeItem = (index) => {

    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);

  };

  if (cart.length === 0) {

    return (

      <div className="cart-card">

        <div className="cart-empty">

          <div className="cart-empty-icon">
            🛒
          </div>

          <h2>
            Cart is Empty
          </h2>

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

        <h2>

          Billing Cart

        </h2>

        <span>

          {cart.length} Items

        </span>

      </div>

      {cart.map((item, index) => (

        <div
          className="cart-item"
          key={item.variantId || index}
        >

          <img
            src={
              item.image ||
              "https://placehold.co/70x70?text=No+Image"
            }
            alt={item.productName}
            className="cart-image"
          />

          <div className="cart-info">

            <h3>

              {item.productName}

            </h3>

            <p>

              {item.variantName}

            </p>

            <small>

              Barcode :
              {" "}
              {item.barcode}

            </small>

            <div className="price-row">

              ₹ {item.sellingPrice}

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
                onClick={() =>
                  increaseQty(index)
                }
              >

                +

              </button>

            </div>

            <div className="item-total">

              ₹ {item.total}

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