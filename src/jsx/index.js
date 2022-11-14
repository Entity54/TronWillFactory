import React, { useContext } from "react";
import {  Switch, Route } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";

import Header from "./layouts/nav/Header";
import NAV_NavHade from "./layouts/nav/NavHader";
import NAV_SideBar from "./layouts/nav/SideBar";
import Footer from "./layouts/Footer";
import DashboardDark from "./components/Dashboard/DashboardDark";

import ManageWill from "./components/Dashboard/ManageWill";
import MyWallet from "./components/Dashboard/MyWallet";
import Beneficiaries from "./components/Dashboard/Beneficiaries";

import { ThemeContext } from "../context/ThemeContext";  

const Markup = ( { 
  tronWeb, tronAccount, willFactory, tronAccountIsWillOwner, tronAccountOwnsWillAddress, tronWalletConnected, set_WillAddress,
  will, USDTtrc20, BTTtrc20, WINtrc20, JSTtrc20, blockHeader, willAdmininstrator,
}) => {

  const { menuToggle } = useContext(ThemeContext);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div id={`${!pagePath ? "main-wrapper" : ""}`} className={`${!pagePath ? "show" : "mh100vh"}  ${menuToggle ? "menu-toggle" : ""}`}>

        {!pagePath && <Header tronAccount={tronAccount} tronWalletConnected={tronWalletConnected} />}
        {!pagePath && <NAV_NavHade blockHeader={blockHeader} />}
        {!pagePath && <NAV_SideBar />}

        <div className={`${!pagePath ? "content-body" : ""}`} style={{marginBottom:"-450px"}}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              <Route exact path='/manage-will'> 
                  <ManageWill 
                      tronWeb={tronWeb} tronAccount={tronAccount} willFactory={willFactory} tronAccountIsWillOwner={tronAccountIsWillOwner} tronAccountOwnsWillAddress={tronAccountOwnsWillAddress} blockHeader={blockHeader} will={will}
                      USDTtrc20={USDTtrc20} BTTtrc20={BTTtrc20} WINtrc20={WINtrc20} JSTtrc20={JSTtrc20} set_WillAddress={set_WillAddress}  
                  /> 
              </Route>
              <Route exact path='/RegisterAccounts'> 
                  <MyWallet 
                      tronWeb={tronWeb} tronAccount={tronAccount} willFactory={willFactory} tronAccountIsWillOwner={tronAccountIsWillOwner} tronAccountOwnsWillAddress={tronAccountOwnsWillAddress} blockHeader={blockHeader} will={will}
                      willAdmininstrator={willAdmininstrator}
                  /> 
              </Route>
              <Route exact path='/RegisterBeneficiaries'> 
                  <Beneficiaries 
                    tronWeb={tronWeb} tronAccount={tronAccount} willFactory={willFactory} tronAccountIsWillOwner={tronAccountIsWillOwner} tronAccountOwnsWillAddress={tronAccountOwnsWillAddress} blockHeader={blockHeader} will={will}
                  /> 
              </Route>
              <Route exact path='/readme'> <DashboardDark/> </Route>
              <Route exact path='/'> <DashboardDark/> </Route>
            </Switch> 
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
    </>
  );
};

export default Markup;