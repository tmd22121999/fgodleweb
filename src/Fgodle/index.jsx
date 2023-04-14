import React, { useState,useRef, useEffect } from 'react';
import Select from 'react-select';
import './styles.css';

const data = require('../data/data.json')
let selectData = data.map(item =>( {'value':item.id,'image' : item.face['1'], 'label' :item.name}))
console.log(data);

export default function Fgodle() {
  const [selectedOption, setSelectedOption] = useState(null);
  const  [targetId, setTargetId] = useState(Math.floor(Math.random() * 100)); 

  console.log(targetId);
  const newGame = ()=>{
    setTargetId(Math.floor(Math.random() * 100))
  }
  useEffect (()=>{
    newGame();
  },[])
  
  const [rowsData, setRowsData] = useState([]);

  const count = useRef(0);

  const addTableRows = (servantId)=>{
    const servant = data.find(item => item.id=== servantId);
    console.log(servant);

    const rowsInput={
      Id:servantId??'',
      Photo:servant.face['1']??'',
      Name:servant.name||'Unknown',
      Class:servant.className||'Unknown',
      Gender:servant.gender||'Unknown',
      Rarity:servant.rarity||'Unknown',
      Np_card:servant.noblePhantasm.card||'Unknown',
      Np_effect:servant.noblePhantasm.effectFlag||'Unknown',
      Attribute:servant.attribute||'Unknown',
      other:'Chưa phát triển',
    } 
    console.log(rowsInput);
    setRowsData([rowsInput,...rowsData ])
    
  }

  const onClickServant = (servant) =>{
    setSelectedOption(servant);
    addTableRows(servant.value);
    count.current = count.current + 1;
  }

  return (
    <div className="fgodle">
      <h1>{count.current}</h1>
      <Select
        defaultValue={selectedOption}
        onChange={onClickServant}
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
                          <th>Photo</th>
                          <th>Name</th>
                          <th>Class</th>
                          <th>Gender</th>
                          <th>Rarity</th>
                          <th>Np card</th>
                          <th>Np effect</th>
                          <th>Attribute</th>
                          <th>Traits/stat/region/card/material</th>
                          {/* <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th> */}
                      </tr>
                    </thead>
                   <tbody>
                    {
                        rowsData.map((item, index)=>{
                            const {Photo,Name,Class,Gender,Rarity,Np_card,Np_effect,Attribute,other}= item;
                            return(
                                <tr key={index}>
                                <td><img src={Photo} alt="servant" /></td>
                                <td 
                                  style={data[targetId].name===Name
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                  {Name}
                                </td>

                                <td
                                  style={data[targetId].className===Class
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                      {Class}  
                                </td>

                                <td
                                  style={data[targetId].gender===Gender
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                  {Gender}
                                </td>

                                <td
                                  style={data[targetId].rarity===Rarity
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                  {Rarity}
                                </td>

                                <td
                                  style={data[targetId].noblePhantasm.card===Np_card
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                  {Np_card}  
                                </td>

                                <td
                                  style={data[targetId].noblePhantasm.effectFlag===Np_effect
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                  {Np_effect}
                                </td>

                                <td
                                  style={data[targetId].attribute===Attribute
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                  {Attribute}
                                </td>

                                <td
                                  style={data[targetId].name===Name
                                    ?{backgroundColor:'green'}
                                    :null}
                                >
                                  {other}
                                </td>
                                {/* <td><button className="btn btn-outline-danger" >x</button></td> */}
                            </tr>
                            )
                        })
                    }
                   </tbody> 
                </table>
    </div>
  );
}