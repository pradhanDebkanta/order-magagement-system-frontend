import React, { useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { createOrder, editOrder } from "../../store/actions/dashboard";
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
const products = [
    { value: "product1", name: "Product 1" },
    { value: "product2", name: "Product 2" },
    { value: "product3", name: "Product 3" },
]

const OrderForm = ({ onAction, initData, open, forceRerender }) => {
    const [isModalVisible, setIsModalVisible] = useState(open);
    const dispatch = useDispatch();
    const { orderList } = useSelector(store => store.orderDetails);

    const [form] = Form.useForm();

    const productValue = () => {
        let prodValue = products.filter((item) => item.name === initData.product);
        return prodValue[0]?.value;
    }
    const productName = (value) => {
        let prodName = products.filter((item) => item.value === value);
        return prodName[0]?.name;
    }
    const isNewChanges = (data) => {
        let tergetOrder = orderList.filter(item => item.id === initData.id);
        // console.log(tergetOrder, "terget order")
        return JSON.stringify(data) === JSON.stringify(tergetOrder[0]);
    }

    const handleOk = () => {

        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                // console.log(values);
                // dispatch function call
                let dumData = {
                    id: values.orderId,
                    customer_name: values.customerName,
                    customer_email: values.email,
                    product: productName(values.product),
                    quantity: values.quantity
                }
                // console.log(dumData,"dum dat")
                if (initData?.formType === "Create a new order") {
                    dispatch(createOrder(dumData)).then(res => {
                        // console.log(res,"533333333333")
                        if (res?.status === 200 || res?.status === 201) {
                            message.success("Order created successfully.");
                            forceRerender();
                        } else {
                            message.error(res.message);
                        }
                    })
                } else {
                    if (!isNewChanges(dumData)) {
                        dispatch(editOrder(dumData)).then(res => {
                            if (res?.status === 200) {
                                message.success("Order edited successfully.")
                                forceRerender();
                            } else {
                                message.error(res.message);
                            }
                        })
                    } else {
                        message.warning("Nothing new to update.")
                    }
                }
                setIsModalVisible(false);
                onAction(false);
            })
            .catch((info) => {
                // console.log('Validate Failed:', info);
                Array.isArray(info.errorFields) && info.errorFields.map(item => {
                    return (
                        message.error(item.errors[0])
                    );
                });
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        onAction(false);

    };

    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    const onProductChange = (value) => {
        // console.log(value, "product")
    }

    return (
        <div>
            <Modal title={initData?.formType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}
                okText={initData?.formType === "Create a new order" ? "Create" : "Update"}
                cancelText="Discard"
            >
                <div className='orderForm'>

                    <Form
                        form={form}
                        name="orderForm"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                            orderId: initData.id,
                            customerName: initData.customerName,
                            email: initData.customerEmail,
                            quantity: initData.quantity,
                            product: productValue()
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="order id"
                            name="orderId"
                        >
                            <Input
                                disabled />
                        </Form.Item>

                        <Form.Item
                            label="customer name"
                            name="customerName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input customer name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input customer E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="product"
                            label="Product"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a product"
                                onChange={onProductChange}
                                allowClear
                            >
                                {products.map((item, idx) => {
                                    return (
                                        <Option value={item.value} key={idx}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="quantity"
                            label="Quantity"
                            rules={[
                                {
                                    type: 'number',
                                    message: 'The input is not valid number',
                                },
                                {
                                    required: true,
                                    message: 'Please input quantity',
                                },
                            ]}
                        >
                            <InputNumber min={1} max={100} onChange={(value) => { }} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

        </div>
    )
}

export default OrderForm