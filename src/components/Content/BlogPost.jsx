import { Box } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import parse from "html-react-parser";
import Link from "../Link";

const BlogPost = ({ blog, sxContent, sxFull }) => {
  return (
      <Box sx={{...styles.post, ...sxFull}}>
        <Link to={`/blog/${blog.slug}/${blog.id}`}>
          <Box sx={styles.post.image}>
            <img src={blog.featuredImg} alt="Placeholder Imagem" />
          </Box>
          <Box sx={{ ...styles.post.content, ...sxContent }}>
            <small>{parse(`${blog.categories}`)}</small>
            <hr />

            <h2>{parse(`${blog.title}`)}</h2>
            <div>{parse(`${blog.excerpt}`)}</div>
            <p>{blog.date}</p>

            <Box sx={styles.post.content.footer}>
                <CancelOutlined sx={styles.post.content.footer.icon} /> Leia mais
              {/* <p>Logo</p> */}
            </Box>
          </Box>
        </Link>
      </Box>
  );
};

export default BlogPost;

const styles = {
  post: {
    marginTop: "1rem",
    border: "1px solid #77837F",
    borderRadius: "8px",
    image: {
      width: "100%",
      borderRadius: "8px",
      minHeight: "190px",
      img: {
        width: "100%",
        height: "240px",
        borderTopLeftRadius: "7px",
        borderTopRightRadius: "7px",
      },
    },
    content: {
      p: 2,
      small: {
        display: "flex",
        justifyContent: "flex-end",
        color: "#77837F",
        fontSize: {
          md: "6px",
          xs: "6px !important",
        },
        fontWeight: {
          xs: "400",
          md: "400",
        },
        textAlign: "right",
        textTransform: "uppercase",
      },
      h2: {
        fontSize: "0.8rem",
        fontWeight: 500,
        lineHeight: "1.5rem",
        textTransform: "uppercase",
        height: "40px",
      },
      "& div": {
        margin: "0 0 0.75rem",
        color: "#77837F",
        fontSize: "10px",
        fontWeight: 400,
        lineHeight: "20px",
        textAlign: "justify",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-word",
        minHeight: "38px",
      },
      "& div>p": {
        height: "80px",
      },
      "& div+p": {
        margin: "0 0 0.75rem",
        color: "#77837F",
        fontSize: "7px",
        fontWeight: 400,
        lineHeight: "1.5rem",
      },
      footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        a: {
          fontSize: "0.8rem",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
        },
        "& p": { margin: 0 },
        icon: {
          mr: "0.3rem",
          fontSize: "1.2rem",
          transform: "rotate(45deg)",
        },
      },
    },
  },
};
