import { Card, CardActionArea, CardContent } from "@mui/material";
import Loading from "components/loading";
import UserController from "controllers/user";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

export default function MyBooks() {
  const [loading, setLoading] = useState(false);
  const [myBooks, setMyBooks] = useState([]);
  useEffect(() => {
    getMyBooks();
  }, []);
  const getMyBooks = async () => {
    setLoading(true);
    await UserController.getMyBookReservations()
      .then((res) => setMyBooks(res.data))
      .finally(() => setLoading(false));
  };
  return (
    <>
      {loading && <Loading />}
      <div className="my-books-container-wrapper">
        <div className="header-wrapper">
          <div className="header">
            <div>
              <Link className="header-logo" to="/user">
                ԵԻՊՔ ԳՐԱԴԱՐԱՆ
              </Link>
            </div>
            <div></div>
          </div>
        </div>
        <div className="my-books-container-inner-wrapper">
          {myBooks.map(({ bookId, name, author, description, status }) => (
            <Card sx={{ width: "25rem" }} key={bookId}>
              <CardActionArea>
                <CardContent>
                  <img
                    className="book-item-header-image"
                    alt=""
                    src="https://yazidharoun.files.wordpress.com/2020/11/how-to-format-a-book-3.jpg"
                  />
                  <div className="bookList-book-card-cardContent-wrapper">
                    <h4>Գրքի անուն: {name}</h4>
                    <h5>Գրքի հեղինակ: {author}</h5>
                    <p>Գրքի մեկնաբանություն: {description}</p>
                    <p>կարգավիճակ։ {status}</p>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
