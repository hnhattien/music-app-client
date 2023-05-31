import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { CDN_IMAGE_URL } from "../config";

export class CategoryListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.categories?.map((cat) => {
          return (
            <li className="list-inline-item m-2 category-card-wrap">
              <NavLink to={`/category/${cat.slug}`}>
                <div className="category-card">
                  <div className="thumbnail-wrap">
                    <img
                      className="rounded category-thumbnail"
                      src={`${CDN_IMAGE_URL}${cat.thumbnail}`}
                    ></img>
                  </div>
                  <div className="category-title-wrap">
                    <h4>{cat.title}</h4>
                  </div>
                </div>
              </NavLink>
            </li>
          );
        })}
      </>
    );
  }
}

export default CategoryListItem;
