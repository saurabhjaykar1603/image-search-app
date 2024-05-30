import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRandomImagebyId } from "../services/unsplashService";
import { Card, CardContent, Typography, Button } from "@mui/material";

const DetailsPage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageData = await getRandomImagebyId(id);
        setImage(imageData);
      } catch (error) {
        console.error("Error fetching image details:", error);
      }
    };

    fetchImage();
  }, [id]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="Text-headline">Image Details</h1>
      <Card sx={{
        width: "500px",
        margin: "auto", 
        marginTop: "20px",
        marginBottom: "20px",
      }}>
        <img src={image.urls.regular} alt={image.description} style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
        }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {image.description || "No description"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Photographer: {image.user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Likes: {image.likes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Views: {image.views}
          </Typography>
        </CardContent>
      </Card>
      <Button component={Link} to="/" variant="contained" style={{ marginTop: "20px" }}>Back to Home</Button>
    </div>
  );
};

export default DetailsPage;
