import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
function CardItem(props) {
  return (
    <React.Fragment>
      <li className="cards__item">
        <div className="cards__item__link">
          {/* <div className="cards__item__pic-wrap">
          </div> */}
          <img
            src={props.src}
            alt="Service Image"
            className="cards__item__thumbnail"
          />
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.title}</h5>
            <p className="description">{props.description}</p>
          </div  >
          <Button className="btn-details" style={{margin: '0px 100px 20px', background: "#2E8A99"}}>
            <Link className="btn-link" to={props.path}>Chi tiết</Link>
          </Button>

        </div>
      </li>
    </React.Fragment>
  );
}

export default CardItem;
