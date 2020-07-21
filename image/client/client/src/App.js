import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
class App extends Component {
  state = {
    title: "",
    file: ""
  };

  handleOnChange = e => this.setState({

    [e.target.name]: e.target.value
  });


  handleOnUploadFile = e => this.setState({ file: e.target.files[0] });

  handleOnSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    console.log(this.state.file)
    axios
      .post("http://localhost:5000/api/post", formData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };
  render() {
    return (
      /*
      <div className="container">
        <h1>Upload file in nodejs</h1>
        <form onSubmit={this.handleOnSubmit} className="w-50" encType="multipart/form-data">
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={this.state.title}
              autoComplete="off"
              className="form-control"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={this.handleOnUploadFile}
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Submit
            </button>
        </form>
      </div>*/
      <form onSubmit={this.handleOnSubmit} enctype="multipart/form-data">
        <div class="file-field input-field">
          <div class="btn grey">
            <span>File</span>
            <input name="file" type="file" onChange={this.handleOnUploadFile} />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
      </form>
    );
  }
}

export default App;