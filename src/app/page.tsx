"use client";
import Image from "next/image";
import JollyOrpheusClick from "@/components/clicker";
import {useState} from "react";
import styles from "./page.module.css";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Haxmas Day 1</h1>
        <p className={styles.count}>Count: {count}</p>
        <JollyOrpheusClick onClick={() => {setCount(count + 1)}} />
      </div>
    </div>
  );
}