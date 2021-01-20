/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import {StyledButton} from './styledComponents/styledButton'
import {StyledCircularProgress} from './styledComponents/styledCircularProgress'


const getRandomNumber = (postNumber: number) =>{
  return Math.floor(Math.random() * (postNumber - 1) + 1)
}
function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [subredditName, setSubredditName] = useState("")
  const [updoots, setUpdoots] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [postType, setPostType] = useState("")
  const [newPost, setNewPost] = useState(0)
  const [postOnlyImages, setPostOnlyImages] = useState<any>([])
  const [optionsNames, setOptionsNames] = useState<any>([])

  useEffect(() => {
    axios
      .get("https://www.reddit.com/r/popular/top.json?limit=500")
      .then( (response) => {
        response.data.data.children.forEach((req: any ) => {
          if(req.data.post_hint === "image"){
            setPostOnlyImages((postOnlyImages: any) => [...postOnlyImages, req.data])
          }
        })
        setNewPost(newPost + 1)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [])

  useEffect(() => {
    const randomNumber = getRandomNumber(postOnlyImages.length)
    const randomPost = postOnlyImages[randomNumber]
    if(randomPost !== undefined){
      setSubredditName(randomPost.subreddit_name_prefixed)
      setUpdoots(randomPost.ups)
      setImageURL(randomPost.url_overridden_by_dest)
      setPostType(randomPost.post_hint)
    }
  }, [newPost])

  useEffect(() => {
    let newOptions: string | string[] = []
    if(subredditName !== undefined && postOnlyImages[0] !== undefined){
      newOptions.push(String(subredditName))
       while(newOptions.length < 4){
        const randomNumber = getRandomNumber(postOnlyImages.length)
        if(!newOptions.includes(String(postOnlyImages[randomNumber].subreddit_name_prefixed))){
          newOptions.push(String(postOnlyImages[randomNumber].subreddit_name_prefixed))
        }
      } 
    }
    shuffle(newOptions).forEach(element => {
      setOptionsNames(((optionsNames: any) => [...optionsNames, element]))
    });
  }, [subredditName])
  return (
    <div className="App">
      <header className="App-header">
        <h2>guessthesubredd<span style={{color: "#F54503"}}>.it</span></h2>
        {optionsNames.length > 0 ?
        <div>
        {postType !== undefined ? <img width="720" height="500"src={imageURL} alt="reddit"/> : ""}
        
        <p>
        <ArrowUpward style={{ color: "#F54503", fontSize: "20" }} /> {updoots} 

        </p>
        <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          {[0, 1].map((value) => (
            <Grid key={value} item>
              <StyledButton className="OptionButton" variant="contained" >
                {optionsNames[value]}
              </StyledButton>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" spacing={4}>
          {[2, 3].map((value) => (
            <Grid key={value} item>
              <StyledButton className="OptionButton" variant="contained" >
                {optionsNames[value]}
              </StyledButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
          </div>
          : <div><p>Loading</p> <StyledCircularProgress /></div>      }

       
      </header>
    </div>
  );
}

export default App;
