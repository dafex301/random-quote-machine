import React, { Component, useEffect, useState } from 'react'
import './App.css';

function App() {

  const colors = [
    'bg-red-500', 'bg-pink-500', 'bg-green-500', 'bg-blue-500', 'bg-rose-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-purple-500'
  ]

  const textColors = [
    'text-red-500', 'text-pink-500', 'text-green-500', 'text-blue-500', 'text-rose-500', 'text-yellow-500', 'text-indigo-500', 'text-orange-500', 'text-teal-500', 'text-purple-500'
  ]

  const [opacity, setOpacity] = useState('opacity-100')

  // Make index state
  const [index, setIndex] = useState(0)

  // Make quote state
  const [quotes, setQuotes] = useState([])
  const [quote, setQuote] = useState('Kaizoku ou ni ore wa naru.')
  const [author, setAuthor] = useState('Monkey D. Luffy')
  useEffect(() => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then(response => response.json())
    .then(data => setQuotes(data.quotes));
    
    // set quote after get the data

  }, [])

  // Handle click to change color
  const handleClick = () => {
    setIndex(Math.floor(Math.random() * colors.length))
    let quoteIndex = Math.floor(Math.random() * quotes.length)
    // Set the opacity to 0 to make the quote fade out and make delay for 500
    setOpacity('opacity-0')
    setTimeout(() => {
      // Set the opacity to 100 to make the quote fade in
      setOpacity('opacity-100')
      setQuote(quotes[quoteIndex]['quote'])
      setAuthor(quotes[quoteIndex]['author'])
    }, 650)
  }
  
  let tweetUrl = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
  encodeURIComponent('"' + quote + '" ' + author);

  let pathUrl = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
  encodeURIComponent(author) +
  '&content=' +
  encodeURIComponent(quote) +
  '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  return (
    <div className={"flex flex-col justify-center items-center h-screen w-screen transition-all duration-1000 " + colors[index]}>
        <div id="quote-box" className='bg-white w-[600px] rounded-lg shadow-lg p-10'>
          <div id="text" className=''>
            <p className={'transition-all duration-1000 text-3xl text-center '+ textColors[index] + ' ' + opacity}>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={"bi bi-quote h-7 inline mr-1 transition-all duration-1000 " + textColors[index]} viewBox="0 0 16 16">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
              </svg> 
              </span>
              {quote}
            </p>
          </div>
          <div id="author" className="flex justify-end mt-8">
            <p className={textColors[index] + " text-lg transition-all duration-1000 " + opacity}>- {author}</p>
          </div>
          <div className='flex justify-between mt-8'>  
            <div className='flex gap-3 text-white text-2xl'>
              <a href={tweetUrl} target='_blank' id="tweet-quote" rel="noreferrer">
                <i className={`fa fa-twitter py-2 px-3 rounded-md transition-all duration-1000 ${colors[index]} hover:scale-105 hover:animate-pulse`}></i>
              </a>
              <a href={pathUrl} id='tumblr-quote' target='_blank' rel='noreferrer'>
                <i className={`fa fa-tumblr py-2 px-4 rounded-md transition-all duration-1000 ${colors[index]} hover:scale-105 hover:animate-pulse`}></i>
              </a>
            </div>
            <button id="new-quote" 
            className={colors[index] + ' py-2 px-4 shadow-md rounded-lg text-white hover:animate-pulse hover:scale-105 transition-all duration-1000'}
            onClick={handleClick}>
              New quote!
            </button>
          </div>
        </div>
        <a href="https://github.com/dafex301" target="_blank" className='mt-3 opacity-50' rel="noreferrer">by dafex</a>
    </div>
  );
}

export default App;
