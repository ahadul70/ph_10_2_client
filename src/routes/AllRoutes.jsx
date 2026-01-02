import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Errorpage from "../page/Error/Errorpage";
import Signup from "../page/Signup/Signup";
import Home from "../page/Home/Home";
import ForgotPass from "../page/ForgotPass/ForgotPass";
import Signin from "../page/Signin/Signin";
import PrivRoutes from "./PrivRoutes";
import Allproducts from "../page/All Products/Allproducts";
import Produrctsdeatils from "../page/Productsdetails/Produrctsdeatils";
import Myimports from "../page/My imports/Myimports";
import ProductDetails from "../page/Productsdetails/Produrctsdeatils";
import { ImportDetails } from "../components/Importdetails/Importdetails";
import { MyExports } from "../page/My Exports/MyExports";
import Addexports from "../page/AddExports/Addexports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Errorpage></Errorpage>,
    children: [
      { index: true, Component: Home },
      { path: "/registration", Component: Signup },
      { path: "/login", Component: Signin },
      { path: "/allproducts", Component: Allproducts },
      { path: "/forgotpass", Component: ForgotPass },
      
      { path: "/myimports", element:<PrivRoutes><Myimports/></PrivRoutes> },
      { path: "/myexports", element:<PrivRoutes><MyExports/></PrivRoutes> }, 

      { path: "/addexports", element:<PrivRoutes><Addexports/></PrivRoutes> }, 
      
      {
        path: "/importdetails/:id",
        element: <ImportDetails />,
        loader: ({ params }) =>
          fetch(`https://phserver-nine.vercel.app/myimports/${params.id}`),
      },
      {
        path: "/productdetails/:id",
        loader: ({ params }) =>
          fetch(`https://phserver-nine.vercel.app/products/${params.id}`),
        element: (
          <PrivRoutes>
            <ProductDetails />
          </PrivRoutes>
        ),
      },
    ],
  },
]);
