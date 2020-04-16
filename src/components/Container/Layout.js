import React from "react";

import Wrapper from "../hoc/Wrapper";

const Layout = props => (
  <Wrapper>
    <main>{props.children}</main>
  </Wrapper>
);

export default Layout;
