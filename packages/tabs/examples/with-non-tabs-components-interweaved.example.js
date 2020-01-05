import "@reach/tabs/styles.css";

import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

export const name = "With Non-Tabs Components Interweaved";

const tabsStyle = {
  width: 800,
  boxShadow: "1px 1px 5px hsla(0, 0%, 0%, 0.25)"
};

const tabListWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid darkslategray",
  padding: "4px 0"
};

export const Example = () => (
  <Tabs defaultIndex={1} style={tabsStyle}>
    <div style={tabListWrapperStyle}>
      <TabList style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontWeight: "bold", color: "teal" }}>
          <Tab>Monthly</Tab>
          <Tab>Annual</Tab>
        </div>
        <div>|</div>
        <Tab>Unsubscribe</Tab>
      </TabList>
      <div style={{ margin: "0 16px", textAlign: "right" }}>
        Here is content styled alongside the tab list
      </div>
    </div>

    <div style={{ border: "1px solid teal", padding: 12, margin: "12px 0" }}>
      <div style={{ textAlign: "center" }}>
        Here is content above tab panels but styled with it.
      </div>
      <TabPanels>
        <div style={{ fontWeight: "bold", color: "teal" }}>
          <TabPanel>
            <h1>Monthly Membership</h1>
            <p>This is bold because monthly is still good!</p>
          </TabPanel>
          <TabPanel>
            <h1>Annual Membership</h1>
            <p>This is the default tab because its the best deal!</p>
          </TabPanel>
        </div>
        <TabPanel>
          <h1>Unsubscribe</h1>
          <p>This tab and its panel contents are not bold or colored</p>
          <button>Unsubscribe</button>
        </TabPanel>
      </TabPanels>
    </div>
  </Tabs>
);
