import { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  InputBase,
  InputAdornment,
  Drawer, Link as MuiLink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "../components/Link";
import apiService from "../services/apiService";
import { SearchContext } from "../ApplicationContexts";
import "./Header.css";

import SearchIcon from "../assets/img/header-search-icon.png";
import EuCapacitoLogo from "../assets/img/logo.png";
import UserIcon from "../assets/img/perfil-menu-usuario.png";

import MenuDesk from "../components/Home/MenuDesktop";
import {Facebook, Instagram, LinkedIn} from "@mui/icons-material";
import YouTube from "@mui/icons-material/YouTube";

const Header = ({ title, subtitle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { search, setSearch } = useContext(SearchContext);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userFirstName, setUserFirstName] = useState(
    sessionStorage.getItem("username")
  );

  const profileImage = sessionStorage.getItem('avatarURL') && UserIcon

  let navigate = useNavigate();
  let location = useLocation().pathname;

  useEffect(() => {
    if (!location.includes("/procurar")) {
      setSearch("");
    }
  }, [location]);

  const handleLogout = (e) => {
    e.preventDefault();

    setDrawerOpen(!drawerOpen);
    apiService.logout();
    return navigate("/login");
  };

  const handleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  } 

  const handleSearchResults = (e) => {
    if (e.key === "Enter") {
      navigate(`/procurar?search=${search}`, {replace: true});
    }
  };

  return (
    <>
      <AppBar
        className="appbar"
        id="appbar"
        position="relative"
        sx={
          location !== "/"
            ? styles.appbar
            : { ...styles.appbar, ...styles.appbar.homepage }
        }
      >
        <Container
          maxWidth="xl"
          sx={{
            //css desktop
            display: {
              md: "flex",
            },
            justifyContent: {
              md: "space-between",
            },
            alignItems: {
              md: "center",
            },
          }}
        >
          <Toolbar disableGutters sx={styles.toolbar}>
            <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              <Link to="/">
                <img src={EuCapacitoLogo} alt="Logo EuCapacito" />
              </Link>
            </Box>

            <Box sx={styles.toolbar.mobileLogo}>
              <Link to="/">
                <img src={EuCapacitoLogo} alt="Logo EuCapacito" />
              </Link>
            </Box>
          </Toolbar>

          <Box sx={styles.subheader}>
            {token && location.length <= 1 ? (
              <p>Olá, {userFirstName.split(" ")[0]}!</p>
            ) : title !== "" ? (
              <p>{title}</p>
            ) : (
              <p>Seja bem vindo</p>
            )}
            {subtitle !== "" && location.length > 1 ? (
              <p>{subtitle}</p>
            ) : (
              <p>Encontre um curso para aprender</p>
            )}
          </Box>

          <Box sx={styles.searchBar}>
            <InputBase
              placeholder="Procure aqui"
              inputProps={{ "aria-label": "search eu capacito" }}
              startAdornment={
                <InputAdornment position="start" sx={{ m: "0.875rem" }}>
                  <img src={SearchIcon} alt="Ícone - Lupa" />
                </InputAdornment>
              }
              sx={styles.searchBar.input}
              value={search}
              onChange={handleSearch}
              onKeyUp={handleSearchResults}
            />

            <Box sx={styles.socialdesk}>
              <MuiLink href="https://www.facebook.com/eucapacito/" target="_blank">
                <Facebook sx={styles.email} />
              </MuiLink>

              <MuiLink href="https://www.instagram.com/eucapacito/" target="_blank">
                <Instagram sx={styles.email} />
              </MuiLink>

              <MuiLink href="https://www.youtube.com/c/EuCapacito" target="_blank">
                <YouTube sx={styles.email} />
              </MuiLink>

              <MuiLink href="https://www.linkedin.com/company/eucapacito/" target="_blank">
                <LinkedIn sx={styles.email} />
              </MuiLink>
            </Box>

            <Box sx={styles.subheaderdesk}>
              {token && location.length <= 1 ? (
                <p>Olá, {userFirstName.split(" ")[0]}!</p>
              ) : title !== "" ? (
                <p>{title}</p>
              ) : (
                <p>Seja bem vindo</p>
              )}
              {subtitle && location.length > 1 ? (
                <p>{subtitle}</p>
              ) : !subtitle && location.length > 1 ? (
                ""
              ) : (
                <p>Encontre um curso para aprender</p>
              )}
            </Box>
            {!token && (
              <Box sx={styles.deskcadastro}>
                <Link to="/registrar">
                  {" "}
                  <PersonIcon htmlColor="#33EDAC" />
                  <p>Cadastre-se</p>{" "}
                </Link>
              </Box>
            )}

            {token && (
              <Box sx={styles.headerPerfil}>
                <Link to="/perfil">
                  <div className="profile-photo">
                    <img
                      src={profileImage}
                      alt="Foto de perfil"
                    />
                    <div className="online-status"></div>
                  </div>
                </Link>
              </Box>
            )}

            {token && (
              <Box sx={styles.drawer}>
                <Button onClick={handleDrawer}>
                  <MenuIcon htmlColor="#33EDAC" />
                </Button>

                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={handleDrawer}
                  ModalProps={{
                    BackdropProps: { sx: { backgroundColor: "unset" } },
                  }}
                  sx={styles.drawer.userMenu}
                >
                  <Box sx={styles.drawer.userMenu.user}>
                    <img src={EuCapacitoLogo} alt="Logo Eu Capacito" />
                    <div className="profile-photo">
                      <img
                        src={profileImage}
                        alt="Foto de perfil"
                      />
                      <div className="online-status"></div>
                    </div>
                    <h2>{sessionStorage.getItem("username")}</h2>
                    <p>Estudante</p>
                  </Box>

                  <Box sx={styles.drawer.userMenu.menu}>
                    <Link to="/perfil">Perfil</Link>
                    <Link to="/cursos">Meus Cursos</Link>
                    <Link to="/perfil">Login e Senha</Link>
                  </Box>

                  <Box sx={styles.drawer.userMenu.logout}>
                    <Link to="#" onClick={handleLogout}>
                      Sair
                    </Link>
                    <Link to="#" onClick={handleDrawer}>
                      X
                    </Link>
                  </Box>
                </Drawer>
              </Box>
            )}
          </Box>
        </Container>
      </AppBar>

      <MenuDesk sx={styles.menuDesktop} />
    </>
  );
};

export default Header;

const styles = {
  appbar: {
    //css desktop
    borderRadius: "0 0 25px 25px",
    //css desktop
    minHeight: {
      md: "156px",
      xs: "auto",
    },
    //css desktop
    boxShadow: "0px 0px 50px 5px #33EDAC",

    homepage: {
      "@media (min-width: 900px)": {
        boxShadow: "none !important",
        borderRadius: "0",
      },
    },
  },
  toolbar: {
    justifyContent: "center",
    mobileLogo: {
      display: { xs: "flex", md: "none" },
      mt: "0.5rem",
    },
  },
  subheader: {
    mx: "1rem",
    display: { xs: "block", md: "none" },
    "& p": {
      m: "1rem 0 0.4rem",
      color: "#CAC8C8",
      fontSize: "1rem",
      fontWeight: 700,
    },
    "& p+p": {
      m: "0 0 1rem",
      color: "#77837F",
      fontSize: "0.75rem",
      fontWeight: 500,
    },
  },
  subheaderdesk: {
    mx: "1rem",
    display: { xs: "none", md: "block" },
    "& p": {
      m: "1rem 0 0.4rem",
      color: "#CAC8C8",
      fontSize: "16px",
      fontWeight: 700,
    },
    "& p+p": {
      m: {
        xs: "0 0 1rem",
        md: "0 0 0 0",
      },
      color: "#77837F",
      fontSize: "12px",
      fontWeight: 500,
    },
  },
  socialdesk: {
    display: { xs: "none", md: "block" },
    position: "absolute",
    top: "10px",
    right: "40px",
    "& a": {
      mx: 1,
      mt: "12px",
      color: "#77837F",
      fontSize: "32px",
    }
  },
  deskcadastro: {
    display: { xs: "none", md: "block" },
    textAlign: "center",
    "& p": {
      margin: "0",
      fontWeight: "500",
      color: "#77837F",
      fontSize: "12px",
    },
  },
  headerPerfil: {
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    alignItems: "center",
    a: {
      textAlign: "center",
      "& div": {
        position: "relative",
        img: {
          borderRadius: "2.5rem",
          maxWidth: "45px",
        },
        "& .online-status": {
          position: "absolute",
          right: "-5px",
          top: "17px",
          border: "2px solid #FFFFFF",
          borderRadius: "5px",
          backgroundColor: "#47D187",
          width: "10px",
          height: "10px",
        },
      },
    },
    "& h2": {
      margin: "0",
      fontWeight: "500",
      color: "#77837F",
      fontSize: "12px",
    },
  },
  searchBar: {
    mb: "1.25rem",
    //css desktop
    width: {
      md: "78%",
      xs: "100%",
    },
    //css desktop
    marginBottom: {
      md: "0px",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: {
      md: "flex-end",
    },
    input: {
      width: {
        xs: "85%",
        md: "50%",
      },
      padding: {
        md: "7px 0",
      },
      borderRadius: "0.5rem",
      backgroundColor: "#FFFFFF",
      color: "#77837F",
      fontSize: "0.9rem",
      "&::placeholder": {
        color: "#77837F",
        fontSize: "0.9rem",
      },
    },
  },
  drawer: {
    "& .MuiButton-root": {
      p: "0.375rem 0.75rem 0.375rem 1.5rem",
      minWidth: "unset",
    },
    userMenu: {
      "& .MuiDrawer-paper": {
        padding: "1.5rem",
        minWidth: "282px",
        height: "auto",
        backgroundImage: "unset",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      },
      a: {
        fontSize: "1.125rem",
        fontWeight: 400,
      },
      user: {
        mb: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        img: {
          mb: "2rem",
          maxWidth: "130px",
        },
        "& .profile-photo": {
          position: "relative",
          img: {
            borderRadius: "2.5rem",
            maxWidth: "70px",
          },
          "& .online-status": {
            position: "absolute",
            right: "-6px",
            top: "29px",
            border: "2px solid #FFFFFF",
            borderRadius: "6px",
            backgroundColor: "#47D187",
            width: "12px",
            height: "12px",
          },
        },
        h2: {
          m: "0 0 0.475rem",
          color: "#CAC8C8",
          fontSize: "1rem",
          fontWeight: 500,
        },
        "& p": {
          m: 0,
          color: "#77837F",
          fontSize: "0.85rem",
        },
      },
      menu: {
        mb: "2rem",
        display: "flex",
        flexDirection: "column",
        a: {
          mb: "1.5rem",
          color: "#CAC8C8",
        },
      },
      logout: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        a: {
          mb: "1rem",
          color: "#CAC8C8",
        },
        "a+a": {
          mb: 0,
          alignSelf: "start",
          textShadow: "0 0 10px #33EDAC",
          color: "#33EDAC",
          fontWeight: "700 !important",
        },
      },
    },
  },
  menuDesktop: {
    display: { xs: "none" },
  },
};
