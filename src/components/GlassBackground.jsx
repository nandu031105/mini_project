const GlassBackground = () => {
  return (
    <>
      <div className="glass-bg">
        {/* Animated blobs behind glass */}
        <div className="g-blob g-blob-1" />
        <div className="g-blob g-blob-2" />
        <div className="g-blob g-blob-3" />
        <div className="g-blob g-blob-4" />

        {/* Glass panels layered in background */}
        <div className="glass-panel panel-1" />
        <div className="glass-panel panel-2" />
        <div className="glass-panel panel-3" />

        {/* Noise texture overlay for depth */}
        <div className="glass-noise" />
      </div>

      <style>{`

        /* ── Base ── */
        .glass-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          background: linear-gradient(140deg, #060918 0%, #0d1130 50%, #08101f 100%);
          overflow: hidden;
        }

        /* ── Noise texture ── */
        .glass-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        /* ── Glowing blobs ── */
        .g-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          animation: gBlobMove 14s ease-in-out infinite alternate;
        }

        .g-blob-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.6), rgba(67, 56, 202, 0.2));
          top: -180px;
          left: -150px;
          animation-duration: 15s;
        }

        .g-blob-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.5), rgba(2, 132, 199, 0.15));
          bottom: -120px;
          right: -100px;
          animation-duration: 12s;
          animation-delay: -5s;
        }

        .g-blob-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.45), rgba(109, 40, 217, 0.1));
          top: 35%;
          left: 50%;
          animation-duration: 17s;
          animation-delay: -9s;
        }

        .g-blob-4 {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.35), rgba(6, 182, 212, 0.08));
          bottom: 25%;
          left: 8%;
          animation-duration: 11s;
          animation-delay: -3s;
        }

        @keyframes gBlobMove {
          0%   { transform: translate(0px, 0px) scale(1); }
          30%  { transform: translate(40px, -50px) scale(1.06); }
          65%  { transform: translate(-25px, 35px) scale(0.96); }
          100% { transform: translate(20px, -25px) scale(1.04); }
        }

        /* ── Glass Panels ── */
        .glass-panel {
          position: absolute;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: panelDrift 20s ease-in-out infinite alternate;
        }

        .panel-1 {
          width: 340px;
          height: 420px;
          top: 8%;
          left: 5%;
          transform: rotate(-12deg);
          animation-duration: 22s;
        }

        .panel-2 {
          width: 280px;
          height: 360px;
          bottom: 6%;
          right: 6%;
          transform: rotate(10deg);
          animation-duration: 18s;
          animation-delay: -6s;
        }

        .panel-3 {
          width: 200px;
          height: 240px;
          top: 50%;
          left: 38%;
          transform: rotate(-5deg);
          animation-duration: 25s;
          animation-delay: -12s;
        }

        @keyframes panelDrift {
          0%   { transform: rotate(-12deg) translate(0px, 0px); }
          50%  { transform: rotate(-10deg) translate(12px, -18px); }
          100% { transform: rotate(-14deg) translate(-8px, 12px); }
        }

        /* ── Shimmer line across top ── */
        .glass-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmerLine 6s ease-in-out infinite;
        }

        @keyframes shimmerLine {
          0%   { left: -60%; }
          100% { left: 120%; }
        }

      `}</style>
    </>
  );
};

export default GlassBackground;