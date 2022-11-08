import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Client from "./utils/Client.js";
import View from "./View";

export default function App() {
  const client = new Client();
  const [search, setSearch] = useState('');
  const [movieList, setMovieList] = useState([]);


  useEffect( ()=>
  {
    const ls = localStorage.getItem('list');
    if(!ls)
      return
    const lsJson = JSON.parse(ls);
    if(lsJson && lsJson.length)
    getMovie((JSON.parse(ls)));
  }
,[])


  function updateMovieList(data){
    setMovieList(prev=>[data, ...prev]);
  }

  function getMovie(search){
    if(!(search instanceof Array && search[0]))
    try {
      console.log('clicked Enter')
        client.getMovieData(search.toLowerCase()).then((data) => {
            if (data && !(data.Response === "False")) {
                if (
                  movieList.findIndex(movie=> movie.Title==data.Title)<0
                ) {
                    updateMovieList(data);
                } else alert("You have already added this movie.");
            } else
                alert(
                    `${JSON.stringify(data.Error)}\nSorry, ${search} movie was not found!`
                );
            setSearch("");
        });
    } catch (error) {
        alert(`Error adding movie: ${error}`);
    }
    else if(search instanceof Array && search[0])
    {const movies=[];
    for(const item of search)
    try {
      console.log('clicked Enter')
        const promise = client.getMovieData(item.toLowerCase());
                    movies.push(promise);
                if(search.length-1 === search.lastIndexOf(item))
                {
                  Promise.all(movies).then(values=>{ console.log(values); 
                    values = values.filter(value=>value.Title);
                    setMovieList(values)});
                  console.log(search.length-1);
                }
        }
      catch (error) {
        alert(`Error adding movie: ${error}`);
    }
  }
  return true
  }


function onEnter(e){
    // add movie
      if (search)
      getMovie(search);
    }


  return (
    <div>
      <main className="container">
        <h1 className="title">Movie Search App</h1>
        <input
          type="text"
          className="movie-input"
          id="input"
          placeholder="Add a movie"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={e=>{e.key === "Enter"? onEnter(e):''}}
        />
        <section className="buttons">
          <button className="btn-reset" onClick={()=>{setMovieList([]); localStorage.removeItem('list')}}>Reset</button>
          <button className="btn-save" onClick={()=>
          {
            const titles = [];
            movieList.forEach(movie=>titles.push(movie.Title));
            localStorage.setItem('list', JSON.stringify(titles.reverse()))
            }
          }>Save List</button>
        </section>
        <section className="movies">
        {
        movieList?.map((data,idx)=> <View key={idx} data={data} />)
      }
        </section>
      </main>
    </div>
  );
}
