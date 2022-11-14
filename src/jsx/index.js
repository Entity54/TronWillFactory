import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";
  
/// Css 
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Header from "./layouts/nav/Header";
import NAV_NavHade from "./layouts/nav/NavHader";
import NAV_SideBar from "./layouts/nav/SideBar";
import Footer from "./layouts/Footer";
/// Dashboard
import DashboardDark from "./components/Dashboard/DashboardDark";
// import DEX from "./components/Dashboard/DEX";
// import Portofolio from "./components/Dashboard/Portofolio";

// import InitiateWill from "./components/Dashboard/InitiateWill";
import ManageWill from "./components/Dashboard/ManageWill";

import MyWallet from "./components/Dashboard/MyWallet";
import Beneficiaries from "./components/Dashboard/Beneficiaries";

import { ThemeContext } from "../context/ThemeContext";  

const Markup = ( { 
  tronWeb, tronAccount, willFactory, tronAccountIsWillOwner, tronAccountOwnsWillAddress, tronWalletConnected, set_WillAddress,
  will, USDTtrc20, BTTtrc20, WINtrc20, JSTtrc20, blockHeader, willAdmininstrator,
  // schedulerTrigger, willAdmin, 
  // ntt54Will_address, currentAccount, provider, wallet, ntt54Will, setupSpecs, portfolio, oracleData, blockChainSpecs, 
  // blockTimestamp, 
  // evm_api_state, 
  // accountList, selectedAccountName 
}) => {

  const { menuToggle } = useContext(ThemeContext);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div id={`${!pagePath ? "main-wrapper" : ""}`} className={`${!pagePath ? "show" : "mh100vh"}  ${menuToggle ? "menu-toggle" : ""}`}>

        {!pagePath && <Header tronAccount={tronAccount} tronWalletConnected={tronWalletConnected}
        // setupSpecs={setupSpecs} evm_api_state={evm_api_state}  blockHeader={blockHeader} accountList={accountList} selectedAccountName={selectedAccountName}  
        />}
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
                      // schedulerTrigger={schedulerTrigger} willAdmin={willAdmin} ntt54Will_address={ntt54Will_address} currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={ntt54Will} setupSpecs={setupSpecs} portfolio={portfolio} 
                      // accountList={accountList}
                  /> 
              </Route>

              {/* <Route exact path='/'> <MyWallet currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={ntt54Will}  setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader} accountList={accountList}/> </Route> */}
              <Route exact path='/RegisterAccounts'> 
                  <MyWallet 
                      tronWeb={tronWeb} tronAccount={tronAccount} willFactory={willFactory} tronAccountIsWillOwner={tronAccountIsWillOwner} tronAccountOwnsWillAddress={tronAccountOwnsWillAddress} blockHeader={blockHeader} will={will}
                      willAdmininstrator={willAdmininstrator}
                      // currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={ntt54Will}  setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader} accountList={accountList}
                  /> 
              </Route>

              <Route exact path='/RegisterBeneficiaries'> 
                  <Beneficiaries 
                    tronWeb={tronWeb} tronAccount={tronAccount} willFactory={willFactory} tronAccountIsWillOwner={tronAccountIsWillOwner} tronAccountOwnsWillAddress={tronAccountOwnsWillAddress} blockHeader={blockHeader} will={will}
                    // currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={ntt54Will}  setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader} accountList={accountList}
                  /> 
              </Route>

              {/* <Route exact path='/'> <DashboardDark setupSpecs={setupSpecs} oracleData={oracleData} blockHeader={blockHeader} accountList={accountList} /> </Route> */}
              {/* <Route exact path='/readme'> <DashboardDark setupSpecs={setupSpecs} oracleData={oracleData} blockHeader={blockHeader} accountList={accountList} /> </Route> */}
              <Route exact path='/readme'> <DashboardDark/> </Route>
              <Route exact path='/'> <DashboardDark/> </Route>

             
              {/* <Route exact path='/portofolio'> <Portofolio willAdmin={willAdmin} ntt54Will_address={ntt54Will_address} currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={ntt54Will} setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader} accountList={accountList}/> </Route> */}
              {/* <Route exact path='/initate-will'> <InitiateWill willAdmin={willAdmin} ntt54Will_address={ntt54Will_address} currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={ntt54Will} setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader} accountList={accountList}/> </Route> */}
              {/* <Route exact path='/dex'> <DEX  setupSpecs={setupSpecs} portfolio={portfolio} oracleData={oracleData} blockHeader={blockHeader} accountList={accountList} /> </Route> */}

            </Switch> 
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
    </>
  );
};

export default Markup;
