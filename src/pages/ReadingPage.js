import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorieListAsync,
  removeFavoriteBookAsync,
} from "../app/bookStoreSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  // const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removedBookId, setRemovedBookId] = useState("");
  const navigate = useNavigate();
  const bookStore = useSelector((state) => state.bookStore);
  const dispatch = useDispatch();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const removeBook = (bookId) => {
    dispatch(removeFavoriteBookAsync(bookId));
    setRemovedBookId(bookId);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getFavorieListAsync());
    setLoading(false);
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Book Store
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {bookStore.favorites.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.author}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={() => removeBook(book.id)}
                  >
                    &times;
                  </Button>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;
