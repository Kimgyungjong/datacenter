type CrumbObj = {
  path: string;
  name: string;
};
export default function BreadCrumb() {
  const dirRoot: CrumbObj[] = [
    { path: "A", name: "home" },
    { path: "B", name: "dir1" },
    { path: "C", name: "dir2" },
  ];
  return (
    <div className=" w-2/4">
      {dirRoot.map((crumb, idx) => (
        <button key={idx}>/{crumb.name}</button>
      ))}
    </div>
  );
}
