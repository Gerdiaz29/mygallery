import React, { Component } from "react";
import Image from "./components/ImageComponent";
import Inputs from "./components/Inputs";
import "./App.css";

class App extends Component {
  state = {
    SelectedImage: {},
    images: [],
    isLoaded: false,
    error: {},
  };

  componentDidMount() {
    this.flickrApiCall("getRecent");
  }

  flickrApiCall = (method, text) => {
    var url = "https://www.flickr.com/services/rest/?method=flickr.photos.";
    url += method;
    url += `&api_key=${process.env.REACT_APP_API_KEY}`;
    url += "&format=json&nojsoncallback=1";
    if (text !== undefined && text !== "") {
      url += `&text=${text}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        try {
          let imagesArray = result.photos.photo.map((image) => {
            var sourceImage = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
            return { ...image, src: sourceImage };
          });
          this.setState({
            isLoaded: true,
            images: imagesArray,
          });
        } catch (error) {
          console.log("try catch error= " + error);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoaded: true,
          error,
        });
      });
  };

  search = (text) => {
    this.flickrApiCall("search", text);
  };

  select = (image, event) => {
    this.setState({ SelectedImage: image });
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        <div className="nav-bar navbar fixed-top row">
          <h1 className="col-12">Search Images</h1>
          <Inputs search={this.search}></Inputs>
        </div>
        <div className="images">
          {images.map((image) => (
            <Image
              image={image}
              key={image.id}
              actionClick={this.select.bind(this, image)}
              StyleSelected={this.state.SelectedImage === image}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
