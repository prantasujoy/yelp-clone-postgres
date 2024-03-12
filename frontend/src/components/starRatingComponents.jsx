import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const starRatingComponents = ({ rating }) => {
  const stars = [];

  for (let i = 1; i < 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#FFD43B" }} />
      );
    } else {
      // stars.push(
      //   // <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#FFD43B" }} />
      // );
    }
  }
  return <>{stars}</>;
};

export default starRatingComponents;
