import plugin from "tailwindcss/plugin";

export default {
    darkMode: "class",

    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],

    theme: {
        extend: {
            // ================= COLORS =================
            colors: {
                bg: "var(--bg-primary)",
                "bg-secondary": "var(--bg-secondary)",
                card: "var(--bg-card)",

                primary: "var(--purple)",
                "primary-light": "var(--purple-light)",

                success: "var(--success)",
                warning: "var(--warning)",
                danger: "var(--danger)",

                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    muted: "var(--text-muted)",
                },

                border: "var(--border)",
            },

            // ================= BORDER RADIUS =================
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },

            // ================= SHADOWS =================
            boxShadow: {
                soft: "var(--shadow-soft)",
                card: "var(--shadow-card)",
                glow: "var(--shadow-glow)",
            },

            // ================= FONT =================
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },

    // plugins: [
    //     plugin(function ({ addUtilities, addComponents }) {
    //         // ================= GLASS =================
    //         addUtilities({
    //             ".glass": {
    //                 background: "rgba(255,255,255,0.06)",
    //                 "backdrop-filter": "blur(30px)",
    //                 border: "1px solid rgba(255,255,255,0.08)",
    //             },

    //             ".glass-strong": {
    //                 background: "rgba(255,255,255,0.1)",
    //                 "backdrop-filter": "blur(40px)",
    //             },
    //         });

    //         // ================= GRADIENTS =================
    //         // addUtilities({
    //         //     ".bg-gradient-primary": {
    //         //         background:
    //         //             "linear-gradient(135deg,#8B5CF6 0%,#6366F1 50%,#312E81 100%)",
    //         //     },

    //         //     ".bg-gradient-dark": {
    //         //         background:
    //         //             "linear-gradient(180deg,#0F172A 0%,#020617 100%)",
    //         //     },

    //         //     ".text-gradient": {
    //         //         background:
    //         //             "linear-gradient(135deg,#8B5CF6,#6366F1)",
    //         //         WebkitBackgroundClip: "text",
    //         //         WebkitTextFillColor: "transparent",
    //         //     },
    //         // });

    //         // ================= BUTTONS =================
    //         addComponents({
    //             ".btn": {
    //                 height: "48px",
    //                 padding: "0 24px",
    //                 borderRadius: "14px",
    //                 fontWeight: "600",
    //                 transition: "0.25s ease",
    //                 cursor: "pointer",
    //             },

    //             ".btn-primary": {
    //                 background:
    //                     "linear-gradient(135deg,#8B5CF6,#6366F1)",
    //                 color: "#fff",
    //                 boxShadow: "0 10px 25px rgba(139,92,246,0.35)",
    //             },

    //             ".btn-primary:hover": {
    //                 transform: "translateY(-2px)",
    //                 boxShadow: "0 14px 40px rgba(139,92,246,0.45)",
    //             },

    //             ".btn-danger": {
    //                 background:
    //                     "linear-gradient(135deg,#DC2626,#EF4444)",
    //                 color: "#fff",
    //             },
    //         });
    //     }),
    // ],
};