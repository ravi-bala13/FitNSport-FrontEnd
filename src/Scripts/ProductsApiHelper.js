import apiCaller from "./ApiCaller";

const ProductsApiHelper = (function () {
  const _handleRemoveFromCart = async (productId) => {
    try {
      const response = await apiCaller(
        "post",
        `/api/products/removeFromCart/${productId}`
      );
      if (response && response.message === "success") {
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const _getCartProducts = async () => {
    try {
      const response = await apiCaller("get", `/api/products/getCartItems`);
      if (response && response.message === "success") {
        let product = response.results.items;
        return product;
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }

    return [];
  };

  const _getAllProducts = async () => {
    try {
      const response = await apiCaller("get", "/api/products/getAllProducts");
      if (response && response.message === "success") {
        let products = response.results;
        return products;
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }

    return [];
  };

  const _handleAddToCart = async (product) => {
    try {
      const response = await apiCaller(
        "post",
        `/api/products/addToCart`,
        product
      );
      if (response && response.message === "success") {
        console.log("response:", response);
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const _handleAddToWishList = async (product) => {
    try {
      const response = await apiCaller(
        "post",
        `/api/products/addToWishList`,
        product
      );
      if (response && response.message === "success") {
        console.log("response:", response);
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const _getWishListProducts = async () => {
    try {
      const response = await apiCaller("get", "/api/products/getWishListItems");
      if (response && response.message === "success") {
        let products = response.results.items;
        return products;
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }

    return [];
  };

  return {
    handleRemoveFromCart: _handleRemoveFromCart,
    getCartProducts: _getCartProducts,
    getAllProducts: _getAllProducts,
    handleAddToCart: _handleAddToCart,
    handleAddToWishList: _handleAddToWishList,
    getWishListProducts: _getWishListProducts,
  };
})();

export default ProductsApiHelper;
