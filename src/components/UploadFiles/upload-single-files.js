import React, { Component } from "react";
import UploadService from "../../services/upload-files.service";
import config from '../../config';

export default class UploadSingleFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      filename: "",
    };
  }

  selectFile(event) {
    const file = event.target.files[0];

    // Check if file size is greater than 10 KB (10 * 1024 bytes)
    if (file && file.size > 500 * 1024) {
      this.setState({
        message: "File size should be 500 KB or less!",
        selectedFiles: undefined,
      });
    } else {
      this.setState({
        selectedFiles: event.target.files,
        message: "", // Reset message if file size is acceptable
      });
    }
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        localStorage.setItem("filename", response.data.filename);
        this.setState({
          message: response.data.message,
          filename: response.data.filename,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
          filename: "",
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  cancelUpload() {
    this.setState({
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "Upload canceled.",
      filename: "",
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      filename,
    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        {filename && 
          <div className="position-relative">
            <img src={`${config.baseUrl}/data/uploads/${filename}`} width={`100px`} alt="Uploaded" />
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              style={{ color: 'black', background: 'none', border: 'none' }}
              onClick={this.cancelUpload}
            >
              ✖
            </button>
          </div>
        }

        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </div>
    );
  }
}
