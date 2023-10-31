/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Baseurl, Auth } from "../../../../../Baseurl";

const Order = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/orders`, Auth);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="pb-4   w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders
          </span>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User Name</th>
                <th>User Phone</th>
                <th>Discount</th>
                <th>Shipping Price</th>
                <th>Grand Total</th>
                <th>Product</th>
                <th>Order Status</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.orderId} </td>
                  <td>{i.user?.name} </td>
                  <td>{i.user?.phone} </td>
                  <td>{i.discount} </td>
                  <td>{i.shippingPrice} </td>
                  <td>{i.amountToBePaid} </td>
                  <td>
                    <ul style={{ listStyle: "disc" }}>
                      {i.Orders?.map((item) => (
                        <li key={item._id}> {item?.product?.name} </li>
                      ))}
                    </ul>
                  </td>
                  <td>{i.paymentStatus} </td>
                  <td>{i.orderStatus === true ? "Yes" : "No"} </td>
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
