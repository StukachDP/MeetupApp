import { createTheme } from "@mui/material";
export const colorTheme = createTheme({
  palette: {
    primary: {
      dark: "#3C4861",
      main: "#FFFFFF",
      light: "#848FA5",
      contrastText: "#e2e7ef",
    },
    secondary: {
      dark: "#C2CBDA",
      main: "#8065EC",
      light: "#5B6887",
      contrastText: "#aab6ca",
    },
    info: {
      main: "#9fa8da",
      light: "#D5DCE7",
    },
    error: {
      main: "#EF2F00",
    },
    success: {
      main: "#009A73",
    },
  },
});
export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(63.5deg, #8065ec 16.63%, #314ad7 83.37%)",
          boxShadow: "0px 4px 8px rgba(60, 72, 97, 0.2)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          overflowWrap: "break-word",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: colorTheme.palette.primary.light,
            backgroundColor: colorTheme.palette.primary.main,
            border: `1px solid ${colorTheme.palette.primary.contrastText}`,
            backgroundImage: "none",
            boxShadow: "none",
            fontWeight: 500,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colorTheme.palette.primary.main,
          fontSize: "1rem",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          marginRight: "0.5rem",
          backgroundColor: colorTheme.palette.info.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 9px rgba(194, 203, 218, 0.25)",
          borderRadius: "6px",
          marginBottom: "1rem",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: "0rem",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          display: "flex",
          justifyContent: "space-between",
        },
        indicator: {
          backgroundColor: colorTheme.palette.secondary.main,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: colorTheme.palette.primary.light,
          textTransform: "none",
          padding: "0",
          fontSize: "1rem",
          fontWeight: 400,

          "&.Mui-selected": {
            color: colorTheme.palette.primary.dark,
            fontWeight: 500,
          },
          "&.Mui-disabled": {
            color: colorTheme.palette.primary.light,
            fontWeight: 500,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          borderRadius: "5px",
          fontWeight: "400",
          padding: "0.5rem 0rem 0.5rem 1rem",
          color: colorTheme.palette.primary.dark,
        },
        input: {
          width: "80%",
          fontSize: "1rem",
          borderRadius: "5px",
          fontWeight: "400",
          padding: "0",
          color: colorTheme.palette.primary.dark,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          width: "20%",
          margin: "0",
          height: "2rem",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colorTheme.palette.primary.light,
        },
      },
    },
  },
});
