/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Baseurl, showMsg } from "../../../../../Baseurl";

const Terms = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/terms`);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [couponCode, setCouponCode] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(` ${Baseurl}/api/v1/terms/${id}`, {
          terms: couponCode,
        });
        showMsg("Success", "Updated !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    const createHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(` ${Baseurl}/api/v1/terms`, {
          terms: couponCode,
        });
        showMsg("Success", "Created  !", "success");
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
            Terms & Condition
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? postData : createHandler}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/v1/terms/${id}`);
      showMsg("Success", "Removed !", "success");
      fetchData();
    } catch {}
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Terms
          </span>

          <button
            variant="outline-success"
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Create New
          </Button>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Terms</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td> {data?.terms?.terms} </td>
                <td>
                  <span className="flexCont">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setEdit(true);
                        setId(data?.terms?._id);
                        setModalShow(true);
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteHandler(data?.terms?._id)}
                    ></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Terms);
