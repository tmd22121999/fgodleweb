import React, { useState } from 'react';
import Select from 'react-select';

const data = require('../data/data.json')
let selectData = data.map(item =>( {'value':item.id,'image' : item.face['1'], 'label' :item.name}))
console.log(selectData);

export default function Fgodle() {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);
  
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = ()=>{
  
    const rowsInput={
        fullName:'',
        emailAddress:'',
        salary:''  
    } 
    setRowsData([...rowsData, rowsInput])
  
}

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={selectData}
        formatOptionLabel={servant => (
          <div className="servant-option">
            <img src={servant.image} alt="servant" />
            <span>{servant.label}</span>
          </div>
        )}
      />
      
      <table className="table">
                    <thead>
                      <tr>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Salary</th>
                          <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                      </tr>
                    </thead>
                   <tbody>
                    {
                        rowsData.map((data, index)=>{
                            const {fullName, emailAddress, salary}= data;
                            return(
                                <tr key={index}>
                                <td>
                            <input type="text" value={fullName}  name="fullName" className="form-control"/>
                                </td>
                                <td><input type="text" value={emailAddress} name="emailAddress" className="form-control"/> </td>
                                <td><input type="text" value={salary}  name="salary" className="form-control" /> </td>
                                <td><button className="btn btn-outline-danger" >x</button></td>
                            </tr>
                            )
                        })
                    }
                   </tbody> 
                </table>
    </div>
  );
}