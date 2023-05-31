import React, { Component } from "react";
import MusicCardList from "./MusicCardList";
import requester from "../api/requester";
export class AlbumTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      fetchDataByCategoryInterval: null,
    };
  }
  fetchMusicsByAlbum = (slug) => {
    console.log(slug);
    requester
      .get(`/song${slug}`)
      .then((dataRes) => {
        console.log(dataRes);
        this.setState({ musics: dataRes });
        if (dataRes.length !== 0) {
          this.props.setPlaylist(dataRes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = (ev) => {
    this.fetchMusicsByAlbum(this.props.albumSlug);
  };
  componentWillUnmount = () => {
    clearInterval(this.state.fetchDataByCategoryInterval);
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1>
              {this.state.musics.length !== 0 &&
                this.state.musics[0]["album_name"]}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <MusicCardList
              {...this.props}
              isInlineList={true}
              musicArray={this.state.musics}
            ></MusicCardList>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumTemplate;
