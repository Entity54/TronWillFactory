import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import Index from "./jsx";
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";


import willFactory_artifact from './Abis/willFactory.json';     
import will_artifact from './Abis/will.json';     

const willFactoryAbi = willFactory_artifact.abi;
const willFactoryAddress = "TTRLq8EXy5p1Tj1BziP6B9nCtz9DAuvnTp";
let willFactory;

const willAbi = will_artifact.abi;
const _willAddress = "TBHLsbmX2mhSyWjXdh1fciCmHNbXHca8Yy";
let blockNumIntrvlId;

//EXAMPLES
//willFactory admin = 0x04AeD342d172CF3447EF66e74E6FAE4c1E4905eE
// Example wiil sc  address = "TB1WMFksqYZbQG9HGj7rrSiyvkThEeoT6v"
// const wOwnerAdmin1 = "TPQbn39CuLenWz6w9qocFCaYjB4DZ6Tb7P";
// willAdmin: TNjieKUNS8xGBpsSDToekhnQAf8YLbzjuV
// will_scAdmin: TTRLq8EXy5p1Tj1BziP6B9nCtz9DAuvnTp                 // willFactorySC
// const wOwnerAdminTest1 = "TNjieKUNS8xGBpsSDToekhnQAf8YLbzjuV";   //will ADMIN ACCOUNT 1
// const wOwnerAdminTest2 = "TBCV2EJhTcQAx37rcJNQ9pWTnzbWMo1f5m";
// Beneficiary1 TU9XxmnUQY3RRHMQfamMfAYLPUMGb77BfM       Beneficiary2 TCgfUiEWdefR9mfenr8neR8x39uskBbzUG

const USDTaddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";
const BTTaddress = "TNuoKL1ni8aoshfFL1ASca1Gou9RXwAzfn";
const WINaddress = "TU2T8vpHZhCNY8fXGVaHyeZrKm8s6HEXWe";
const JSTaddress = "TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3";


function App (props) {
  const [tronWeb, setTronWeb]   = useState();
  const [tronWalletConnected, setTronWalletConnected]   = useState(false);
  const [tronAccount, setTronAccount]   = useState();
  const [blockHeader, setBlockHeader] = useState({ number: undefined});
  const [tronAccountIsWillOwner, setTronAccountIsWillOwner]   = useState(false);
  const [tronAccountOwnsWillAddress, setTronAccountOwnsWillAddress]   = useState(""); //410000000000000000000000000000000000000000 is 0x00
  const [will,setWill] = useState(null);
  const [USDTtrc20,setUSDTtrc20] = useState(null);
  const [BTTtrc20,setBTTtrc20] = useState(null);
  const [WINtrc20,setWINtrc20] = useState(null);
  const [JSTtrc20,setJSTtrc20] = useState(null);
  const [willAdmininstrator,setWillAdmininstrator] = useState(null);


  //#region getTronWeb
  const getTronWeb = () => {

    window.addEventListener('message', function (e) {
      
        if (e.data.message && e.data.message.action == "accountsChanged") {
            console.log("accountsChanged event", e.data.message)
            console.log("current address:", e.data.message.data.address);
            console.log(`tronWeb successfully detected! NEW TRONLINK ADDRESS: ${window.tronWeb.defaultAddress.base58}`); 
            setTronWeb(window.tronWeb);
            setTronAccount(window.tronWeb.defaultAddress.base58);
        }

    })

    // Obtain the tronweb object injected by tronLink 
    var obj = setInterval(async ()=>{
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(obj)
          console.log(`tronWeb successfully detected! TRONLINK ADDRESS: ${window.tronWeb.defaultAddress.base58}`); 
          setTronWeb(window.tronWeb);
          setTronAccount(window.tronWeb.defaultAddress.base58);
          setTronWalletConnected(true);
      }
    }, 10)
  }
  //#endregion getTronWeb

  const initiate_WillSC = async (will_Address="") => {
    if (tronWeb && will_Address!=="")
    {
      console.log(`Initiating Will smart contract at ${will_Address}`);
      const willSC = await tronWeb.contract(willAbi, will_Address);

      const willAdmin  = tronWeb.address.fromHex(await willSC.willAdmin().call());
      console.log(`willAdmin: ${willAdmin}`);

      const will_scAdmin  = await willSC.scAdmin().call();
      console.log(`will_scAdmin: ${tronWeb.address.fromHex(will_scAdmin)}`);
      setWill(willSC);
      setWillAdmininstrator(willAdmin);
    }

  }
  
  const set_WillAddress = (address) => {
    console.log(`set_WillAddress is run for address: ${address}`);
    setTronAccountOwnsWillAddress(tronWeb.address.fromHex(`${address}`));
    setTronAccountIsWillOwner(true);
    initiate_WillSC(tronWeb.address.fromHex(`${address}`));
  }
  
  useEffect(() => {
    const initiateWillFactorySC = async () => {
      console.log(` *** tronAccount: ${tronAccount} tronAccountToHex: ${ tronWeb.address.toHex(tronAccount)}`);  
      
      console.log("Initiating Will Factory smart Contract");
      willFactory = await tronWeb.contract().at(willFactoryAddress);

      //WHO IS THE ADMIN OF THE WILLFACTORY SC
      const willFactoryAdmin  = await willFactory.admin().call();
      console.log(` *** willFactoryAdmin: ${willFactoryAdmin}`);  //*** willFactoryAdmin: 41da7b7457b4e71796cee8a466a1a3a635fad45451

      //HOW MANY WILLADDRESS HAVE BEEN LAUNCHED
      const willsAddressesLength  = await willFactory.willsAddressesLength().call();
      console.log(` *** willsAddressesLength: ${willsAddressesLength}`);   

      //DOES THE ACCOUT OWN A WILL? (TRUE/FALSE)
      const tronAccountIsWillOwner  = await willFactory.willOwners(`${tronAccount}`).call();
      console.log(` ***  tronAccountIsWillOwner: ${tronAccountIsWillOwner}`); //false 
      
      //WHICH WILL DOES THE ACCOUNT OWN? (410000000000000000000000000000000000000000 FOR 0X00 ADDRESS)
      const _tronAccountOwnsWillAddress  = tronWeb.address.fromHex(await willFactory.accountOwnsWill(tronAccount).call());
      console.log(` *** tronAccountOwnsWillAddress: ${_tronAccountOwnsWillAddress}`);  
      if (_tronAccountOwnsWillAddress!=="410000000000000000000000000000000000000000")
      {
        console.log("Account owns a will");
        initiate_WillSC(_tronAccountOwnsWillAddress);
      }

      setTronAccountIsWillOwner(tronAccountIsWillOwner);
      setTronAccountOwnsWillAddress(_tronAccountOwnsWillAddress);
    };

    const initiateTRC20contracts = async () => {
				console.log(`App Setting up TRC20 contracts`);
				const USDT = await tronWeb.contract().at(USDTaddress);
				const BTT = await tronWeb.contract().at(BTTaddress);
				const WIN = await tronWeb.contract().at(WINaddress);
				const JST = await tronWeb.contract().at(JSTaddress);
        setUSDTtrc20(USDT);
        setBTTtrc20(BTT);
        setWINtrc20(WIN);
        setJSTtrc20(JST);
		}

    const startBlockCounter = () => {
      if(blockNumIntrvlId) {
        console.log(`Clear blockNumIntrvlId: ${blockNumIntrvlId}`);
        clearInterval(blockNumIntrvlId);
      }

      blockNumIntrvlId = setInterval(async () => {
        const block_header = await tronWeb.trx.getCurrentBlock();
        console.log(`block_header: ${block_header.block_header.raw_data.number}`);
        setBlockHeader({number: `${block_header.block_header.raw_data.number}`})
      },10000);
    }
    
    if (tronWeb && tronAccount) {
      initiateWillFactorySC();
      initiateTRC20contracts();
      startBlockCounter();
    }
  },[tronWeb, tronAccount]);
  
  useEffect(() => {
    getTronWeb();
  },[]);
 

	return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index 
                          tronWeb={tronWeb} tronAccount={tronAccount} willFactory={willFactory} tronAccountIsWillOwner={tronAccountIsWillOwner} tronAccountOwnsWillAddress={tronAccountOwnsWillAddress} set_WillAddress={set_WillAddress}
                          will={will} USDTtrc20={USDTtrc20} BTTtrc20={BTTtrc20} WINtrc20={WINtrc20} JSTtrc20={JSTtrc20}
                          tronWalletConnected={tronWalletConnected} blockHeader={blockHeader} willAdmininstrator={willAdmininstrator}
                    />
                </Suspense>
            </>
    );
	
};


export default App;