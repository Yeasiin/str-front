import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { BodyReviewType, CategoryType } from "../types";

const SINGLE_REVIEW = gql`
  query singleReview($paramId: ID!) {
    review(id: $paramId) {
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

const ReviewDetails: React.FC = () => {
  const { id } = useParams<string>();

  const { loading, error, data } = useQuery<BodyReviewType>(SINGLE_REVIEW, {
    variables: { paramId: id },
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error.😞 ➡ {error.message}</h2>;

  return (
    <div>
      <div className="review-card">
        <div className="rating">{data!.review.data.attributes.rating}</div>
        <h2>{data!.review.data.attributes.title}</h2>

        {data!.review.data.attributes.categories.data.map(
          (category: CategoryType) => (
            <small key={category.id}>{category.attributes.name}</small>
          )
        )}

        <ReactMarkdown>{data!.review.data.attributes.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReviewDetails;
