import axios from "axios"
import Searchcontext from "./Get_products";
import { useContext } from "react";
import XLSX from "sheetjs-style"
import * as FileSaver from "file-saver"
import {Link} from "react-router-dom";

    
const Getproductminicomp=()=>{

    


    const handledelete=(id)=>{
        axios.delete(`http://localhost:4000/deleteproduct/${id}`)
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))
    }
   const {products,searchstring,nameass,stockass,purpriceass}=useContext(Searchcontext);

   const lis=products.filter((product)=>{
    return( searchstring === "" ? product : product.productname.includes(searchstring))
 })
 const lis1=nameass ? (lis.sort((a, b) =>
    a.productname > b.productname ? 1 : -1,
  ))   : lis ;
  const lis2=stockass? (lis1.sort((a, b) => a.stock - b.stock)): lis1;
  const lis3=purpriceass?(lis2.sort((a, b) => a.oldpurchaseprice - b.oldpurchaseprice)):lis2;

  const handledownload=async()=>{
    const filetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension='.xlsx';

    const ws=XLSX.utils.json_to_sheet(lis3);
    const wb={Sheets:{'data':ws}, SheetNames:['data']};
    const excelBuffer= XLSX.write(wb,{booktype:'xlsx',type:'array'});
    const datas =new Blob([excelBuffer],{type:filetype});
    FileSaver.saveAs(datas,'example'+fileExtension);
    }


return(
    <>
    {products.length === 0 ? <h1>no products</h1>:
    
    <table width="90%" className="" >
        <thead className="" >
    <tr className="" >
        <th className="tablehead" >index</th>
        <th className="tablehead" >product name</th>
        <th className="tablehead" >product id</th>
        <th className="tablehead" >stock</th>
        <th className="tablehead" >stock status</th>
        <th className="tablehead" >purchase price</th>
        <th className="tablehead" >new purchase price</th>
        <th className="tablehead" >selling price</th>
        <th className="tablehead" >seller name</th>
        <th className="tablehead" >seller email</th>
        <th className="tablehead" >delete</th>
        <th className="tablehead" >edit</th>
        <th className="tablehead" >view </th>
        <th className="tablehead" >purchase</th>
        <th className="tablehead" >sale</th>
    </tr>
    </thead>
    {lis3.map((product,index)=>{
    return(
        
        
        <>
        <tr  >
        <td className="tablebody" >{index+1}</td>
        <td className="tablebody" >{product.productname}</td>
        <td className="tablebody" >{product.productid}</td>   
        <td className="tablebody" >{product.stock}</td>
        <td className="tablebody" style={{color:product.stock > 0 ?"":"red"}} ><b>{product.stock > 0 ?"we have stock" :"out of stock"}</b></td>
        <td className="tablebody" >{product.oldpurchaseprice}</td>
        <td className="tablebody" >{product.newpurchaseprice&&product.newpurchaseprice}</td>
        <td className="tablebody" >{product.sellingprice}</td>
        <td className="tablebody" >{product.sellername}</td>
        <td className="tablebody" >{product.selleremail}</td>
        <td className="tablebody" > <a className="" onClick={()=>handledelete(product._id) }> delete </a> </td>
        <td className="tablebody" >
            
             <a className=""><Link to={`/editproduct/${product._id}`} className="nav-link"  >edit </Link></a>
      </td>
      <td className="tablebody" >
            
             <a className=""><Link to={`/viewproduct/${product._id}`} className="nav-link"  >view </Link></a>
      </td>
      <td className="tablebody" >
            
             <a className=""><Link to={`/purchaseproduct/${product._id}`} className="nav-link"  >purchase </Link></a>
      </td>
      <td className="tablebody" >
            
             <a className=""><Link to={`/sales/${product._id}`} className="nav-link"  >sale </Link></a>
      </td>
    
    
        </tr>
        </>
    )
        
    
    })}
    
    </table>
    
    }
       <br/>
        <button className="btn btn-primary" onClick={()=>handledownload()}> download file</button>
        <br/>

    </>
)

}
export default Getproductminicomp;