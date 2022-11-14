import React,{Fragment,useContext, useState, useEffect} from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { ThemeContext } from "../../../context/ThemeContext";
import BeneficiariesSlider from "../Boltz/MyWallet/BeneficiariesSlider";
import BenefiiarySettings from "../Boltz/MyWallet/BenefiiarySettings";


const CoinChart = loadable(() =>
  pMinDelay(import("../Boltz/MyWallet/CoinChart"), 1000)
);

const MyWallet = ({ 
	tronWeb, clickedAccount, tronAccountOwnsWillAddress, will,
}) => {
	const { background } = useContext(ThemeContext);
	const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
	const [beneficiaryNickname, setBeneficiaryNickname] = useState("");
	const [finalMessage, setFinalMessage] = useState("");
	const [percentageSplit, setPercentageSplit] = useState("");
	const [detailedBeneficiariesArray, setDetailedBeneficiariesArray] = useState([]);
	const [showBeneficiaryDetails, setShowBeneficiaryDetails] = useState({address: "", nickName: "", message: "", percent: "", index: ""});


    const set_beneficiaryNickname = (nickname) => {
		console.log(` =====> nickname:${nickname}`);
		setBeneficiaryNickname(nickname);
	}
	const set_finalMessage = (message) => {
		console.log(` =====> message:${message}`);

		setFinalMessage(message);
	}
	const set_percentageSplit = (percentage) => {
		console.log(` =====> percentage:${percentage}`);

		setPercentageSplit(percentage);
	}

	const registerBeneficiary = async () => {
		console.log(`We will now register a new Beneficiary ${beneficiaryAddress} beneficiaryNickname: ${beneficiaryNickname} finalMessage:${finalMessage} percentageSplit:${percentageSplit}`);
		
		if (will && beneficiaryAddress!=="" && beneficiaryNickname!=="" && finalMessage!=="" && percentageSplit!=="")
		{
			will.addWillBeneficiary(beneficiaryAddress, beneficiaryNickname, finalMessage, percentageSplit).send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then((res) => {
				console.log(`New Beneficiary with address: ${beneficiaryAddress} has been registered.`);
				getBeenficiaryAccounts();
			})
			.catch((er) => console.log(`Error in registerBeneficiary: `,er));

		}
		else console.log(`One or more required fields were not filled in. Please fill in or fields`);

	}  


	const getBeenficiaryAccounts = async () => {

		console.log(`Beneficiaries => getBeenficiaryAccounts is running`);
		if (will)
		{
			let beneficiaryAddresses  = await will.getWillBeneficiaries().call();
			beneficiaryAddresses = beneficiaryAddresses.map(ac => tronWeb.address.fromHex(ac) );
			console.log(`beneficiaryAddresses: `,JSON.stringify(beneficiaryAddresses)); //["TU9XxmnUQY3RRHMQfamMfAYLPUMGb77BfM"]

			let beneficiariesArray = [];
			if (beneficiaryAddresses.length>0)
			{
				for (let i=0; i<beneficiaryAddresses.length; i++)
				{
					const beneficiaryStruct  = await will.getBeneficiaryByAddress( beneficiaryAddresses[i] ).call();
					console.log(`beneficiaryStruct: `,JSON.stringify(beneficiaryStruct));
					const beneficiaryArrayElement = {address: tronWeb.address.fromHex(beneficiaryStruct[0]), nickName: beneficiaryStruct[1], message: beneficiaryStruct[2], percent: `${beneficiaryStruct[3]}`, index: `${beneficiaryStruct[4]}`}; 
					console.log(`beneficiaryArrayElement: `,JSON.stringify(beneficiaryArrayElement));
					beneficiariesArray.push(beneficiaryArrayElement);
				}
				

			}
			else console.log("There are no beneficiaries set yet");
			console.log(`Getting Ready to update detailedBeneficiariesArray: `,JSON.stringify(beneficiariesArray));
		
			setDetailedBeneficiariesArray(beneficiariesArray)
		}

	}

	const amendBeneficiary = async (newbenficiaryDetailsObj) => {
		console.log(`amendBeneficiary ${newbenficiaryDetailsObj.address} beneficiaryNickname: ${newbenficiaryDetailsObj.nickname} finalMessage:${newbenficiaryDetailsObj.message} percentageSplit:${newbenficiaryDetailsObj.percent} id:${newbenficiaryDetailsObj.id}`);
		
		if (will && newbenficiaryDetailsObj.address!=="" && newbenficiaryDetailsObj.nickname!=="" && newbenficiaryDetailsObj.message!=="" && newbenficiaryDetailsObj.percent!=="" && newbenficiaryDetailsObj.id!=="")
		{
			will.amendWillBeneficiary(newbenficiaryDetailsObj.address, newbenficiaryDetailsObj.nickname, newbenficiaryDetailsObj.message, newbenficiaryDetailsObj.percent).send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then((res) => {
				console.log(`Beneficiary details with address: ${newbenficiaryDetailsObj.address} have been amended.`);
				getBeenficiaryAccounts();
			})
			.catch((er) => console.log(`Error in amendBeneficiary: `,er));

		}
		else console.log(`One or more required fields were not filled in. Please fill in or fields`);

	}

	const removeBeneficiary = async (newbenficiaryDetailsObj) => {
		console.log(`removeBeneficiary ${newbenficiaryDetailsObj.address}`);
		
		if (will && newbenficiaryDetailsObj.address!=="")
		{
			will.removeWillBeneficiary(newbenficiaryDetailsObj.address).send({
				feeLimit:200000000,
				callValue: 0,
				shouldPollResponse:true
			})
			.then((res) => {
				console.log(`Beneficiary details with address: ${newbenficiaryDetailsObj.address} have been removed.`);
				getBeenficiaryAccounts();
			})
			.catch((er) => console.log(`Error in removeBeneficiary: `,er));

		}
		else console.log(`One or more required fields were not filled in. Please fill in or fields`);

	}
		
	const getClickedCard = (indx) => {
		console.log(`Beneficiaries The card with index:${indx} has been clicked  detailedBeneficiariesArray[indx]: `,JSON.stringify(detailedBeneficiariesArray[indx]));
		setShowBeneficiaryDetails({address: detailedBeneficiariesArray[indx].address , nickName: detailedBeneficiariesArray[indx].nickName , message: detailedBeneficiariesArray[indx].message, percent: detailedBeneficiariesArray[indx].percent, index: detailedBeneficiariesArray[indx].index});
	}

	useEffect(() => {
		console.log(`getBeenficiaryAccounts`); 
		getBeenficiaryAccounts();
	},[])


	return(
		<Fragment>
			<div className="row">
				<div className="col-xl-1 col-xxl-4"></div>
				<div className="col-xl-3 col-xxl-4">
					<div className="form-head text-center mt-3">
						<h2 className="font-w600 mb-2 me-auto">Beneficiaries</h2>
					</div>
				</div>
				<div className="col-xl-4 col-xxl-4"></div>
				<div className="col-xl-4 col-xxl-4" style={{backgroundColor:""}}>
					<div className="row">
						<div className="col-xl-6 col-xxl-4">
							<input type="text" value = {beneficiaryAddress} placeholder="Beneficiary Address" className="form-control border-primary text-center" style={{color:"white", borderWidth:"2px", width:"100%"}} onChange={(event) => { 
										setBeneficiaryAddress(event.target.value); } } />
						</div>
						<div className="col-xl-6 col-xxl-4">
							<button className="btn btn-primary" style={{border: "none", color:"white"}}  onClick = { () => registerBeneficiary() }>Register Beneficiary</button> 
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-1 col-xxl-4"></div>
				<div className="col-xl-3 col-xxl-4">
					<div className="swiper-box mt-4">
						<BeneficiariesSlider 
							detailedBeneficiariesArray={detailedBeneficiariesArray} 
							getClickedCard={getClickedCard} 
						/>
					</div>
				</div>
				<div className="col-xl-7 col-xxl-8">
					<div className="col-xl-9 col-xxl-8">
						<BenefiiarySettings 
							set_beneficiaryNickname={set_beneficiaryNickname} set_finalMessage={set_finalMessage} set_percentageSplit={set_percentageSplit}
							showBeneficiaryDetails={showBeneficiaryDetails} will={will} amendBeneficiary={amendBeneficiary} removeBeneficiary={removeBeneficiary}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	)

}		
export default MyWallet;