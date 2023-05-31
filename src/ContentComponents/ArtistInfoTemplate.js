import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import "../Profile/profile.css";
import MusicCardList from "./MusicCardList";
import requester from "../api/requester";
import { CDN_IMAGE_URL } from "../config";
import { CDN_AUDIO_URL } from "../config";
export class ArtistInfoTemplate extends Component {
  constructor(props) {
    super(props);
    this.lyricsInputRef = React.createRef();
    this.state = {
      error: null,
      lyrics: "",
      oldLyrics: "",
      isEditLyrics: false,
      artist: null,
    };
  }
  componentDidMount() {
    this.getInfoArtist();
  }
  getInfoArtist = () => {
    this.props.toggleLoading(true);
    let slug = this.props.artistSlug;
    console.log(slug);
    requester
      .get(`${slug}`)
      .then((dataRes) => {
        console.log(dataRes);
        if (dataRes.error) {
          this.setState({
            error: dataRes.error,
          });
        } else {
          //Response is object
          this.setState({ artist: dataRes });
          this.props.setPlaylist(dataRes["musics"]);
        }
      })
      .catch((err) => {
        this.setState({ error: err });
      })
      .then(() => {
        this.props.toggleLoading(false);
      });
  };

  downloadSong = async (fileName) => {
    let a = document.createElement("a");
    let audioUrl = `${this.state.artist.cdnAudioUrl}`;
    let blob = await requester.get(audioUrl).then((res) => {
      return res.blob();
    });
    let fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = (ev) => {
      a.href = ev.target.result;
      a.download = fileName + "SE447-Music-App.mp3";
      a.click();
    };
  };
  render() {
    console.log(this.state);
    if (this.state.error) {
      return <h1>{this.state.error.message}</h1>;
    } else if (this.state.artist) {
      let artist = this.state.artist;
      return (
        <div className="music-info-wrap container-fluid">
          <div className="row">
            <div className="col-12 music-top-info d-flex">
              <div className="music-thumbnail-wrap me-4 position-relative">
                <img
                  data-src={`${CDN_IMAGE_URL}${artist.thumbnail}`}
                  className=" info-music-thumbnail rounded img-fluid"
                  src={`${CDN_IMAGE_URL}${artist.thumbnail}`}
                ></img>
                <div className="overlay position-absolute top-0"></div>
              </div>

              <div className="music-info-wrap">
                <div className="info-music-title">
                  <span className="text-muted me-2">Artist name: </span>
                  <NavLink
                    className="text-white fw-bold"
                    to={this.props.artistSlug}
                  >
                    {artist.title}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 lyrics-wrap">
              <div className="lyrics-header justify-content-between d-flex">
                <div className="lyrics-info">
                  <span>List of music of </span>
                  <span>
                    <strong>{artist.title}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {this.state.artist.musics && (
              <ul className="list-group">
                <MusicCardList
                  isHideHeart={true}
                  {...this.props}
                  musicArray={this.state.artist.musics}
                ></MusicCardList>
              </ul>
            )}
            {!this.state.artist.musics && <h4>No music of this artist.</h4>}
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default ArtistInfoTemplate;
