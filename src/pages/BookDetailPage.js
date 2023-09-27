import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import api from "../app/apiService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addFavoriteBookAsync,
  getBookDetailAsync,
} from "../app/bookStoreSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const [loading, setLoading] = useState(false);
  // const [book, setBook] = useState(null);
  const params = useParams();
  const bookId = params.id;

  const bookStore = useSelector((state) => state.bookStore);
  const { bookDetail } = bookStore;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookDetailAsync(bookId));
  }, []);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {bookDetail && (
              <img
                width="100%"
                src={`${BACKEND_API}/${bookDetail.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {bookDetail && (
              <Stack>
                <h2>{bookDetail.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {bookDetail.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {bookDetail.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {bookDetail.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {bookDetail.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {bookDetail.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => dispatch(addFavoriteBookAsync(bookDetail))}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
