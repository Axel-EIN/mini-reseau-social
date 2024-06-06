import { Link } from "react-router-dom";


const Header = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
      </nav>
    
    </>
  );
};

export default Header;