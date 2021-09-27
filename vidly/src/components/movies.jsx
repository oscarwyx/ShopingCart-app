import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from './common/like';
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4
    };

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike =(movie)=>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});

    };

    handlePageChange = page => {
        this.setState({ currentPage: page});
    }

    render() { 
        const { length: count } = this.state.movies;
        const {pageSize,currentPage,movies: allMovies} = this.state;
        if (count === 0) 
            return <p>There are no movies in the database.</p>;
        const movies = paginate(allMovies, currentPage, pageSize);
        return (
            <React.Fragment>
                <p>Showing {count} movies in the database.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movies => (
                    <tr key={movies._id}>
                        <td>{movies.title}</td>
                        <td>{movies.genre.name}</td>
                        <td>{movies.numberInStock}</td>
                        <td>{movies.dailyRentalRate}</td>
                        <td>
                            <Like liked={movies.liked} onClick={()=>this.handleLike(movies)} />
                        </td>
                        <td>
                            <button onClick={() => this.handleDelete(movies)}className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                itemsCount={count} 
                pageSize={pageSize} 
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }

}

export default Movies;