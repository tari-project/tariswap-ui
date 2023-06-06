import * as React from 'react';
import { Button, Box, Link, Typography, Container, Tabs, Tab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { TariConnection, TariConnectorButton } from 'tari-connector/src/index';
import {
	ResourceAddress,
	Hash,
	TariPermissionNftGetOwnershipProof,
	TariPermissions,
	TariPermissionAccountBalance,
	TariPermissionAccountInfo,
	SubstateAddress,
	NonFungibleIndexAddress,
	NonFungibleAddress,
	NonFungibleAddressContents,
	NonFungibleId,
	U256,
	ComponentAddress,
	TariPermissionTransactionSend,
	TariPermissionTransactionGet
} from "tari-connector/src/tari_permissions";
import { Input } from '@mui/icons-material';

import * as tariswapLib from './tariswap-lib';

export default function App() {
	return (
		<Container maxWidth="sm">
			<Box sx={{ my: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Tariswap
				</Typography>
				<Connector />
			</Box>
		</Container>
	);
}

function Connector() {
	let signaling_server_address = import.meta.env.VITE_SIGNALING_SERVER_ADDRESS || "http://localhost:9100";
	let tariswap: string = import.meta.env.VITE_TARISWAP_COMPONENT_ADDRESS;
	let resource_lp: string = import.meta.env.VITE_LP_RESOURCE_ADDRESS;
	let resource_a: string = import.meta.env.VITE_A_RESOURCE_ADDRESS;
	let resource_b: string = import.meta.env.VITE_B_RESOURCE_ADDRESS;

	const [tari, setTari] = React.useState<TariConnection | undefined>();
	const [isConnected, setIsConnected] = React.useState<boolean>(false);
	const [account, setAccount] = React.useState<string | undefined>();
	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
	const [swapResource, setSwapResource] = React.useState<string>(resource_a);
	const [swapAmount, setSwapAmount] = React.useState(0);
	const [addLpAmountA, setAddLpAmountA] = React.useState(0);
	const [addLpAmountB, setAddLpAmountB] = React.useState(0);
	const [removeLpamount, setRemoveLpAmount] = React.useState(0);

	const onOpen = (tari: TariConnection) => {
		console.log("OnOpen");
		setTari(tari);
		window.tari = tari;
	};
	const setAnswer = async () => {
		console.log("setAnswer");
		tari?.setAnswer();
		await new Promise(f => setTimeout(f, 1000));
		setIsConnected(true);
		console.log("setAnswer 2");
		let res = await tari.sendMessage("accounts.get_default", tari.token);
		console.log("setAnswer 3");
		console.log({ res });
		let component_address = res.account.address.Component;
		console.log({ component_address });
		setAccount(component_address);
	};


	let permissions = new TariPermissions();
	permissions.addPermission(new TariPermissionAccountInfo())
	permissions.addPermission(
		new TariPermissionTransactionSend()
	);
	permissions.addPermission(
		new TariPermissionTransactionGet()
	);

	let optional_permissions = new TariPermissions();

	const handleTabChange = (e, tabIndex: number) => {
		setCurrentTabIndex(tabIndex);
	};

	const submitSwap = () => {
		let outputRes = swapResource == resource_a ? resource_b : resource_a;  
		tariswapLib.swap(account, tariswap, swapResource, swapAmount, outputRes);
	};

	const submitAddLp = () => {
		tariswapLib.addLiquidity(account, tariswap, resource_a, addLpAmountA, resource_b, addLpAmountB);
	};

	const submitRemoveLp = () => {
		tariswapLib.removeLiquidity(account, tariswap, resource_lp, removeLpamount);
	};

	return (
		<>
			{isConnected
				? <div>
					<Box sx={{ p: 2 }}>
						<Typography variant='p'>
							Using account <b>{account}</b>
						</Typography>
					</Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={currentTabIndex} onChange={handleTabChange} aria-label="basic tabs example">
							<Tab label="Swap" />
							<Tab label="Add Liquidity" />
							<Tab label="Remove Liquidity" />
						</Tabs>
					</Box>

					{/* Swap */}
					{currentTabIndex === 0 && (
						<Box sx={{ p: 3 }}>
							<FormControl sx={{ m: 1 }} variant="standard">
								<InputLabel id="swap-resource-select-label">Input resource</InputLabel>
								<Select
									labelId="swap-resource-label"
									id="swap-resource-select"
									value={swapResource}
									onChange={e => setSwapResource(e.target.value)}
								>
									<MenuItem value={resource_a}>{resource_a}</MenuItem>
									<MenuItem value={resource_b}>{resource_b}</MenuItem>
								</Select>
							</FormControl>
							<FormControl sx={{ m: 1 }} variant="standard">
								<TextField id="swap-amount-textbox" label="Amount" type="number" defaultValue={0} onChange={e => setSwapAmount(parseInt(e.target.value))} />
							</FormControl>
							<button
								onClick={submitSwap}
								style={{
									width: '100%',
									backgroundColor: '#9330FF',
									color: '#FFFFFF',
								}}
							>   Swap
							</button>
						</Box>
					)}

					{/* Add liquidity */}
					{currentTabIndex === 1 && (
						<Box sx={{ p: 3 }}>
							<FormControl sx={{ m: 1 }} variant="standard">
								<TextField id="add-a-textbox" label={"Amount of " + resource_a} type="number" defaultValue={0} onChange={e => setAddLpAmountA(parseInt(e.target.value))} />
							</FormControl>
							<FormControl sx={{ m: 1 }} variant="standard">
								<TextField id="add-b-textbox" label={"Amount of " + resource_b} type="number" defaultValue={0} onChange={e => setAddLpAmountB(parseInt(e.target.value))} />
							</FormControl>
							<button
								onClick={submitAddLp}
								style={{
									width: '100%',
									backgroundColor: '#9330FF',
									color: '#FFFFFF',
								}}
							>   Add liquididy
							</button>
						</Box>
					)}

					{/* Remove liquidity */}
					{currentTabIndex === 2 && (
						<Box sx={{ p: 3 }}>
						<FormControl sx={{ m: 1 }} variant="standard">
							<TextField id="remove-lp-textbox" label={"Amount of " + resource_lp} type="number" defaultValue={0} onChange={e => setRemoveLpAmount(parseInt(e.target.value))} />
						</FormControl>
						<button
							onClick={submitRemoveLp}
							style={{
								width: '100%',
								backgroundColor: '#9330FF',
								color: '#FFFFFF',
							}}
						>   Remove liquidity
						</button>
					</Box>
					)}
				</div>
				: <div>
					<TariConnectorButton
						signalingServer={signaling_server_address}
						permissions={permissions}
						optional_permissions={optional_permissions}
						onOpen={onOpen}
					/>
					{tari ? <button onClick={async () => { await setAnswer(); }}>SetAnswer</button> : null}
				</div>
			}


		</>
	);
}
