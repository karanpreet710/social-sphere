import LeftBar from "./components/leftBar/LeftBar";
import Navbar from "./components/navbar/Navbar";
import RightBar from "./components/rightBar/RightBar";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Chatting from "./pages/chatting/Chatting"
import "./style.scss"
import { QueryClient, QueryClientProvider } from "react-query";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

function App() {

  const {currentUser} = useContext(AuthContext);
  
  const {darkMode} = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{display:"flex"}}>
            <LeftBar />
            <div style={{flex:6}}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login/"></Navigate>
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path:'/',
      element:(
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
      ),
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/profile/:id',
          element:<Profile />
        }
      ]
    },
    {
      path:"/login",
      element:<Login />
    },
    {
      path:"/chat",
      element:(
        <ProtectedRoute>
          <Chatting />
        </ProtectedRoute>
      )
    }
  ])
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
