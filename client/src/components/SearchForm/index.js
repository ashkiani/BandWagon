import React from "react";

function SearchForm(props) {
    return (
        <form>
            <div id="top-section">
                <div id="search-div" className="container">
                    <h2>Let's find a concert <i className="fas fa-search"></i></h2>
                    
                    <div className="input-group mb-3">
                        <input
                            onChange={props.handleInputChange}
                            value={props.search}
                            name="search"
                            type="text"
                            className="form-control"
                            placeholder="Artist/Band Name"
                            id="search"
                        />
                        <div className="input-group-append">
                            {/* Button used to search concerts by artist */}
                            <button onClick={props.handleFormSubmit} className="btn btn-success" type="button" id="btnArtistSearch">Search</button>
                        </div>
                    </div>
                 
                </div>
            </div>
        </form>
    );
}

export default SearchForm;
