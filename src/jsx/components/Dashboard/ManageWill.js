import React,{Fragment,useContext, useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
// import { Dropdown } from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

//Import
import { ThemeContext } from "../../../context/ThemeContext";
// import Donut from "../Boltz/MyWallet/Donut";
// import WalletTab from "../Boltz/MyWallet/WalletTab";
// import BeneficiariesSlider from "../Boltz/MyWallet/BeneficiariesSlider";
// import BenefiiarySettings from "../Boltz/MyWallet/BenefiiarySettings";

 

// import { getSchedulerCounter, get_WillBeneficiaries, aliveAndKicking, checkWillStage, checkAdminBalance, getWillStats, 
// 	     getWillState, getWillStage, getSmartContractFeesBalances, getRegisteredAccount_ACA_Balance, 
// 		 get_AdminAccounts, get_SmartContractNonce, getSmartContractAllBalances, getAccountBalances, 
// 		 getInheritance_Cash } from '../../../ntt54_accounts.js';         

// import QuickTransfer from '../Boltz/Home/QuickTransfer';

const CoinChart = loadable(() =>
  pMinDelay(import("../Boltz/MyWallet/CoinChart"), 1000)
);

const MyWallet = ({ 
		tronWeb, tronAccount, willFactory, tronAccountIsWillOwner, tronAccountOwnsWillAddress, set_WillAddress, blockHeader,
		will, USDTtrc20, BTTtrc20, WINtrc20, JSTtrc20,
		// schedulerTrigger, ntt54Will_address, willAdmin, 
		// currentAccount, provider, wallet, ntt54Will
 }) => {
	const { background } = useContext(ThemeContext);
	const [willState  , setWillState]   = useState(false);
	const [willStage  , setWillStage]   = useState("");
	const [triggerPoint1  , setTriggerPoint1]           = useState("");
	const [triggerPoint2  , setTriggerPoint2]           = useState("");
	const [triggerPoint3  , setTriggerPoint3]           = useState("");
	const [lastCallPoint  , setLastCallPoint]           = useState("");


	const [adminBalances, setAdminBalances] = useState([]);
	const [beneficiaryBalances, setBeneficiaryBalances] = useState([]);
	const [willContractBalance, setWillContractBalance] = useState({accountAddress: "", usdtBalance: "", jstBalance:"", bttBalance:"", winBalance:"" });
	const [wilStatus, setWilStatus] = useState({state:"", stage:"", triggerPoint1:"", triggerPoint2:"", triggerPoint3:"", lastCallPoint:"", distributionPoint:"", phase1:0, phase2:0, phase3:0, phase4:0, phase5:0, });





	const createWill = async () => {
        if (tronWeb && willFactory)
		{
			console.log(`Creating a New Will for Account: ${tronAccount}`);
			await willFactory.createNewWill().send({
                feeLimit:2000000000,
                callValue: 0,
                shouldPollResponse:true
            });
			const willsAddressesLength  = await willFactory.willsAddressesLength().call();
            console.log(`willsAddressesLength: ${willsAddressesLength}`);

			const willAddress  = await willFactory.willsAddresses(willsAddressesLength-1).call();
            console.log(`New Will has been created with willAddress:  `,willAddress); //410b677073a5a8d976d92b7ba159f9c249ce35cea1
			set_WillAddress(willAddress);
		}
        else console.log(`tronWeb/willFactory not setup`);

	}

	
	const getWillStatus = async () => {
		console.log(`getting Will Status`);

		if (tronWeb && will)
		{
		    const triggerPoint1  = await will.triggerPoint1().call();
			console.log(`triggerPoint1: ${triggerPoint1}`);
			const triggerPoint2  = await will.triggerPoint2().call();
			console.log(`triggerPoint2: ${triggerPoint2}`);
			const triggerPoint3  = await will.triggerPoint3().call();
			console.log(`triggerPoint3: ${triggerPoint3}`);
			const lastCallPoint  = await will.lastCallPoint().call();
			console.log(`lastCallPoint: ${lastCallPoint}`);
			const distributionPoint  = await will.distributionPoint().call();
			console.log(`distributionPoint: ${distributionPoint}`);
			const willStage  = await will.willStage().call();
			console.log(`willStage: ${willStage}`);
			const willsState  = await will.willState().call();
			console.log(`willsState: ${willsState}`);

			const nowBlock = Number(blockHeader.number); 
			const phase1 = Number(triggerPoint1) - nowBlock;
			const phase2 = Number(triggerPoint2) - nowBlock;
			const phase3 = Number(triggerPoint3) - nowBlock;
			const phase4 = Number(lastCallPoint) - nowBlock;
			const phase5 = Number(distributionPoint) - nowBlock;

			setWilStatus({state:willsState, stage:willStage, triggerPoint1, triggerPoint2, triggerPoint3, lastCallPoint, distributionPoint, phase1, phase2, phase3, phase4, phase5, })
			setWillState(willsState)
		}
        else console.log(`getWillStatus tronWeb/will not setup`);

	}


	const initiateWill = async ( finalMessage="This is my final Will", dt1=10, dt2=10, dt3=50, dt4=50 ) => {
		console.log(`Initiate Will Button Clicked`)
        if (tronWeb && will)
		{
			console.log(`Initiating the Will for Account: ${tronAccount} finalMessage:${finalMessage} dt1:${dt1} dt2:${dt2} dt3:${dt3} dt4:${dt4}`);
			will.initiateWill(finalMessage, dt1, dt2, dt3, dt4 ).send({
                feeLimit:2100000000,
                callValue: 0,
                shouldPollResponse:true
            })
			.then(async (res) => {
				console.log(`Will in initiated`);
				const willGeneralMessage  = await will.willGeneralMessage().call();
				console.log(`willGeneralMessage: ${willGeneralMessage}`);
				const willIssueBlockNum  = await will.willIssueBlockNum().call();
				console.log(`willIssueBlockNum: ${willIssueBlockNum}`);
				await getWillStatus();
			})
			.catch((error) => console.log(`And error was thrown while will.initiateWill was called error: `,error));

		}
        else console.log(`initiateWill tronWeb/will not setup`);

	}


	const proofOfLife = async () => {
		console.log(`Will Owner is alive at Block Number: ${blockHeader.number}`);
		if (tronWeb && will)
		{
			will.aliveAndKicking().send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then(async (res) => {
				console.log(`Will aliveAndKicking is called`);
				await getWillStatus();
			})
			.catch((error) => console.log(`And error was thrown while will.aliveAndKicking was called error: `,error));
		}
		else console.log(`proofOfLife tronWeb/will not setup`);
	}


	//#region getBalances
	const getBalances = async (accountAddress="TNjieKUNS8xGBpsSDToekhnQAf8YLbzjuV") => {
		const usdtBalance  = tronWeb.fromSun(await USDTtrc20.balanceOf(accountAddress).call());
		let bttBalance   = tronWeb.fromSun(tronWeb.fromSun(tronWeb.fromSun(await BTTtrc20.balanceOf(accountAddress).call())));
		bttBalance = (bttBalance.split('.'))[0];
		const winBalance  = tronWeb.fromSun(await WINtrc20.balanceOf(accountAddress).call());
		const jstBalance  = tronWeb.fromSun(tronWeb.fromSun(tronWeb.fromSun(await JSTtrc20.balanceOf(accountAddress).call())));
		console.log(`For account: ${accountAddress} AcPortoflio USDT Balance: ${usdtBalance} bttBalance: ${bttBalance} winBalance: ${winBalance} jstBalance:${jstBalance}`);
	
		return {accountAddress, usdtBalance, jstBalance, bttBalance, winBalance, } 
	}
	//#endregion 


	const getAccountBalances = async () => {

		console.log(`ManageWill => getAccountBalances is running`);
		if (will && USDTtrc20 && BTTtrc20 && WINtrc20 && JSTtrc20)
		{
			let _adminAccounts  = await will.getAdminAccounts().call();
			_adminAccounts = _adminAccounts.map(ac => tronWeb.address.fromHex(ac) );
			console.log(`_adminAccounts: `,JSON.stringify(_adminAccounts));
			let admin_Balances = [];
			if (_adminAccounts.length>0)
			{
				for (let i=0; i<_adminAccounts.length; i++)
				{
					const accountAddress = _adminAccounts[i];
					const balances = await getBalances(accountAddress);
					admin_Balances.push(balances);
				}

			} else console.log(`ManageWill No Registered Admin accounts have been detected`);
			setAdminBalances(admin_Balances);
			console.log(`admin_Balances: `,JSON.stringify(admin_Balances,null,"\t"));


			let _beneficiariesAccounts  = await will.getWillBeneficiaries().call();
			_beneficiariesAccounts = _beneficiariesAccounts.map(ac => tronWeb.address.fromHex(ac) );
			console.log(`_beneficiariesAccounts: `,JSON.stringify(_beneficiariesAccounts));
			let beneficiaries_Balances = [];
			if (_beneficiariesAccounts.length>0)
			{
				for (let i=0; i<_beneficiariesAccounts.length; i++)
				{
					const benefAddress = _beneficiariesAccounts[i];
					const balances = await getBalances(benefAddress);
					beneficiaries_Balances.push(balances);
				}

			} else console.log(`ManageWill No Registered Beneficiary Accounts have been detected`);
			setBeneficiaryBalances(beneficiaries_Balances);
			console.log(`beneficiaries_Balances: `,JSON.stringify(beneficiaries_Balances,null,"\t"));


			let willContract_Balances = {accountAddress: "", usdtBalance: "", jstBalance:"", bttBalance:"", winBalance:"" };
			if (tronAccountOwnsWillAddress)
			{
				willContract_Balances =  await getBalances(tronAccountOwnsWillAddress);
			} else console.log(`Will contract is not set up, tronAccountOwnsWillAddress does not exist`);
			setWillContractBalance(willContract_Balances);
			console.log(`willContract_Balances: `,JSON.stringify(willContract_Balances,null,"\t"));


		}

	}

	// useEffect(() => {
	// 	console.log(`Manage Will Page Loading tronAccount: ${tronAccount}`);
	// 	// setClickedAccount(tronAccount);
	// 	getAccountBalances();
	// },[])

	useEffect(() => {
		const getSnapShot = async () => {
			if (blockHeader && blockHeader.number)
			{
				console.log(`Manage Will Page for tronAccount: ${tronAccount}. Get Balance at Block Number: ${blockHeader.number}`);
				await getAccountBalances();
				await getWillStatus();
			}
		}
		getSnapShot();
	},[blockHeader])


	return(
		<Fragment>
			<div className="row" style={{height:"auto"}}>
				<div className="col-xl-1 col-xxl-4"></div>


				<div className="col-xl-3 col-xxl-8">
					<div className="card"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-20 text-black"  onClick = { () => proofOfLife()} >HeartBeat</h4>
						</div>
						<div className="card-body" style={{height:"auto"}}>

								<br/>
								<br/>
								<div>{`Will State: ${wilStatus.state}`}</div>
								<div>{`Will Stage: ${wilStatus.stage}`}</div>
								<div>{`Will Trigger Point Block 1: ${wilStatus.triggerPoint1}`}</div>
								<div>{`Will Trigger Point Block 2: ${wilStatus.triggerPoint2}`}</div>
								<div>{`Will Trigger Point Block 3: ${wilStatus.triggerPoint3}`}</div>
								<div>{`Will Last Call Point Block: ${wilStatus.lastCallPoint}`}</div>
								<div>{`Will Distribution Point Block: ${wilStatus.distributionPoint}`}</div>
								<div>{`Phase1 Remaining: ${wilStatus.phase1>0?wilStatus.phase1:0}`}</div>
								<div>{`Phase2 Remaining: ${wilStatus.phase2>0?wilStatus.phase2:0}`}</div>
								<div>{`Phase3 Remaining: ${wilStatus.phase3>0?wilStatus.phase3:0}`}</div>
								<div>{`Phase4 Remaining: ${wilStatus.phase4>0?wilStatus.phase4:0}`}</div>
								<div>{`Phase5 Remaining: ${wilStatus.phase5>0?wilStatus.phase5:0}`}</div>
								<br/>
								<br/>


						{/* COUNTDOWN CLOCK CODE IN HERE */}

						</div>
					</div>
				</div>



				<div className="col-xl-7 col-xxl-8">
					<div className="card"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-20 text-black">Dashboard</h4>
						</div>
						<div className="card-body" style={{height:"auto"}}>
							<div  className="bg-gradient-1 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-2 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >Will State</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-2 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {willState===true?"Active":"Not Activated"} placeholder="" className="form-control" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3"></div>
								<div className="col-xl-2 col-xxl-4">
									<button className="btn btn-dark py-2 mx-4" style={{height:"", backgroundColor:`${tronAccountIsWillOwner?"grey":"red"}`  }} disabled={tronAccountIsWillOwner} 
									 onClick = { () => createWill()}
									>
										Create Will
									</button> 

								</div>
								<div className="col-xl-2 col-xxl-4">
									<button className="btn btn-dark py-2" style={{height:"", backgroundColor:`${tronAccountIsWillOwner?"red":"grey"}` }} disabled={!tronAccountIsWillOwner}  
									 onClick = { () => initiateWill()}
									>
										Initiate Will
									</button> 
								</div>
								<div className="col-xl-4 col-xxl-3"></div>
							</div>



					{adminBalances.map((data,index)=>(	
							<div key={index} className="bg-gradient-1 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-2 col-xxl-3"style={{backgroundColor:""}}>
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6">Admin Account</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"90%"}}>
												<input type="text" disabled readOnly value = {data.accountAddress} placeholder="" className="form-control" style={{color:"white",  textAlign:"center", backgroundColor:"" }} />
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="d-flex align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >Balances</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">USDT</p>
												<p className="mb-0 op-6">{data.usdtBalance}</p>

											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">JST</p>
												<p className="mb-0 op-6">{data.jstBalance}</p>

											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">BTT</p>
												<p className="mb-0 op-6">{data.bttBalance}</p>

											</div>
										</div>
									</div>
								</div>

								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">WIN</p>
												<p className="mb-0 op-6">{data.winBalance}</p>

											</div>
										</div>
									</div>
								</div>
							</div>

					))}


							<div  className="bg-gradient-3 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-2 col-xxl-3"style={{backgroundColor:""}}>
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6">Will Contract </p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="d-flex align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"90%"}}>
												<input type="text" disabled readOnly value = {willContractBalance.accountAddress} placeholder="" className="form-control" style={{color:"white",  textAlign:"center", backgroundColor:"", fontSize:"" }} />
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="d-flex align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >Balances</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">USDT</p>
												<p className="mb-0 op-6">{willContractBalance.usdtBalance}</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">JST</p>
												<p className="mb-0 op-6">{willContractBalance.jstBalance}</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">BTT</p>
												<p className="mb-0 op-6">{willContractBalance.bttBalance}</p>
											</div>
										</div>
									</div>
								</div>

								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">WIN</p>
												<p className="mb-0 op-6">{willContractBalance.winBalance}</p>
											</div>
										</div>
									</div>
								</div>
							</div>


					{beneficiaryBalances.map((data,index)=>(	
							<div key={index}  className="bg-gradient-3 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-2 col-xxl-3"style={{backgroundColor:""}}>
									<div className="mb-2 pt-2">
										<div className="align-items-center">
											<div className="ms-3">
												<p className="mb-0 op-6">Beneficiary {`${index+1}`}</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2 pt-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0" style={{backgroundColor:"", width:"90%"}}>
												<input type="text" disabled readOnly value = {data.accountAddress}
											placeholder="" className="form-control" style={{color:"white",  textAlign:"center", backgroundColor:"", fontSize:"" }} />
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2 pt-2">
										<div className="align-items-center">
											<div className="ms-3">
												<p className="mb-0 op-6" >Balances</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">USDT</p>
												<p className="mb-0 op-6 text-center">{data.usdtBalance}</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">JST</p>
												<p className="mb-0 op-6 text-center">{data.jstBalance}</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">BTT</p>
												<p className="mb-0 op-6 text-center">{data.bttBalance}</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-1 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2 text-center">
												<p className="mb-0 op-6">WIN</p>
												<p className="mb-0 op-6 text-center">{data.winBalance}</p>

											</div>
										</div>
									</div>
								</div>
							</div>
					))}
						

						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}		
export default MyWallet;