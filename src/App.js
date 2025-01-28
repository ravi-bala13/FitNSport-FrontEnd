import React, {
  useContext,
  Suspense,
  useState,
  useCallback,
  useEffect,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Components/AboutUs/AboutUs";
import Signin from "./Components/Signin/Signin";
import { UserStatusContext } from "./Scripts/AppContainer";
import LoadingMask from "./Components/Common/LoadingMask";
import CricketProduct from "./Components/CricketProduct/CricketProduct";
import HowToChooseSport from "./Components/HowToChoose/HowToChoose";
import OrderPage from "./Components/OrderPage/OrderPage";
import NotFound from "./Components/NotFound/NotFound";
import CricketDetail from "./Components/CricketDetail/CricketDetail";
import YourProfile from "./Components/YourProfile/YourProfile";
import Wishlist from "./Components/Wishlist/Wishlist";
import TermsConditions from "./Components/TermsConditions/TermsConditions";
import OrderSummary from "./Components/OrderSummary/OrderSummary";
import CartPage from "./Components/CartPage/CartPage";
import WarrantyPolicy from "./Components/WarrantyPolicy/WarrantyPolicy";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import FAQ from "./Components/FAQ/FAQ";
import ContactUs from "./Components/ContactUs/ContactUs";
import OrderConfirmationPage from "./Components/OrderConfirmationPage/OrderConfirmationPage";

function App() {
  // eslint-disable-next-line
  const [isLoggedIn] = useContext(UserStatusContext);

  const [toShow, setToShow] = useState(false);

  const showMask = useCallback((config = {}) => {
    setToShow(true);
  }, []);

  const hideMask = useCallback(() => {
    if (toShow) {
      setToShow(false);
    }
  }, [toShow]);

  useEffect(() => {
    window.addEventListener("loadmask:show", showMask);
    window.addEventListener("loadmask:hide", hideMask);

    return () => {
      window.removeEventListener("loadmask:show", showMask);
      window.removeEventListener("loadmask:hide", hideMask);
    };
  }, [showMask, hideMask]);

  return (
    <div className={`App`}>
      <Navbar />
      {toShow ? (
        <LoadingMask />
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <AboutUs />
                </>
              }
            />
            {/* Products and Related Routes */}
            <Route path="/cricket" element={<CricketProduct />} />
            <Route path="/how-to-choose-sport" element={<HowToChooseSport />} />
            <Route path="/products/:productId" element={<CricketDetail />} />
            <Route path="/orderconfirm" element={<OrderConfirmationPage />} />

            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route path="/warranty" element={<WarrantyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contactus" element={<ContactUs />} />

            {isLoggedIn ? (
              <>
                <Route path="/myprofile" element={<YourProfile />} />
                <Route path="/myorders" element={<OrderPage />} />
                <Route path="/ordersummary" element={<OrderSummary />} />
                <Route path="/mywishlist" element={<Wishlist />} />
                <Route path="/cart" element={<CartPage />} />
              </>
            ) : (
              <Route path="/*" element={<Signin />} />
            )}

            {/* Sign-in Route with dedicated Suspense */}
            <Route
              path="/signin"
              element={
                <Suspense
                  fallback={
                    <div className="loading-spinner">Loading Sign In...</div>
                  }
                >
                  <Signin />
                </Suspense>
              }
            />

            {/* 404 Not Found Route */}
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div className="loading-spinner">Page Not Found...</div>
                  }
                >
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
