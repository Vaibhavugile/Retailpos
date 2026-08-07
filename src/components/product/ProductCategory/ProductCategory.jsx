import { useEffect, useState } from "react";
import "./ProductCategory.css";

import {
  subscribeCategories,
} from "../../../services/categoryService";

import {
  subscribeSubCategories,
} from "../../../services/subCategoryService";
import { useLocation } from "react-router-dom";
export default function ProductCategory({
  product,
  setProduct,
}) {
  const location = useLocation();

const isView =
  location.pathname.startsWith("/products/view");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  /* ===========================================
      LOAD CATEGORIES
  =========================================== */

  useEffect(() => {
    const unsubscribe = subscribeCategories((data) => {
      setCategories(data);
    });

    return () => unsubscribe();
  }, []);

  /* ===========================================
      LOAD SUB CATEGORIES
  =========================================== */

  useEffect(() => {
    const unsubscribe =
      subscribeSubCategories((data) => {
        setSubCategories(data);
      });

    return () => unsubscribe();
  }, []);

  /* ===========================================
      FILTER SUB CATEGORY
  =========================================== */

  const filteredSubCategories =
    subCategories.filter(
      (item) =>
        item.categoryId === product.categoryId
    );

  /* ===========================================
      CATEGORY CHANGE
  =========================================== */

  const handleCategory = (e) => {
      if (isView) return;
    const id = e.target.value;

    const selected = categories.find(
      (c) => c.id === id
    );

    setProduct((prev) => ({
      ...prev,

      categoryId: selected?.id || "",

      categoryName:
        selected?.name || "",

      subCategoryId: "",

      subCategoryName: "",
    }));
  };

  /* ===========================================
      SUB CATEGORY CHANGE
  =========================================== */

  const handleSubCategory = (e) => {
      if (isView) return;
    const id = e.target.value;

    const selected =
      filteredSubCategories.find(
        (c) => c.id === id
      );

    setProduct((prev) => ({
      ...prev,

      subCategoryId:
        selected?.id || "",

      subCategoryName:
        selected?.name || "",
    }));
  };

  return (
    <div className="product-card">

      <div className="product-card-header">

        <h2>Product Category</h2>

        <p>
          Select the category and
          sub category of this product.
        </p>

      </div>

      <div className="product-card-body">

        <div className="category-grid">

          {/* Category */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
  value={product.categoryId}
  onChange={handleCategory}
  disabled={isView}
>
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}

            </select>

          </div>

          {/* Sub Category */}

          <div className="form-group">

            <label>
              Sub Category
            </label>

            <select
  value={product.subCategoryId}
  onChange={handleSubCategory}
  disabled={isView || !product.categoryId}
>
              <option value="">
                Select Sub Category
              </option>

              {filteredSubCategories.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                )
              )}

            </select>

          </div>

        </div>

      </div>

    </div>
  );
}