import React from 'react'

const Recipe = (props) => {
    return (
        <div className='col-md-12 card my-4'>
            <div className="row">
                <div className="col-md-4">
                    <img src={props.image} alt="" className="img-fluid img-thumbnail ms-5 mt-3"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className='card-title mb-2'>{props.title}</h5>
                        <p className="text-muted">Ingredients:</p>
                        <ul>
                            {props.ingredients.map(i => (
                                <li>{i.text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="divider my-3"></div>
            </div>
            <div className="foot mx-5">
                <span className='me-3 text-muted fst-italic'>By {props.source}</span>
                <span className='mx-3'><i class="fas fa-burn"></i> {Math.floor(props.calories)}</span>
                <span className='mx-3'><i class="far fa-clock"></i> {props.time} mins</span>
                <a className='btn btn-warning text-end float-end mb-3' href={props.link}>View recipe</a>
            </div>
        </div>
    )
}

export default Recipe
