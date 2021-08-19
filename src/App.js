import React from 'react';
import axios from 'axios'
import { FaFacebook, FaTwitter, FaSync, FaQuoteLeft } from "react-icons/fa"

const API = "https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json";

class App extends React.Component
{
 
  state = {
    jokes: [
      {
        setup:"What did the fish say when it hit the wall?",
        punchline: "Dam.",
        type: "general"
      }
    ],
    index: 0
  };

  componentDidMount() {
    this.fetchJoke();
  }


   fetchJoke = () => {
    axios.get(API)
      .then((res) => {
          this.setState(
          {
            jokes: res.data
          },
          this.getRandomIndex
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRandomIndex = () => {
    const { jokes } = this.state;
    if (jokes.length > 0) {
      const index = Math.floor(Math.random() * jokes.length);
      this.setState({
        index
      });
    }
  };

  render ()
  {
   
    const { jokes, index } = this.state;
    const joke = jokes[index];
    const tweetURL = `https://twitter.com/intent/tweet?text=${joke.setup} ${joke.punchline} - ${joke.type}`;

    const facebookURL =
      "https://www.facebook.com/sharer/sharer.php?u=https://try-not-to-laugh-challenge.netlify.app/";

    return (
     
      <body className="flex flex-col min-h-screen">
        
      <header className="flex flex-col items-center justify-center p-8">
           <img className="shadow-lg rounded-full inline-block w-40 h-40 m-8" src={`https://picsum.photos/600?grayscale&random=${index}`} alt="logo" />
        <h1 className="font-bold capitalize text-gray-500 dark:text-gray-400 text-center text-lg pt-4">Try Not to Laugh Challenge</h1>
        </header>

         <main class="flex-grow">
        
          
        <div className="container text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center gap-4 p-4 md:p-8" id="quote-box">
          {joke && (
            <div className="text-2xl">
              <p id="text">
                  <FaQuoteLeft />&nbsp; { joke.setup }
                  &nbsp;{joke.punchline}
              </p>
              <cite id="author" className="float-right">
                -{joke.type}
              </cite>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-8">
            <a
              id="tweet-quote"
              className="flex items-center justify-center border-2 rounded-full py-1 px-6"
              target="_blank"
              rel="noreferrer"
              href={tweetURL}
            >
              <FaTwitter/>&nbsp; Tweet
            </a>

            <a
              id="fb-quote"
              className="flex items-center justify-center border-2 rounded-full py-1 px-6"
              target="_blank"
              rel="noreferrer"
              href={facebookURL}
            >
             <FaFacebook/>
                 &nbsp; Share
            </a>

            <button
              className="flex items-center justify-center bg-gray-800 border-2 rounded-full py-1 px-6"
              onClick={this.getRandomIndex}
              id="new-quote"
            >
             <FaSync/>
              &nbsp; Get Joke
            </button>
          </div>
            </div>
           
          </main>
        <footer className="text-gray-500 dark:text-gray-400">
          <div className="text-center text-xs p-2">
            Made with TailwindCSS by <a target="_blank" rel="noreferrer" href="https://hellojuninguyen.netlify.app/">juniNguyen.</a>
            </div>
        </footer>
           </body>
    );
  }
}

export default App;

