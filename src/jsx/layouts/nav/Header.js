import React, { useEffect, useState } from 'react'    
import { Dropdown } from "react-bootstrap";
import tronlinklogo from './../../../images/tronlinklogo.png';


const Header = ({ tronWalletConnected, tronAccount, }) => {
	const [dropdowncolor, setDropdowncolor] = useState("#DE5106");
	const [dropdownDisabled, setDropdownDisabled] = useState(true);		


  useEffect(() => {
      if (tronWalletConnected)
      {
        setDropdowncolor("white");
        setDropdownDisabled(false);
      } else {
        setDropdowncolor("#DE5106");
        setDropdownDisabled(true);
      }
  },[tronWalletConnected])


  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
            <li className="nav-item">
              <div  style={{ width: "50vw"}}> 
                <div style={{ width: "100v%" }}> 
                </div> 
              </div>
            </li>
            </div>

            <ul className="" style={{backgroundColor:""}}>
              <Dropdown className="btn-sm rounded pb-1" style={{backgroundColor:"white"}}>
                    <input type="image"style={{width:"120px", height:"35px"}} src={tronlinklogo} />
              </Dropdown>  

              <div className="timeline-panel" style={{ marginTop:"20px", }}>
                    <div className="media me-2">
                    </div>
                    <div className="media-body" style={{ marginTop:"5px", }}>
                      <h6 className="mb-1">{tronAccount}</h6>
                    </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
