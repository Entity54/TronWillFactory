import React,{useState,useEffect} from 'react';


const AcPortfolio = ({ 
	set_beneficiaryNickname, set_finalMessage, set_percentageSplit, showBeneficiaryDetails, amendBeneficiary, removeBeneficiary,
}) => {

	const [benefAddress, setBenefAddress]   = useState("");
	const [benefId, setBenefId]             = useState("");
	const [nickname, setNickname]             = useState("");
	const [finalMsg, setFinalMsg]             = useState("");
	const [cPercentage, setCPercentage] = useState("");
	
	const amend_Beneficiary = async () => {
		console.log(`About to amend Beneficiary details benefAddress:${benefAddress} nickname:${nickname} finalMsg:${finalMsg} percentage:${cPercentage} benefId:${benefId}`);
		amendBeneficiary({address: benefAddress, nickname, message:finalMsg, percent:cPercentage, id: benefId });
	}
	const remove_Beneficiary = async () => {
		console.log(`About to remove Beneficiary details benefAddress:${benefAddress} nickname:${nickname} finalMsg:${finalMsg} percentage:${cPercentage} benefId:${benefId}`);
		removeBeneficiary({address: benefAddress, nickname, message:finalMsg, percent:cPercentage, id: benefId });
	}
	
	useEffect(() => {
		console.log(`Beneficiary settings showBeneficiaryDetails: `,JSON.stringify(showBeneficiaryDetails));
		if (showBeneficiaryDetails.address!=="")
		{
			setBenefAddress(showBeneficiaryDetails.address);
			setBenefId(showBeneficiaryDetails.index);
			setNickname(showBeneficiaryDetails.nickName)
			setFinalMsg(showBeneficiaryDetails.message)
			setCPercentage(showBeneficiaryDetails.percent)
		}
	},[showBeneficiaryDetails])


	return (
		<>
			<div className="card mt-4" style={{width:"auto", height:"auto"}}>
				<div className="card-header border-0 pb-0">
					<h4 className="mb-0 fs-24 text-black text-center mx-auto">Beneficiary Settings</h4>
				</div>

				<div className="card-body pb-3" style={{overflowY: "auto", height:"auto"}}>

				    <div key={0} className="bg-gradient-1 coin-holding flex-wrap m-3 p-2" style={{height:"70px"}}>
						<div className="col-xl-3 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6" >Nickname</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-9 col-xxl-3"  style={{backgroundColor:""}}>
							<div className="mb-2" style={{backgroundColor:""}}> 
								<div className="d-flex align-items-center"  style={{backgroundColor:""}}>
									<div className="ms-3" style={{backgroundColor:"", width:"50%"}}>
										<input type="text" value = {nickname } placeholder="Beneficiary Name" className="form-control" style={{color:"white", width:"100%"}} onChange={(event) => { 
										setNickname(event.target.value);
										set_beneficiaryNickname(event.target.value);
									   }
									} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div key={1} className="bg-gradient-1 coin-holding flex-wrap m-3 p-2" style={{height:"70px"}}>
							<div className="col-xl-3 col-xxl-3">
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<p className="mb-0 op-6" >Final Message</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-9 col-xxl-3"  style={{backgroundColor:""}}>
								<div className="mb-2" style={{backgroundColor:""}}> 
									<div className="d-flex align-items-center"  style={{backgroundColor:""}}>
										<div className="ms-3" style={{backgroundColor:"", width:"80%"}}>
											<input type="text" value = {finalMsg } placeholder="e.g. To my beloved daughter. Invest your funds wisely." className="form-control" style={{color:"white", width:"100%"}} onChange={(event) => { 
											setFinalMsg(event.target.value);
											set_finalMessage(event.target.value);

										}
										} />
										</div>
									</div>
								</div>
							</div>
					</div>
					<div key={2} className="bg-gradient-1 coin-holding flex-wrap m-3 p-2" style={{height:"70px"}}>
						<div className="col-xl-3 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6" >Cash Percentage</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-9 col-xxl-3"  style={{backgroundColor:""}}>
							<div className="mb-2" style={{backgroundColor:""}}> 
								<div className="d-flex align-items-center"  style={{backgroundColor:""}}>
									<div className="ms-3" style={{backgroundColor:"", width:"20%"}}>
										<input type="number" step={1} min={0} max={100} value = {cPercentage } placeholder="25" className="form-control" style={{color:"white", width:"100%"}} onChange={(event) => { 
										setCPercentage(event.target.value);
										set_percentageSplit(event.target.value);
									   }
									} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-0"style={{backgroundColor:""}}>
						<div className="text-center"style={{backgroundColor:""}}>
								<button className="btn btn-dark mb-2 mr-3 rounded text-white mx-3 py-2" style={{backgroundColor:"darkorange"}}  onClick = { () => amend_Beneficiary() }  >Amend</button> 
								<button className="btn btn-dark mb-2 mr-3 rounded text-white mx-3 py-2" style={{backgroundColor:"darkred"}}  onClick = { () => remove_Beneficiary() } >Remove</button> 
						</div>
					</div>

				</div>

			</div>
		
		</>
    )
}
export default AcPortfolio; 
