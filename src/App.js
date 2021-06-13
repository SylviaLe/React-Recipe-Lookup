import './App.css';
import Recipe from './components/Recipe'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import React, {useEffect, useState} from 'react'

function App() {
  const APP_ID = process.env.REACT_APP_RECIPE_APP_ID
  const API_KEY = process.env.REACT_APP_RECIPE_API_KEY

  const [recipes, setRecipes] = useState([])
  const [input, setInput] = useState('')
  //this is for whenever the button is clicked, the query will be retrieved, the that is send to the api call 
  const [query, setQuery] = useState('')

  //When the app is rendered the first time (like after refreshing the page), this is run.
  //Every time something is rerendered on the page (like clicking something and the text value on that change), this is also run
  //Make this only run once: after {}, add ,[]
  //to add things that trigger this useEffect, add the state here (the static, not the set function)
  //here, if you pass search as the trigger event, every time you type a new letter, it will make a call
  useEffect(() => {
    getRecipes()
  }, [query])  //here, when you click the sumbit button, it will call the setQuery, which will change the value of query. only then will useEffect be called

  const getRecipes = async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)
  }


  const updateInput = (e) => {
    setInput(e.target.value)
  }


  //run every time the form is submit. this is going to retrieve the input only after the button is clicked, instead of everytime the text inside the input box change
  const getSearch = (e) => {
    e.preventDefault()
    setQuery(input) //the search value is update onChange in the input, using the updateSearch method. the final value will be passed to setQuery
    setInput('')
  }

  return (
    <div className="App">
      <div className="container w-100" id='frontpage'>
        <h1 className="display-5 text-center my-4 text-light">Recipe Lookup</h1>
        <form action="" className='search-form text-center' onSubmit={getSearch}>
          <input type="text" className='input search-bar' value={input} onChange={updateInput}/>
          <button type='submit' className='btn btn-light search-button d-block mx-auto mt-4'>Search</button>
        </form>
        <div className="row">
          {recipes.map(recipe => (
              <Recipe 
                key={recipe.recipe.label} 
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients = {recipe.recipe.ingredients}
                time = {recipe.recipe.totalTime}
                link = {recipe.recipe.url}
                source = {recipe.recipe.source}
              />
            ))}
        </div>
        </div>
        <div id="backgroundCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-interval="800">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src="https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src="https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="d-block w-100" alt="..."/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
