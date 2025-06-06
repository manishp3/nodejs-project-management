import React from 'react'

const Header = () => {
  return (
    <>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"ocean"}}>
        <div style={{outline:"none"}}>
            <input type='text' placeholder='search...' />
        </div>
        <div style={{}}>
            <i className="fa-solid fa-bell"></i>
        </div>
        </div> 
    </>
  )
}

export default Header
