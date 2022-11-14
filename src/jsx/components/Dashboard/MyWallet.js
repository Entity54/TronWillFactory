import React,{Fragment,useContext, useState, useEffect} from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { ThemeContext } from "../../../context/ThemeContext";
import SwiperSlider2 from "../Boltz/MyWallet/SwiperSlider2";
import AcPortfolio from "../Boltz/MyWallet/AcPortfolio";
import { set } from 'date-fns';


const CoinChart = loadable(() =>
  pMinDelay(import("../Boltz/MyWallet/CoinChart"), 1000)
);


const MyWallet = ({ tronWeb, tronAccount, willFactory, tronAccountIsWillOwner, tronAccountOwnsWillAddress, set_WillAddress, will, willAdmininstrator, }) => {
	const { background } = useContext(ThemeContext);
	const [newAccountToRegister, setNewAccountToRegister] = useState("");
	const [allAdminAccounts, setAllAdminAccounts] = useState([]);
	const [clickedAccount, setClickedAccount] = useState(null);
	const [permaWillAddress, setPermaWillAddress] = useState("");
 

	//#region registerNewAccount
	const registerNewAccount = async () => {
		console.log(`We will now register a new account ${newAccountToRegister} willAdmininstrator:${willAdmininstrator} Please wait... `);

		if (willAdmininstrator===newAccountToRegister)
		{
			console.log(`the new account to register is the will Administrator The Will contract address is tronAccountOwnsWillAddress:${tronAccountOwnsWillAddress}`);
			setPermaWillAddress(tronAccountOwnsWillAddress);
		}

		
		if (newAccountToRegister!=="")
		{
			will.registerOwnerAccounts(newAccountToRegister).send({
                feeLimit:100000000,
                callValue: 0,
                shouldPollResponse:true
            })
			.then((res) => {
				console.log(`Admin registered a new account: ${newAccountToRegister}`);
				getRegisteredAccounts();
			})
			.catch((er) => console.log(`Error in registerNewAccount: `,er));
		}
	}  

	const getRegisteredAccounts = async () => {
		console.log(`MyWallet => getRegisteredAccounts is running`);
		if (will)
		{
			let _adminAccounts  = await will.getAdminAccounts().call();
			console.log(`adminAccounts: `,JSON.stringify(_adminAccounts));
			_adminAccounts = _adminAccounts.map(ac => tronWeb.address.fromHex(ac) );
			console.log(`_adminAccounts: `,JSON.stringify(_adminAccounts));
			setAllAdminAccounts(_adminAccounts);
		}

	}
    
	const getClickedAccount = (address) => {
		console.log(`Account: ${address} is clicked`) 
		setClickedAccount(address);
	}
 
	useEffect(() => {
		console.log(`Setting clicked account to tronAccount: ${tronAccount}`);
		setClickedAccount(tronAccount);
		getRegisteredAccounts()
	},[])


	return(
		<Fragment>
			<div className="row">
				<div className="col-xl-1 col-xxl-4"></div>
				<div className="col-xl-3 col-xxl-4">
					<div className="form-head text-center mt-3">
						<h2 className="font-w600 mb-2 me-auto">Registered Accounts</h2>
					</div>
				</div>
				<div className="col-xl-4 col-xxl-4"></div>
				<div className="col-xl-4 col-xxl-4" style={{backgroundColor:""}}>
					<div className="row">
						<div className="col-xl-6 col-xxl-4">
							<input type="text" value = {newAccountToRegister } placeholder="New TRON Account to Register" className="form-control border-primary text-center" style={{color:"white", borderWidth:"2px", width:"100%"}} onChange={(event) => { 
												setNewAccountToRegister(event.target.value); } } />
						</div>
						<div className="col-xl-6 col-xxl-4">
							<button className="btn btn-primary" style={{border: "none", color:"white"}}  onClick = { () => registerNewAccount() }>Register Account</button> 
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-1 col-xxl-4"></div>
				<div className="col-xl-3 col-xxl-4">
					<div className="swiper-box mt-4">
						<SwiperSlider2 allAdminAccounts={allAdminAccounts} getClickedAccount={getClickedAccount} />
					</div>
				</div>
				<div className="col-xl-6 col-xxl-8">
				<div className="col-xl-9 col-xxl-8">
        			<AcPortfolio tronWeb={tronWeb} clickedAccount={clickedAccount} tronAccountOwnsWillAddress={tronAccountOwnsWillAddress} will={will} permaWillAddress={permaWillAddress} />
				</div>
				</div>
			</div>
		</Fragment>
	)
}		
export default MyWallet;