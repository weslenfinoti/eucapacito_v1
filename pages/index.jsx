import { useEffect, useState, useContext } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Footer from "../src/layouts/Footer";
import apiService from "../src/services/apiService";
import { ExpandMore } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Banners from "../src/components/Home/Banners";
import Menu from "../src/components/Home/Menu";
import ContentCard from "../src/components/ContentCard";
import BlogPost from "../src/components/Content/BlogPost";
import {swiper} from "../src/commonStyles/swiper";
import TitlesLink from "../src/components/Home/TitlesLink";
import { AppContext } from "../src/services/context";
import SEO from '../src/seo'


const Index = ({ metadata }) => {
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx.setTitle({
      main: "Olá Seja Bem Vindo",
      sub: "Encontre um curso para aprender",
    })

    const {api}     = apiService;
    const postsPerPage = "9";
    
    // Cursos EC
    api.get(`/wp/v2/curso_ec?per_page=${postsPerPage}`).then((res) => {
      const fetchedCourses = [];

      res.data.forEach((course) => {
        const newCourse = {
          id: course.id,
          slug: course.slug,
          featuredImg: course["featured_image_src"],
          title: course.title.rendered,
          subtitle: "Eu Capacito",
          partnerLogoURL: course.responsavel.guid,
        };

        fetchedCourses.push(newCourse);
      });

      setCourses([...courses, ...fetchedCourses]);
    });

    // Conteúdo
    api.get(`/wp/v2/posts?per_page=${postsPerPage}`).then((res) => {
      const fetchedBlogs = [];

      res.data.forEach((blog) => {
        const newBlog = {
          id: blog.id,
          slug: blog.slug,
          featuredImg: blog.featured_image_src,
          title: blog.title.rendered,
          excerpt: blog.excerpt.rendered,
          date: new Date(blog.date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          categories: blog.categories_object
            .map((category) => category.name)
            .join(", "),
        };

        fetchedBlogs.push(newBlog);
      });

      setBlogs([...blogs, ...fetchedBlogs]);
    });

    // Bolsa de estudos
    api.get(`/wp/v2/bolsa_de_estudo?per_page=${postsPerPage}`).then((res) => {
      const fetchedScholarship = [];

      res.data.forEach((scholarship) => {
        const newScholarship = {
          id: scholarship.id,
          slug: scholarship.slug,
          featuredImg: scholarship.imagem.guid,
          title: scholarship.title.rendered,
          subtitle: "Eu Capacito",
          logo: scholarship.responsavel,
          type: scholarship.type,
        };

        fetchedScholarship.push(newScholarship);
      });

      setScholarships([...scholarships, ...fetchedScholarship]);
    });
  }, []);

  return (
    <Box sx={styles.root}>

      <SEO metadata={metadata} />

      <Menu sx={styles.menu} />
      <Banners />
      <Box sx={styles.courses}>
        {/* <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            borderTop: "1px solid #77837F",
          }}
        >
          <h2>Lançamento da semana</h2>

          <Swiper className="mySwiperEC" slidesPerView={1.2} spaceBetween={25}>
            {courses.length > 0 &&
              courses.slice(0, 4).map((course) => (
                <SwiperSlide
                  className="card-EC-desk"
                  key={course.id + Math.random()}
                >
                  <ContentCard
                    url={`/curso-ec/${course.slug}`}
                    imagePath={course.featuredImg}
                    title={course.title}
                    subtitle="Cadastre-se"
                    logoPath={course.partnerLogoURL}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box> */}

        <Accordion
          defaultExpanded={true}
          sx={{
            borderTop: "1px solid #77837F",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="meus-cursos-content"
            id="meus-cursos-header"
          >
            <TitlesLink to="/cursos" title="Cursos" />
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
              {courses.length > 0 &&
                courses.map((course) => (
                  <SwiperSlide
                    className="card-mobile"
                    key={course.id + Math.random()}
                  >
                    <ContentCard
                      url={`/curso-ec/${course.slug}`}
                      imagePath={course.featuredImg}
                      title={course.title}
                      subtitle="Cadastre-se"
                      logoPath={course.partnerLogoURL}
                    />
                  </SwiperSlide>
                ))}

              {courses.length > 0 &&
                courses.map((course) => (
                  <SwiperSlide
                    className="card-desk"
                    key={course.id + Math.random()}
                  >
                    <ContentCard
                      url={`/curso-ec/${course.slug}`}
                      imagePath={course.featuredImg}
                      title={course.title}
                      subtitle="Cadastre-se"
                      logoPath={course.partnerLogoURL}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="cursos-ec-content"
            id="cursos-ec-header"
          >
            <TitlesLink to="/conteudo" title="Conteúdo" />
          </AccordionSummary>
          <AccordionDetails sx={styles.accordion.details}>
            <Swiper
              sx={swiper.pagination}
              className="mySwiper"
              slidesPerView={1.2}
              spaceBetween={25}
              breakpoints={swiper.breakpoints}
              autoplay={swiper.autoplay}
              modules={[Pagination, Autoplay]}
              pagination={{clickable:true}}
            >
              {blogs.length > 0 &&
                blogs.map((blog) => (
                  <SwiperSlide key={blog.id}>
                    <BlogPost
                      blog={blog}
                      sxContent={styles.courses.blogSxContent}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="cursos-parceiros-content"
            id="cursos-parceiros-header"
          >
            <TitlesLink to="/oportunidades" title="Oportunidades" />
          </AccordionSummary>
          <AccordionDetails sx={{ ...styles.accordion.details, pb: "3rem" }}>
            <Swiper
              className="mySwiper SwiperOportunidade"
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
                      imagePath={scholarship.featuredImg}
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
      <Footer />
    </Box>
  );
}

export async function getStaticProps() {
  const {api}     = apiService;
  const res       = await api.get("/wp/v2/pages/" + process.env.PAGE_INDEX)
  const metadata  = {
        title: res.data.yoast_head_json.og_title,
        description: res.data.yoast_head_json.description,
        og_title: res.data.yoast_head_json.og_title,
        og_description: res.data.yoast_head_json.og_description,
        article_modified_time: res.data.yoast_head_json.article_modified_time ?? null
      }
  return { props: { metadata }}
}

export default Index;

const styles = {
  root: {
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
    }
  },
  menu: {
    m: "0 0 2rem",
    display: {
      md: "none",
    },
  },
  accordion: {
    details: {
      xs: { px: 0 },
      md: { px: "50px" },
    },
  },
  courses: {
    "& small": {
      fontSize: "16px",
    },
    mb: "2rem",
    //css desktop
    "& h2": {
      color: "#CAC8C8",
      fontWeight: "700",
    },
    "& .MuiGrid-root p": {
      fontSize: {
        md: "18px",
        fontWeight: "500",
      },
    },
    "& .mySwiper": {
      padding: {
        md:"0 10px",
      },
    },
    "& .mySwiperEC": {
      "& .swiper-wrapper": {
        width: "100%",
        ml: "0",
      },
    },
    "& .card-EC-desk": {
      display: {
        md: "block",
        xs: "none",
      },
      width: {
        xs: "100%",
        md: "23% !important",
      },
      "& .MuiGrid-root": {
        img: {
          maxWidth: "55px",
        },
      },
      "& .desk-info": {
        maxWidth: "70% !important",
      },
      mb: "30px",
    },
    "& .blogpost": {
      display: {
        md: "block",
        xs: "none",
      },
      mr: "50px !important",
    },
    "& .card-mobile": {
      display: {
        md: "none",
        xs: "block",
      },
      "& .MuiGrid-root p": {
        fontSize: "12.5px",
      },
      "& .MuiGrid-root small": {
        fontSize: "10px",
        fontWeight: "500",
      },
    },
    "& .card-desk": {
      display: {
        md: "block",
        xs: "none",
      },
      // mr: "50px !important",
      "& img:last-type-of": {
        mt: "50px",
      },
      "& span": {
        textAlign: "right",
        mb: "10px",
      },
      "& :first": {
        ml: "10px"
      },
      margin: "30px 0",
      "& .MuiGrid-container": {
        border: "1px solid #77837f",
        boxSizing: "border-box",
        mt: "14px",
        borderRadius: "8px",
        padding: "33px",
        minHeight: "150px",
        // justifyContent: "end",
      },
      "& .desk-info + div": {
        alignSelf: "flex-end",
      },
      "&:hover:nth-of-type(n):nth-of-type(3n+1)": {
        "& img": {
          boxShadow: "0px 0px 10px 2px #7B61FF",
        },
        "& .MuiGrid-container": {
          boxShadow: "0px 0px 10px 2px #7B61FF",
          "& img": {
            boxShadow: "none",
          },
        },
      },
      "&:hover:nth-of-type(n+1):nth-of-type(3n-1)": {
        "& img": {
          boxShadow: "0px 0px 10px 2px #FAE42E",
        },
        "& .MuiGrid-container": {
          boxShadow: "0px 0px 10px 2px #FAE42E",
          "& img": {
            boxShadow: "none",
          },
        },
      },
      "&:hover:nth-of-type(n+2):nth-of-type(3n)": {
        "& img": {
          boxShadow: "0px 0px 10px 2px #FF6955",
        },
        "& .MuiGrid-container": {
          boxShadow: "0px 0px 10px 2px #FF6955",
          "& img": {
            boxShadow: "none",
          },
        },
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
    "& .SwiperOportunidade": {
      "& .desk-info": {
        maxWidth: "85%",
      },
    },
    blogSxContent: {
      h2: {
        margin: "0 0 0.25rem",
        fontSize: { md: "18px", xs: "10px" },
        textTransform: "none",
        fontWeight: "500 !important",
        lineHeight: "20px",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-word",
        maxHeight: "42px",
      },
      a: {
        fontSize: {
          xs: "6px",
          md: "10px!important",
        },
        fontWeight: "400",
      },
      "& .MuiSvgIcon-root": {
        width: "14px",
        height: "14px",
      },
    },
  },
};
