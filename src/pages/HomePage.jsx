import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { searchImages } from "./../services/unsplashService"; // Import your API service
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async () => {
    setPage(1);
    await fetchImages(query, 1);
  };

  const fetchImages = async (query, page) => {
    try {
      const data = await searchImages(query, page);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages(query, page);
  }, [page]); 

  return (
    <div style={{ textAlign: "center" }}>
      <TextField
        label="Search images and Enter"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        style={{ marginBottom: "20px", display: "inline-block" }}
      />
  
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
        {images.map((image) => (
          <Grid item key={image.id} xs={12} sm={6} md={4}>
            <div
              style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <Link to={`details/${image.id}`}>
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                </Link>
              <div>
                <Typography variant="h6">
                  {image.description || "No description"}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        style={{ marginTop: "30px", display: "inline-block" }}
      />
    </div>
  );
  
};

export default HomeScreen;
