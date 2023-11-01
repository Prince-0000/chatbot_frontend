

export const Card = (props) => {
    return(
        <div className="card">
            <img className='card-image' src={props.imgsrc} alt="pfp" />
            <h2 className='card-title'>{props.name}</h2>
            <p className='card-text'>{props.title}</p>
            <button className="card-btn" onClick={props.onSelect}>Select</button>
        </div>
    )
}