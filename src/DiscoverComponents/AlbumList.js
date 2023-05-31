import React, { Component } from "react";
import AlbumListItem from "./AlbumListItem";
import requester from "../api/requester";

export class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      setDataStateInterval: null,
    };
  }

  fetchAlbum = () => {
    requester
      .get("/album")
      .then((dataRes) => {
        this.setState({ data: dataRes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = (ev) => {
    this.setState({
      setDataStateInterval: setInterval(() => {
        this.fetchAlbum();
        if (this.state.data.length !== 0) {
          clearInterval(this.state.setDataStateInterval);
        }
      }, 100),
    });
  };
  componentWillUnmount = () => {
    clearInterval(this.state.setDataStateInterval);
  };
  render() {
    return (
      <ul className="list-inline">
        <AlbumListItem {...this.props} albums={this.state.data}></AlbumListItem>
      </ul>
    );
  }
}

export default AlbumList;
