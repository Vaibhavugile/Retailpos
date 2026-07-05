import { useRef } from "react";
import "./ProductImages.css";

export default function ProductImages({
  product,
  setProduct,
}) {
  const inputRef = useRef();

  /* ===========================================
      IMAGE PICKER
  =========================================== */

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const images = files.map((file, index) => ({
      id:
        Date.now().toString() + index,

      file,

      preview:
        URL.createObjectURL(file),

      isCover:
        product.images.length === 0 &&
        index === 0,
    }));

    setProduct((prev) => ({
      ...prev,

      images: [
        ...prev.images,
        ...images,
      ],
    }));
  };

  /* ===========================================
      DELETE IMAGE
  =========================================== */

  const removeImage = (id) => {
    const updated = product.images.filter(
      (img) => img.id !== id
    );

    if (
      updated.length > 0 &&
      !updated.some((i) => i.isCover)
    ) {
      updated[0].isCover = true;
    }

    setProduct((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  /* ===========================================
      SET COVER
  =========================================== */

  const setCover = (id) => {
    const updated = product.images.map(
      (img) => ({
        ...img,
        isCover: img.id === id,
      })
    );

    setProduct((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  return (
    <div className="product-card">

      <div className="product-card-header">

        <h2>Product Images</h2>

        <p>
          Upload high quality product
          images.
        </p>

      </div>

      <div className="product-card-body">

        {/* Upload */}

        <div
          className="upload-box"
          onClick={() =>
            inputRef.current.click()
          }
        >
          <h3>
            + Upload Images
          </h3>

          <p>
            Click here to choose images
          </p>

          <span>
            PNG • JPG • WEBP
          </span>

          <input
            ref={inputRef}
            hidden
            multiple
            accept="image/*"
            type="file"
            onChange={handleImages}
          />
        </div>

        {/* Preview */}

        {product.images.length > 0 && (

          <div className="image-grid">

            {product.images.map((img) => (

              <div
                className="image-card"
                key={img.id}
              >
                {img.isCover && (
                  <div className="cover-badge">
                    Cover
                  </div>
                )}

                <img
                  src={img.preview}
                  alt=""
                />

                <div className="image-actions">

                  {!img.isCover && (
                    <button
                      type="button"
                      onClick={() =>
                        setCover(img.id)
                      }
                    >
                      Set Cover
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() =>
                      removeImage(img.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}