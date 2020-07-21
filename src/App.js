import React, { Component } from "react";
import Image from "./components/ImageComponent";
//import Inputs from "./components/Inputs";
import "./App.css";

class App extends Component {
  state = {
    SelectedImage: {},
    images: [],
    isLoaded: false,
    error: {},
    text: "",
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

  search = () => {
    console.log(this.state.text);
    this.flickrApiCall("search", this.state.text);
  };

  select = (image, event) => {
    this.setState({ SelectedImage: image });
  };

  handleChange(e) {
    let text = e.target.value;
    console.log(e.target.value);
    this.setState({ text: text });
  }

  render() {
    const { images, text } = this.state;
    return (
      <div>
        <div className="title">
          <h1>Search Images</h1>
          <input type="text" value={text} onChange={this.handleChange}></input>
          <button onClick={this.search}>Search</button>
          <button onClick={this.blur}>Blur</button>
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
