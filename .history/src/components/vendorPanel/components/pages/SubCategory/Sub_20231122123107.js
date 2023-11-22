/** @format */

/** @format */
import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import { Baseurl, showMsg } from "../../../../../Baseurl";

const Sub = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [previousData, setPreviousData] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/subCategory/getAll`
      );
      setData(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState(previousData?.image);
    const [name, setName] = useState(previousData?.subCategory);
    const [categoryId, setCategoryId] = useState(
      previousData?.parentCategory?._id
    );
    const [categoryArr, setCategoryArr] = useState([]);

    const fd = new FormData();
    fd.append("image", image);
    fd.append("name", name);
    fd.append("categoryId", categoryId);

    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `${Baseurl}api/v1/catogory/getAllCategory`
        );
        setCategoryArr(data?.categories);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchCategory();
      }
    }, [props]);

    console.log(previousData);

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/admin/subCategory/new`,
          fd
        );
        showMsg("Success", "Created", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    const editHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/admin/subCategory/update/${id}`,
          fd
        );
        showMsg("Success", "Created", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? editHandler : postData}>
            <img src={image} alt="" />

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Label> {cate} </Form.Label>

              <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
                <option>Select Your Prefrence</option>
                {categoryArr?.map((i, index) => (
                  <option value={i._id} key={`categry${index}`}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/admin/delete/cat/${id}`
      );
      fetchData();
      showMsg("Success", "Category Removed !", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Sub Categories
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Creare New
          </button>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Parent Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={i.image}
                      alt="CategoryImage"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td> {i.subCategory} </td>
                  <td> {i.parentCategory?.name} </td>
                  <td>
                    <i
                      className="fa-solid fa-trash mr-2"
                      onClick={() => deleteData(i._id)}
                    ></i>

                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setPreviousData(i);
                        setId(i._id);
                        setEdit(true);
                        setModalShow(true);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Sub);
