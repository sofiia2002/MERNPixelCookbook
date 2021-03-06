import React, { Component, useState } from "react";
import CookbookPage from "../styles/CookbookPage.module.css";
import Button from "../styles/Button.module.css";
import axios from "axios";

function deleteRecipe(element) {
  axios
    .delete("http://localhost:80/recipes/delete/" + element._id)
    .catch(function (error) {
      console.log(error);
    });
}

function AddIngredient({ element, index }) {
  return (
    <div>
      <div>{index + 1}</div>
      <div>{element}</div>
    </div>
  );
}

function AddTime({ element }) {
  if (element.prep !== "" && element.cook !== "") {
    return (
      <div className={CookbookPage.time}>
        <div>
          Preparation time: <span>{element.prep}</span> min
        </div>
        <div>
          Cooking time: <span>{element.cook}</span> min
        </div>
        <div>
          Total: <span>{parseInt(element.prep) + parseInt(element.cook)}</span>
          min
        </div>
      </div>
    );
  } else if (element.prep === "" && element.cook !== "") {
    return (
      <div className={CookbookPage.time}>
        <div>
          Cooking time: <span>{element.cook}</span> min
        </div>
      </div>
    );
  } else if (element.prep !== "" && element.cook === "") {
    return (
      <div className={CookbookPage.time}>
        <div>
          Preparation time: <span>{element.prep}</span> min
        </div>
      </div>
    );
  } else return "";
}

function AddStep({ element, index }) {
  return (
    <div>
      <div>Step {index + 1}</div>
      <div>{element}</div>
    </div>
  );
}

function AddRecipe({ element }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        open
          ? `${CookbookPage.recipe} ${CookbookPage.open}`
          : CookbookPage.recipe
      }
    >
      <div className={CookbookPage.front} onClick={() => setOpen(true)}>
        <div className="fa fa-angle-down"></div>
      </div>
      <div>
        <div className={CookbookPage.title}>{element.title}</div>
        <div className={CookbookPage.description}>{element.description}</div>
        <AddTime element={element} />
        <div className={CookbookPage.ingredients}>
          <div>Ingredients</div>
          <div>
            {element.ingredients.map((element, index) => (
              <AddIngredient key={index} element={element} index={index} />
            ))}
          </div>
        </div>
        <div className={CookbookPage.directions}>
          <div>Directions</div>
          <div>
            {element.directions.map((element, index) => (
              <AddStep key={index} element={element} index={index} />
            ))}
          </div>
        </div>
        <div className={Button.buttons}>
          <div
            onClick={() => {
              deleteRecipe(element);
            }}
          >
            Delete
          </div>
          <div onClick={() => setOpen(false)}>Close</div>
        </div>
      </div>
    </div>
  );
}

class Cookbook extends Component {
  state = {
    recipes: [],
    openedRecipe: 0,
  };

  componentDidUpdate() {
    axios
      .get("http://localhost:80/recipes/")
      .then((res) => {
        this.setState({ recipes: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        className={
          this.props.show
            ? ` ${CookbookPage.container} ${CookbookPage.toTop} `
            : CookbookPage.container
        }
      >
        <div
          className={
            this.props.show
              ? ` ${CookbookPage.nav} ${CookbookPage.selected}`
              : CookbookPage.nav
          }
          onClick={this.props.action}
        >
          <img
            src={require("../images/cookbook.png")}
            className={CookbookPage.img}
            alt=""
          />
        </div>
        <div className={CookbookPage.bodyContainer}>
          <div className={CookbookPage.header}>Cookbook</div>
          <div className={CookbookPage.pageBlock}>
            <div className={Cookbook.recipes}>
              {this.state.recipes.map((element, index) => (
                <AddRecipe key={index} element={element} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cookbook;
