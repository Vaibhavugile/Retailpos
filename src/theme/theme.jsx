import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#5B5FEF",
      light: "#EEF2FF",
      dark: "#4338CA",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#7C3AED",
    },

    success: {
      main: "#22C55E",
    },

    error: {
      main: "#EF4444",
    },

    warning: {
      main: "#F59E0B",
    },

    info: {
      main: "#06B6D4",
    },

    background: {
      default: "#F6F8FC",
      paper: "#FFFFFF",
    },

    divider: "#E8EDF5",

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),

    h3: {
      fontWeight: 800,
      fontSize: "2rem",
      letterSpacing: "-0.03em",
    },

    h4: {
      fontWeight: 800,
      fontSize: "1.75rem",
      letterSpacing: "-0.03em",
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    subtitle1: {
      fontWeight: 500,
      color: "#6B7280",
    },

    body1: {
      fontSize: "15px",
    },

    body2: {
      color: "#6B7280",
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "15px",
    },
  },

  shape: {
    borderRadius: 18,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#F6F8FC",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        },

        "*::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },

        "*::-webkit-scrollbar-thumb": {
          background: "#D8DDEA",
          borderRadius: 20,
        },

        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#FFFFFF",
          borderRadius: 22,
          border: "1px solid #EEF2F7",
          boxShadow: "0 10px 35px rgba(15,23,42,.05)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: "1px solid #EEF2F7",
          boxShadow: "0 12px 40px rgba(15,23,42,.06)",
          overflow: "hidden",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderLeft: "1px solid #EEF2F7",
          boxShadow: "-20px 0 60px rgba(15,23,42,.08)",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          height: 52,
          borderRadius: 16,
          fontWeight: 700,
          paddingLeft: 24,
          paddingRight: 24,
        },

        contained: {
          background:
            "linear-gradient(135deg,#5B5FEF,#7C3AED)",

          color: "#FFFFFF",

          boxShadow:
            "0 14px 35px rgba(91,95,239,.28)",

          "&:hover": {
            background:
              "linear-gradient(135deg,#4F46E5,#6D28D9)",

            boxShadow:
              "0 18px 45px rgba(91,95,239,.35)",
          },
        },

        outlined: {
          borderColor: "#D9E0F2",

          "&:hover": {
            borderColor: "#5B5FEF",
            background: "#EEF2FF",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },

    MuiOutlinedInput: {
  styleOverrides: {
    root: {
      background: "#FFFFFF",
      borderRadius: 16,
      transition: ".3s",

      color: "#111827",

      "& fieldset": {
        borderColor: "#E5EAF3",
      },

      "&:hover fieldset": {
        borderColor: "#5B5FEF",
      },

      "&.Mui-focused fieldset": {
        borderWidth: 2,
        borderColor: "#5B5FEF",
      },

      "&.Mui-focused": {
        boxShadow:
          "0 0 0 4px rgba(91,95,239,.10)",
      },

      "& input": {
        color: "#111827",
        WebkitTextFillColor: "#111827",
      },

      "& textarea": {
        color: "#111827",
        WebkitTextFillColor: "#111827",
      },

      "& input::placeholder": {
        color: "#9CA3AF",
        opacity: 1,
      },

      "& textarea::placeholder": {
        color: "#9CA3AF",
        opacity: 1,
      },
    },

    input: {
      padding: "16px 14px",
      color: "#111827",
      WebkitTextFillColor: "#111827",
      caretColor: "#5B5FEF",
    },
  },
},

    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          border: "1px solid #EEF2F7",
          boxShadow: "0 12px 35px rgba(15,23,42,.05)",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          background: "#F8FAFC",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#111827",
          borderBottom: "1px solid #EEF2F7",
        },

        body: {
          borderBottom: "1px solid #F3F4F6",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,

          "&:hover": {
            background: "#EEF2FF",
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 10,
          fontSize: 12,
        },
      },
    },
  },
});

export default theme;