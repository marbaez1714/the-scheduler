import {PathRouteProps, Route, Routes} from "react-router-dom";
import {Login} from "../pages/Login";
import Test1 from "../pages/Test1";
import Test2 from "../pages/Test2";
import Test3 from "../pages/Test3";
import {RequireAuth} from "./RequireAuth";

const Navigation = () => {
  const basicRoutes: PathRouteProps[] = [{path: "", element: <Login />}];
  const authRoutes: PathRouteProps[] = [
    {path: "test1", element: <Test1 />},
    {path: "test2", element: <Test2 />},
    {path: "test3", element: <Test3 />},
  ];

  return (
    <Routes>
      {/* Unauthorized Routes */}
      {basicRoutes.map(({path, ...rest}, index) => (
        <Route path={`/${path}`} key={`${path}-${index}`} {...rest} />
      ))}
      {/* Authorized Routes */}
      {authRoutes.map(({path, element}, index) => (
        <Route
          path={`/${path}`}
          element={<RequireAuth element={element} />}
          key={`${path}-${index}`}
        />
      ))}
    </Routes>
  );
};

export default Navigation;
