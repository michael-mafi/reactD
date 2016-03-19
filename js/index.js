"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ?
    call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass,
    superClass) : subClass.__proto__ = superClass;
}

/* jshint esversion:6 */

var Recipe = function(_React$Component) {
  _inherits(Recipe, _React$Component);

  function Recipe() {
    _classCallCheck(this, Recipe);

    // default state of Recipe....

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      editing: false
    };
    return _this;
  }

  Recipe.prototype.componentDidMount = function componentDidMount() {
    $(ReactDOM.findDOMNode(this)).draggable({
      snap: true
    });
  };

  Recipe.prototype.renderDisplay = function renderDisplay() {
    return React.createElement(
      "div", {
        className: "recipe"
      },
      React.createElement(
        "p",
        null,
        this.props.children.match(/^.*\b(.*)\b.*$/m)
      ),
      React.createElement(
        "div", {
          className: "edit-remove-span"
        },
        React.createElement(
          "span",
          null,
          React.createElement("button", {
            onClick: this.edit.bind(this),
            className: "btn btn-lg btn-primary glyphicon glyphicon-eye-open"
          }),
          React.createElement("button", {
            onClick: this.remove.bind(this),
            className: "btn btn-lg btn-danger  glyphicon glyphicon-trash"
          })
        )
      )
    );
  };

  Recipe.prototype.save = function save() {
    var val = this.refs.newText.value;
    this.props.onChange(this.refs.newText.value, this.props.index); //maybe...
    this.setState({
      editing: false
    });
  };

  Recipe.prototype.edit = function edit() {
    this.setState({
      editing: true
    });
  };

  Recipe.prototype.remove = function remove() {
    this.props.onRemove(this.props.index);
  };

  Recipe.prototype.renderForm = function renderForm() {
    return React.createElement(
      "div", {
        className: "recipe"
      },
      React.createElement("textarea", {
        ref: "newText",
        defaultValue: this.props.children,
        className: "form-control"
      }),
      React.createElement("button", {
        onClick: this.save.bind(this),
        className: "btn-save btn btn-success btn-md glyphicon glyphicon-ok"
      })
    );
  };

  Recipe.prototype.render = function render() {
    // boolean
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderDisplay();
    }
  };

  return Recipe;
}(React.Component);

var RecipeList = function(_React$Component2) {
  _inherits(RecipeList, _React$Component2);

  function RecipeList() {
    _classCallCheck(this, RecipeList);

    // default state of Recipe....

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.state = {
      recipes: []
    };
    return _this2;
  }

  RecipeList.prototype.update = function update(newText, i) {
    var bagelarr = this.state.recipes;
    bagelarr[i] = newText;
    this.setState({
      recipes: bagelarr
    });
    // Once Recipe is Saved, save updated bagelarray to local....
    var savedRecipeArr = this.state.recipes;
    localStorage.setItem("recipes", JSON.stringify(savedRecipeArr));
  };

  RecipeList.prototype.remove = function remove(i) {
    var bagelarr = this.state.recipes;
    bagelarr.splice(i, 1);
    this.setState({
      recipes: bagelarr
    });
    // If Recipe is removed, update local storage by removing x recipe.
    var removeRecipeArr = this.state.recipes;
    localStorage.setItem("recipes", JSON.stringify(removeRecipeArr));
  };

  RecipeList.prototype.componentDidMount = function componentDidMount() {
    var _this3 = this;

    var retrievedData = localStorage.getItem("recipes");
    // console.log(retrievedData);
    JSON.parse(retrievedData).map(function(r) {
      return _this3.add(r);
    });
  };

  RecipeList.prototype.add = function add(text) {
    var bagelarr = this.state.recipes;
    bagelarr.push(text);
    this.setState({
      recipes: bagelarr
    });
  };

  RecipeList.prototype.eachRecipe = function eachRecipe(recipe, i) {
    return React.createElement(
      Recipe, {
        key: i,
        index: i,
        onChange: this.update.bind(this),
        onRemove: this.remove.bind(this)
      },
      recipe
    );
  };

  RecipeList.prototype.render = function render() {
    return React.createElement(
      "div", {
        className: "recipe_container"
      },
      React.createElement(
        "h1",
        null,
        " React Todo "
      ),
      React.createElement(
        "div", {
          id: "add_new_recipe_container"
        },
        React.createElement(
          "button", {
            id: "add_recipe",
            className: "btn btn-md btn-success",
            onClick: this.add.bind(this, "New Item")
          },
          React.createElement(
            "i", {
              className: "material-icons"
            },
            "add"
          )
        )
      ),
      this.state.recipes.map(this.eachRecipe.bind(this))
    );
  };

  return RecipeList;
}(React.Component);

ReactDOM.render(React.createElement(RecipeList, null), document.getElementById(
  "bagel"));
