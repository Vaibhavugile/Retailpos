import "./ProductSearch.css";
import { useState, useRef, useEffect } from "react";
import { parseSearchCode } from "../../utils/codeParser";
import { searchProduct } from "../../services/productSearchService";
import successSound from "../../assets/sounds/success.mp3";
import errorSound from "../../assets/sounds/error.mp3";
export default function ProductSearch({
  cart,
  setCart,
}) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
const searchRef = useRef(null);
const focusBarcodeInput = () => {
    searchRef.current?.focus();
    searchRef.current?.select(); // Optional: selects existing text
};
const lastScanRef = useRef("");
const lastScanTimeRef = useRef(0);
const successAudio = useRef(new Audio(successSound));
const errorAudio = useRef(new Audio(errorSound));
useEffect(() => {
    focusBarcodeInput();
}, []);
useEffect(() => {

    const handleKeyDown = (e) => {

        if (e.key === "F2") {

            e.preventDefault();

            focusBarcodeInput();

        }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {

        window.removeEventListener("keydown", handleKeyDown);

    };

}, []);
useEffect(() => {
  successAudio.current.volume = 0.6;
  errorAudio.current.volume = 0.7;
}, []);
  const handleSearch = async (value) => {
    if (loading) return;
const code = value.trim().toUpperCase();
const now = Date.now();

// Ignore duplicate scan within 300ms
if (
    lastScanRef.current === code &&
    now - lastScanTimeRef.current < 300
) {
    return;
}

lastScanRef.current = code;
lastScanTimeRef.current = now;
  const parsed = parseSearchCode(code);

  // Invalid or incomplete code
 if (!parsed.valid) {
  errorAudio.current.currentTime = 0;

  errorAudio.current.play().catch(() => {});
    setSearch(code);

    setSearchResult(null);

    setSearchError("");

    return;

}

  setSearch(parsed.code);

  setLoading(true);

  try {

    const result = await searchProduct(parsed.code);

   if (!result) {
  errorAudio.current.currentTime = 0;
  errorAudio.current.play().catch(() => {});
    setSearchResult(null);

    setSearchError(`No product found for "${parsed.code}"`);
    lastScanRef.current = "";
    focusBarcodeInput();

    return;

}

    else if (result.type === "variant") {

      addVariantToCart(
        result.product,
        result.variant
      );

    }

    else {
setSearchError("");
      setSearchResult(result);

    }

  }

catch (error) {

    console.error(error);
  errorAudio.current.currentTime = 0;
  errorAudio.current.play().catch(() => {});
    setSearchResult(null);

    setSearchError("Something went wrong. Please try again.");

    lastScanRef.current = "";

}
  finally {

    setLoading(false);
     focusBarcodeInput();

  }

};
const addVariantToCart = (product, variant) => {

  setCart((prev) => {

    const existing = prev.find(
      (item) => item.variantId === variant.id
    );

    if (existing) {

      return prev.map((item) =>

        item.variantId === variant.id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item

      );

    }

    return [

      ...prev,

      {

        productId: product.id,

        productCode: product.productCode,

        productName: product.name,

        image: product.images?.[0] || "",

        variantId: variant.id,

        variantName: variant.variantName,

        barcode: variant.barcode,

        sellingPrice: Number(variant.sellingPrice),

        purchasePrice: Number(variant.purchasePrice),

        stock: Number(variant.stock),

        qty: 1,

      }

    ];

  });
successAudio.current.currentTime = 0;

successAudio.current.play().catch(() => {});
  // Ready for next product
  setSearch("");
setSearchError("");
setSearchResult(null);

focusBarcodeInput();
lastScanRef.current = "";

};
  return (
    <div className="product-search-card">

      <div className="card-title">

        <h2>🔍 Product Search</h2>

        <button
    className="scan-btn"
    type="button"
    onClick={focusBarcodeInput}
>
    📷 Scan Barcode
</button>

      </div>

  <input
    ref={searchRef}
    type="text"
    className="product-search-input"
    placeholder="Enter Product Code or Scan Barcode"
    value={search}
    autoComplete="off"
    autoFocus
    onChange={(e) => {

        const value = e.target.value.toUpperCase();

        setSearch(value);
        setSearchError("");

        if (searchResult) {
            setSearchResult(null);
        }

    }}
    onKeyDown={(e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            handleSearch(search);

        }

    }}
/>

      <div className="product-results">

        {loading && (
          <div className="empty-search">
            <h3>Searching...</h3>
          </div>
        )}
        {!loading && searchError && (

    <div className="empty-search">

        <div className="empty-icon">
            ❌
        </div>

        <h3>Product Not Found</h3>

        <p>{searchError}</p>

    </div>

)}

       {!loading && !searchResult && !searchError && (
          <div className="empty-search">

            <div className="empty-icon">
              🔎
            </div>

            <h3>
              Search Products
            </h3>

            <p>
              Enter a Product Code or scan a Variant Barcode.
            </p>

          </div>
        )}

       

        {!loading &&
  searchResult?.type === "product" && (

    <div className="search-product-card">

      <div className="search-product-header">

        <img
          src={searchResult.product.images?.[0] || ""}
          alt={searchResult.product.name}
        />

        <div>

          <h3>
            {searchResult.product.name}
          </h3>

          <p>
            {searchResult.product.productCode}
          </p>

        </div>

      </div>

      <div className="variant-list">

        {searchResult.product.variants.map((variant) => (

          <div
    key={variant.id}
    className="variant-item"
    onClick={() =>
        addVariantToCart(
            searchResult.product,
            variant
        )
    }
>

            <div>

              <strong>
                {variant.variantName}
              </strong>

              <p>
                {variant.id}
              </p>

            </div>

            <div className="variant-right">

              <span>
                ₹{variant.sellingPrice}
              </span>

              <small>
                Stock : {variant.stock}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>

)}

      </div>

    </div>
  );
}