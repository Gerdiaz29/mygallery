import React, { Component } from "react";
import Image from "./components/ImageComponent";
import InputsSearch from "./components/InputsSearch";
import "./App.css";

class App extends Component {
  state = {
    SelectedImage: {},
    images: [],
    isLoaded: false,
    error: null,
    text: "",
  };

  componentDidMount() {
    this.flickrApiCall("getRecent");
  }

  flickrApiCall = (method, text) => {
    var url = "https://www.flickr.com/services/rest/?method=flickr.photos.";
    url += method;
    url += `&api_key=${process.env.REACT_APP_API_KEY}`;
    url += "&format=json&nojsoncallback=1&per_page=25&safe_search=3";
    if (text !== undefined && text !== "") {
      url += `&text=${text}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.stat !== "ok") {
          throw new Error(result.message);
        }
        let imagesArray = result.photos.photo.map((image) => {
          var sourceImage = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
          return { ...image, src: sourceImage };
        });
        this.setState({
          isLoaded: true,
          images: imagesArray,
        });
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

  handleChange = (e) => {
    const text = e.target.value;
    this.setState({ text });
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.search(this.state.text);
    }
  };

  select = (image, event) => {
    this.setState({ SelectedImage: image });
  };

  render() {
    const { images, error, isLoaded, text } = this.state;
    return (
      <div>
        <div className="nav-bar navbar fixed-top row justify-content-center">
          <h1 className="col-12">Search Images</h1>
          <InputsSearch
            search={this.search}
            handleChange={this.handleChange}
            handleEnter={this.handleEnter}
            text={text}
          />
        </div>
        <div className="images">
          {error ? (
            <h1 className="text-center">Ups!! Error getting the images. </h1>
          ) : !isLoaded ? (
            <div className="text-center">Loading...</div>
          ) : (
            images.map((image) => (
              <Image
                image={image}
                key={image.id}
                actionClick={this.select.bind(this, image)}
                StyleSelected={this.state.SelectedImage === image}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
export default App;
