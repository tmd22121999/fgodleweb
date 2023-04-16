import React, { useState }  from 'react';
import './styles.css';

const Tooltip =({content,children}) => {
    const [isShow,setIsShow]=useState(false)
    return (
      <div onMouseOver={()=>setIsShow(true)} onMouseOut={()=>setIsShow(false)} className='tooltip'>
        {isShow?<div className='tooltip-content top' dangerouslySetInnerHTML={{ __html: content }}>
            
        </div>:null}
        {children}
      </div>
    );
}
export default Tooltip