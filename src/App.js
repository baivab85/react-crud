import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCategory from "./Component/AddCategory";
import Categorylist from "./Component/Categorylist";
import Detail from "./Component/Detail";
import RootLayout from "./Component/RootLayout";
import Update from "./Component/Update";

const router = createBrowserRouter([
 {
  path:'',
  element:<RootLayout/>,
  children:[
    {index:true,element:<Categorylist/>},
    {path:'add-category',element:<AddCategory/>},
    {path:'category-list',element:<Categorylist/>},
    {path:'detail/:id',element:<Detail/>},
    {path:'edit/:id',element:<Update/>}
  ]
 }
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider> 
    </>
  );
}

export default App;
