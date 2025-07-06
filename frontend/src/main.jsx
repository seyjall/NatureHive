import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import AddPost from "./pages/AddPost.jsx"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import AllPosts from "./pages/AllPosts.jsx"
import EditPost from "./pages/EditPosts.jsx"
import Trips from './components/Trips/Trips.jsx'
import Tripdetails from './components/Trips/Tripdetails.jsx'
import  './index.css'; 
import Success from './components/Success.jsx'
import Failure from './components/Failure.jsx'
import Profile from "./pages/Profile.jsx"
import UpdateAccount from './pages/update-account.jsx'
import UpdateAvatar from './pages/update-avatar.jsx'
import ChangePassword from './pages/change-password.jsx'
const router = createBrowserRouter([
  {
    path :'/' , 
    element : <App></App> , 
    children : [
      {
        path : '/' , 
        element : <Home></Home>
      },
      {
        path : "/login" , 
        element : (
          <AuthLayout  authentication = { false }  >
            <Login></Login>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication = {false }>
                <Signup />
            </AuthLayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
      path :"/Profile" , 
      element :(
         <AuthLayout>
           <Profile/>
         </AuthLayout>
         
      ),
    },

    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
      path: "/post/:slug",
      element: <Post />,
  },
  {
    path :"/Join-in" ,
    element : (
      <AuthLayout>
          <Trips></Trips>
      </AuthLayout>
        

    )
  
  },
  {
    path :"/Tripdetails/:title/:image" ,
    element : (
         <Tripdetails></Tripdetails>
    )
  
  },
   {
        path: "/Success",
        element: (
          
                <Success />
         
        ),
    },
     {
        path: "/Failure",
        element: (
          
             
                <Failure/>
          
        ),
    },
    {
      path : "/update-account" , 
      element : (
            <UpdateAccount></UpdateAccount>
      ),
    },
     {
      path : "/update-avatar" , 
      element : (
           <UpdateAvatar></UpdateAvatar>
      ),
    },
     {
      path : "/change-password" , 
      element : (
            <ChangePassword></ChangePassword>
      ),
    },

    
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
  
    <RouterProvider router={router}>
  
    </RouterProvider>
    </Provider>
 
  </StrictMode>,
)
