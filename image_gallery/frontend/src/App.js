import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import Welcome from "./components/Welcome";
import { useState } from "react";
import ImageCard from "./components/ImageCard";
import { Container, Col, Row } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const App = () => {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);
  console.log(images);

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    console.log(word);
    try {
      let res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }

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
