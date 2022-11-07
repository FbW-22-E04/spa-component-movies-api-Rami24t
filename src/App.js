import React, { useEffect, useState } from "react";
import "./style.css";
import Client from "./utils/Client.js";
import View from "./View";

export default function App() {
  const client = new Client();

  const [movieList, setMovieList] = useState([]);

  const [search, setSearch] = useState('');

  let data;


  function getData(search){
    let data = client.getMovieData(search).then((data) => {
      if (!(data.Response === "False"))
        setMovieList([...movieList,data]);
  }).catch(error => alert("Error loading a movie: ", error));
  }


  useEffect(
    ()=>{
      getData('love');
      
      const input = document.querySelector("#input");
      const eL1 = input.addEventListener("keypress", (e) => {
        // add movie
        if (e.key === "Enter") {
            let movie = search.toLowerCase();
            if (movie)
                try {
                    client.getMovieData(movie).then((data) => {
                        if (data && !(data.Response === "False")) {
                            if (!movieList.includes(data)) {
                                setMovieList([...movieList, data]);
//                                console.log(typeof data.Response);
//                                view.displayMovieOnPage(data);
                            } else alert("You have already added this movie.");
                        } else
                            alert(
                                `${JSON.stringify(data.Error)}\nSorry, ${movie} movie was not found!`
                            );
                        setSearch("");
                    });
                } catch (error) {
                    alert(`Error adding movie: ${error}`);
                }
        }
    });
    


    document.querySelector(".buttons").addEventListener("click", (e) => {
      // save
      if (e.target.classList.contains("btn-save")) {
          localStorage.setItem("list", JSON.stringify(movieList));
      }
      // reset
      else if (e.target.classList.contains("btn-reset")) {
          setMovieList([]);
          localStorage.removeItem("list");
          // view.removeDisplay();
      }
  });

  return ()=> input.removeEventListener("click", eL1);
}
  ,[])



  return (
    <div>
      <h1>Movie App!</h1>
      <main className="container">
        <h2 className="title">My Movies</h2>
        <input
          type="text"
          className="movie-input"
          id="input"
          placeholder="Add a movie"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <section className="movies"></section>
        <section className="buttons">
          <button className="btn-save">Save</button>
          <button className="btn-reset">Reset</button>
        </section>
      </main>
      {
        movieList.map((data,idx)=> <View key={idx} data={data} />)
      }
    </div>
  );
}
