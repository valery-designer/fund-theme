import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { getDatabase, ref, push, get, set, onValue, query, onChildChanged } from "firebase/database";


import Appslider from './Appslider.js';
import Appproglist from './Appproglist.js';
import Apppayment from './Apppayment.js';

import axios from 'axios';

axios.defaults.baseURL = document.location.origin+'/wp-json/vd/v1';

const { render } = wp.element;

// const mockupProgs = [
//   {
//     id:1,
//     title:'Тем, кто на передовой',
//     imageH:'http://fund.loc/app/uploads/2022/06/default_program_photo_horizontal.png',
//     text: 'Собираем деньги на рации, спальные мешки, медикаменты, чтобы помочь солдатам и офицерам на боевых позициях. Наши партнеры в регионах готовы обеспечить сбор необходимых вещей, возьмут на себя логистику, транспорт, склады, взаимодействие с таможней и доставку грузов военным республиканских союзных сил.',
//     permalink: 'http://fund.loc/тем-кто-на-передовой',
//     target: 1000000,
//     firebaseId: '',
//     got: 0,
//   },
//   {
//     id:2,
//     title:'Семье погибшего героя сержанта Джабраилова',
//     imageH:'http://fund.loc/app/uploads/2022/06/02_h.png',
//     text: 'Сержант Джабраилов А.М. погиб при выполнении боевого задания 15.03.2022 года.',
//     permalink: 'http://fund.loc/семье-погибшего-героя-сержанта-джабр',
//     target: 250000,
//     firebaseId: '',
//     got: 0,
//   },
//   {
//     id:3,
//     title:'Центру реабилитации',
//     imageH:'http://fund.loc/app/uploads/2022/06/03_h.png',
//     text: 'Строительство и оснащение центра реабилитации военнослужащих, получивших ранения при выполнении задач в ходе СВО. Цель: создать многофункциональный реабилитационный комплекс, как самодостаточную систему по реабилитации и полноценной жизни.',
//     permalink: 'http://fund.loc/центру-реабилитации',
//     target: 3000000,
//     firebaseId: '',
//     got: 0,
//   },
// ];

// const mockupGots = [
//   {
//     id: 'sK5iwsvK9Yz5PxuaBlFU',
//     got: 100000,
//     programId: 1,
//   },
//   {
//     id: 'b12ODyYwNnwuuJN7eNpN',
//     got: 200000,
//     programId: 2,
//   },
//   {
//     id:'Qpv1wR0rFLllGKNpEleq',
//     got: 300000,
//     programId: 3,
//   },
// ];

let gots = JSON.parse(localStorage.getItem("gots"));
if ( gots === null ) gots = [];

let accounts = []; 

const firebaseConfig = {
  apiKey: "AIzaSyDB6clib9Pa6kcL9spVV7tcDs6q7r1eoeQ",
  authDomain: "char-fund.firebaseapp.com",
  databaseURL: "https://char-fund-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "char-fund",
  storageBucket: "char-fund.appspot.com",
  messagingSenderId: "400090506712",
  appId: "1:400090506712:web:de0db64c100fee8f44bead"
};

// init firebase app
const firebaseApp = initializeApp(firebaseConfig);

// init firebase services
// export const fbdb = getFirestore(firebaseApp);

const realTimeDB = getDatabase(firebaseApp);

// collection ref
// const programsCollectionRef = collection(fbdb, 'programs');

const programsRef = ref(realTimeDB, 'programs');
// get(programsRef)
//   .then((response) => { 
//     console.log('DATA RECEIVED: ',response.val());
//     let k = Object.keys(response.val());
//     accounts = Object.values(response.val());
//     accounts.forEach((account, i) => { account.rtdbId = k[i]; });
//     console.log('DATA Processed: ',accounts);
//   });

onValue(programsRef, (snapshot) => {
  let k = Object.keys(snapshot.val());
  accounts = Object.values(snapshot.val());
  accounts.forEach((account, i) => { account.rtdbId = k[i]; });
  console.log('DATA Processed: ',accounts);
  document.dispatchEvent(new CustomEvent('rtdbsnapshot', { detail: { gots : accounts } }));
});

// onChildChanged(programsRef, (data) => {
//     console.log('CHANGED DATA KEY: ',data.key);
//     console.log('DATA DATA: ',data.val());
//   });


// onSnapshot(programsCollectionRef, (snapshot) => {
//   gots = snapshot.docs.map((doc) => { return { ...doc.data(), id: doc.id } });
//   localStorage.setItem("gots", JSON.stringify(gots));
//   document.dispatchEvent(new CustomEvent('firebasesnapshot', { detail: { gots : gots } }));
// });

if ( document.getElementById(`miniapp-slider`) ) render(<Appslider />, document.getElementById(`miniapp-slider`));
if ( document.getElementById(`miniapp-programs`) ) render(<Appproglist />, document.getElementById(`miniapp-programs`));
if ( document.getElementById(`miniapp-payment`) ) render(<Apppayment />, document.getElementById(`miniapp-payment`));

export default realTimeDB;