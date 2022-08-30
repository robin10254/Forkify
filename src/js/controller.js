const { async } = require("regenerator-runtime");
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
//( for ts6133 problem )

if( module.hot ){
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if( !id ) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render( model.state.recipe );
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if( !query ) return;

    // 2) Load Search Results
    await model.loadSearchResults( query );
    
    // 3) Render Results
    resultsView.render( model.state.search.results );
  } catch( err ){
    console.log( err );
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();