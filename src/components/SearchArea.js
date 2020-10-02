import React from 'react';

const SearchArea = (props) => {
    return (
        <section className="row" onLoad={props.handleQuery}>
            <div className="col s4 offset-s4">
                <form action="" onSubmit={props.handleQuery}>
                    <div className="input-field">
                        <input placeholder="Search" type="text" onChange={props.handleChange}/>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SearchArea;