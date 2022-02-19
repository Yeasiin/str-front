import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { CategoryType, ReviewCategoryType, ReviewType } from "./../types";

const SINGLE_CATEGORY = gql`
  query singleCategory($categoryId: ID!) {
    category(id: $categoryId) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                rating
                body
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
      }
    }
  }
`;

const Category: React.FC = () => {
  const { id } = useParams<string>();
  const { data, error, loading } = useQuery<ReviewCategoryType>(
    SINGLE_CATEGORY,
    {
      variables: { categoryId: id },
    }
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error. ➡ {error.message} </h2>;

  return (
    <div>
      <h2>Based On Category: {data!.category.data.attributes.name}</h2>

      {data!.category.data.attributes.reviews.data.map((review: ReviewType) => (
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

export default Category;
