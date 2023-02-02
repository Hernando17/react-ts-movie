import { BarLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="loading-screen">
      <BarLoader color="rgb(74, 43, 250)" />;
    </div>
  );
}
