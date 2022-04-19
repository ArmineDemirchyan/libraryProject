import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import BooksCategoryDropdown from "components/booksCategoryDropdown";
import AdminController from "controllers/admin";
import UserController from "controllers/user";
import { ADMIN_CREATE_NEW_BOOK_LIST_INPUTS } from "helpers/constants";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminAddNewBookModal({ modalOpened, onClose }) {
  const [booksCategoriesData, setBooksCategoriesData] = useState([]);
  const [newBookData, setNewBookData] = useState({
    name: "",
    author: "",
    productionYear: "",
    description: "",
    pagesCount: "",
    quantity: "",
    availableForBorrowingCount: "",
    availableForUsingInLibraryCount: "",
  });
  const handleInputsChange = (id) => (e) => {
    setNewBookData({ ...newBookData, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await AdminController.CerateNewBook(newBookData);
    if (response) {
      onClose(false)();
      toast.success("Success");
    }
  };

  useEffect(() => {
    UserController.getBookCategories().then((res) =>
      setBooksCategoriesData(res)
    );
  }, []);

  const handleSelectCategory = (e) => {
    console.log(e);
    setNewBookData({ ...newBookData, categoryId: e.target.value });
  };

  return (
    <Modal open={modalOpened}>
      <Box sx={style}>
        <div>
          {ADMIN_CREATE_NEW_BOOK_LIST_INPUTS.map(
            ({ type, title, id }, index) => (
              <div key={index}>
                <label htmlFor={id}>{title}</label>
                <TextField
                  id={id}
                  type={type || "text"}
                  label={title}
                  placeholder={title}
                  onChange={handleInputsChange(id)}
                  value={newBookData[id]}
                />
              </div>
            )
          )}
          <BooksCategoryDropdown
            booksCategoriesData={booksCategoriesData}
            handleSearch={handleSelectCategory}
          />
        </div>

        <div className="modal-buttons">
          <Button onClick={onClose(false)}>Չեղարկել</Button>
          <Button onClick={handleSubmit}>Հաստատել</Button>
        </div>
      </Box>
    </Modal>
  );
}
