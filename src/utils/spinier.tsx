import HashLoader from "react-spinners/HashLoader";

export function Spinier() {
  return (
    <div className="sweet-loading">
      <HashLoader color="#1e6f9f" loading size={50} speedMultiplier={2} />
    </div>
  );
}
