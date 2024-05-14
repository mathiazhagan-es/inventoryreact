import axios from "axios";
import { useEffect, useState } from "react";
import XLSX from "sheetjs-style"
import * as FileSaver from "file-saver"
import { Link } from "react-router-dom";
import logo from "../img/purchase.jpg"
const Purchase_history=()=>{

const [purhis,setPurhis]=useState([])
const[searchstring,setSearchstring]=useState("")
const[nameass,setNameass]=useState(false)
const[stockass,setStockass]=useState(false)
const[purpriceass,setPurpriceass]=useState(false)
const[purchaseworth,setPurchaseworth]=useState(0)





    useEffect(()=>{
        axios.get("http://localhost:4000/purchasehistory")
        .then((res)=>setPurhis(res.data))
        .catch((error)=>console.log(error))
    })

    useEffect(()=>{
        let  worth=0
        purhis.map((pur)=>{
worth+=pur.purchaseunits*pur.purchaseprice
        })
        setPurchaseworth(worth)
    })

    const handledownload=async()=>{
        const filetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension='.xlsx';

        const ws=XLSX.utils.json_to_sheet(lis3);
        const wb={Sheets:{'data':ws}, SheetNames:['data']};
        const excelBuffer= XLSX.write(wb,{booktype:'xlsx',type:'array'});
        const datas =new Blob([excelBuffer],{type:filetype});
        FileSaver.saveAs(datas,'example'+fileExtension);
 

    }

    const lis=purhis.filter((pur)=>{
        return( searchstring === "" ? pur : pur.productname.includes(searchstring))
     })
  const lis1=nameass ? (lis.sort((a, b) =>
    a.productname > b.productname ? 1 : -1,
  ))   : lis ;

const lis2=stockass? (lis1.sort((a, b) => a.purchaseunits - b.purchaseunits)): lis1;
const lis3=purpriceass?(lis2.sort((a, b) => a.purchaseprice - b.purchaseprice)):lis2;

    return(

        <>
                            <Link  to={"/getproduct"}><button className="btn btn-primary">back</button></Link>


        <div  className="container">

        <div className="row" >
        <div  className="mark1 col-3 mr-auto" style={{border:"solid 2px gray"}}> purchase of <spam>{purhis.length}</spam> entries</div>
        <div className=" mark2 col-3" style={{border:"solid 2px gray"}}> purchase of product worth:<spam> Rs.{purchaseworth}</spam></div>
 
        </div>
        <br/>
        <div className="message"><img src={logo} width="95%" height="300px"/></div>
        <br/>
           
        <div className="row">
<label className="col-1"  for="search"><b>search</b></label>
<input className="col-4" id="search" onChange={(e)=>setSearchstring(e.target.value)} type="text" placeholder="search by product name"/><br/>
</div><br/>
<div className="row">

<button  onClick={()=>{setNameass(!nameass);setStockass(false);setPurpriceass(false)}} style={{margin:"2px"}}  className={nameass ?"btn btn-success col-3":"btn btn-primary col-3"} >ascending order of product name</button>
<button  onClick={()=>{setStockass(!stockass);setNameass(false);setPurpriceass(false)}} style={{margin:"2px"}}  className={stockass ?"btn btn-success col-3":"btn btn-primary col-3"} >ascending order of stock</button>
<button  onClick={()=>{setPurpriceass(!purpriceass);setNameass(false);setStockass(false)}} style={{margin:"2px"}}  className={purpriceass ?"btn btn-success col-3":"btn btn-primary col-3"} >ascending order of purchaseprice</button>
</div>

        <h1>purchase history page</h1>
               {purhis.length === 0 ? <h1>no products</h1>:
<table>
        <tr >
            <th className="tablehead" >index</th>
            <th className="tablehead" >seller name</th>
            <th className="tablehead" >seller email</th>
            <th className="tablehead" >product name</th>
            <th className="tablehead" >product id</th>
            <th className="tablehead" >purchase price</th>
            <th className="tablehead" >purchase units</th>
            <th className="tablehead" >purchase date</th>
        </tr>
        
        {lis3.map((pur,index)=>{
            return(
                
                <>
                <tr >
                    <td className="tablebody">{index+1}</td>
                    <td className="tablebody">{pur.sellername}</td>
                    <td className="tablebody">{pur.selleremail}</td>
                    <td className="tablebody">{pur.productname}</td>
                    <td className="tablebody">{pur.productid}</td>
                    <td className="tablebody">{pur.purchaseprice}</td>
                    <td className="tablebody">{pur.purchaseunits}</td>
                    <td className="tablebody">{pur.purchasedate}</td>
                </tr>
                
                
                </>

            )
        })}
        </table>
    }
<br/>
    <button className="btn btn-primary" onClick={()=>handledownload()}> download file</button>
    </div>
        </>
    )
}

export default  Purchase_history;