function Starrating(props) {
  let fRating = Math.round(props.data * 2) / 2;
  let gRating = Math.floor(props.data);

  console.log(fRating);
  let ratingArray = [
    <i className="bi bi-star text-warning"></i>,
    <i className="bi bi-star text-warning"></i>,
    <i className="bi bi-star text-warning"></i>,
    <i className="bi bi-star text-warning"></i>,
    <i className="bi bi-star text-warning"></i>,
  ];

  if (fRating - gRating === 0) {
    for (let i = 0; i < fRating; i++) {
      ratingArray[i] = <i className="bi bi-star-fill text-warning"></i>;
    }
  } else {
    if (props.data - gRating >= 0.7) {
      for (let i = 0; i < fRating; i++) {
        ratingArray[i] = <i className="bi bi-star-fill text-warning"></i>;
      }
    } else {
      for (let i = 0; i < fRating; i++) {
        ratingArray[i] = <i className="bi bi-star-fill text-warning"></i>;
      }

      for (let i = gRating; i < gRating + 1; i++) {
        ratingArray[i] = <i className="bi bi-star-half text-warning"></i>;
      }
    }
  }

  return <>{ratingArray}</>;
}

export default Starrating;
