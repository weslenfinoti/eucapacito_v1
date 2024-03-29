import { Box, Paper } from "@mui/material";
import MenuLink from "./MenuLink";

import CursosIcon from "../../../public/assets/img/home-desk-curso.png";
import OportunidadeIcon from "../../../public/assets/img/home-desk-oportunidade.png";
import ConteudoIcon from "../../../public/assets/img/home-desk-conteudo.png";
import ParceirosIcon from "../../../public/assets/img/home-desk-parceiros.png";
import ECIcon from "../../../public/assets/img/home-desk-eucp.png";
import InfoIcon from "../../../public/assets/img/home-desk-info.png";

const Menu = () => {
  

  return (
    <Box sx={styles.container}>
      <Paper sx={{ ...styles.menuOption, borderRadius: "0 0 0 21px" }}>
        <MenuLink to="/cursos" imagePath={CursosIcon} title="Cursos" />
      </Paper>

      <Paper sx={styles.menuOption}>
        <MenuLink
          to="/oportunidades"
          imagePath={OportunidadeIcon}
          title="Oportunidades"
        />
      </Paper>

      <Paper sx={styles.menuOption}>
        <MenuLink to="/conteudo" imagePath={ConteudoIcon} title="Conteúdos" />
      </Paper>

      <Paper sx={styles.menuOption}>
        <MenuLink to="/parceiros" imagePath={ParceirosIcon} title="Parceiros" />
      </Paper>

      <Paper sx={styles.menuOption}>
        <MenuLink to="/contato" imagePath={InfoIcon} title="Contato" />
      </Paper>

      <Paper sx={{ ...styles.menuOption, borderRadius: "0 0 21px 0" }}>
        <MenuLink to="/quem-somos" imagePath={ECIcon} title="Quem somos" />
      </Paper>
    </Box>
  );
};

export default Menu;

const styles = {
  container: {
    display: {
      md: "flex",
      xs: "none",
    },
    boxShadow: "0px 8px 13px -4px rgba(51,237,172,0.81)",
    borderRadius: "0 0 21px 21px",
    justifyContent: "space-between",
    alignItems: "center",
    background: "black",
    mt: "-25px",
    mb: "24px",
    height: "58px",
    position: "relative",
    zIndex: "8",
  },
  menuOption: {
    display: {
      md: "flex",
    },
    flexDirection: {
      xs: "column",
      md: "row",
    },
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    width: "16.5%",
    borderRadius: "0",
    background: "#272B2E",
    "& .MuiLink-root p": {
      fontSize: "18px",
    },
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(0,0,0,1) 29%, rgba(0,0,0,1) 38%, rgba(39,43,46,1) 81%);",
    },
    img: {
      display: "none",
    },
  }
}
