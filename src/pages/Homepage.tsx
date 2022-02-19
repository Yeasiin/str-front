import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";

import { CategoryType, ReviewsType, ReviewType } from "./../types";

const ALL_REVIEWS = gql`
  query allReview {
    reviews {
      data {
        id
        attributes {
          title
          body
          rating
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const HomePage: React.FC = () => {
  const { data, error, loading } = useQuery<ReviewsType>(ALL_REVIEWS);

  if (loading) return <div>Loading.🔃🔃🔃</div>;
  if (error) return <div>Error.😞😞😞</div>;

  return (
    <div>
      {data!.reviews.data.map((review: ReviewType) => (
        <div className="review-card" key={review.id}>
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>
          {review.attributes.categories.data.map((category: CategoryType) => (
            <small key={category.id}>{category.attributes.name}</small>
          ))}
          <ReactMarkdown>
            {review.attributes.body.substring(0, 250)}
          </ReactMarkdown>
          <Link to={`/details/${review.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
