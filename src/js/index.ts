import axios from 'axios';
let subredditName = "";
let updoots = "";
let imageURL = "";
let postType = "";
// Make a request for a user with a given ID
axios
  .get("https://www.reddit.com/r/popular/top.json?count=10")
  .then(function (response) {
    // handle success
    subredditName = response.data.data.children[0].data.subreddit_name_prefixed;
    updoots = response.data.data.children[0].data.ups;
    imageURL = response.data.data.children[0].data.url_overridden_by_dest;
    postType = response.data.data.children[15].data.post_hint;
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
