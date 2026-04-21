import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { productContext } from "../Utils/Context";
import Loading from "./Loading";

const hasMinLength = (value, minLength) => String(value ?? "").trim().length >= minLength;

const defaultProduct = {
  title: "",
  image: "",
  description: "",
  price: "",
  category: "",
};

const Edit = () => {
  const [products, setProducts] = useContext(productContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(defaultProduct);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!products) {
      return;
    }

    const selectedProduct = products.find((item) => item.id == id);

    if (!selectedProduct) {
      toast.error("Product not found.");
      navigate("/");
      return;
    }

    setProduct({
      title: selectedProduct.title,
      image: selectedProduct.image,
      description: selectedProduct.description,
      price: selectedProduct.price,
      category: selectedProduct.category,
    });
    setIsReady(true);
  }, [id, navigate, products]);

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const updateProduct = (event) => {
    event.preventDefault();

    if (
      !hasMinLength(product.title, 5) ||
      !hasMinLength(product.image, 5) ||
      !hasMinLength(product.description, 5) ||
      !hasMinLength(product.price, 1) ||
      !hasMinLength(product.category, 5)
    ) {
      toast.error("Please fill all fields correctly before submitting.");
      return;
    }

    const productIndex = products.findIndex((item) => item.id == id);
    const updatedProducts = [...products];
    updatedProducts[productIndex] = { ...updatedProducts[productIndex], ...product };

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product updated successfully");
    navigate(`/details/${id}`);
  };

  if (!products || !isReady) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 md:p-8">
      <form onSubmit={updateProduct} className="surface-card w-full max-w-3xl p-6 md:p-8">
        <h1 className="section-title text-center">Edit Product</h1>
        <p className="section-copy text-center">
          Refine product information while keeping your catalog consistent.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="edit-image" className="input-label">
              Product Image URL
            </label>
            <input
              id="edit-image"
              type="url"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          <div>
            <label htmlFor="edit-title" className="input-label">
              Product Title
            </label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="edit-category" className="input-label">
                Category
              </label>
              <input
                id="edit-category"
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="edit-price" className="input-label">
                Price
              </label>
              <input
                id="edit-price"
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="field-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="edit-description" className="input-label">
              Description
            </label>
            <textarea
              id="edit-description"
              rows="7"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="field-input resize-none"
            ></textarea>
          </div>
        </div>

        <div className="mt-7 text-center">
          <button className="btn-primary min-w-48" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
