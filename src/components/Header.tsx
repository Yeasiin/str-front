import { gql, useQuery } from "@apollo/client";
import { Link, NavLink } from "react-router-dom";
import { CategoryType, CategoriesType } from "../types";

const CATEGORY = gql`
  query category {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const Header: React.FC = () => {
  const { loading, error, data } = useQuery<CategoriesType>(CATEGORY);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error...</h2>;

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Ninja Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter Reviews By Category:</span>
        {data!.categories.data.map((category: CategoryType) => (
          <NavLink
            key={category.id}
            to={`category/${category.id}`}
            className={(navInfo) => (navInfo.isActive ? "active" : "")}
          >
            {category.attributes.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Header;
