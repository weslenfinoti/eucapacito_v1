import { Link, Box } from "@mui/material";

const TitlesLink = ({ to, title }) => {
    return (
        <Box sx={styles.box}>
            <Link to={to} sx={styles.link}>
                {title}
            </Link>
        </Box>
    );
};

export default TitlesLink;

const styles = {
    link: {
        color: "#CAC8C8",
        fontWeight: "700",
        fontSize: "18px",
        textDecoration: "none",
    }
}