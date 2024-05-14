import React, { useContext } from "react";
import AuthContext from "../contexts/auth.context";
import { Card, Avatar, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Text } = Typography;

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Card
        style={{ width: 300, marginTop: 16 }}
        cover={<img alt="user avatar" src={user.avatar} />}
      >
        <Meta
          avatar={<Avatar src={user.avatar} />}
          title={<Title level={3}>{user.name}</Title>}
          description={
            <div>
              <p>
                <UserOutlined /> {user.username}
              </p>
              <p>
                <MailOutlined /> {user.email}
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default Profile;
