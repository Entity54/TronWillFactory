# tron heart beat

## Website

<br>
<p> TODO </p>
<br>

## Video Link

<br>
<p> TODDO </p>
<br>

## Descrption

<br>
We all love the Tron ecosystem.
<br>
However the main thing of Tron blockcahin is that it is trustless and unhackable
<br>
If you lose your keys you lose access to your account and nobody can help you
<br>
Have you ever wondered what will happen to your TronLink Wallet Accounts if something was to happen to you?
<br>
On idea would be to write down your private keys and mnemonic and "keep it safe"
<br>
But this contadicts decentralisation. Is there a better way?
<br>
In this project anyone can set up his own will
<br>
In case of death his loves ones will receive all funds from his registered accounts in a decentralised automatic way Trustlessly
<br>
Moreover each one creates his own Will smart contract usign the willFactory
<br>
He is the administrator of his Will smart contract and has full control up the point of death
<br>
Lets see how it works
<br>
<br>

In the isntruction that follow below it is assumed that the user has TronLink Browser Extension installed on Chrome, he owns one or more account and he knows one or more Tron accounts as his heirs
<br>

<br>

> Note: The Website runs checks every 30 secs about 10 blocks.
> <br>

<br>
<br>
<br>
<br>

## STEP 1 Heartbeat Dashboard

<br>
As soon as we land on HeartBeat Dashboard the Website checks with the willFactory if a Will smart contract has been registered for this account
<br>
Each Tron account is allowed to register only one will, but in this Will multiple accounts can be registered
<br>
If the user account already does not own a Will smart contract then "Create Will" button is lit red 
<br>
Press the Create Will to generate your person Will smart contract via the willFactory
<br>
As soon as the transaction is mined and the website runs next check, it will be picked up that the Will smart contract is generated and the "Initiate Will" button will lit red

> Do not press it yet

<br>

## STEP 2 Register Accounts

Paste your connected Tron Link account address into the "New Tron Account to Register" and Click "Register Account"
<br>
As soon as the transaction is mined on the left hand side we can see a card with the registered Account

<br>
Automatically the balance of the account in USDT, BTT, WIN, JST is loaded and for each token a green button "Approve" and a yellow one "Register" next to each token
<br>
Clicking approve for each token ensures that you approve your Will smart contract to transfer any balance from your account to the smart contract when it is established that death has come

<br>
This offers the benefit that you can keep using your account as normal and any balances left will only be transfered when necessary conditions are met

<br>
Registering each token informs the Will smart contract  that it can transfer (proividing approval has been passed) from your accoutn to your Will smart contract account

<br>
Once for each of the tokens that you want to pass to your Will smart contract is approved and registered the buttons tunr grey and become disabled
<br>

> Currently only USDT, BTT, WIN, JST tokens are compatible with the project as tryign to build proof of concept

<br>
<br>

## STEP 3 Register Beneficiaries

In this page you have to type the heir tronlink address, the nickname you want to give them, the final message and the percentage allocation
<br>
Clicking "Register Beneficiary" will register the account adn the releavnt detials in your will smart contract and a crad will appear on the left
<br>

> Note: You can come back at any point (while your will is still active) and Amed or Remove any of the beneficiaries

<br>
<br>

## STEP 4 Back to HeartBeat Dashboard

You can now click the "Initiate Will" Red button and this will Start the clock for your Will smart contract
<br>

> Note: You can only Initiate Will once
> <br>

We can see that the Will State changes to Activated once the transaction is mined and the balances of USDT, JST, BTT and WIN for:
<br>
Your registered Accounts (admin Accounts)
<br>
Your Will smart contract
<br>
Your beneficiaries
<br>
are loaded
<br>
In addition on the HeartBeat panel we can read
<br>
Will State: True if it is active, false if it has not ben started or has expired (case of death)
<br>
Will Stage
<br>
Each active Will start at stage 0, moves to 1 after 80 blocks, 2 after 70 blocks, 3 after 60 blocks, 4 after 50 blocks, 5 after 50 blocks and finally 6 after 10 blocks
<br>
Up to stage 3 inclusive the smart contract checks if either the Will owner has signed any transaction with any of his refistered accounts (proof of life 1) or has intentionally clicked omn the HeartBeat Panel. If not progresses from 0 to 3.
<br>
In a similar way the Will smart contract prgresses to stage 4 but once this stage is reached any fund balances of any of the registered account and tokens e.g. USDT, BTT, JST, WIN will be trnasferred to the Will smart contract
<br>
We can see visually the movement of funds from registered accounts to the Will smart contract
<br>
Note: Even at stage 4 the Will owner cna invoke the refundFunds function of the smart contract to take back his funds
<br>
At stage 5 the will is released. The funds sitting at the Will smart contract are being transfered out to the registered heirs at the precepcified percentages. Finally the Will smart contract state becomes false
<br>
Note: In the HeartBeat panel we can see the Bloc numbers for each triggere point and also how many blocks remain till the completion of each Phase
<br>
<br>
<br>
<br>
<br>

![plot](./Printscreens/Intro.png)

<br>
<br>
