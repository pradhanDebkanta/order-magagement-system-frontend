import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import Logout from '../Auth/Logout';
import "../../assert/css/navbar.css";
import { useSelector, } from 'react-redux';
import { Avatar, Modal, Card } from 'antd';
const { Meta } = Card;

const Navbar = () => {
    const { userData } = useSelector(store => store.auth);
    const [letter, setLetter] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        let name = userData?.name.split(" ");
        let lt = name[0].slice(0, 1) + name[1].slice(0, 1);
        setLetter(lt.toUpperCase());
        setName(userData?.name);
        setEmail(userData?.email);


    }, [userData]);

    const modalHandeler = () => {
        setModalOpen(!isModalOpen);
    }
    return (
        <>
            <div className='navbarContainer'>
                <div className='navbarBox'>
                    <div className='navbar'>
                        <div className='profile'>
                            <div className={userData?.imageUrl ? "image" : "letter"} onClick={modalHandeler}>
                                {userData?.imageUrl ? (
                                    <Avatar
                                        src={userData.imageUrl}
                                        size={40}
                                    />
                                ) : (
                                    <Avatar
                                        style={{
                                            backgroundColor: '#F9F3EE',
                                            color: "#FEB139",
                                            fontSize: "20px",
                                            borderRadius: "100%",
                                            fontWeight: 700,
                                        }}
                                        shape={"circle"}
                                        size={40}
                                    >
                                        {letter}
                                    </Avatar>
                                )}
                            </div>
                        </div>
                        <div style={{ borderRadius: "50px" }}>
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>
            {
                isModalOpen && (
                    <Modal
                        visible={isModalOpen}
                        title=""
                        // onOk={handleOk}
                        onCancel={modalHandeler}
                        footer={[]}
                    >
                        <div style={{ display: "flex", justifyContent: "center", marginLeft: "auto" }}>
                            <Card
                                hoverable
                                style={{ width: "80%" }}
                                cover={<img alt={`${name}'s profile`} src={userData?.imageUrl ? userData.imageUrl : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}
                            >
                                <div style={{ marginTop: "8px", display: "flex", justifyContent: "center", fontSize: "16px" }}>
                                    <Meta title={name} description={email} />
                                </div>
                            </Card>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

export default Navbar