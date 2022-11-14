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
		style={{ height: "auto" }}
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
			  <strong className="text-primary">STEP 1 - The Heartbeat Dashboard</strong>.

			  <p className="mb-0">
			  
			  	As soon as we land on HeartBeat Dashboard the website checks with the willFactory to see if a Will smart contract has been registered for this account. (Checks are currently made every 10 blocks or approx 30 seconds)
				Each Tron account is allowed to register only one will, but in this Will multiple accounts can be registered and added.
				If the user account already does not own a Will smart contract then the "Create Will" button is red.
				Press the Create Will to generate your personal Will smart contract via the willFactory.
				As soon as the transaction is mined and the website runs its next check, the information will be picked up that the Will smart contract has been generated and the "Initiate Will" button will now light up red.
				Do not press it yet.
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
			  <strong className="text-primary">STEP 2 - Register Accounts</strong>.
			  <p className="mb-0">
			  
				Paste your connected Tron Link account address into the "New Tron Account to Register" and Click "Register Account".
				As soon as the transaction is mined on the left hand side we can see a card with the registered account.
				Automatically, the balances of the account in USDT, BTT, WIN, JST are loaded and a green "Approve" button and a yellow "Register" buton appears next to each asset.
				Clicking approve for each token ensures that you approve your Will smart contract to transfer any balance from your account to the smart contract when it is established that your life has passed.
				This method offers the benefit that you can keep using your accounts as normal and any balances left will only be transfered when necessary conditions are met.
				Registering each token informs the Will smart contract that it can transfer (proividing approval has been passed) from your accoutn to your Will smart contract account.
				Once for each of the tokens that you want to pass to your Will smart contract is approved and registered the buttons turn grey and become disabled.
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
			  <strong className="text-primary">Step 3 - Register Beneficiaries</strong>
			  <p className="mb-0">
				In this page you have to type the beneficiaries Tronlink address, any nickname you would like to give to the beneficiary account, the final message to them and their percentage allocation of the funds.
				Clicking "Register Beneficiary" will register the account and the releavnt details in your will smart contract and a card will appear on the left of the screen.
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
			  <strong className="text-primary">STEP 4 - Back to HeartBeat Dashboard</strong>
			  <p className="mb-0">
			  
				You can now click the "Initiate Will" Red button and this will Start the clock for your Will smart contract.
				Note: You can only Initiate Will once
				We can see that the Will State changes to "Activated" once the transaction has mined and the balances of USDT, JST, BTT and WIN for the following are all loaded:
					Your registered Accounts (admin Accounts)
					Your Will smart contract
					Your beneficiaries
				In addition, on the HeartBeat panel we can read:

					Will State: True if it is active, false if it has not ben started or has expired (case of death)
					Will Stage: Each active Will is allocated a stage which represents either the owners:
						LACK OF ON-CHAIN ACTIVITY ON THEIR TRON BLOCKCHAIN ACCOUNTS
						LACK OF RESPONSIVENESS IN THE DAPP.
				As the owner of the will becomes less responsive and Proof Of Life hasnt been confirmed, the Will Stage setting will automatically rise accordingly.

				The WILL Stage counter starts at stage 0 and moves up as follows:
					Stage 1 after 80 blocks
					Stage 2 after an additional 20 blocks
					Stage 3 after an additional 20 blocks
					Stage 4 after an additional 50 blocks
					Stage 5 after an additional 50 blocks
					And finally Stage 6 after an additional 10 blocks

					Up to Will Stage 3 inclusive the smart contract checks if either the Will owner has signed any transactions with any of his registered accounts or has intentionally clicked on the HeartBeat Panel in the DApp.
				Either of these two events will demonstrate Proof Of Life and will therefore reset the stage counter.
				If no proof of life is discovered then the stage counter is incremented to stage 4.
				Once this stage is reached any fund balances of any of the account holders registered account and assets e.g. USDT, BTT, JST, WIN will be automatically tranasferred to the Will smart contract.
				We can visually see this movement of funds from registered accounts to the Will smart contract in the dashboard.
				Note: Even after the funds have been transferred at stage 4, the Will owner can still invoke the refundFunds function of the smart contract to take back their funds again.

				At stage 5 the will is executed.
				The funds inside the Will smart contract are automatically transfered out to the registered beneficiaries at the specified percentage distributions.
				Finally the Will smart contract state becomes false (complete).
				Note: In the HeartBeat panel we can see the Block numbers for each stage trigger point and also how many blocks remain util the completion of each stage.

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