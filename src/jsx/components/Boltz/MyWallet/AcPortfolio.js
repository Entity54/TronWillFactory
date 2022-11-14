import React,{useState,useEffect } from 'react';

const USDTaddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";
const BTTaddress = "TNuoKL1ni8aoshfFL1ASca1Gou9RXwAzfn";
const WINaddress = "TU2T8vpHZhCNY8fXGVaHyeZrKm8s6HEXWe";
const JSTaddress = "TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3";
let USDT, BTT, WIN, JST;


const AcPortfolio = ({ tronWeb, clickedAccount, tronAccountOwnsWillAddress, will, permaWillAddress, }) => {
	const [myPortfolio, setMyPortfolio] = useState(null);
	const [accountbalances, setAccountbalances] = useState([]);


	//#region getBalances
	const getBalances = async (accountAddress="TNjieKUNS8xGBpsSDToekhnQAf8YLbzjuV") => {
		const usdtBalance  = tronWeb.fromSun(await USDT.balanceOf(accountAddress).call());
		let bttBalance   = tronWeb.fromSun(tronWeb.fromSun(tronWeb.fromSun(await BTT.balanceOf(accountAddress).call())));
		bttBalance = (bttBalance.split('.'))[0];
		const winBalance  = tronWeb.fromSun(await WIN.balanceOf(accountAddress).call());
		const jstBalance  = tronWeb.fromSun(tronWeb.fromSun(tronWeb.fromSun(await JST.balanceOf(accountAddress).call())));
		console.log(`For account: ${accountAddress} AcPortoflio USDT Balance: ${usdtBalance} bttBalance: ${bttBalance} winBalance: ${winBalance} jstBalance:${jstBalance}`);
		
		const usdtAllowance = tronWeb.fromSun(await USDT.allowance(accountAddress, tronAccountOwnsWillAddress).call());
		console.log(` ======> usdtAllowance: ${usdtAllowance}`);
		const bttAllowance = tronWeb.fromSun(await BTT.allowance(accountAddress, tronAccountOwnsWillAddress).call());
		console.log(` ======> bttAllowance: ${bttAllowance}`);
		const winAllowance = tronWeb.fromSun(await WIN.allowance(accountAddress, tronAccountOwnsWillAddress).call());
		console.log(` ======> winAllowance: ${winAllowance}`);
		const jstAllowance = tronWeb.fromSun(await JST.allowance(accountAddress, tronAccountOwnsWillAddress).call());
		console.log(` ======> jstAllowance: ${jstAllowance}`);

		const usdtRegistered = await will.registeredAccountToken(accountAddress,USDTaddress).call();
		const bttRegistered = await will.registeredAccountToken(accountAddress,BTTaddress).call();
		const winRegistered = await will.registeredAccountToken(accountAddress,WINaddress).call();
		const jstRegistered = await will.registeredAccountToken(accountAddress,JSTaddress).call();

		// console.log(` ======> usdtRegistered: ${usdtRegistered}`);
		// const _willAdmin = await will.willAdmin().call();
		// console.log(` ======> _willAdmin: ${_willAdmin}`);


		
		setAccountbalances(
			[
				{name: "Tether USD"  , ticker: "USDT", numTokens: usdtBalance, approvedColor: usdtAllowance==="0"?"green":"grey", registeredColor: !usdtRegistered?"orange":"grey" }, 
				{name: "BitTorrent"  , ticker: "BTT", numTokens: bttBalance, approvedColor: bttAllowance==="0"?"green":"grey", registeredColor: !bttRegistered?"orange":"grey"  }, 
				{name: "WINK"  , ticker: "WIN", numTokens: winBalance, approvedColor: winAllowance==="0"?"green":"grey", registeredColor: !winRegistered?"orange":"grey"  }, 
				{name: "JUST GOV"  , ticker: "JST", numTokens: jstBalance, approvedColor: jstAllowance==="0"?"green":"grey", registeredColor: !jstRegistered?"orange":"grey"  }
			]
		);
	}
	//#endregion 

	//#region approveToken
	const approveToken = async (token) => {
		console.log(`AcPortfolio Approve has been clicked for token: ${token}  and Will Contract with address: ${tronAccountOwnsWillAddress} permaWillAddress: ${permaWillAddress} `);
		let tWillAddress = tronAccountOwnsWillAddress;
		
		const amountToApprove = tronWeb.toSun(tronWeb.toSun(tronWeb.toSun(tronWeb.toSun("123456789"))));
        if (token==="USDT")
		{
			console.log(`Will Approve USDT for Will Contract ${tWillAddress} amountToApprove: ${amountToApprove}`);
			USDT.approve(tWillAddress, amountToApprove ).send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then((res) => {
				console.log(`Account: ${clickedAccount} has approved Will Contract: ${tWillAddress} for: ${amountToApprove}`);
				getBalances(clickedAccount);
			})
			.catch((er) => console.log(`Error in approving USDT: `,er));
		}
		else if (token==="BTT")
		{
			console.log(`Will Approve BTT for Will Contract ${tWillAddress} amountToApprove: ${amountToApprove}`);
			BTT.approve(tWillAddress, amountToApprove ).send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then((res) => {
				console.log(`Account: ${clickedAccount} has approved Will Contract: ${tWillAddress} for: ${amountToApprove}`);
				getBalances(clickedAccount);
			})
			.catch((er) => console.log(`Error in approving BTT : `,er));
		}
		else if (token==="WIN")
		{
			console.log(`Will Approve WIN for Will Contract ${tWillAddress} amountToApprove: ${amountToApprove}`);
			WIN.approve(tWillAddress, amountToApprove ).send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then((res) => {
				console.log(`Account: ${clickedAccount} has approved Will Contract: ${tWillAddress} for: ${amountToApprove}`);
				getBalances(clickedAccount);
			})
			.catch((er) => console.log(`Error in approving WIN: `,er));
		}
		else if (token==="JST")
		{
			console.log(`Will Approve JST for Will Contract ${tWillAddress} amountToApprove: ${amountToApprove}`);
			JST.approve(tWillAddress, amountToApprove ).send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then((res) => {
				console.log(`Account: ${clickedAccount} has approved Will Contract: ${tWillAddress} for: ${amountToApprove}`);
				getBalances(clickedAccount);
			})
			.catch((er) => console.log(`Error in approving JST: `,er));
		}


	}
	//#endregion

	//#region registerToken
	const registerToken = async (token) => {
		console.log(`AcPortfolio registerToken has been clicked for token: `,token);
		if (will)
		{
			console.log(`AcPortfolio Register has been clicked for token: ${token}  and Will Contract with address: ${tronAccountOwnsWillAddress}`);
			if (token==="USDT")
			{
				console.log(`Will Register USDT for Will Contract ${tronAccountOwnsWillAddress} and account: ${clickedAccount}`);
				will.registerAccountTokens(clickedAccount, USDTaddress ).send({
					feeLimit:200000000,
					callValue: 0,
					shouldPollResponse:true
				})
				.then((res) => {
					console.log(`Account: ${clickedAccount} has registred in Will Contract: ${tronAccountOwnsWillAddress} USDT`);
					getBalances(clickedAccount);
				})
				.catch((er) => console.log(`Error in registering USDT: `,er));
			}
			else if (token==="BTT")
			{
				console.log(`Will Register BTT for Will Contract ${tronAccountOwnsWillAddress} and account: ${clickedAccount}`);
				will.registerAccountTokens(clickedAccount, BTTaddress ).send({
					feeLimit:200000000,
					callValue: 0,
					shouldPollResponse:true
				})
				.then((res) => {
					console.log(`Account: ${clickedAccount} has registred in Will Contract: ${tronAccountOwnsWillAddress} BTT`);
					getBalances(clickedAccount);
				})
				.catch((er) => console.log(`Error in registering BTT : `,er));
			}
			else if (token==="WIN")
			{
				console.log(`Will Register WIN for Will Contract ${tronAccountOwnsWillAddress} and account: ${clickedAccount}`);
				will.registerAccountTokens(clickedAccount, WINaddress ).send({
					feeLimit:200000000,
					callValue: 0,
					shouldPollResponse:true
				})
				.then((res) => {
					console.log(`Account: ${clickedAccount} has registred in Will Contract: ${tronAccountOwnsWillAddress} WIN`);
					getBalances(clickedAccount);
				})
				.catch((er) => console.log(`Error in registering WIN: `,er));
			}
			else if (token==="JST")
			{
				console.log(`Will Register JST for Will Contract ${tronAccountOwnsWillAddress} and account: ${clickedAccount}`);
				will.registerAccountTokens(clickedAccount, JSTaddress ).send({
					feeLimit:200000000,
					callValue: 0,
					shouldPollResponse:true
				})
				.then((res) => {
					console.log(`Account: ${clickedAccount} has registred in Will Contract: ${tronAccountOwnsWillAddress} JST`);
					getBalances(clickedAccount);
				})
				.catch((er) => console.log(`Error in registering JST: `,er));
			}
		}
		else console.log(`Will smart contract is not setup yet`);

	}
	//#endregion

	//#region refreshData
	const refreshData = (_portfolio) =>{
			return _portfolio.map((token, index) => {
				return (
					<div key={index} className="bg-gradient-1 coin-holding flex-wrap m-3" style={{height:"70px"}}>
						<div className="col-xl-1 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-1" >{token.name}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-1 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-1">{token.ticker}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-1 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-1">{token.numTokens}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-1 col-xxl-3">
							<div className="mb-2">
								<div className="">
									<button className="btn-sm btn-dark mb-2 mx-4 rounded text-white" style={{border: "none", color:"black", backgroundColor:`${token.approvedColor}`}} disabled={token.approvedColor==="grey"?true:false}  onClick = { () => approveToken(token.ticker) }>Approve</button> 
								</div>
							</div>
						</div>
						<div className="col-xl-1 col-xxl-3">
							<div className="mb-2">
								<div className="">
									<button className="btn-sm btn-dark mb-2 mr-3 rounded text-white" style={{border: "none", color:"black", backgroundColor:`${token.registeredColor}`}} disabled={token.registeredColor==="grey"?true:false}  onClick = { () => registerToken(token.ticker) }>Register</button> 
								</div>
							</div>
						</div>
					</div>
				)
			});
	}
	//#endregion 

	useEffect(() => {
		if (accountbalances.length>0)
		{
			setMyPortfolio( refreshData(accountbalances) );
		}
	}, [accountbalances]);

	useEffect(() => {
		const initiateTRC20contracts = async () => {
			if (tronWeb && tronAccountOwnsWillAddress && clickedAccount)
			{
				console.log(`AcPortfolio Setting up TRC20 contracts`);
				USDT = await tronWeb.contract().at(USDTaddress);
				BTT = await tronWeb.contract().at(BTTaddress);
				WIN = await tronWeb.contract().at(WINaddress);
				JST = await tronWeb.contract().at(JSTaddress);

				getBalances(clickedAccount);
			}
		}
		initiateTRC20contracts();
		console.log(`AcPortioflio tronAccountOwnsWillAddress: ${tronAccountOwnsWillAddress} clickedAccount: ${clickedAccount}`);
	
	}, [tronWeb, clickedAccount, tronAccountOwnsWillAddress]);


	return (
		<>
			<div className="card mt-4" style={{width:"auto", height:"auto"}}>
				<div className="card-header border-0 pb-0">
					<h4 className="mb-0 fs-24 text-black text-center mx-auto">Account Asset Holdings</h4>
				</div>

				<div className="card-body" style={{overflowY: "auto", height:"auto"}}>
					{myPortfolio}
				</div>
			</div>
		
		</>
    )
}
export default AcPortfolio; 