import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadMusicians() {
  const tbody = document.querySelector("#musicians-table tbody");
  const totalContractsEl = document.getElementById("total-contracts");
  const totalPaidEl = document.getElementById("total-paid");
  const totalBalanceEl = document.getElementById("total-balance");

  let totalContracts = 0;
  let totalPaid = 0;
  let totalBalance = 0;

  const snap = await getDocs(collection(db, "musicians"));
  tbody.innerHTML = "";

  snap.forEach(doc => {
    const m = doc.data();

    totalContracts += m.contract || 0;
    totalPaid += m.paid || 0;
    totalBalance += m.balance || 0;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.name}</td>
      <td>${m.section}</td>
      <td>${m.instrument}</td>
      <td>${(m.contract || 0).toLocaleString("fr-FR")} Gdes</td>
      <td>${(m.paid || 0).toLocaleString("fr-FR")} Gdes</td>
      <td>${(m.balance || 0).toLocaleString("fr-FR")} Gdes</td>
    `;
    tbody.appendChild(tr);
  });

  totalContractsEl.textContent = `Kontra: ${totalContracts.toLocaleString("fr-FR")} Gdes`;
  totalPaidEl.textContent = `Peye: ${totalPaid.toLocaleString("fr-FR")} Gdes`;
  totalBalanceEl.textContent = `Balans: ${totalBalance.toLocaleString("fr-FR")} Gdes`;
}

loadMusicians().catch(console.error);
