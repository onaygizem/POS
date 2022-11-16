import React, { useState, useRef } from "react";
import BasicLayout from "../components/BasicLayout";
import { EyeOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import { Modal, Button, Table } from "antd";
import { useQuery } from "@apollo/client";
import { QUERY_ORDERS, QUERY_CAT_SUBCAT_PRODUCT } from "./../utils/queries"
import "../styles/InvoiceStyle.css";

const InvoicePage = () => {
  const componentRef = useRef();
  const [invoiceModal, setInvoiceModal] = useState(false);

  const { data } = useQuery(QUERY_ORDERS);
  const invoiceData = data?.orders || [];


  // console.log("All invoices data ", invoiceData);

  const [selectedInv, setSelectedInv] = useState(invoiceData[0]);

  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "total" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "grandTotal" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedInv(record);
              setInvoiceModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  // console.log("Selected invoice ", selectedInv);

  return (
    <BasicLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice list</h1>
      </div>
      {/* ============ need dataSource={data} for the table ==============  */}
      <Table columns={columns} dataSource={invoiceData} bordered />

      <Modal
        width={400}
        title="Invoice Details"
        visible={invoiceModal}
        onCancel={() => {
          setInvoiceModal(false);
        }}
        footer={false}
      >
        {/* ============ invoice modal start ==============  */}
        <div id="invoice-POS" ref={componentRef}>
          <center id="top">
            <div className="info">
              <h2>Title Here</h2>
              <p> Contact Method Here</p>
            </div>
            {/*End Info*/}
          </center>
          {/*End InvoiceTop*/}
          <div id="mid">
            <div className="mt-2">
              {/*need to load data here*/}
              <p>
                Customer Name : <b>{selectedInv?.customerName}</b>
                <br />
                Phone No : <b>{selectedInv?.customerNumber}</b>
                <br />
                Date :{" "}
                <b>{selectedInv?.purchaseDate.toString().substring(0, 10)}</b>
                <br />
              </p>
              <hr style={{ margin: "5px" }} />
            </div>
          </div>
          {/*End Invoice Mid*/}
          <div id="bot">
            <div id="table">
              <table>
                <tbody>
                  <tr className="tabletitle">
                    <td className="item">
                      <h2>Item</h2>
                    </td>
                    <td className="Rate">
                      <h2>Price</h2>
                    </td>
                    <td className="Rate">
                      <h2></h2>
                    </td>
                    <td className="Rate">
                      <h2></h2>
                    </td>
                  </tr>

                  {selectedInv?.products.map((item) => (
                    <>
                      <tr className="service">
                        <td className="tableitem">
                          <p className="itemtext">{item.name}</p>
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">{item.price}</p>
                        </td>
                      </tr>
                    </>
                  ))}

                  <tr className="tabletitle">
                    <td />
                    <td />
                    <td className="Rate">
                      <h2>tax</h2>
                    </td>
                    <td className="payment">
                      <h2>${selectedInv?.tax}</h2>
                    </td>
                  </tr>
                  <tr className="tabletitle">
                    <td />
                    <td />
                    <td className="Rate">
                      <h2>Grand Total</h2>
                    </td>
                    <td className="payment">
                      <h2>
                        {" "}
                        <b>${selectedInv?.grandTotal}</b>{" "}
                      </h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/*End Table*/}
            <div id="legalcopy">
              <p className="legal">
                <strong>Thank you for your order!</strong> terms and conditions
                herer
                <b> email here</b>
              </p>
            </div>
          </div>
          {/*End InvoiceBot*/}
        </div>
        {/*End Invoice*/}
        <div className="d-flex justify-content-end mt-3">
          <Button type="primary" onClick={handlePrint}>
            Print
          </Button>
        </div>
        {/* ============ invoice modal ends ==============  */}
      </Modal>
    </BasicLayout>
  );
};

export default InvoicePage;
