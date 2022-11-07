import React from 'react'

const View = ({data}) => {
  return (
                <section className="movie-display"> 
                    <section className="movie-meta">
                        <h2>{data?.Title}</h2>
                        <img src={data?.Poster} alt={data?.Title} />
                        <p>Release date: {data?.Released}</p>
                        <p>Run time: {data?.Runtime}</p>
                        <p>Rated: {data?.Rated}</p>
                    </section>
                    <p>{data?.Plot}</p>
                </section>
  )
}

export default View