import React, { Component } from "react";
import CategoryListItem from "./CategoryListItem";
import requester from "../api/requester";
export class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      setDataStateInterval: null,
    };
  }
  fetchCategory = () => {
    requester
      .get("/category")
      .then((dataRes) => {
        console.log(dataRes);
        this.setState({ data: dataRes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = (ev) => {
    this.setState({
      setDataStateInterval: setInterval(() => {
        this.fetchCategory();
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
        <CategoryListItem
          {...this.props}
          categories={this.state.data}
        ></CategoryListItem>
      </ul>
    );
  }
}

export default CategoryList;
