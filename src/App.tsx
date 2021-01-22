/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import '@sweetalert2/theme-dark';
import Swal from 'sweetalert2/src/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'
import {StyledChip} from './styledComponents/styledChip'
import {StyledButton} from './styledComponents/styledButton'
import {StyledCircularProgress} from './styledComponents/styledCircularProgress'
import {Helmet} from "react-helmet"


const MySwal = withReactContent(Swal)

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
  const [countCorrect, setCountCorrect] = useState(0)

  useEffect(() => {
    axios
      .get("https://www.reddit.com/r/popular/top.json?limit=500")
      .then( (response) => {
        response.data.data.children.forEach((req: any ) => {
          if(req.data.post_hint === "image"){
            setPostOnlyImages((postOnlyImages: any) => [...postOnlyImages, req.data])
          }
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setNewPost(newPost + 1)
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
  function checkAnswer(answer: any){
    if(answer === subredditName){
      MySwal.fire({
        title: <p>Nice one! 🎊</p>,
        icon: 'success',
        confirmButtonText: "Next"
      }).then(()=> {
        setCountCorrect(countCorrect + 1)
        setOptionsNames((empty: any) => [])
        setNewPost(newPost + 1)

      })
    }else{
      MySwal.fire({
        title: <p>Too bad! 🤦‍♂️</p>,
        icon: 'error',
        confirmButtonText: "Try again",
        showCancelButton: true,
        cancelButtonText: "Share on Twitter 🔗"
      }).then((response)=> {
        if(response.isDismissed){
          window.open("https://twitter.com/intent/tweet?url=guessthesubredd.it&text=I%20got%20a%20score%20of%20" + countCorrect + "%20while%20guessing%20subreddits.%20Try%20to%20beat%20me!", "_blank", "location=yes,height=600,width=600,scrollbars=yes,status=yes")
        }
        window.location.reload();
      })

      
    }
  }
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Guess The Subreddit</title>
        <meta name="description" content="Can you guess the subreddit?"/>
        <link rel="canonical" href="http://guessthesubredd.it" />
        <link id="favicon" rel="icon" type="image/x-icon" href="../src/images/favicon-96x96.png"  />
      </Helmet>
     <header className="App-header">
      <StyledChip label={"Your score is: " + countCorrect}variant="outlined" color="primary" icon={<FavoriteBorder />} />
        <h2>guessthesubredd<span style={{color: "#F54503"}}>.it</span></h2>
        {optionsNames.length > 0 ?
        <div>
        {postType !== undefined ? <img className="postImage" src={imageURL} alt="reddit"/> : ""}
        <p>
        <ArrowUpward style={{ color: "#F54503", fontSize: "20" }} /> {updoots} 

        </p>
        <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          {[0, 1].map((value) => (
            <Grid key={value} item>
              <StyledButton className="OptionButton" variant="contained" onClick={() => { checkAnswer(optionsNames[value]) }}>
                {optionsNames[value]}
              </StyledButton>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" spacing={1}>
          {[2, 3].map((value) => (
            <Grid key={value} item>
              <StyledButton className="OptionButton" variant="contained" onClick={() => { checkAnswer(optionsNames[value]) }}>
                {optionsNames[value]}
              </StyledButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
          </div>
          : <div><p>Loading a new post...</p> <StyledCircularProgress /> </div>      }
      </header>
      <div className="footer">
        Created by <a href="https://daviddiazh.dev" rel="noreferrer" target="_blank">David Díaz</a>
      </div>
    </div>
  );
}

export default App;
