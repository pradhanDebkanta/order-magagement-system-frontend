import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import "../../assert/css/dashboard.css";
import { useSelector, useDispatch } from 'react-redux';
import { getLimitedOrder, createOrder, editOrder, deleteOrder } from "../../store/actions/dashboard";
import { v4 as uuidv4 } from "uuid";
import { Typography, Row, Col, Tooltip, Pagination, Button } from 'antd';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import OrderForm from './OrderForm';


const { Title, Text } = Typography;


const Dashboard = () => {
  const { orderList, totalOrders } = useSelector(store => store.orderDetails);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [itemCount, setItemCount] = useState(10);
  const [orderCards, setOrderCards] = useState([]);
  const [isModalOpen, setmodalOpen] = useState(false);
  const [initFormData, setInitForm] = useState({});
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let data = {
      pageNo,
      itemCount
    }
    dispatch(getLimitedOrder(data));
  }, [pageNo, itemCount]);

  useEffect(() => {
    constructItem(orderList);
    console.log(orderList, totalOrders, "from dashboard compoment");
  }, [orderList, totalOrders, rerender]);

  const onDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  }

  const onPageChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPageNo(page);
    setItemCount(pageSize);
  }

  const onAction = (flag) => {
    console.log(flag);
    setmodalOpen(flag);
    setRerender(!rerender);
  }

  const newOrder = () => {
    let data = {
      id: uuidv4(),
      customerName: "",
      customerEmail: "",
      product: "Product 1",
      quantity: 1,
      formType: "Create a new order"
    }
    console.log(data);
    setInitForm(data);
    setmodalOpen(true);
  }

  const editOrder = (data) => {
    let dumData = {
      ...data,
      formType: "Edit order details"
    };
    // console.log(dumData, "dum")
    setInitForm(dumData);
    setmodalOpen(true);

  }

  function constructItem(totalOrders) {
    let buildData = totalOrders?.map((item, idx) => {
      console.log("call")
      return (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} key={item.id}>
          <div className="card">
            <div className='itemCard'>
              <Row gutter={16}>
                <Col className="gutter-row" span={20}>
                  <div className='leftSide'>
                    <Row >
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Order Id: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.id}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Customer Name: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.customer_name}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Product: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.product}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Email: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="italic"> {item?.customer_email}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Quantity: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.quantity}</Text>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className='rightSide'>
                    <div>
                      <Row >
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <div className='iconBox'
                            onClick={() => editOrder({
                              id: item.id,
                              customerName: item?.customer_name,
                              customerEmail: item?.customer_email,
                              product: item?.product,
                              quantity: item?.quantity,
                            })}>
                            <Tooltip title="Edit this order">
                              <EditOutlined style={{ fontSize: '16px', color: '#00FFAB' }} />
                            </Tooltip>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <div className='iconBox' onClick={() => onDeleteOrder(item.id)}>
                            <Tooltip title="Delete this order">
                              <DeleteOutlined style={{ fontSize: '16px', color: '#F32424' }} />
                            </Tooltip>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      );
    })
    setOrderCards(buildData);

  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", color: "#4D4C7D" }}>
        <Title level={2}>Order Details</Title>
      </div>
      <div className='createOrderContainer'>
        <div className='createOrderBox'>
          <div></div>
          <div>
            <Button type="primary" icon={<AppstoreAddOutlined />} size={"large"} onClick={newOrder}>
              Create Order
            </Button>
          </div>
        </div>

      </div>
      <div className='ordersContainer'>
        <div style={{ paddingBottom: "1.25rem" }}>
          <Row gutter={[16, 16]}>
            {orderCards}
          </Row>
        </div>

      </div>
      <div className='paginationContainer'>
        <div className='paginationBox'>
          <div></div>
          <div className='pagination'>
            <Pagination showQuickJumper defaultCurrent={1} total={totalOrders} onChange={onPageChange} />
          </div>
        </div>
      </div>

      {
        isModalOpen && (
          <OrderForm onAction={onAction} initData={initFormData} open={isModalOpen} />
        )
      }

    </div>
  )
}

export default Dashboard;