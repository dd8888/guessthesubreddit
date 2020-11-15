import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

let subredditName: string = "";
let updoots: number
let imageURL: string = "";
let postType: string = "";

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * (100 - 1) + 1);
}
const getValues = async (value: number) => {
  // Make a request for a user with a given ID
  await axios
    .get("https://www.reddit.com/r/popular/top.json?count=" + value)
    .then(function (response) {
      // handle success
      subredditName = response.data.data.children[1].data.subreddit_name_prefixed;
      updoots = response.data.data.children[1].data.ups;
      imageURL = response.data.data.children[1].data.url_overridden_by_dest;
      postType = response.data.data.children[1].data.post_hint;
      console.log(postType);
      //console.log(response.data.data.children[1].data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}


const testValues = async() => {
  await getValues(getRandomNumber())

}

testValues();

export default App;
