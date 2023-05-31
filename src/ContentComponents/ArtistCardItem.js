import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./artistcard.css";
import { CDN_IMAGE_URL } from "../config";
export class ArtistCardItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="artist-wrap">
        <NavLink
          title={this.props.artist.title}
          to={`/artist/${this.props.artist.slug}`}
        >
          <div className="artist-thumbnail-wrap">
            <img
              className="img rounded-circle artist-thumbnail img-thumbnail"
              src={`${CDN_IMAGE_URL}${this.props.artist.thumbnail}`}
            ></img>
          </div>
          <div className="artist-name-wrap w-100">
            <span className="artist-name">{this.props.artist.title}</span>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default ArtistCardItem;
