import { useEffect, useState, useContext } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { AppContext } from "../src/services/context";
import apiService from "../src/services/apiService";
import parse from "html-react-parser";
import ContentCard from "../src/components/ContentCard";
import CourseImg3 from "../public/assets/img/home-curso3.png";
import {swiper} from "../src/commonStyles/swiper";
import SEO from '../src/seo'


const Oportunidades = ({ metadata }) => {
  const ctx = useContext(AppContext);
  const [employabilities, setEmployabilities] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const { api } = apiService;

  useEffect(() => {
    ctx.setTitle({
      main: "Oportunidade",
      sub: "Participe do processo seletivo",
    });
    
    // Empregabilidade
    api.get(`/wp/v2/empregabilidade?per_page=12`).then((res) => {
      const fetchedEmployabilities = [];

      res.data.forEach((employability) => {
        const newEmployability = {
          id: employability.id,
          slug: employability.slug,
          type: employability.type,
          featuredImg: employability.imagem.guid,
          title: parse(`${employability.title.rendered}`),
          subtitle: "Eu Capacito",
          logo: employability.responsavel,
        };

        fetchedEmployabilities.push(newEmployability);
      });

      setEmployabilities([...employabilities, ...fetchedEmployabilities]);
    });

    // Bolsa de estudos
    api.get(`/wp/v2/bolsa_de_estudo?per_page=12`).then((res) => {
      const fetchedScholarships = [];

      res.data.forEach((scholarship) => {
        const newScholarship = {
          id: scholarship.id,
          slug: scholarship.slug,
          type: scholarship.type,
          featuredImg: scholarship.imagem.guid,
          title: parse(`${scholarship.title.rendered}`),
          subtitle: "Eu Capacito",
          logo: scholarship.responsavel,
        };

        fetchedScholarships.push(newScholarship);
      });

      setScholarships([...scholarships, ...fetchedScholarships]);
    });
    
  }, []);

  return (
    <Box sx={styles.root}>

      <SEO metadata={metadata} />

      <Box sx={styles.description}>
        <p>
          Nossos parceiros tem oportunidades exclusivas para quem é aluno
          EuCapacito. Procure a vaga que mais se encaixa com o seu perfil e
          saiba como participar do processo seletivo.
        </p>
      </Box>

      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="meus-cursos-content"
          id="meus-cursos-header"
        >
          <h2>Empregabilidade</h2>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordion.details}>
          <Swiper
            className="mySwiper"
            slidesPerView={1.2}
            spaceBetween={25}
            breakpoints={swiper.breakpoints}
            autoplay={swiper.autoplay}
            modules={[Pagination, Autoplay]}
            pagination={{clickable:true}}
          >
            {employabilities.length > 0 &&
              employabilities.map((employability) => (
                <SwiperSlide key={employability.id}>
                  <ContentCard
                    url={`/empregabilidade/${employability.slug}`}
                    imagePath={employability.featuredImg || CourseImg3}
                    title={employability.title}
                    subtitle="Cadastre-se"
                    logoPath={employability.logo}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="meus-cursos-content"
          id="meus-cursos-header"
        >
          <h2>Bolsa de estudos</h2>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordion.details}>
          <Swiper
            className="mySwiper"
            slidesPerView={1.2}
            spaceBetween={25}
            breakpoints={swiper.breakpoints}
            autoplay={swiper.autoplay}
            modules={[Pagination, Autoplay]}
            pagination={{clickable:true}}
          >
            {scholarships.length > 0 &&
              scholarships.map((scholarship) => (
                <SwiperSlide key={scholarship.id}>
                  <ContentCard
                    url={`/bolsa-de-estudo/${scholarship.slug}`}
                    imagePath={scholarship.featuredImg || CourseImg3}
                    title={scholarship.title}
                    subtitle="Cadastre-se"
                    logoPath={scholarship.logo}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export async function getStaticProps() {
  const {api}     = apiService;
  const res       = await api.get("/wp/v2/pages/" + process.env.PAGE_OPORTUNIDADES)
  const metadata  = {
        title: res.data.yoast_head_json.og_title,
        description: res.data.yoast_head_json.description,
        og_title: res.data.yoast_head_json.og_title,
        og_description: res.data.yoast_head_json.og_description,
        article_modified_time: res.data.yoast_head_json.article_modified_time ?? null
      }
  return { props: { metadata }}
}

export default Oportunidades;

const styles = {
  accordion: {
    details: {
      xs: { px: 0 },
      md: { px: "50px" },
    },
  },
  root: {
    mb: "4rem",
    //css desktop
    "& .MuiAccordion-root": {
      borderBottom: {
        xs: "1px solid #77837F",
        md: "none",
      },
      "& p": {
        fontSize: "12.5px",
        fontWeight: "500",
      },
      "& small": {
        fontSize: "10px",
      },
    },
    "& small": {
      fontSize: "10px",
      fontWeight: "500",
    },
    "& h2": {
      borderBottom: {
        xs: "none",
        md: "1px solid #77837F",
      },
      pb: {
        xs: "0",
        md: "14px",
      },
      width: {
        md: "100%",
        xs: "auto",
      },
      mb: {
        md: "30px",
        xs: "0",
      },
      fontSize: "20px",
      fontWeight: {
        md: "700",
        xs: "500",
      },
    },
    "& .swiper-button-next:after": {
      display: {
        md: "block",
        xs: "none",
      },
      fontSize: "20px",
      fontWeight: "bold",
      color: "#33EDAC",
    },
    "& .swiper-button-prev:after": {
      display: {
        md: "block",
        xs: "none",
      },
      fontSize: "20px",
      fontWeight: "bold",
      color: "#33EDAC",
    },
    "& .swiper-pagination-bullet": {
      background: "#33EDAC",
    },
    "& .swiper-pagination-bullet-active": {
      background: "#33EDAC",
    },
    "& .swiper-slide": {
      mb: {
        xs: "50px",
        md: "50px",
      },
    },
  },
  description: {
    "& p": {
      color: "#77837F",
      fontSize: {
        md: "18px",
        xs: "10px",
      },
      fontWeight: { md: "400", xs: "400" },
      lineHeight: "20px",
      //css desktop
      margin: {
        md: "21px auto 0 auto",
        xs: "0",
      },
      maxWidth: {
        md: "90%",
        xs: "100%",
      },
    },
  },
  journey: {
    display: {
      md: "none",
      xs: "block",
    },
    "& h2": {
      margin: "1.25rem 0",
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  accordionBolsa: {
    display: {
      md: "block",
      xs: "none",
    },
  },
};
