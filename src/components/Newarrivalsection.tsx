import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
const Newarrivalsection = () => {
  const itemData = [
    {
      img: "/images/knk_001.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_002.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_003.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_004.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_005.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_007.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_008.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_009.jpeg",
      title: "Sample image",
      price: "$21",
    },
    {
      img: "/images/knk_010.jpeg",
      title: "Sample image",
      price: "$21",
    },
  ];
  return (
    <Box
      sx={{
        padding: "1rem",
        paddingBottom: "5rem",
      }}
    >
      {/* <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              textAlign: "center",
              paddingBlock: "2rem",
              color: "#094252",
              fontWeight: 500,
              fontSize: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            New Arrivals
          </Typography>
        </Grid>
      </Grid> */}

      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ border: "1px solid #8080806e" }}>
            <img
              srcSet={`${item.img}?w=148&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=148&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "4px 8px",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "black", fontWeight: "bold" }}
              >
                {item.price}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "4px 8px",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "black", fontWeight: "bold" }}
              >
                {item.title}
              </Typography>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Newarrivalsection;
