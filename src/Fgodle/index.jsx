import React, { useState,useRef, useEffect } from 'react';
import Select from 'react-select';
import './styles.css';
import { classImage,cardImage,rarityImage } from './imageImport';
import Tooltip from '../Components/Tooltips';
import Modal from 'react-modal'
import { Capitalize } from '../helper/stringFunc';

const data = require('../data/data.json')
let selectData = data.map(item =>( {'value':item.id,'image' : item.className.includes('beast')|| item.name==="Solomon" ?item.face['0'] : item.face['1'], 'label' :item.name}))
console.log(data);


const customStylesModal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width:'50vw',
    height:'80vh',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Fgodle() {
  const [selectedOption, setSelectedOption] = useState(null);
  const  [targetId, setTargetId] = useState(Math.floor(Math.random() * 100)); 

  const[hideOther,setHideOther]=useState(false)
  const[hidePersonality,setHidePersonality]=useState(false)

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

  let subtitle;
  
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  
  const [rowsData, setRowsData] = useState([]);

  const count = useRef(0);
    const changeNameEffect={"attackEnemyAll":"AOE","attackEnemyOne":"ST", "support" :"Support"}

  const addTableRows = (servantAdd)=>{
    const servant = data.find(item => item.id=== servantAdd.value);
    // console.log(servant);
    // const NpE = changeNameEffect[servant.noblePhantasm?.effectFlag]??servant.noblePhantasm?.effectFlag

    const rowsInput={
      Id:servantAdd.value??'',
      Photo:servantAdd.image??'',
      Name:servant.name||'Unknown',
      Class:servant.className||'Unknown',
      Gender:servant.gender||'Unknown',
      Rarity:servant.rarity||'Unknown',
      Np_card:servant.noblePhantasm?.card||'Unknown',
      Np_effect:servant.noblePhantasm?.effectFlag||'Unknown',
      Attribute:servant.attribute||'Unknown',
      personality:servant.stats.personality||'Unknown',
      other:'Chưa phát triển/ Không có dữ liệu',
    } 
    // console.log(rowsInput);
    setRowsData([...rowsData,rowsInput ])
    
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
      lineHeight:'2em',
      minWidth:'50vw',
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
            fontSize:'1.4rem'
        }
    },
    menuList:(defaultStyle)=>{
      return {
          ...defaultStyle,
          minHeight:'60vh'
      }
    },
    container:(defaultStyle)=>{
      return {
          ...defaultStyle,
          margin:'auto',
          width:'60vw'
      }
    }
  }

  return (
    <div className="fgodle">
      <header className='header'>
      <img src={"https://cdn.myanimelist.net/images/anime/1800/132226.jpg"} className="App-logo" alt="logo" />
      <div>
      <h1 className='title'>FGODLE</h1>
      <button className='button-tut' onClick={openModal}>
        <img style={{width:'7vmin'}} src="https://static.wikia.nocookie.net/fategrandorder/images/a/a4/MasterMissionsIcon.png"/>
        <div>Hướng dẫn</div>
        </button>
        </div>
      </header>
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
                    <img style={{width:'8vw'}} src={servant.image} alt="servant" />
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
               <h1>You {stateGame}, Correct answer :</h1>
               <div>
                <img
                  style={{width:'9vw'}}
                  src={selectData[targetId].image} alt="servant" 
                />
                <p style={{fontSize:'2em',paddingBottom:13}}>{selectData[targetId].label}</p>
               </div>
            </div>
            <button style={{
                          backgroundColor:'#0d6efd',
                          color:'white',
                          width:'15vw',
                          height:'15vh',
                          fontSize:'2rem'}
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
                          <th><Tooltip content={"Những thuộc tính ẩn này được dựa trên lí do tại sao họ là Servant.<br/> Chi tiết xem trên <a href='https://fategrandorder.fandom.com/vi/wiki/Thu%E1%BB%99c_t%C3%ADnh_%E1%BA%A9n' target='_blank'>Wiki<a/>"}>Attribute</Tooltip></th>
                          <th className={`other ${hidePersonality?'other-hide':''}`}>Personality <br/>
      <button onClick={()=>{setHidePersonality(true)}}>Hide</button></th>
                          <th className={`other ${hideOther?'other-hide':''}`}><Tooltip content={"Traits/stat/region/card/material"}>Other</Tooltip>
      <button onClick={()=>{setHideOther(true)}}>Hide</button></th>
                          {/* <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th> */}
                      </tr>
                    </thead>
                   <tbody className='tbody'>
                    {
                        rowsData.map((item, index)=>{
                            const {Photo,Name,Class,Gender,Rarity,Np_card,Np_effect,Attribute,personality,other}= item;
                            return(
                                <tr className='tr-body' key={index}>
                                <td width='150' className='photo' style={{overflow:'hidden'}}>
                                  <img
                                    style={{width:'110%'}}
                                   src={Photo} alt="servant" 
                                  />
                                </td>
                                <td className='name'
                                  style={data[targetId].name===Name
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Name}
                                </td>

                                <td className='class'
                                  style={data[targetId].className===Class
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  <img
                                    style={{width:'70%',height:'70%'}}
                                  src={classImage[Class.includes('beast') ?'beast': Class ]} alt="class" 
                                  />
                                      {/* {Class}   */}
                                </td>

                                <td className='gender'
                                  style={data[targetId].gender===Gender
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Gender}
                                </td>

                                <td className='rarity'
                                  style={data[targetId].rarity===Rarity
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                <img
                                  style={{width:'70%',height:'70%'}}
                                src={rarityImage[Rarity]} alt="rarity" 
                                />
                                <br/>
                                  {Rarity}
                                </td>

                                <td className='np-card'
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

                                <td className='np-effect'
                                  style={data[targetId].noblePhantasm.effectFlag===Np_effect
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {changeNameEffect[Np_effect]||'Unknown'}
                                </td>

                                <td className='attribute'
                                  style={data[targetId].attribute===Attribute
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Capitalize(Attribute)}
                                </td>
                                <td className={`other ${hideOther?'other-hide':''}`}
                                  style={data[targetId].stats.personality===personality
                                    ?{backgroundColor:'#1ba128'}
                                    :{backgroundColor:'#7e1919'}}
                                >
                                  {Capitalize(personality)}
                                </td>

                                <td
                                  className={`other ${hideOther?'other-hide':''}`}
                                  style={{backgroundColor:'#1ba128',minWidth:"15vw"}}
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

                
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hướng dẫn :</h2>
        <div>
          <h3>Mục tiêu :</h3><p>Chọn đúng servant cần tìm mà web lấy ngẫu nhiên</p>
          <h3>Cách chơi :</h3>
          <div>_ Bạn cần chọn một servant từ danh sách</div>
          <div style={{padding:20}}>Mỗi servant có các thuộc tính : tên (name), trường phái (class), giới tính (gender), độ hiếm (rarity), loại thẻ np (np card), hiệu ứng của np (np effect), Attribute (thuộc tính ẩn)</div>
          <div>_ Nếu giá trị của thuộc tính servant bạn chọn giống với giá trị của thuộc tính tương ứng của servant cần tìm thì nền của thuộc tính đó sẽ có màu xanh,
            nếu không thì nền sẽ có màu đỏ
          </div><br/>
          <div>_ Từ dữ kiện đó, bạn cần đoán ra servant cần tìm và bạn có 5 lần thử để tìm ra đúng servant đó</div>
          <h3>Lưu ý :</h3>
          <div>_ Attribute (thuộc tính ẩn) được dựa trên lí do tại sao họ là Servant.
           <p>Chi tiết xem trên  <a href='https://fategrandorder.fandom.com/vi/wiki/Thu%E1%BB%99c_t%C3%ADnh_%E1%BA%A9n' rel="noopener noreferrer" target='_blank'>Wiki</a></p> 
            </div>
          <div>_ Có một số servant có np đặc biệt thì web lấy np đầu tiên của dữ liệu, ví dụ : Mélusine np từ ascension stage 1-2 là thẻ Art hiệu ứng ST sát thương 1 mục tiêu</div>
          <div>_ Có 3 hiệu ứng của np là AOE : gây sát thương toàn bộ định, ST : sát thương 1 mục tiêu, support : np buff hỗ trợ</div>
          <h3>Vài ghi chú nhỏ của người lập trình :</h3>
          <div>_ Trang được tạo ra dựa trên game wordle và ăn theo game <a href='https://api.atlasacademy.io/' rel="noopener noreferrer" target='_blank'>genshindle (game dựa trên wordle về genshin)</a></div>
          <div>_ Dữ liệu trang web này sử dụng được lấy từ <a href='https://api.atlasacademy.io/' rel="noopener noreferrer" target='_blank'>Api của Atlas Academy</a> </div>
          <div>_ Dữ liệu mình tìm được còn 1 số thuộc tính như personality hoặc policy có thể dùng được, tuy nhiên 1 hàng hơi dài nên mình sẽ cho phép bạn ẩn cột đó đi, bạn thấy có nên thêm ko thì cho mình biết </div>
          <div>_ Ngoài ra mình muốn làm thêm 1 số thuộc tính như : nguồn gốc, vùng miền của servant tuy nhiên mình chưa có dữ liệu, dữ liệu thiếu, 
            bạn nào có đầy đủ có thể gửi mình =)))) ví dụ như dữ liệu sau nhưng đầy đủ hơn <a href='https://github.com/WeebMogul/Fate--Grand-Order-Servant-Data-Extractor/blob/master/FGO_Servant_Data.csv' rel="noopener noreferrer" target='_blank'>Github</a>
          </div>
          
        </div>
      </Modal>
    </div>
  );
}