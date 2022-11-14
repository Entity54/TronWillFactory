import React,{useState,useContext, useEffect} from 'react';
import { ThemeContext } from "../../../context/ThemeContext";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";


const DashboardDark = () => {

	const { changeBackground, background } = useContext(ThemeContext);
	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });

	}, []);

	return(
		<>
			<div className="row">
				<div className="row">
					<div className="col-xl-12">
						<div className="row">

<div className="col-xl-12 col-xxl-6 col-lg-6">

  <div className="card">

	<div className="card-header border-1 pb-4">
	  <h4 className="card-title">Instructions</h4>
	</div>

	<div className="card-body">
	  <PerfectScrollbar
		style={{ height: "780px" }}
		id="DZ_W_TimeLine"
		className="widget-timeline dz-scroll height370 ps ps--active-y"
	  >
		<ul className="timeline">
		  <li>
			<div className="timeline-badge primary"></div>
			<Link
			  className="timeline-panel text-muted"
			  to="/widget-basic"
			>
			  <strong className="text-primary">Register Accounts</strong>.

			  <p className="mb-0">
			  ## STEP 1 Heartbeat Dashboard

As soon as we land on HeartBeat Dashboard the Website checks with the willFactory if a Will smart contract has been registered for this account
Each Tron account is allowed to register only one will, but in this Will multiple accounts can be registered
If the user account already does not own a Will smart contract then "Create Will" button is lit red 
Press the Create Will to generate your person Will smart contract via the willFactory
As soon as the transaction is mined and the website runs next check, it will be picked up that the Will smart contract is generated and the "Initiate Will" button will lit red
Do not press it yet
				{" "}
			  </p>
			</Link>
		  </li>
		  <li>
			<div className="timeline-badge info"></div>
			<Link
			  className="timeline-panel text-muted"
			  to="/widget-basic"
			>
			  <strong className="text-primary">Fees</strong>.
			  <p className="mb-0">
			  ## STEP 2 Register Accounts

Paste your connected Tron Link account address into the "New Tron Account to Register" and Click "Register Account"
As soon as the transaction is mined on the left hand side we can see a card with the registered Account
Automatically the balance of the account in USDT, BTT, WIN, JST is loaded and for each token a green button "Approve" and a yellow one "Register" next to each token
Clicking approve for each token ensures that you approve your Will smart contract to transfer any balance from your account to the smart contract when it is established that death has come
This offers the benefit that you can keep using your account as normal and any balances left will only be transfered when necessary conditions are met
Registering each token informs the Will smart contract  that it can transfer (proividing approval has been passed) from your accoutn to your Will smart contract account
Once for each of the tokens that you want to pass to your Will smart contract is approved and registered the buttons tunr grey and become disabled
Currently only USDT, BTT, WIN, JST tokens are compatible with the project as tryign to build proof of concept
			  </p>
			</Link>
		  </li>
		  <li>
			<div className="timeline-badge danger"></div>
			<Link
			  className="timeline-panel text-muted"
			  to="/widget-basic"
			>
			  <strong className="text-primary">Register Beneficiaries</strong>
			  <p className="mb-0">
			  In this page you have to type the heir tronlink address, the nickname you want to give them, the final message and the percentage allocation
Clicking "Register Beneficiary" will register the account adn the releavnt detials in your will smart contract and a crad will appear on the left
Note: You can come back at any point (while your will is still active) and Amed or Remove any of the beneficiaries
			  </p>
			</Link>
		  </li>
		  <li>
			<div className="timeline-badge success"></div>
			<Link
			  className="timeline-panel text-muted"
			  to="/widget-basic"
			>
			  <strong className="text-primary">Initiate Will</strong>
			  <p className="mb-0">
			  ## STEP 4 Back to HeartBeat Dashboard

You can now click the "Initiate Will" Red button and this will Start the clock for your Will smart contract

Note: You can only Initiate Will once
We can see that the Will State changes to Activated once the transaction is mined and the balances of USDT, JST, BTT and WIN for:
Your registered Accounts (admin Accounts)
Your Will smart contract
Your beneficiaries
are loaded
In addition on the HeartBeat panel we can read
Will State: True if it is active, false if it has not ben started or has expired (case of death)
Will Stage
Each active Will start at stage 0, moves to 1 after 80 blocks, 2 after 70 blocks, 3 after 60 blocks, 4 after 50 blocks, 5 after 50 blocks and finally 6 after 10 blocks
Up to stage 3 inclusive the smart contract checks if either the Will owner has signed any transaction with any of his refistered accounts (proof of life 1) or has intentionally clicked omn the HeartBeat Panel. If not progresses from 0 to 3.
In a similar way the Will smart contract prgresses to stage 4 but once this stage is reached any fund balances of any of the registered account and tokens e.g. USDT, BTT, JST, WIN will be trnasferred to the Will smart contract
We can see visually the movement of funds from registered accounts to the Will smart contract
Note: Even at stage 4 the Will owner cna invoke the refundFunds function of the smart contract to take back his funds
At stage 5 the will is released. The funds sitting at the Will smart contract are being transfered out to the registered heirs at the precepcified percentages. Finally the Will smart contract state becomes false
Note: In the HeartBeat panel we can see the Bloc numbers for each triggere point and also how many blocks remain till the completion of each Phase
			  </p>
			</Link>
		  </li>
		</ul>
	  </PerfectScrollbar>
	</div>
  </div>
</div>
</div>


					</div>
				</div>
			</div>	
		</>
	)
}
export default DashboardDark;