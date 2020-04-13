import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {
  Root,
  Header,
  Sidebar,
  Content,
  Footer,
  CollapseBtn,
  CollapseIcon,
  SidebarTrigger,
  SidebarTriggerIcon
} from "@mui-treasury/layout";
import {
  defaultLayoutPreset,
  standardLayoutPreset,
  fixedLayoutPreset,
  contentBasedLayoutPreset,
  cozyLayoutPreset,
  muiTreasuryPreset
} from "@mui-treasury/layout/presets";

import {
  NavContentEx,
  NavHeaderEx,
  HeaderEx,
  ContentForm,
  ContentEx,
  FooterEx,
} from "./components/Mockup";

import "./styles.css";

const presets = {
  createDefaultLayout: defaultLayoutPreset,
  createStandardLayout: standardLayoutPreset,
  createFixedLayout: fixedLayoutPreset,
  createContentBasedLayout: contentBasedLayoutPreset,
  createCozyLayout: cozyLayoutPreset,
  createMuiTreasuryLayout: muiTreasuryPreset
};

// add presets.create{}() to config props in Root to change the behavior, looking and layout
// <Root config={presets.createCozyLayout()}> ...
function App() {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState("createStandardLayout");
  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true
  });
  return loading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant={"h2"}>Changing Preset...</Typography>
    </div>
  ) : (
    <Root config={presets[preset]}>
      {({ headerStyles, sidebarStyles }) => (
        <>
          <CssBaseline />
          <Header>
            <Toolbar>
              <CollapseBtn
                component={IconButton}
                className={headerStyles.leftTrigger}
              >
                <CollapseIcon />
              </CollapseBtn>
              <SidebarTrigger className={headerStyles.leftTrigger}>
                <SidebarTriggerIcon />
              </SidebarTrigger>
              {data.header && <HeaderEx />}
            </Toolbar>
          </Header>
          <Content>
            <ContentForm
              preset={preset}
              onChangePreset={val => {
                setLoading(true);
                setPreset(val);
                setTimeout(() => setLoading(false), 500);
              }}
              data={data}
              onChangeData={setData}
            />
            {data.content && <ContentEx />}
          </Content>
          <Sidebar>
            {({ collapsed }) => (
              <>
                <NavHeaderEx collapsed={collapsed} />
                <div className={sidebarStyles.container}>
                  {data.nav && <NavContentEx />}
                </div>
                <CollapseBtn className={sidebarStyles.collapseBtn}>
                  <CollapseIcon />
                </CollapseBtn>
              </>
            )}
          </Sidebar>
          <Footer>{data.footer && <FooterEx />}</Footer>
        </>
      )}
    </Root>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
