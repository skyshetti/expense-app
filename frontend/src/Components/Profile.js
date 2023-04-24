import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startUpdateProfilePic } from "../Redux/Actions/userAction";
import "./Profile.css";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

//
const Profile = () => {
  const [file, setFile] = useState({});

  const dispatch = useDispatch();
  const user = useSelector(state => {
    return state.users.data;
  });

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(startUpdateProfilePic(formData));
  };

  return (
    <div
      className='profileContainer'
      style={{
        backgroundImage: `url(${`https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <Card
        style={{
          width: 300,
        }}
        cover={
          <div>
            {user.length && (
              <img
                className='coverPic'
                alt='example'
                // src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                src={`http://localhost:5555/${user[0].profilepic}`}
              />
            )}
          </div>
        }
      >
        <Meta
          avatar={
            <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />
          }
          title='User Details'
          description={
            <div>
              {user.length && (
                <div>
                  <p>{user[0].username}</p>
                  <p>{user[0].email}</p>
                  <p>
                    Account Created on -{" "}
                    {new Date(user[0].createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          }
        />
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <input type='file' onChange={handleFileChange} />
          <input className='inputBtn' type='submit' />
        </form>
      </Card>
    </div>
  );
};

export default Profile;
