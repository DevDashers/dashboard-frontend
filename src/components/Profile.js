import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Dropdown } from "react-bootstrap";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Dropdown drop='down-centered' align={{md:'end'}}>
                <Dropdown.Toggle variant="transparent">
                  <img src={user.picture} alt={user.name} width="32" height="32" className="rounded-circle" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">{user.name}</Dropdown.Item>
                  <Dropdown.Item href="#">{user.email}</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
      </div>
    )
  );
};

export default Profile;
