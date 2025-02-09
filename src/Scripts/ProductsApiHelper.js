import apiCaller from "./ApiCaller";

const ProductsApiHelper = (function () {
  const _handleRemoveFromCart = async (productId, guestUserId = 0) => {
    try {
      const response = await apiCaller(
        "post",
        `/api/products/cart/removeFromCart/${productId}?guestUserId=${guestUserId}`
      );
      if (response && response.message === "success") {
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const _getCartProducts = async (guestUserId = 0) => {
    try {
      const response = await apiCaller(
        "get",
        `/api/products/cart/getCartItems?guestUserId=${guestUserId}`
      );
      if (response && response.message === "success") {
        let product = response.results.items;
        return product ?? [];
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }

    return [];
  };

  const _getTopSellingProducts = async () => {
    try {
      const response = await apiCaller(
        "get",
        `/api/products/getTopSellingProducts`
      );
      if (response && response.message === "success") {
        let product = response.results;
        return product ?? [];
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
        return products ?? [];
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }

    return [];
  };

  const _getProductDetails = async (productId) => {
    try {
      const response = await apiCaller(
        "get",
        `/api/products/getProductDetails/${productId}`
      );
      if (response && response.message === "success") {
        let product = response.results;
        return product;
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const _handleAddToCart = async (
    product,
    isUpdateCart = false,
    guestUserId = 0
  ) => {
    let apiEndPoint = `/api/products/cart/addToCart?isUpdateCart=${isUpdateCart}`;
    if (guestUserId > 0) {
      apiEndPoint = `/api/products/cart/addToCart?isUpdateCart=${isUpdateCart}&guestUserId=${guestUserId}`;
    }
    try {
      const response = await apiCaller("post", apiEndPoint, product);
      if (response && response.message === "success") {
        console.log("response:", response);
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const _handleAddToWishList = async (product, guestUserId = 0) => {
    try {
      const response = await apiCaller(
        "post",
        `/api/products/cart/addToWishList?guestUserId=${guestUserId}`,
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

  const _getWishListProducts = async (guestUserId = 0) => {
    try {
      const response = await apiCaller(
        "get",
        `/api/products/cart/getWishListItems?guestUserId=${guestUserId}`
      );
      if (response && response.message === "success") {
        let products = response.results.items;
        return products ?? [];
      } else {
        console.log("response.message:", response);
      }
    } catch (error) {
      console.log("error:", error);
    }

    return [];
  };

  const _getRelatedProducts = async () => {
    try {
      const response = await apiCaller(
        "get",
        "/api/products/getRelatedProducts"
      );
      if (response && response.message === "success") {
        let products = response.results;
        return products ?? [];
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
    getTopSellingProducts: _getTopSellingProducts,
    getAllProducts: _getAllProducts,
    getProductDetails: _getProductDetails,
    getRelatedProducts: _getRelatedProducts,
    handleAddToCart: _handleAddToCart,
    handleAddToWishList: _handleAddToWishList,
    getWishListProducts: _getWishListProducts,
  };
})();

export default ProductsApiHelper;
