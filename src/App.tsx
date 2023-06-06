import * as React from 'react';
import { Button, Box, Link, Typography, Container, Tabs, Tab } from '@mui/material';
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
	const [tari, setTari] = React.useState<TariConnection | undefined>();
	const [isConnected, setIsConnected] = React.useState<boolean>(false);
	const [account, setAccount] = React.useState<string | undefined>();
	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

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
	let address = import.meta.env.VITE_SIGNALING_SERVER_ADDRESS || "http://localhost:9100";
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
							<Tab label="Deposit Liquidity" />
							<Tab label="Withdraw Liquidity" />
						</Tabs>
					</Box>

					{currentTabIndex === 0 && (
						<Box sx={{ p: 3 }}>
							<Typography variant='h5'>Tab 1 Content</Typography>
							<Typography variant='p'>
								TODO
							</Typography>
						</Box>
					)}

					{/* TAB 2 Contents */}
					{currentTabIndex === 1 && (
						<Box sx={{ p: 3 }}>
							<Typography variant='h5'>Tab 2 Content</Typography>
							<Typography variant='p'>
								TODO
							</Typography>
						</Box>
					)}

					{/* TAB 3 Contents */}
					{currentTabIndex === 2 && (
						<Box sx={{ p: 3 }}>
							<Typography variant='h5'>Tab 3 Content</Typography>
							<Typography variant='p'>
								TODO
							</Typography>
						</Box>
					)}
				</div>
				: <div>
					<TariConnectorButton
						signalingServer={address}
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
