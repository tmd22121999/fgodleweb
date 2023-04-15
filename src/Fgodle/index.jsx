import React, { useState,useRef, useEffect } from 'react';
import Select from 'react-select';
import './styles.css';
import { classImage,cardImage } from './imageImport';

const data = require('../data/data.json')
let selectData = data.map(item =>( {'value':item.id,'image' : item.attribute === 'beast' || item.name==="Solomon" ?item.face['0'] : item.face['1'], 'label' :item.name}))
console.log(data);

export default function Fgodle() {
  const [selectedOption, setSelectedOption] = useState(null);
  const  [targetId, setTargetId] = useState(Math.floor(Math.random() * 100)); 

  // console.log(targetId);
  const newGame = ()=>{
    setRowsData([])
    setTargetId(Math.floor(Math.random() * 100))
    count.current=0
    setState('play')
  }
  useEffect (()=>{
    newGame();
  },[])
  
  
  const [rowsData, setRowsData] = useState([]);

  const count = useRef(0);

  const addTableRows = (servantAdd)=>{
    const servant = data.find(item => item.id=== servantAdd.value);
    // console.log(servant);
    const changeNameEffect={"attackEnemyAll":"AOE","attackEnemyOne":"ST", "support" :"Support"}
    const NpE = changeNameEffect[servant.noblePhantasm?.effectFlag]??servant.noblePhantasm?.effectFlag

    const rowsInput={
      Id:servantAdd.value??'',
      Photo:servantAdd.image??'',
      Name:servant.name||'Unknown',
      Class:servant.className||'Unknown',
      Gender:servant.gender||'Unknown',
      Rarity:servant.rarity||'Unknown',
      Np_card:servant.noblePhantasm?.card||'Unknown',
      Np_effect:NpE||'Unknown',
      Attribute:servant.attribute||'Unknown',
      other:'Chưa phát triển/ Không có dữ liệu',
    } 
    // console.log(rowsInput);
    setRowsData([rowsInput,...rowsData ])
    
  }

  const onClickServant = (servant) =>{
    console.log(rowsData.some(item=>item.Id === servant.value))
    console.log(rowsData);
    if(rowsData.some(item=>item.Id === servant.value)){
      return;
    }
    setSelectedOption(servant);
    addTableRows(servant);
    count.current = count.current + 1;
    checkEndGame(servant.value);
  }

  const [stateGame,setState]=useState("play")


  const checkEndGame = (checkId) =>{
    console.log('check',checkId);
    console.log('target',targetId);
    if(data[targetId].id === checkId){
      setState("win")
      return
    }
    if(count.current===5){
      setState("lose")
      return
    }
  }


  const configStyleSelect={
    control: (baseStyles, state) => ({
      ...baseStyles,
      cursor: 'text',
      lineHeight:'2.5em'
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        display:'flex',
        borderBottom: '0.5px solid gray'
      }
    },
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            fontSize:'2rem'
        }
    }
  }

  return (
    <div className="fgodle">
      <img src={"https://cdn.myanimelist.net/images/anime/1800/132226.jpg"} className="App-logo" alt="logo" />
      <h1 style={{color:'white'}}>Tries : {count.current}/5</h1>
      {stateGame==='play'
        ?
              <Select
                defaultValue={selectedOption}
                onChange={onClickServant}
                options={selectData}
                styles={configStyleSelect}
                // styles={{cursor: 'text'}}
                value={null}
                placeholder={'Enter Servant Name'}
                // menuIsOpen={true}
                formatOptionLabel={servant => (
                  <div className="servant-option">
                    <img style={{width:'10vw'}} src={servant.image} alt="servant" />
                    <span 
                      style={{marginLeft:50, fontSize:'1.5em',wordBreak:'keep-all'}} 
                    >
                      {servant.label}
                    </span>
                  </div>
                )}
              />
        :<>
            <div style={stateGame==='win'
                          ?{backgroundColor:'#1ba128',color:'white'}
                          :{backgroundColor:'#7e1919',color:'white'}
                       }>
               <h1>You {stateGame}</h1>
            </div>
            <button style={stateGame==='win'
                          ?{backgroundColor:'#1ba128',color:'white',width:'15vw',height:'15vh',fontSize:'2rem'}
                          :{backgroundColor:'#7e1919',color:'white',width:'15vw',height:'15vh',fontSize:'2rem'}
                       }
                     onClick={newGame}>
                      Try Again
            </button>
          </>
      }
      
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
                                <td style={{overflow:'hidden'}}>
                                  <img
                                    style={{width:'110%',height:'110%'}}
                                   src={Photo} alt="servant" 
                                  />
                                </td>
                                <td 
                                  style={data[targetId].name===Name
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Name}
                                </td>

                                <td
                                  style={data[targetId].className===Class
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  <img
                                    style={{width:'70%',height:'70%'}}
                                  src={classImage[Attribute ==='beast' ?'beast': Class ]} alt="class" 
                                  />
                                      {/* {Class}   */}
                                </td>

                                <td
                                  style={data[targetId].gender===Gender
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Gender}
                                </td>

                                <td
                                  style={data[targetId].rarity===Rarity
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Rarity}
                                </td>

                                <td
                                  style={data[targetId].noblePhantasm.card===Np_card
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {cardImage[Np_card]?<img
                                    style={{width:'60%',height:'60%'}}
                                  src={cardImage[Np_card]} alt="card" 
                                  />:'Unknown'}
                                  {/* {Np_card}   */}
                                </td>

                                <td
                                  style={data[targetId].noblePhantasm.effectFlag===Np_effect
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Np_effect}
                                </td>

                                <td
                                  style={data[targetId].attribute===Attribute
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Attribute}
                                </td>

                                <td
                                  style={data[targetId].name===Name
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
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