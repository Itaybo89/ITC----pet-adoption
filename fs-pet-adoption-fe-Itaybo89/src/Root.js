import App from "./App";
import PetContextProvider from "./ContextProviders/PetContext";
import UserContextProvider from "./ContextProviders/UserContext";



function Root() {
    return (
        
            <PetContextProvider>
                <UserContextProvider>
                <App />
                </UserContextProvider>
            </PetContextProvider>

    );
}

export default Root;