import React, { Component } from "react";
import NewRecipePage from "../styles//NewRecipePage.module.css";

function AddElement({ index, element, removeElement }) {
  return (
    <div>
      <div>{index+1}</div>
      <div>{element}</div>
      <div onClick={() => removeElement(index)} className="far fa-trash"></div>
    </div>
  );
}

class NewRecipe extends Component {
  
  state = {
    title: "",
    description: "",
    ingredient: "",
    ingredients: [],
    direction: "",
    directions: [],
    prep: "",
    cook: ""
  };


  removeDirection = index => {
    const newDirections = this.state.directions;
    newDirections.splice(index, 1);
    this.setState({directions : newDirections})
  };

  removeIngredient = index => {
    const newIngredients = this.state.ingredients;
    newIngredients.splice(index, 1);
    this.setState({ingredients : newIngredients})
  };

  render() {
    return (
      <div
        className={
          this.props.show
            ? ` ${NewRecipePage.container} ${NewRecipePage.toTop} `
            : NewRecipePage.container
        }
      >
        <div
          className={
            this.props.show
              ? ` ${NewRecipePage.nav} ${NewRecipePage.selected}`
              : NewRecipePage.nav
          }
          onClick={this.props.action}
        >
          <img
            src={require("../images/feather.png")}
            className={NewRecipePage.img}
            alt=""
          />
        </div>

        <div className={NewRecipePage.bodyContainer}>
          <div className={NewRecipePage.header}>Recipe</div>
          <div className={NewRecipePage.fields}>
            <div>
              <div>Recipe title</div>
              <input
                value={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
                placeholder="Write a title of recipe"
              />
            </div>

            <div>
              <div>Description</div>
              <textarea
                placeholder="Write a discription of recipe"
                value={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
            </div>

            <div>
              <div>Ingredients</div>
              <div className={NewRecipePage.elements}>
                {this.state.ingredients.map((element, index) => (
                  <AddElement key={index} element={element} index={index} removeElement={this.removeIngredient} />
                ))}
              </div>
              <input
                placeholder="Write an ingredient and press Enter"
                type="text"
                value={this.state.ingredient}
                onChange={(e) => {
                  this.setState({ ingredient: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && this.state.ingredient.replace(/ /g, "")!=="") {
                    this.state.ingredients.push(this.state.ingredient);
                    this.setState({ ingredient: "" });
                  }
                }}
              />
            </div>

            <div>
              <div>Directions</div>
              <div className={NewRecipePage.elements}>
                {this.state.directions.map((element, index) =>(
                  <AddElement key={index} element={element} index={index} removeElement={this.removeDirection}/>
                  )
                )}
              </div>
              <input
                placeholder="Write a direction and press Enter"
                type="text"
                value={this.state.direction}
                onChange={(e) => {
                  this.setState({ direction: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && this.state.direction.replace(/ /g, "")!=="") {
                    this.state.directions.push(this.state.direction);
                    this.setState({ direction: "" });
                  }
                }}
              />
            </div>

            <div className={NewRecipePage.timeFields}>
              <div>
                <div>Prep time</div>
                <div>
                  <input
                    type="text"
                    placeholder="0"
                    value={this.state.prep}
                    onChange={(e) => {
                      const check = /^[0-9\b]+$/;
                      if (e.target.value === "" || check.test(e.target.value)) {
                        this.setState({ prep: e.target.value });
                      }
                    }}
                  />
                  <div>min</div>
                </div>
              </div>

              <div>
                <div>Cook time</div>
                <div>
                  <input
                    type="text"
                    placeholder="0"
                    value={this.state.cook}
                    onChange={(e) => {
                      const check = /^[0-9\b]+$/;
                      if (e.target.value === "" || check.test(e.target.value)) {
                        this.setState({ cook: e.target.value });
                      }
                    }}
                  />
                  <div>min</div>
                </div>
              </div>
            </div>

            <div className={NewRecipePage.buttons}>
              <div
                onClick={() => {
                  this.props.addRecipes(this.state);
                  this.setState({
                    title: "",
                    description: "",
                    ingredient: "",
                    ingredients: [],
                    direction: "",
                    directions: [],
                    prep: "",
                    cook: ""
                  });
                }}
              >
                Add recipe
              </div>

              <div
                onClick={() => {
                  this.setState({
                    title: "",
                    description: "",
                    ingredient: "",
                    ingredients: [],
                    direction: "",
                    directions: [],
                    prep: "",
                    cook: ""
                  });
                }}
              >
                Clear
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewRecipe;
