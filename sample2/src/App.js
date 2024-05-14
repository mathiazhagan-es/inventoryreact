import './App.css';
import { Add_product } from './components/Add_product';
import { Home } from './components/Home';
import { Get_products } from './components/Get_products';
import Purchase_history from './components/Purchase_history';
import { Errorpage } from './components/Errorpage';
import Saleofproduct from './components/Saleofproduct';
import Purchase_product from './components/Purchase_product';
import View_product from './components/View_product';
import Sales_history from './components/Sales_history';
import Edit_product from './components/Edit_product';
import {BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "bootstrap/dist/css/bootstrap.min.css";
function App() {
 

return (
<>
<body className='body'>
<Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/">HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
          <Nav.Link href="/getproduct">getproduct</Nav.Link>
            <Nav.Link href="/addproduct">addproduct</Nav.Link>
            <Nav.Link href="/purchasehistory">purchasehistory</Nav.Link>
            <Nav.Link href="/saleshistory">saleshistory</Nav.Link>

            
          </Nav>
        </Navbar.Collapse>
    </Navbar>


   



<Router>


<Routes>
<Route exact path='/'  element={ <Home/> } />
<Route path='/addproduct'  element={ <Add_product/> } />
<Route path='/getproduct'  element={ <Get_products/> } />
<Route path='/editproduct/:id'  element={ <Edit_product/> } />
<Route path='/viewproduct/:id'  element={ <View_product/> } />
<Route path='/purchaseproduct/:id'  element={ <Purchase_product/> } />
<Route path='/purchasehistory'  element={ <Purchase_history/> } />
<Route path='/sales/:id'  element={ <Saleofproduct /> } />
<Route path='/saleshistory'  element={ <Sales_history/> } />
<Route path='*' element={ <Errorpage/> } />









</Routes>
<footer className="bg-body-tertiary text-center text-lg-start">
  <div className="text-center p-3" style={{backgroundcolor: "rgba(0, 0, 0, 0.05)"}}>
  
    <a className="text-body" href="/">sample footer</a>
  </div>
</footer>

</Router>
</body>

    </>
  )
     

}


 
export default App;
 