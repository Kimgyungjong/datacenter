import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
