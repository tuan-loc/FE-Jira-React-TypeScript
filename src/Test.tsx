import React, { useState } from "react";
import { Avatar, Col, Divider, Drawer, List, Row } from "antd";
import UpdateProject from "pages/project/UpdateProject";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | any>(null);
  const showDrawer = (userId: number) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        dataSource={[
          {
            id: 1,
            name: "Lily",
          },
          {
            id: 2,
            name: "lulu",
          },
        ]}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={() => showDrawer(item.id)} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description="Progresser XTech"
            />
          </List.Item>
        )}
      />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <UpdateProject selectedUserId={selectedUserId} />
      </Drawer>
    </>
  );
};

export default App;
