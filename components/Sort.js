import React, { useState } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";

const Sort = ({data}) => {
  const [visible, setVisible] = useState(true);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);
  return (
    <Provider>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Sort by</Button>}
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
          </Menu>
        </View>
      </View>
    </Provider>
  );
};

export default Sort;
