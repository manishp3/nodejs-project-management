import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const Sidebar1 = () => {
  return (
    <>
    <div style={{position:"fixed"}}>
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem component={<Link to="/dashboard" />}> Dashboard</MenuItem>
          <MenuItem component={<Link to="/projects" />}> Projects</MenuItem>
          {/* <MenuItem component={<Link to="/" />}> </MenuItem> */}
          <MenuItem component={<Link to="/e-commerce" />}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      </div>
    </>
  );
};

export default Sidebar1;
