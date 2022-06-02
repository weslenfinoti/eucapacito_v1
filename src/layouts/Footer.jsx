import { Paper, Box, Container, Link as MuiLink } from "@mui/material";
import { Instagram, Facebook, LinkedIn } from "@mui/icons-material";
import YouTube from "@mui/icons-material/YouTube";
import EClogo from "../assets/img/ec-footer.png";
import ITlogo from "../assets/img/it-footer.png";
import rodapeLogos from "../assets/img/logo-eucapacito-itmidia.png";

const Footer = () => {
  return (
    <Container
      sx={{
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between",
        alignItems: "flex-end",
        mt: "90px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          "& p": { fontSize: "14px", color: "#77837F", fontWeight: "400" },
          "& p:last-child": { fontSize: "12px" },
        }}
      >
        <p>Copyright © Eu Capacito</p>
        <p>Terms and Services - Privacy Policy</p>
      </Box>

      <Container
        sx={{
          textAlign: "center",
          width: "45%",
          "& p": {
            fontSize: "14px",
          },
        }}
      >
        <Box
          sx={{
            "& > p": {
              fontSize: "18px",
              fontStyle: "italic",
              color: "#77837F",
              fontWeight: "500",
              margin: "0",
            },
          }}
        >
          <p>CONTATO</p>
          <MuiLink
            href="mailto:eucapacito@institutoitmidia.com.br"
            sx={{
              textDecoration: "none",
              fontSize: "14px",
              fontStyle: "italic",
              color: "#77837F",
              fontWeight: "500",
            }}
          >
            eucapacito@institutoitmidia.com.br
          </MuiLink>
        </Box>
        <Box>
          <MuiLink href="https://facebook.com">
            <Facebook sx={styles.email} />
          </MuiLink>

          <MuiLink href="https://instagram.com">
            <Instagram sx={styles.email} />
          </MuiLink>

          <MuiLink href="https://youtube.com">
            <YouTube sx={styles.email} />
          </MuiLink>

          <MuiLink href="https://linkedin.com">
            <LinkedIn sx={styles.email} />
          </MuiLink>
        </Box>
        <Box
          sx={{
            fontSize: "14px",
            fontStyle: "italic",
            color: "#77837F",
            fontWeight: "500",
          }}
        >
          <p>Avenida Chedid Jafet Nº222 Bloco B, 1 andar São Paulo - SP</p>
        </Box>
      </Container>

      <Box sx={{ display: "flex" }}>
        <Paper sx={styles.footerLogo}>
          <img src={rodapeLogos} alt="Logo - Eu Capacito" />
        </Paper>
      </Box>
    </Container>
  );
};

export default Footer;

const styles = {
  email: {
    mx: 1,
    mt: "12px",
    color: "#77837F",
    fontSize: "25px",
  },
  footerLogo: {
    background: "none",
    boxShadow: "none",
  },
};
