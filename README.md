# Tron HeartBeat

## Website

<p> TODO </p>

## Video Link

<p> TODDO </p>

<br>

## Overview

<p>
We all love the Tron Ecosystem.

However, like other Blockchains, the security advantages of taking custody of your own assets can lead to pain and heartache should those keys be lost somehow.
Everyone likes to think that they take good care of their keys, but in reality if something was to unfortunately happen to you, then its highly likely that your assets would become permanently locked and out of the reach of your loved ones.

You could write down your private keys and mnemonic phrases to your TronLink wallets and "keep them safe" somewhere, but not only is this dangerous, but it also assumes that the person that you leave control of those accounts is completely trustworthy and will follow your wishes when it comes to distributing your funds after death.

Is there a better way?

Tron HeartBeat is a project whereby anyone can set up their own blochain based Will.
<br>
In case of death your loved ones will receive an automatic distribution of all of the funds from your registered accounts in a completely trusted, decentralised way.

Users can create their own Will smart contract usign the willFactory.

They are the administrator of the Will smart contract and have full control all the way up until the point of death.

<p>
<br>

## How it works

<p>
In the instructions that follow below it is assumed that the user has the TronLink Browser Extension installed on Chrome.
<br>

<br>

## STEP 1 - Heartbeat Dashboard

<p>
As soon as we land on HeartBeat Dashboard the website checks with the willFactory to see if a Will smart contract has been registered for this account. (Checks are currently made every 10 blocks or approx 30 seconds)

Each Tron account is allowed to register only one will, but in this Will multiple accounts can be registered and added.

If the user account already does not own a Will smart contract then the "Create Will" button is red.

Press the Create Will to generate your personal Will smart contract via the willFactory.

As soon as the transaction is mined and the website runs its next check, the information will be picked up that the Will smart contract has been generated and the "Initiate Will" button will now light up red.

> Do not press it yet..

<br>

## STEP 2 - Register Accounts

<p>
Paste your connected Tron Link account address into the "New Tron Account to Register" and Click "Register Account".

As soon as the transaction is mined on the left hand side we can see a card with the registered account.

Automatically, the balances of the account in USDT, BTT, WIN, JST are loaded and a green "Approve" button and a yellow "Register" buton appears next to each asset.

Clicking approve for each token ensures that you approve your Will smart contract to transfer any balance from your account to the smart contract when it is established that your life has passed.

This method offers the benefit that you can keep using your accounts as normal and any balances left will only be transfered when necessary conditions are met.

Registering each token informs the Will smart contract that it can transfer (proividing approval has been passed) from your accoutn to your Will smart contract account.

Once for each of the tokens that you want to pass to your Will smart contract is approved and registered the buttons turn grey and become disabled.

> Currently only USDT, BTT, WIN, JST tokens are compatible with the project during the proof of concept stage.

<br>

## STEP 3 - Register Beneficiaries

<p>
In this page you have to type the beneficiaries Tronlink address, any nickname you would like to give to the beneficiary account, the final message to them and their percentage allocation of the funds.

Clicking "Register Beneficiary" will register the account and the releavnt details in your will smart contract and a card will appear on the left of the screen.

> Note: You can come back at any point (while your will is still active) and Amed or Remove any of the beneficiaries

<br>

## STEP 4 - Back to HeartBeat Dashboard

<p>
You can now click the "Initiate Will" Red button and this will Start the clock for your Will smart contract.

> Note: You can only Initiate Will once.

<br>
We can see that the Will State changes to "Activated" once the transaction has mined and the balances of USDT, JST, BTT and WIN for the following are all loaded:

- Your registered Accounts (admin Accounts)
- Your Will smart contract
- Your beneficiaries

In addition, on the HeartBeat panel we can read:

- Will State: True if it is active, false if it has not ben started or has expired (case of death)
- Will Stage: Each active Will is allocated a stage which represents either the owners:
  1. **LACK OF ON-CHAIN ACTIVITY ON THEIR TRON BLOCKCHAIN ACCOUNTS**
  2. **LACK OF RESPONSIVENESS IN THE DAPP**.

As the owner of the will becomes less responsive and **Proof Of Life** hasnt been confirmed, the Will Stage setting will automatically rise accordingly.

The WILL Stage counter starts at stage 0 and moves up as follows:

- Stage 1 after 80 blocks
- Stage 2 after an additional 20 blocks
- Stage 3 after an additional 20 blocks
- Stage 4 after an additional 50 blocks
- Stage 5 after an additional 50 blocks
- And finally Stage 6 after an additional 10 blocks

<br>
Up to Will Stage 3 inclusive the smart contract checks if either the Will owner has signed any transactions with any of his registered accounts or has intentionally clicked on the HeartBeat Panel in the DApp.

Either of these two events will demonstrate **Proof Of Life** and will therefore reset the stage counter.

If no proof of life is discovered then the stage counter is incremented to stage 4.

Once this stage is reached any fund balances of any of the account holders registered account and assets e.g. USDT, BTT, JST, WIN will be automatically tranasferred to the Will smart contract.

We can visually see this movement of funds from registered accounts to the Will smart contract in the dashboard.

> Note: Even after the funds have been transferred at stage 4, the Will owner can still invoke the **refundFunds** function of the smart contract to take back their funds again.

<br>
At stage 5 the will is executed.

The funds inside the Will smart contract are automatically transfered out to the registered beneficiaries at the specified percentage distributions.

Finally the Will smart contract state becomes false (complete).

> Note: In the HeartBeat panel we can see the Block numbers for each stage trigger point and also how many blocks remain util the completion of each stage.
> <br>

![plot](./Printscreens/Intro.png)
