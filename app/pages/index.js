import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ThirdwebProvider } from "@3rdweb/react";
import ThirdwebConnect from "./ThirdwebConnect";
import { txSender, searchDropdown } from './collectionFunctions';
import SearchBar from './searchBar';
import SearchSection from './searchBar';
import ProjectView from './projectView';
import { useState } from 'react';

const supportedChainIds = [4];
const connectors = {
  injected: {}
};

export default function Home() {
  const [collectionID, setCollectionID] = useState("");

  const openView = (id) => {
    console.log(`open detail for ${id}`);
    setCollectionID(id);
  }

  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <div className={styles.container}>
        <Head>
          <title>ETH NYC</title>
          <meta name="description" content="ETH NYC 2022" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <div style={{ margin: "auto", marginLeft: "10px" }}>
              <h1 style={{ fontSize: "24px", textAlign: "left", color: "white" }}>PROJECT NAME...</h1>
            </div>
            <div style={{ width: "25%" }}>
              <ThirdwebConnect className={styles.headeritem} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 0, width: "30%", height: "100vh", backgroundImage: "linear-gradient(rgb(174, 221, 252), white)" }}>
              <SearchSection openView={openView}></SearchSection>
            </div>
            <div style={{ marginRight: 0, width: "70%", height: "100vh" }}>
              <ProjectView id={collectionID}></ProjectView>
            </div>
          </div>
        </main>
      </div>
    </ThirdwebProvider>
  )
}
