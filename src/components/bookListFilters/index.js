import { TextField } from "@mui/material";
import BooksCategoryDropdown from "components/booksCategoryDropdown";
import UserController from "controllers/user";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookListSelector } from "store/selectors/app";

export default function BookListFilters({ setBookList }) {
  const [booksCategoriesData, setBooksCategoriesData] = useState({
    data: [],
  });
  const bookList = useSelector(bookListSelector);
  const handleSearch = (filterField) => (e) => {
    setBookList(
      bookList.filter((elem) =>
        elem[filterField].toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };
  const getBookCategoriesList = async () => {
    const response = await UserController.getBookCategories();
    return response;
  };

  const handleSearchByCategory = (e) => {
    setBookList(bookList.filter((elem) => elem.category.id === e.target.value));
  };

  useEffect(() => {
    getBookCategoriesList().then((res) =>
      setBooksCategoriesData({ ...booksCategoriesData, data: res })
    );
  }, []);
  return (
    <div className="bookList-filters">
      <TextField
        type="search"
        onChange={handleSearch("name")}
        placeholder="Փնտրել Գրքի Անունով"
      />
      <TextField
        type="search"
        onChange={handleSearch("author")}
        placeholder="Փնտրել Գրքի Հեղինակով"
      />
      <BooksCategoryDropdown
        handleSearch={handleSearchByCategory}
        booksCategoriesData={booksCategoriesData.data}
      />
    </div>
  );
}

BookListFilters.propTypes = {
  bookList: PropTypes.arrayOf(PropTypes.object),
  setBookList: PropTypes.func,
};
