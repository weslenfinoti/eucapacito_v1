import { useEffect, useContext } from "react";
import { Container, Box, Link as MuiLink } from "@mui/material";
import { Email, Facebook, LinkedIn, Instagram } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "../src/components/Link";
import ContactForm from "../src/components/ContactForm";
import mapa from "../public/assets/img/mapa.png";
import { AppContext } from "../src/services/context";
import apiService from "../src/services/apiService";
import SEO from '../src/seo'

const Contato = ({ metadata }) => {
  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx.setTitle({
      main: "Contato",
      sub: "Entre em contato conosco",
    });
  }, []);

  return (
    <Box sx={styles.boxSx}>

      <SEO metadata={metadata} />

      <Container sx={styles.container}>
        <Box sx={styles.header}>
          <h1>Mensagem</h1>
          <h1>
            <Link to="/faq">F.A.Q.</Link>
          </h1>
        </Box>

        <Box sx={styles.contactWrapper}>
          <ContactForm />
        </Box>

        <Box
          sx={styles.address}
        >
          <h2>Localização</h2>
          <p>Avenida Chedid Jafet Nº 222 Bloco B, 1 andar São Paulo - SP</p>
        </Box>

        <Box sx={styles.mapbox}>
          <h2>Mapa</h2>
          <img src={mapa} alt="" />
        </Box>

        <Box
          sx={{
            textAlign: {
              md: "left",
              xs: "center",
            },
            h2: {
              mb: 1,
              display: {
                md: "none",
                xs:                 "block",                
              },
              fontSize:"16px"
            },
          }}
        >
          <h2>Contato</h2>
          <MuiLink href="mailto:eucapacito@institutoitmidia.com.br" sx={styles.mailLink}>
            eucapacito@institutoitmidia.com.br
          </MuiLink>

          <Box
            sx={{
              mt: { md: "0px", xs: "50px" },
              ml: { md: "20px", xs: "0" },
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <MuiLink href="mailto:eucapacito@mbd.org.br">
              <Email sx={styles.email} />
            </MuiLink>
            <MuiLink href="https://linkedin.com">
              <LinkedIn sx={styles.email} />
            </MuiLink>
            <MuiLink href="https://facebook.com">
              <Facebook sx={styles.email} />
            </MuiLink>
          </Box>

          <Box
            sx={{
              mt: { md: "0px", xs: "50px" },
              ml: { md: "70px", xs: "0" },
              display: {
                xs: "none",
                md: "block",
              },
              "& svg": {
                width: "20px",
              },
            }}
          >
            <MuiLink href="https://facebook.com">
              <Facebook sx={styles.email} />
            </MuiLink>

            <MuiLink href="https://instagram.com">
              <Instagram sx={styles.email} />
            </MuiLink>

            <MuiLink href="https://youtube.com">
              <YouTubeIcon sx={styles.email} />
            </MuiLink>

            <MuiLink href="https://linkedin.com">
              <LinkedIn sx={styles.email} />
            </MuiLink>
          </Box>
        </Box>
      </Container>

      <Container
        sx={{
          h1: { fontSize: "22px", color: "#CAC8C8" },
          h2: { fontSize: "18px" },
          h3: { fontSize: "16px" },
          p: {
            fontSize: "14px",
            lineHeight: "26px",
            color: "#CAC8C8",
            textAlign: "justify",
          },
          "a > h1": { color: "#CAC8C8" },
          display: {
            xs: "none",
            md: "block",
          },
          width: "51%",
          position: "absolute",
          top: "0%",
          left: "50%",
        }}
      >
        <Box sx={styles.faqTitle}>
          <h1>F.A.Q.</h1>
        </Box>

        <Box sx={styles.faq}>
          <h2>Dúvidas Frequentes Eu Capacito</h2>

          <h3>Os cursos são gratuitos?</h3>
          <p>
            Sim. Os cursos do Eu Capacito são gratuitos e fornecidos pelos
            apoiadores do projeto.
          </p>

          <h3>Como me cadastro nos cursos?</h3>
          <p>
            Primeiro passo, cadastre-se plataforma Eu Capacito. Depois, basta
            selecionar o curso de seu interesse na parte externa e clicar no
            botão INSCREVA-SE. Você será direcionado para a plataforma do
            parceiro, onde será solicitado um novo cadastro.
          </p>

          <h3>Estou com problemas para me cadastrar, o que eu faço?</h3>

          <p>
            Verifique se o seu nome de usuário contém espaços e se sua senha
            deve conter pelo menos uma letra minúscula, uma letra maiúscula e um
            número.
          </p>

          <h3>Existe limite de vagas por cursos?</h3>
          <p>
            A maioria dos cursos não possuem limite de vagas, mas temos 2 cursos
            na plataforma que são limitados e, por isso, vão exigir um processo
            de seleção.
          </p>

          <h3>Os cursos possuem certificação?</h3>
          <p>
            Alguns cursos possuem certificação após o término que são oferecidos
            pelo provedor do curso. Ele vem com seu nome e nome da Instituição
            que concede. Os certificados têm validade para fins curriculares e
            em provas de títulos, como certificado de
            atualização/aperfeiçoamento. Em breve, desenvolveremos o nosso
            próprio certificado, por isso, caso ainda não tenha feito, faça um
            cadastro no site Eu Capacito.
          </p>

          <h3>Os certificados são reconhecidos pelo MEC?</h3>
          <p>
            Não. O MEC só certifica cursos de graduação e pós graduação,
            enquanto secretarias Estaduais de Educação autorizam cursos técnicos
            profissionalizantes e do ensino médio.
          </p>
        </Box>
      </Container>
    </Box>
  );
};

export async function getStaticProps() {
  const {api}     = apiService;
  const res       = await api.get("/wp/v2/pages/" + process.env.PAGE_CONTATO)
  const metadata  = {
        title: res.data.yoast_head_json.og_title,
        description: res.data.yoast_head_json.description,
        og_title: res.data.yoast_head_json.og_title,
        og_description: res.data.yoast_head_json.og_description,
        article_modified_time: res.data.yoast_head_json.article_modified_time ?? null
      }
  return { props: { metadata }}
}

export default Contato;

const styles = {
    boxSx: {
        position: "relative",
    },
    container: {
        "h1 > a": {
            color: "#CAC8C8",
            display: {
                md: "none",
                xs: "block",
            },
        },
        h1: { color: { xs: "#CAC8C8", md: "#CAC8C8" } },
    },
    header: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        //css desktop
        width: {
            md: "47%",
        },
        "& h1":{
            fontSize:{
                md:"22px",
                xs:"16px"
            }
        },
    },
    contactWrapper: {
        //css desktop
        marginLeft: {
            md: "0",
        },
        //css desktop
        maxWidth: {
            md: "47%",
        },
        //css desktop
        "& .MuiContainer-root": {
            padding: {
                md: "0",
            },
        },
    },
    address: {
        width: {
            md: "43%",
        },
        //css desktop
        mt: {
            md: "50px",
        },
        "& h2": {
            fontSize: { xs: "16px", md: "22px" },
        },
        "& p": {
            fontSize: "13.5px",
            fontWeight: "500!important",
            fontStyle: "italic",
            color: "#77837F",
        },
    },
    mapbox: {
        mt: {
            xs: "0",
            md: "65px",
        },
        "& h2": {
            marginLeft: {md:"120px", xs:"0"},
            fontSize: { xs: "16px", md: "22px" },
        },
    },
    mailLink: {
        textDecoration: "none",
        color: "#77837F",
        position: {
            md: "absolute",
            xs: "relative",
        },
        top: {
            md: "100%",
            xs: "0",
        },
        marginLeft: {
            md: "20px",
            xs: "0",
        },
        fontSize: "14px",
        fontStyle: "italic",
        fontWeight: "500",
    },
  email: {
    mx: 1,
    color: "#77837F",
    fontSize: "1.75rem",
  },
  faqTitle: {
    display: "flex",
    justifyContent: "center",
  },
  faq: {
    lineHeight: "30px",
    mt: { xs: "0", md: "50px" },
    "& p": {
      fontSize: "18px",
      color: "#77837F",
      fontWeight: "500",
    },
    "& h3": {
      fontSize: "18px",
      fontWeight: "500",
      color: "#CAC8C8",
    },
  },
};
