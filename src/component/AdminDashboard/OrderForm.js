import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, InputNumber } from 'antd';
import { createOrder, editOrder } from "../../store/actions/dashboard";
import { useSelector, useDispatch } from 'react-redux';

const { Option } = Select;
const products = [
    { value: "product1", name: "Product 1" },
    { value: "product2", name: "Product 2" },
    { value: "product3", name: "Product 3" },
]

const OrderForm = ({ onAction, initData, open }) => {
    const [isModalVisible, setIsModalVisible] = useState(open);
    const dispatch = useDispatch();

    // console.log(initData, onAction)
    const [form] = Form.useForm();

    const productValue = () => {
        let prodValue = products.filter((item) => item.name == initData.product);
        return prodValue[0].value;
    }


    const handleOk = () => {

        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                console.log(values);
                // dispatch function call
                let dumData = {
                    id: values.orderId,
                    customer_name: values.customerName,
                    customer_email: values.email,
                    product: values.product,
                    quantity: values.quantity
                }
                // console.log(dumData,"dum dat")
                if (initData?.formType == "Create a new order") {
                    dispatch(createOrder(dumData));
                } else {
                    dispatch(editOrder(dumData));
                }
                setIsModalVisible(false);
                onAction(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        onAction(false);

    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onProductChange = (value) => {
        console.log(value, "product")
    }

    return (
        <div>
            <Modal title={initData?.formType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}
                okText={initData?.formType == "Create a new order" ? "Create" : "Update"}
                cancelText="Discard"
            // footer={[
            //     <Button key="back" onClick={handleCancel}>
            //         Discard
            //     </Button>,
            //     <Button key="submit" type="primary" onClick={handleOk} >
            //         Submit
            //     </Button>]}
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
                            <InputNumber min={1} max={10} onChange={(value) => console.log(value)} />
                        </Form.Item>

                        {/* <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                </div>
            </Modal>

        </div>
    )
}

export default OrderForm