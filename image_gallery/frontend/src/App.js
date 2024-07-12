import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Welcome from "./components/Welcome";
import { useState } from "react";
import ImageCard from "./components/ImageCard";
import { Container, Col, Row } from "react-bootstrap";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);
  console.log(images);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log(word);
    fetch(`${API_URL}/photos/random?query=${word}&client_id=${UNSPLASH_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages([{ ...data, title: word }, ...images]);
        console.log(images);
      })
      .catch((err) => {
        console.log(err);
      });
    setWord("");
  };
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="App">
      <Header title="Image Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSubmitSearch} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col className="pb-3" key={i}>
                <ImageCard
                  deleteImage={handleDeleteImage}
                  key={i}
                  image={image}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
