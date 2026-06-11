import Navbar from "./Navbar";

function PageContainer({ children }) {
  return (
    <div>

      <Navbar />

      <div
        style={{
          padding: "30px",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default PageContainer;