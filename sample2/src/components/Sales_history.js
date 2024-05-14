import { useEffect } from "react"
import axios from "axios"
import XLSX from "sheetjs-style"
import * as FileSaver from "file-saver"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../img/sales.jpg"
const Sales_history=()=>{


    const[saleshis,setSaleshis]=useState([])
    const[searchstring,setSearchstring]=useState("")
    const[nameass,setNameass]=useState(false)
const[stockass,setStockass]=useState(false)
const[salpriceass,setSalpriceass]=useState(false)
const[salesworth,setSalesworth]=useState(0)

    useEffect(()=>{
        axios.get("http://localhost:4000/saleshistory")
        .then((res)=>setSaleshis(res.data))
        .catch((error)=>console.log(error))
    })
    useEffect(()=>{
        let  worth=0
        saleshis.map((sale)=>{
worth+=sale.salesunits*sale.sellingprice
        })
        setSalesworth(worth)
    })


    const lis=saleshis.filter((sale)=>{
        return( searchstring === "" ? sale : sale.productname.includes(searchstring))
     })
     const lis1=nameass ? (lis.sort((a, b) =>
     a.productname > b.productname ? 1 : -1,
   ))   : lis ;
 
 const lis2=stockass? (lis1.sort((a, b) => a.salesunits - b.salesunits)): lis1;
 const lis3=salpriceass?(lis2.sort((a, b) => a.sellingprice - b.sellingprice)):lis2;

 const handledownload=async()=>{
    const filetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension='.xlsx';

    const ws=XLSX.utils.json_to_sheet(lis3);
    const wb={Sheets:{'data':ws}, SheetNames:['data']};
    const excelBuffer= XLSX.write(wb,{booktype:'xlsx',type:'array'});
    const datas =new Blob([excelBuffer],{type:filetype});
    FileSaver.saveAs(datas,'saleshistory'+fileExtension);


}
    return(
        <>
                                    <Link  to={"/getproduct"}><button className="btn btn-primary">back</button></Link>

                                    

                <div  className="container">

                <div className="row" >
        <div  className="mark1 col-3 mr-auto" style={{border:"solid 2px gray"}}> sales of <spam>{saleshis.length} </spam>  entries</div>
        <div className=" mark2 col-3" style={{border:"solid 2px gray"}}> sales of product worth:<spam> Rs.{salesworth}</spam></div>
 
        </div>
        <br/>
        <div className="message"><img src={logo} width="95%" height="300px"/></div>
        <br/>

                <br/>
<div className="row">
<label className="col-1"  for="search"><b>search</b></label>
<input className="col-4" id="search" onChange={(e)=>setSearchstring(e.target.value)} type="text" placeholder="search by product name"/><br/>
</div><br/>

<div className="row">

         <button  onClick={()=>{setNameass(!nameass);setStockass(false);setSalpriceass(false)}}  style={{margin:"2px"}} className={nameass ?"btn btn-success col-3":"btn btn-primary col-3"}>ascending order of product name</button>
        <button  onClick={()=>{setStockass(!stockass);setNameass(false);setSalpriceass(false)}}  style={{margin:"2px"}} className={stockass ?"btn btn-success col-3":"btn btn-primary col-3"}>ascending order of stock</button>
        <button  onClick={()=>{setSalpriceass(!salpriceass);setNameass(false);setStockass(false)}}  style={{margin:"2px"}} className={salpriceass ?"btn btn-success col-3":"btn btn-primary col-3"}>ascending order of sales eprice</button>
        </div>
        <h1>sales history</h1>

        {saleshis.length===0?<h1>no sales found</h1>:
<table>
        <tr >
            <th className="tablehead">index</th>
            <th className="tablehead">buyer name</th>
            <th className="tablehead">buyer mail</th>
            <th className="tablehead">product name</th>
            <th className="tablehead">product id</th>
            <th className="tablehead">selling price</th>
            <th className="tablehead">sales units</th>
            <th className="tablehead">selling date</th>
        </tr>
        {lis3.map((sale,index)=>(
           
            <tr >
                <td className="tablebody">{index+1}</td>
                <td className="tablebody">{sale.buyername}</td>
                <td className="tablebody">{sale.buyermail}</td>
                <td className="tablebody">{sale.productname}</td>
                <td className="tablebody">{sale.productid}</td>
                <td className="tablebody">{sale.sellingprice}</td>
                <td className="tablebody">{sale.salesunits}</td>
                <td className="tablebody">{sale.sellingdate}</td>

            </tr>
        ))}






</table>

}
<br/>
<button className="btn btn-primary" onClick={()=>handledownload()}> download file</button>
</div>
        </>
    )
}
export default Sales_history;