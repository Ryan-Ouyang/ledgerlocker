import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fortmatic from "fortmatic";
import Web3 from "web3";
import Box from "3box";
import axios from "axios";

import contractABI from "./abis/contract";
import daiContractABI from "./abis/dai";

import "bulma/css/bulma.css";
import "./App.css";

import MainListing from "./components/MainListing/MainListing";
import Bookings from "./components/Bookings/Bookings";
import Owner from "./components/Owner/Owner";
import Navbar from "./components/Navbar/Navbar";

const fm = new Fortmatic("pk_test_C0C9ADE8AD6C86A9", "kovan");
let web3 = new Web3(fm.getProvider());

const contractAddr = "0xE6023B2DaA371AB5fda43E12C4b2BbB86C0955f6";
const daiContractAddr = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";

// let addr = "";
let box;

export default function App() {
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/lockcontrols">
						<LockControls />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/listings">
						<Listings />
					</Route>
					<Route path="/bookings">
						<Bookings />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/owner">
						<Owner />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Home(props) {
	const [listings, setListings] = useState([]);
	const [addr, setAddr] = useState("");
	const [contract, setContract] = useState();
	const [daiContract, setDaiContract] = useState();

	useEffect(() => {
		const loginUser = async () => {
			web3.eth.getAccounts().then(async address => {
				setAddr(address[0]);
				// addr = address[0]
				console.log("Address: ", address[0]);
				await open3Box(address[0]);
				await set3BoxData("testing", "value");
				await get3BoxData("testing");
				await remove3BoxData("testing");
				web3.eth.defaultAccount = `${address[0]}`;
			});
		};

		loginUser();
	}, []);

	useEffect(() => {
		const fetchListings = async () => {
			const result = await axios("http://localhost:3001/api/listings");
			setListings(result.data);
			console.log("Fetched listings");
		};

		const instantiateContracts = async () => {
			const instance = new web3.eth.Contract(contractABI, contractAddr);
			setContract(instance);
			console.log("Contract instantiated");
			const daiInstance = new web3.eth.Contract(
				daiContractABI,
				daiContractAddr
			);
			console.log("DAI Contract instantiated");
			setDaiContract(daiInstance);
		};

		fetchListings();
		instantiateContracts();
	}, []);

	const leftColumnListings = [];
	const rightColumnListings = [];

	// For flowing two columns
	for (let i = 0; i < listings.length; i += 2) {
		leftColumnListings.push(listings[i]);
		rightColumnListings.push(listings[i + 1]);
	}

	return (
		<>
			<Navbar addr={addr} />
			<div className="container home-container">
				<div className="columns">
					<div className="column">
						{leftColumnListings.map((l, i) => (
							<MainListing
								key={i}
								listing={l}
								contract={contract}
								daiContract={daiContract}
								addr={addr}
							></MainListing>
						))}
					</div>
					<div className="column">
						{rightColumnListings.map((l, i) => (
							<MainListing
								key={i}
								listing={l}
								contract={contract}
								daiContract={daiContract}
								addr={addr}
							></MainListing>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

function Listings() {
	return <p>testing</p>;
}

function Profile() {
	return <p>testing 2</p>;
}

function LockControls() {
	return (
		<section>
			<h1>LOCK CONTROLS:</h1>
			<button>Unlock</button>
			<button>Lock</button>
		</section>
	);
}

async function open3Box(addr) {
	box = await Box.openBox(addr, fm.getProvider());
	await box.syncDone;
	console.log("Opened 3box box for ", addr);
}

async function set3BoxData(key, value) {
	await box.private.set(key, value);
	console.log("Set private value in 3box (key: ", key, ")");
}

async function get3BoxData(key) {
	await box.private.get(key);
	console.log("Got private value in 3box (key: ", key, ")");
}

async function remove3BoxData(key) {
	await box.private.remove(key);
	console.log("Removed private value in 3box (key: ", key, ")");
}
