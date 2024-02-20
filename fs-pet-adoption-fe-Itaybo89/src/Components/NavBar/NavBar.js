import React, { useState, useContext } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../ContextProviders/UserContext';
import logo from '../../assets/navpic.png';

function NavBar() {
  const { setSignInModalOpen, setSignUpModalOpen, selectedUser, setSelectedUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const logout = () => {
    setSelectedUser(null);
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return (
    <div className="nav-wrap">
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-image">
            <img src={logo} alt="logo" />
          </div>
          <a onClick={() => navigate("/")} className="nav-item">Home</a>
          <a onClick={() => navigate("/search")} className="nav-item">Search</a>

          {selectedUser && (
            <>
              <a onClick={() => navigate("/mypetpage")} className="nav-item">My Pets</a>
              <a onClick={() => navigate("/savedpets")} className="nav-item">Saved Pets</a>
            </>
          )}
        </div>
        <div className="nav-menus">
          {selectedUser?.role === 'admin' && (
            <div className="nav-dropdown">
              <button onClick={toggleAdminDropdown} className="dropdown-button nav-item">
                Admin
              </button>
              {adminDropdownOpen && (
                <div className="dropdown-content" onMouseLeave={() => setAdminDropdownOpen(false)}>
                  <a onClick={() => navigate("/addpet")} className="dropdown-item">Add Pet</a>
                  <a onClick={() => navigate("/allpets")} className="dropdown-item">All Pets</a>
                  <a onClick={() => navigate("/allusers")} className="dropdown-item">All Users</a>
                  <a onClick={() => navigate("/tools")} className="dropdown-item">Admin Tools</a>
                </div>
              )}
            </div>
          )}

          <div className="nav-dropdown">
            <button onClick={toggleDropdown} className="dropdown-button nav-item">
              Menu
            </button>
            {dropdownOpen && (
              <div className="dropdown-content" onMouseLeave={() => setDropdownOpen(false)}>
                {selectedUser ? (
                  <>
                    <a onClick={() => navigate("/profile")} className="dropdown-item">Profile</a>
                    <a onClick={logout} className="dropdown-item">Logout</a>
                  </>
                ) : (
                  <>
                    <a onClick={() => setSignInModalOpen(true)} className="dropdown-item">Login</a>
                    <a onClick={() => setSignUpModalOpen(true)} className="dropdown-item">Sign Up</a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
