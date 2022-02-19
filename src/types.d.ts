export type CategoryType = {
  attributes: {
    name: string;
  };
  id: string;
};

export type CategoriesType = {
  categories: {
    data: CategoryType[];
  };
};

export type ReviewType = {
  id: string;
  attributes: {
    body: string;
    rating: number;
    title: string;
    categories: {
      data: CategoryType[];
    };
  };
};

export type ReviewsType = {
  reviews: {
    data: ReviewType[];
  };
};

export type BodyReviewType = {
  review: {
    data: {
      id: string;
      attributes: {
        title: string;
        rating: number;
        body: string;
        categories: {
          data: [CategoryType];
        };
      };
    };
  };
};

export type ReviewCategoryType = {
  category: {
    data: {
      attributes: {
        name: string;
        reviews: {
          data: [ReviewType];
        };
      };
    };
  };
};
