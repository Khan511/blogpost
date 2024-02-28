import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/ThemeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm font-semibold dark:text-white sm:text-xl"
        >
          <span className="rounded-lg bg-gradient-to-r from-red-500 via-red-200 to-green-300 px-2 py-1">
            Naji's
          </span>
          Blog
        </Link>

        <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline "
          />
        </form>
        <Button className="h-10 w-10 rounded-3xl lg:hidden" color="gray">
          <AiOutlineSearch />
        </Button>
        <div className="flex items-center gap-2 md:order-2">
          <Button
            className=" hidden h-10 w-12 sm:inline "
            pill
            color="gray"
            onClick={changeTheme}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>

          {currentUser ? (
            <Dropdown
              inline
              arrowIcon={false}
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm  ">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="sign-in">
              <Button color="gray">Sign In</Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
