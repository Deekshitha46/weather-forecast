function GlassCard({ children }) {

  return (

    <div
      style={{
        background:
          "rgba(255,255,255,0.08)",

        border:
          "1px solid rgba(255,255,255,0.12)",

        borderRadius: "24px",

        padding: "30px",

        backdropFilter: "blur(16px)",

        WebkitBackdropFilter:
          "blur(16px)",

        boxShadow:
          "0 10px 35px rgba(0,0,0,0.35)",

        transition:
          "all 0.35s ease",

        cursor: "default",
      }}

      onMouseEnter={(e) => {

        e.currentTarget.style.transform =
          "translateY(-10px) scale(1.02)";

        e.currentTarget.style.boxShadow =
          "0 20px 50px rgba(0,0,0,0.5)";

        e.currentTarget.style.border =
          "1px solid rgba(110,168,255,0.4)";
      }}

      onMouseLeave={(e) => {

        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";

        e.currentTarget.style.boxShadow =
          "0 10px 35px rgba(0,0,0,0.35)";

        e.currentTarget.style.border =
          "1px solid rgba(255,255,255,0.12)";
      }}
    >

      {children}

    </div>
  );
}

export default GlassCard;