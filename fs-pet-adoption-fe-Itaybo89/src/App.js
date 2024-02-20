import { useContext } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; 
import SearchComponent from "./Components/SearchPage/SearchComponent";
import AllPetsPics from "./Components/AllPetsPics/AllPetsPics";
import AllUsers from "./Components/AllUsers/AllUsers";
import AddPetForm from "./Components/AddPetForm/AddPetForm";
import EditPet from "./Components/EditPet/EditPet";
import Profile from "./Components/Profile/Profile";
import Allpets from "./Components/AllPets/AllPets";
import MyPets from "./Components/MyPetPage/MyPetPage";
import NavBar from "./Components/NavBar/NavBar";
import StickyFooter from "../src/Components/Footer/StickyFooter";
import './App.css';
import SignInModal from "./Components/Login/Login";
import SignUpModal from "./Components/SignUp/SignUp";
import { UserContext } from "./ContextProviders/UserContext";
import OwnerPets from "./Components/OwnerPets/OwnerPets";
import MySavedPets from "./Components/MySavedPets/MySavedPets";
import Tools from "./Components/Tools/Tools";

function App() {
  const { signInModalOpen, setSignInModalOpen, signUpModalOpen, setSignUpModalOpen, selectedUser } = useContext(UserContext);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<MainPage />} exact />
          <Route path='/search' element={<SearchComponent />} />
          <Route path='/allpetspics' element={<AllPetsPics />} />

          {selectedUser?.role === 'admin' && <Route path='/ownerpets' element={<OwnerPets />} />}
          {selectedUser?.role === 'admin' && <Route path='/allpets' element={<Allpets />} />}
          {selectedUser?.role === 'admin' && <Route path='/addpet' element={<AddPetForm />} />}
          {selectedUser?.role === 'admin' && <Route path='allpets/edit/:id' element={<EditPet />} />}
          {selectedUser?.role === 'admin' && <Route path='/allusers' element={<AllUsers />} />}
          {selectedUser?.role === 'admin' && <Route path='/tools' element={<Tools />} />}

          {(selectedUser?.role === 'admin' || selectedUser?.role === 'user') && <Route path='/savedpets' element={<MySavedPets />} />}
          {(selectedUser?.role === 'admin' || selectedUser?.role === 'user') && <Route path='/profile' element={<Profile />} />}
          {(selectedUser?.role === 'admin' || selectedUser?.role === 'user') && <Route path='/mypetpage' element={<MyPets />} />}
        </Routes>
        <div id="footy">
          <StickyFooter />
        </div>
        <SignInModal
          open={signInModalOpen}
          handleClose={() => setSignInModalOpen(false)}
        />
        <SignUpModal
          open={signUpModalOpen}
          handleClose={() => setSignUpModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;