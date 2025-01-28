import React, { useState,useEffect } from 'react'
import {useNavigate,Link} from 'react-router-dom';
import EmployeeService from '../Service/EmployeeService';
const Employee = () => {
  const [employees,setEmployees]=useState(null
  );
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetch=async() =>{
      setLoading(true);
      try{
        
        const response =await EmployeeService.getEmployee();
        setEmployees(response.data);
        setLoading(false);
      }
      catch(e)
      {
        console.log(e);
      }
    };
    fetch();
  },[]);
    const nav =useNavigate();
    const del=(e,id)=>
    {
    e.preventDefault();
          EmployeeService.delete(id)
          .then(()=>
          {
            if(employees){
            setEmployees((prevElement)=> {
              return prevElement.filter((employee)=>employee.id!==id);
            })
          }
          })
    };
  return (
    <div class="container mx-auto my-8">
    <div>
      <button 
      onClick={()=>nav("/addEmployee")}
      class="bg-slate-300 hover:bg-blue-600 h-10 px-20 py-2 items-center my-10 font-semibold rounded" >Add Employee 🧑‍💼</button>
    </div>
    <div>
      <table class=" shadow">
      <thead className="bg-slate-300 p-20 ">
      <th class="px-6 py-3 uppercase tracking-wide">Id </th>
      <th class="px-6 py-3 uppercase tracking-wide">Name </th>
      <th class="px-6 py-3 uppercase tracking-wide">Email</th>
      <th class="px-6 py-3 uppercase tracking-wide">Actions</th>
      </thead>
      {!loading &&(
      <tbody >
        {employees.map((employee) => ( 
        <tr class="hover:bg-red-300">
      <td class="text-left px-6 py-3 whitespace-nowrap">{employee.id}</td>
      <td class="text-left px-6 py-3 whitespace-nowrap">{employee.name}</td>
      <td class="text-left px-6 py-3 whitespace-nowrap">{employee.email}</td>
      <td class="text-left px-6 py-3 ">
      <Link to="/EditEmployee" class="hover:text-blue-800 pr-5" >Edit ✏️ </Link>
      <a class="hover:text-blue-800" href="/" onClick={(e,id) => {
        del(e,employee.id)
      }} >Delete 🗑️</a>
        </td>
      </tr>
      ))}
      </tbody>
      )}
      </table>
    </div>
    </div>
)
}
export default Employee