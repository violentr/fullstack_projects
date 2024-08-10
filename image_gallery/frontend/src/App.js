import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import Welcome from "./components/Welcome";
import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import { Container, Col, Row } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const App = () => {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);
  console.log(images);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() =>  getSavedImages, []);

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
  const handleDeleteImage = async (id) => {
    try{
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id){
        setImages(images.filter((image) => image.id !== id));
      }
    }catch(error){
      console.log(error)
    }
  };

  const handleSaveImage = async (id) => {
    const image = images.find((image) => image.id === id);
    image.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, image);
      if (res.data?.inserted_id){
        setImages(images.map((image) => image.id === id ? {...image, saved: true} : image)
      )}
    } catch (error) {
      console.log(error)
    }
   
  }

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
                  saveImage={handleSaveImage}
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
