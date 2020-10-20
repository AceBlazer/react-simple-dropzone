import React from 'react';
import PropTypes from "prop-types";

import "./dropzone.css";

class Dropzone extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

        this.makeDropRegion();
        this.makeFakeInput();

    }


    makeDropRegion() {
        var dropRegion = document.getElementById("drop-region")
        dropRegion.addEventListener('dragenter', this.preventDefault, false)
        dropRegion.addEventListener('dragleave', this.preventDefault, false)
        dropRegion.addEventListener('dragover', this.preventDefault, false)
        dropRegion.addEventListener('drop', this.preventDefault, false)
        dropRegion.addEventListener('drop', this.handleDrop.bind(this), false);
    }

    makeFakeInput() {
        var dropRegion = document.getElementById("drop-region")
        // open file selector when clicked on the drop region
        var fakeInput = document.createElement("input");
        fakeInput.type = "file";
        fakeInput.accept = this.props.accept;
        fakeInput.multiple = this.props.multiple;
        dropRegion.addEventListener('click', function () {
            fakeInput.click();
        });
        var that = this;
        fakeInput.addEventListener("change", function () {
            var files = fakeInput.files;
            that.handleFiles(files);
        });
    }


    preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }




    validateImage(image) {
        // check the type
        var validTypes = this.props.validTypes;
        if (validTypes.indexOf(image.type) === -1) {
            if (this.props.onError !== undefined) {
                this.props.onError("Invalid File Type");
            }
            return false;
        }

        // check the size
        var maxSizeInBytes = this.props.maxSize;
        if (image.size > maxSizeInBytes) {
            if (this.props.onError !== undefined) {
                this.props.onError("File too large");
            }
            return false;
        }

        return true;

    }


    clearPreview() {
        var imagePreviewRegion = document.getElementById("image-preview");
        imagePreviewRegion.innerHTML = "";
    }


    previewAnduploadImage(image) {

        if (this.props.preview == true) {
            var imagePreviewRegion = document.getElementById("image-preview");

            // container
            var imgView = document.createElement("div");
            imgView.className = "image-view";
            imagePreviewRegion.appendChild(imgView);

            // create preview image
            var img = document.createElement("img");
            img.src = image.cre;
            imgView.appendChild(img);


            // progress overlay
            var overlay = document.createElement("div");
            overlay.className = "overlay";
            imgView.appendChild(overlay);
        }


        var that = this;

        // read the image...
        var reader = new FileReader();
        reader.onload = (e) => {
            if (this.props.preview == true) {
                img.src = e.target.result;
            }
            if (that.props.onSuccessB64 !== undefined) {
                that.props.onSuccessB64(e.target.result)
            }
        }
        reader.readAsDataURL(image);

        if (that.props.onSuccessBlob !== undefined) {
            that.props.onSuccessBlob(image)
        }

    }



    handleFiles(files) {
        if (this.props.clearOnInput == true) {
            this.clearPreview();
        }

        if (this.props.multiple == true) {
            Array.from(files).forEach(f => {
                if (this.validateImage(f)) {
                    this.previewAnduploadImage(f);
                }
            });

        } else {
            if (this.validateImage(files[files.length - 1])) {
                this.previewAnduploadImage(files[files.length - 1]);
            }
        }

    }

    handleDrop(e) {

        var dt = e.dataTransfer,
            files = dt.files;
        if (files.length) {
            this.handleFiles(files);
        } else {
            //drag andd drop fm chrome
            if (this.props.dragFromWeb == true) {
                var html = dt.getData('text/html'),
                    match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
                    url = match && match[1];
                if (url) {
                    fetch(url)
                        .then(res => {
                            return res.blob()
                        })
                        .then(blob => {
                            var blobToFile = (theBlob, fileName) => {
                                theBlob.lastModifiedDate = new Date();
                                theBlob.name = fileName;
                                return theBlob;
                            }
                            this.handleFiles(
                                new Array(
                                    blobToFile(
                                        blob, Math.random().toString(36).substring(7) + "." + blob.type.split("/")[1]
                                    )
                                )
                            )
                        })
                        .catch(err => {
                            if (this.props.onError !== undefined) {
                                this.props.onError(err);
                            }
                        })
                }
            }
        }
    }






    render() {
        return (
            <React.Fragment>
                <div id="drop-region" style={{ width: "100%" }}>
                    <div className="drop-message">
                        {this.props.displayText}
                    </div>
                    <div id="image-preview"></div>
                </div>
            </React.Fragment>
        )
    }
}



Dropzone.propTypes = {
    onSuccessBlob: PropTypes.func,
    onSuccessB64: PropTypes.func,
    onError: PropTypes.func,
    displayText: PropTypes.string,
    accept: PropTypes.string,
    validTypes: PropTypes.array,
    dragFromWeb: PropTypes.bool,
    multiple: PropTypes.bool,
    maxSize: PropTypes.any,
    clearOnInput: PropTypes.bool,
    preview: PropTypes.bool,
};

Dropzone.defaultProps = {
    onSuccessBlob: undefined,
    onSuccessB64: undefined,
    onError: undefined,
    displayText: "Drag & Drop images or click to upload",
    validTypes: ['image/jpeg', 'image/png', 'image/gif'],
    accept: "image/*",
    dragFromWeb: true,
    multiple: false,
    clearOnInput: true,
    preview: true,
    maxSize: 10e6 // 10MB
};




module.exports = Dropzone;