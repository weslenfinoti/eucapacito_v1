import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import {Box, Link} from "@mui/material";
import {swiper} from "../../commonStyles/swiper";
import {Link as RouterLink} from "react-router-dom";
import ReactPlayer from "react-player";

const Banners = () => {
    const [banners, setBanners] = useState([]);
    const { api } = apiService;

    useEffect(() => {
        api.get('/eucapacito/v1/banners').then((res) => {
            let fetchedBanners = [];
            res.data.forEach((banner) => {
                const newBanner = {
                    image: banner.image,
                    link: banner.link,
                    deviceClass: banner.device === 'desktop' ? "bannerDesk" : "bannerMobile",
                    type: banner.type
                }
                fetchedBanners.push(newBanner)
            });
            setBanners([...banners, ...fetchedBanners]);
        });
    }, []);

    return (
        <Box sx={styles.banners}>
            <Swiper
                className="mySwiper"
                autoplay={swiper.autoplay}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
            >
                {banners.length > 0 &&
                    banners.map((banner) => (
                        <SwiperSlide className={banner.deviceClass}>
                            <Link component={RouterLink} to={banner.link}>
                                {
                                    banner.type === 'video' ? 
                                    <ReactPlayer url={banner.link} /> :
                                    <img src={banner.image} alt="Banner" />
                                }
                                
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    );
};

export default Banners;

const styles = {
    banners: {
        mb: "2rem",
        "& img": {
            maxWidth: "100%",
        },
        '& .swiper-wrapper': {
            alignItems: "center"
        },
        "& .swiper-slide": {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        "& .bannerDesk": {
            display: {
                md: "flex",
                xs: "none",
            }
        },
        "& .bannerMobile": {
            display: {
                md: "none",
                xs: "flex",
            },
        },
    },
}