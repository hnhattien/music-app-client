import React, { Component } from "react";
import MusicCardList from "./ContentComponents/MusicCardList";
import requester from "./api/requester";
export class NewestMusicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount = async () => {
    try {
      let dataRes = await requester.getSync("/index");

      if (dataRes.error) {
        this.props.showMessage(true, dataRes.error.message, "danger");
      } else {
        console.log(dataRes);
        this.setState({ data: dataRes["musics"] });
        this.props.setPlaylist([...dataRes["musics"].reverse()]);
      }
    } catch (err) {
      this.props.showMessage(true, String(err), "danger");
    }

    //   setTimeout(()=>{
    //       this.props.showMessage(false);
    //   },4000);
  };
  render() {
    console.log(this.props);
    return (
      <div className="newest-music-page">
        <h1 className="mb-5 mt-4">Newest Songs</h1>

        <ul className={"list-inline"}>
          <MusicCardList
            {...this.props}
            isInlineList={true}
            musicArray={this.state.data}
          ></MusicCardList>
        </ul>
      </div>
    );
  }
}

export default NewestMusicComponent;
