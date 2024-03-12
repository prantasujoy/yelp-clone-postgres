import { Outlet } from "react-router-dom";

const Layout = () => {
  return <div className="bg-slate-500 min-h-screen">{<Outlet />}</div>;
};
export default Layout;
