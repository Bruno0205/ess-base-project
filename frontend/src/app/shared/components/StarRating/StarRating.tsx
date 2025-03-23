import React from "react";

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
  }
const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const handleClick = (newRating: number) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={index < rating ? "#FFD700" : "#E0E0E0"}
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => handleClick(index + 1)}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ));

  return <div style={{ display: "flex" }}>{stars}</div>;
};

export default StarRating;