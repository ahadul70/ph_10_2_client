import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Errorpage from "../page/Error/Errorpage";
import Signup from "../page/Signup/Signup";
import Home from "../page/Home/Home";
import ForgotPass from "../page/ForgotPass/ForgotPass";
import Signin from "../page/Signin/Signin";
import PrivRoutes from "./PrivRoutes";
import AdminRoute from "./AdminRoute";
import DashBoardLayout from "../layout/DashBoardLayout.jsx/DashBoardLayout";
import Allproducts from "../page/All Products/Allproducts";
import Produrctsdeatils from "../page/Productsdetails/Produrctsdeatils";
import Myimports from "../page/My imports/Myimports";
import ProductDetails from "../page/Productsdetails/Produrctsdeatils";
import { ImportDetails } from "../components/Importdetails/Importdetails";
import MyExports from "../page/My Exports/MyExports";
import CreateExportProduct from "../page/AddExports/Addexports";
import About from "../page/About/About";
import Contact from "../page/Contact/Contact";

// Dashboard Pages
import Overview from "../page/Dashboard/Overview";
import PendingImports from "../page/Dashboard/PendingImports";
import ApprovedImports from "../page/Dashboard/ApprovedImports";
import PendingExports from "../page/Dashboard/PendingExports";
import ApprovedExports from "../page/Dashboard/ApprovedExports";
import ManageUsers from "../page/Dashboard/ManageUsers";
import PaymentHistory from "../page/Dashboard/PaymentHistory";

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
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },

      { path: "/myimports", element: <PrivRoutes><Myimports /></PrivRoutes> },
      { path: "/myexports", element: <PrivRoutes><MyExports /></PrivRoutes> },

      { path: "/addexports", element: <PrivRoutes><CreateExportProduct /></PrivRoutes> },

      {
        path: "/importdetails/:id",
        element: (
          <PrivRoutes>
            <ImportDetails />
          </PrivRoutes>
        ),
      },
      {
        // Made Public as per requirements
        path: "/productdetails/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivRoutes>
        <DashBoardLayout />
      </PrivRoutes>
    ),
    children: [
      // General User Dashboard Routes
      { path: "overview", element: <Overview /> },
      { path: "my-imports", element: <Myimports /> },
      { path: "my-exports", element: <MyExports /> },
      { path: "add-exports", element: <CreateExportProduct /> },
      { path: "payment-history", element: <PaymentHistory /> },

      // Admin Only Dashboard Routes
      {
        path: "pending-imports",
        element: (
          <AdminRoute>
            <PendingImports />
          </AdminRoute>
        ),
      },
      {
        path: "approved-imports",
        element: (
          <AdminRoute>
            <ApprovedImports />
          </AdminRoute>
        ),
      },
      {
        path: "pending-exports",
        element: (
          <AdminRoute>
            <PendingExports />
          </AdminRoute>
        ),
      },
      {
        path: "approved-exports",
        element: (
          <AdminRoute>
            <ApprovedExports />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
