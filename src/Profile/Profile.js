import React, { Component } from "react";
import "./profile.css";
import {
  withRouter,
  BrowserRouter as Router,
  NavLink,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import SettingButton from "../LeftSideBarComponents/SettingButton";
import { MusicCardItem } from "../ContentComponents/MusicCardItem";
import MusicCardList from "../ContentComponents/MusicCardList";
import requester from "../api/requester";
import { CDN_IMAGE_URL } from "../config";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedMusics: [],
    };
  }
  componentDidMount = () => {
    requester
      .get("/users/likedmusics")
      .then((musics) => {
        console.log(musics);
        if (Array.isArray(musics)) {
          let musicSet = new Set(musics.map(JSON.stringify));
          let filteredData = Array.from(musicSet).map(JSON.parse); //Filter duplicated
          this.setState(
            {
              likedMusics: filteredData,
            },
            () => {
              this.props.setPlaylist(this.state.likedMusics);
            }
          );
        } else {
          this.props.showMessage(true, musics.error.message, "danger");
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        this.props.showMessage(true, String(err), "danger");
      })
      .then(() => {});
  };

  render() {
    // let content = this.state.likedMusics.length !== 0 ? this.state.likedMusics.map((music, index) => {
    //     return <MusicCardItem {...this.props} key={index} music={music}></MusicCardItem>
    // }) : "No liked music";
    // console.log(content);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 profile-header">
            <div className="identify-wrap mt-4">
              <div className="avatar-wrap">
                <img
                  className="avatar rounded-circle"
                  src={`${CDN_IMAGE_URL}${this.props.user.avatar}`}
                ></img>
              </div>
              <div className="name-wrap mt-2">
                <h4 className="">{this.props.user.nickname}</h4>
              </div>
            </div>
            <div className="profile-info-acc-button-wrap" id="infoacclinkwrap">
              <NavLink to="/profile/setting" exact={true}>
                <span role="button" className="info-acc-link info-acc-button">
                  <i className="fa-cog fa text-white"></i>
                </span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="row liked-music-wraper">
          <h1>Liked</h1>
          <MusicCardList
            {...this.props}
            musicArray={this.state.likedMusics}
          ></MusicCardList>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
