import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { UserContext } from '../../ContextProviders/UserContext';
import { useContext, useState, useEffect } from 'react';
import './allusers.css';
import { useNavigate } from 'react-router-dom';

function AllUsers() {
  const { fetchUsers, setUsers, users } = useContext(UserContext);
  const [selectedUserBy, setselectedUserBy] = useState('null');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);

  const handleClickOpen = (user) => {
    setselectedUserBy(user);
    setOpen(true);
  };


  return (
    <div className="user-container">
      <h1 className="user-title">All Users</h1>
      <List className="user-list">
        {users.map((user, index) => (
          <ListItem className="user-item" disablePadding key={index}>
            <ListItemButton className="user-button" onClick={() => handleClickOpen(user)}>
              <ListItemText className="user-text" primary={`${user.first_name} ${user.last_name}`} />
              <div className="user-role">{user.role}</div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`${selectedUserBy?.first_name} ${selectedUserBy?.last_name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>Email: {selectedUserBy?.email}</DialogContentText>
          <DialogContentText>Phone Number: {selectedUserBy?.phone_number}</DialogContentText>
          <DialogContentText>Short Bio: {selectedUserBy?.short_bio}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Back</Button>
          <Button onClick={() => navigate('/ownerpets', { state: { user: selectedUserBy } })}>Owner's Pets</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AllUsers;
