/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const Order = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [orderId, setOrderId] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/orders`, Auth);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data)

  useEffect(() => {
    fetchData();
  }, []);



  function MyVerticallyCenteredModal(props) {
    const [driver, setDriver] = useState([]);
    const [driverId, setDriverId] = useState("");

    const fetchD = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/v1/driver/alldriver`);
        setDriver(data.message);
      } catch (E) {
        console.log(E);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        fetchD();
      }
    }, [props.show]);

    const assingOrder = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}api/v1/driver/addOrder`, {
          orderId,
          driverId,
        });
        showMsg("Success", "Assigned", "success");
        props.onHide();
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
            Assign Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={assingOrder}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option>Open this select menu</option>
              {driver?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.Name}{" "}
                </option>
              ))}
            </Form.Select>
            <Button type="submit"> Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4   w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders
          </span>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table >
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Phone</th>
                <th>Discount</th>
                <th>Shipping Price</th>
                <th>Grand Total</th>
                <th>Product</th>
                <th>Payment Status</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.user?.name} </td>
                  <td>{i.user?.phone} </td>
                  <td>{i.discount} </td>
                  <td>{i.shippingPrice} </td>
                  <td>{i.amountToBePaid} </td>
                  <td>
                    <ul style={{listStyle : 'disc'}} >
                      {i.Orders?.map((item) => (
                        <li key={item._id} > {item?.product?.name} </li>
                      ))}
                    </ul>
                  </td>
                  <td>{i.paymentStatus} </td>
                  <td>{i.delivered === true ? "Yes" : "No"} </td>
                  <td>
                    <span className="d-flex gap-2">
                 
                      <Button
                        onClick={() => {
                          setOrderId(i._id);
                          setModalShow(true);
                        }}
                      >
                        Assign Order
                      </Button>
                    </span>
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

export default HOC(Order);