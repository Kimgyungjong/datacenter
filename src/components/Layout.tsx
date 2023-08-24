import Header from "./Header";
import Search from "./Search";
import { Outlet, useLocation } from "react-router-dom";
import Toolbar from "./Toolbar";
export default function Layout() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && (
        <Header>
          <>
            <div>LOGO</div>
            <Search />
            <Toolbar />
          </>
        </Header>
      )}
      <section>
        <Outlet />
      </section>
    </div>
  );
}
