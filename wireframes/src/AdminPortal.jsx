import { useState } from "react";

const COMMISSION_RATE = 30;

// Mock data
const RESELLERS = [
  {
    id: 1,
    name: "OpenControls.ai",
    contact: "Dorian Cougias",
    email: "dorianc@opencontrols.ai",
    status: "active",
    since: "2025-09-01",
    stripeAcct: "acct_1NqR2x...",
    clients: [
      { id: 1, name: "Northrop Grumman", status: "active", products: ["STIGs", "RegGenome"], mrr: 4800, health: "green" },
      { id: 2, name: "Raytheon", status: "active", products: ["STIGs", "RegGenome"], mrr: 4800, health: "green" },
      { id: 3, name: "Booz Allen Hamilton", status: "active", products: ["STIGs", "RegGenome"], mrr: 4800, health: "green" },
      { id: 4, name: "SAIC", status: "active", products: ["STIGs"], mrr: 2400, health: "yellow" },
      { id: 5, name: "Leidos", status: "active", products: ["STIGs"], mrr: 2400, health: "green" },
      { id: 6, name: "GDIT", status: "active", products: ["RegGenome"], mrr: 2400, health: "green" },
      { id: 7, name: "Peraton", status: "active", products: ["STIGs", "RegGenome"], mrr: 4800, health: "green" },
      { id: 8, name: "ManTech", status: "churned", products: ["STIGs"], mrr: 0, health: "red" },
    ],
  },
  {
    id: 2,
    name: "CyberVanguard Partners",
    contact: "Rachel Simmons",
    email: "rachel@cybervanguard.com",
    status: "active",
    since: "2025-11-15",
    stripeAcct: "acct_1QvX...",
    clients: [
      { id: 9, name: "L3Harris", status: "active", products: ["STIGs"], mrr: 2400, health: "green" },
      { id: 10, name: "BAE Systems", status: "active", products: ["STIGs", "RegGenome"], mrr: 4800, health: "green" },
      { id: 11, name: "Palantir", status: "active", products: ["RegGenome"], mrr: 2400, health: "green" },
    ],
  },
  {
    id: 3,
    name: "FedSecure Consulting",
    contact: "James Whitfield",
    email: "j.whitfield@fedsecure.io",
    status: "active",
    since: "2026-01-10",
    stripeAcct: "acct_1RuY...",
    clients: [
      { id: 12, name: "Jacobs Engineering", status: "active", products: ["STIGs"], mrr: 2400, health: "green" },
      { id: 13, name: "CACI International", status: "active", products: ["STIGs", "RegGenome"], mrr: 4800, health: "yellow" },
    ],
  },
  {
    id: 4,
    name: "GovTech Solutions LLC",
    contact: "Maria Gonzalez",
    email: "maria@govtechsol.com",
    status: "pending",
    since: "2026-03-20",
    stripeAcct: null,
    clients: [],
  },
];

const DIRECT_CUSTOMERS = [
  { id: 101, name: "US Cyber Command", status: "active", products: ["STIGs", "RegGenome"], plan: "Enterprise", mrr: 4800, seats: 50, admin: "Col. James Rivera", health: "green" },
  { id: 102, name: "DISA", status: "active", products: ["STIGs"], plan: "Enterprise", mrr: 2400, seats: 25, admin: "Dr. Patricia Wong", health: "green" },
  { id: 103, name: "Deloitte Federal", status: "active", products: ["STIGs", "RegGenome"], plan: "Professional", mrr: 4800, seats: 15, admin: "Mark Sullivan", health: "green" },
  { id: 104, name: "Accenture Federal", status: "active", products: ["RegGenome"], plan: "Professional", mrr: 2400, seats: 10, admin: "Lisa Chang", health: "yellow" },
  { id: 105, name: "MITRE Corporation", status: "active", products: ["STIGs"], plan: "Starter", mrr: 1200, seats: 5, admin: "Dr. Alan Foster", health: "green" },
  { id: 106, name: "Battelle Memorial", status: "churned", products: ["STIGs"], plan: "Starter", mrr: 0, seats: 0, admin: "Chris Denton", health: "red" },
];

const PRODUCTS = [
  { id: "stigs", name: "STIGs", tag: "STIGs", description: "Security Technical Implementation Guides — structured compliance data via API", price: 2400, stripeId: "price_1Abc..." },
  { id: "reggenome", name: "RegGenome", tag: "RegGenome", description: "Regulatory genome mapping — cross-referenced compliance requirements via API", price: 2400, stripeId: "price_1Def..." },
];

// Utility functions
const getStatusBadgeClasses = (status) => {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "past_due":
      return "bg-red-50 text-red-700 border border-red-200";
    case "churned":
      return "bg-gray-50 text-gray-700 border border-gray-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};

const getHealthColor = (health) => {
  switch (health) {
    case "green":
      return "emerald-500";
    case "yellow":
      return "amber-400";
    case "red":
      return "red-500";
    default:
      return "gray-400";
  }
};

const getProductColor = (tag) => {
  switch (tag) {
    case "STIGs":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "RegGenome":
      return "bg-violet-50 text-violet-700 border border-violet-200";
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};

// MetricCard component
const MetricCard = ({ label, value, accent, subtext }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5">
    <div className="text-xs uppercase text-gray-400 font-medium mb-2">{label}</div>
    <div className="text-2xl font-semibold text-gray-900">{value}</div>
    {(accent || subtext) && (
      <div className={`text-sm mt-2 ${accent ? `text-${accent}` : "text-gray-600"}`}>
        {accent && <span className={`inline-block w-2 h-2 rounded-full bg-${accent} mr-2`}></span>}
        {subtext}
      </div>
    )}
  </div>
);

// Screen 1: Resellers
const ResellersScreen = ({ onSelectReseller }) => {
  const activeResellers = RESELLERS.filter((r) => r.status === "active").length;
  const pendingResellers = RESELLERS.filter((r) => r.status === "pending").length;
  const totalClients = RESELLERS.reduce((sum, r) => sum + r.clients.length, 0);
  const activeClients = RESELLERS.reduce((sum, r) => sum + r.clients.filter((c) => c.status === "active").length, 0);
  const churnedClients = RESELLERS.reduce((sum, r) => sum + r.clients.filter((c) => c.status === "churned").length, 0);
  const grossMrr = RESELLERS.reduce((sum, r) => sum + r.clients.reduce((s, c) => s + c.mrr, 0), 0);
  const commissions = (grossMrr * COMMISSION_RATE) / 100;
  const netRevenue = grossMrr - commissions;
  const directMrr = DIRECT_CUSTOMERS.reduce((sum, c) => sum + (c.status === "active" ? c.mrr : 0), 0);
  const totalMrr = grossMrr + directMrr;
  const channelPercent = ((grossMrr / totalMrr) * 100).toFixed(1);

  return (
    <div>
      <div className="grid grid-cols-5 gap-4 mb-8">
        <MetricCard label="Reseller Partners" value={`${activeResellers}`} subtext={`${pendingResellers} pending`} />
        <MetricCard label="Clients via resellers" value={activeClients} subtext={`${churnedClients} churned`} />
        <MetricCard label="Reseller Channel MRR" value={`$${grossMrr.toLocaleString()}`} />
        <MetricCard label="Net Revenue" value={`$${netRevenue.toLocaleString()}`} accent="emerald-500" />
        <MetricCard label="Channel % of Total" value={`${channelPercent}%`} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reseller Partners</h2>
        <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 font-medium">
          + Invite Reseller
        </button>
      </div>

      <div className="space-y-4">
        {RESELLERS.map((reseller) => {
          const resellersClients = reseller.clients;
          const resellersActiveClients = resellersClients.filter((c) => c.status === "active").length;
          const resellersProblems = resellersClients.filter((c) => c.health !== "green").length;
          const resellersMrr = resellersClients.reduce((sum, c) => sum + c.mrr, 0);
          const resellersCommission = (resellersMrr * COMMISSION_RATE) / 100;

          return (
            <div
              key={reseller.id}
              onClick={() => onSelectReseller(reseller.id)}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-700 font-bold text-lg">
                    {reseller.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{reseller.name}</h3>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(reseller.status)}`}>
                        {reseller.status.charAt(0).toUpperCase() + reseller.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {reseller.contact} · {reseller.email}
                    </div>
                    <div className="text-xs text-gray-500">
                      Since {reseller.since} · {COMMISSION_RATE}% commission
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-sm">
                    <div className="text-xs text-gray-500 uppercase">Active Clients</div>
                    <div className="text-xl font-semibold text-gray-900">{resellersActiveClients}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-xs text-gray-500 uppercase">MRR</div>
                    <div className="text-xl font-semibold text-gray-900">${resellersMrr.toLocaleString()}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-xs text-gray-500 uppercase">Commission</div>
                    <div className="text-xl font-semibold text-amber-600">${resellersCommission.toLocaleString()}</div>
                  </div>
                  {resellersProblems > 0 && (
                    <div className="text-sm">
                      <div className="text-xs text-red-600 font-medium">{resellersProblems} problem{resellersProblems > 1 ? "s" : ""}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Screen 2: Reseller Detail
const ResellerDetailScreen = ({ resellerId, onBack }) => {
  const reseller = RESELLERS.find((r) => r.id === resellerId);
  const activeClients = reseller.clients.filter((c) => c.status === "active").length;
  const grossMrr = reseller.clients.reduce((sum, c) => sum + c.mrr, 0);
  const commission = (grossMrr * COMMISSION_RATE) / 100;
  const netToSams = grossMrr - commission;

  return (
    <div>
      <button onClick={onBack} className="text-red-700 hover:text-red-800 font-medium mb-6">
        ← Back
      </button>

      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{reseller.name}</h1>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(reseller.status)}`}>
          {reseller.status.charAt(0).toUpperCase() + reseller.status.slice(1)}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        {reseller.contact} · {reseller.email}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium">View in Stripe</button>
        {reseller.status === "active" ? (
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium">Suspend</button>
        ) : (
          <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 font-medium">Approve & Activate</button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Active Clients" value={activeClients} />
        <MetricCard label="Gross MRR" value={`$${grossMrr.toLocaleString()}`} />
        <MetricCard label="Commission (30%)" value={`$${commission.toLocaleString()}`} accent="amber-500" />
        <MetricCard label="Net to SAMS" value={`$${netToSams.toLocaleString()}`} accent="emerald-500" />
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-6">
            <div>
              <div className="text-xs uppercase text-gray-400 font-medium mb-2">Commission</div>
              <div className="text-lg font-semibold text-gray-900">{COMMISSION_RATE}% flat</div>
            </div>

            <div>
              <div className="text-xs uppercase text-gray-400 font-medium mb-3">Stripe Connect</div>
              {reseller.stripeAcct ? (
                <div className="text-sm text-gray-700">
                  <div className="font-medium text-green-700">Connected</div>
                  <div className="text-xs text-gray-600 mt-1">{reseller.stripeAcct}</div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-700 mb-2">Not connected</div>
                  <button className="text-sm text-red-700 hover:text-red-800 font-medium">Send link</button>
                </div>
              )}
            </div>

            <div>
              <div className="text-xs uppercase text-gray-400 font-medium mb-3">Authorized Products</div>
              <div className="space-y-2">
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">STIGs</span>
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 ml-2">RegGenome</span>
              </div>
              <button className="text-sm text-red-700 hover:text-red-800 font-medium mt-3">Edit</button>
            </div>

            <div>
              <div className="text-xs uppercase text-gray-400 font-medium mb-2">Agreement</div>
              <div className="text-sm text-gray-700">Signed Jan 15, 2025</div>
              <button className="text-sm text-red-700 hover:text-red-800 font-medium mt-2">View</button>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clients</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Client</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Products</th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-900">MRR</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-900">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reseller.clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">{client.name}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(client.status)}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        {client.products.map((prod) => (
                          <span key={prod} className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            {prod}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right text-gray-900 font-medium">${client.mrr.toLocaleString()}</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`inline-block w-3 h-3 rounded-full bg-${getHealthColor(client.health)}`}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mt-1.5"></span>
          <div>
            <div className="text-sm font-medium text-gray-900">New client added: L3Harris</div>
            <div className="text-xs text-gray-500">Mar 15, 2026</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mt-1.5"></span>
          <div>
            <div className="text-sm font-medium text-gray-900">Payout processed</div>
            <div className="text-xs text-gray-500">Mar 5, 2026</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mt-1.5"></span>
          <div>
            <div className="text-sm font-medium text-gray-900">Reseller activated</div>
            <div className="text-xs text-gray-500">Nov 15, 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Screen 3: All Reseller Clients
const AllResellerClientsScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterReseller, setFilterReseller] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const allClients = RESELLERS.flatMap((r) =>
    r.clients.map((c) => ({
      ...c,
      resellerName: r.name,
      resellerId: r.id,
    }))
  );

  let filtered = allClients;
  if (searchTerm) {
    filtered = filtered.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (filterReseller !== "all") {
    filtered = filtered.filter((c) => c.resellerId === parseInt(filterReseller));
  }
  if (filterStatus !== "all") {
    filtered = filtered.filter((c) => c.status === filterStatus);
  }

  filtered = filtered.sort((a, b) => {
    const healthOrder = { red: 0, yellow: 1, green: 2 };
    return healthOrder[a.health] - healthOrder[b.health];
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Reseller Clients</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          value={filterReseller}
          onChange={(e) => setFilterReseller(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Resellers</option>
          {RESELLERS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="churned">Churned</option>
        </select>
        <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium">Export CSV</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Client</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Reseller</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Products</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900">MRR</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900">Commission</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-900">Health</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((client) => {
              const commission = (client.mrr * COMMISSION_RATE) / 100;
              return (
                <tr key={`${client.resellerId}-${client.id}`} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-900 font-medium">{client.name}</td>
                  <td className="px-6 py-3 text-gray-700">{client.resellerName}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      {client.products.map((prod) => (
                        <span key={prod} className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right text-gray-900 font-medium">${client.mrr.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right text-amber-600 font-medium">${commission.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-block w-3 h-3 rounded-full bg-${getHealthColor(client.health)}`}></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Screen 4: Direct Customers
const DirectCustomersScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const activeCustomers = DIRECT_CUSTOMERS.filter((c) => c.status === "active").length;
  const activeMrr = DIRECT_CUSTOMERS.filter((c) => c.status === "active").reduce((sum, c) => sum + c.mrr, 0);
  const avgRevenue = activeCustomers > 0 ? (activeMrr / activeCustomers).toFixed(0) : 0;
  const totalSeats = DIRECT_CUSTOMERS.reduce((sum, c) => sum + c.seats, 0);

  let filtered = DIRECT_CUSTOMERS;
  if (searchTerm) {
    filtered = filtered.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (filterStatus !== "all") {
    filtered = filtered.filter((c) => c.status === filterStatus);
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Direct Customers" value={activeCustomers} />
        <MetricCard label="Direct MRR" value={`$${activeMrr.toLocaleString()}`} accent="emerald-500" subtext="100% retained (no commission)" />
        <MetricCard label="Avg Revenue/Customer" value={`$${avgRevenue.toLocaleString()}`} />
        <MetricCard label="Total Seats" value={totalSeats} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4 flex-1">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="churned">Churned</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 font-medium ml-4">+ Add Customer</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Products</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Plan</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900">MRR</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900">Seats</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Admin</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-900">Health</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-900 font-medium">{customer.name}</td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(customer.status)}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    {customer.products.map((prod) => (
                      <span key={prod} className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {prod}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-3 text-gray-700">{customer.plan}</td>
                <td className="px-6 py-3 text-right text-gray-900 font-medium">${customer.mrr.toLocaleString()}</td>
                <td className="px-6 py-3 text-right text-gray-700">{customer.seats}</td>
                <td className="px-6 py-3 text-gray-700">{customer.admin}</td>
                <td className="px-6 py-3 text-center">
                  <span className={`inline-block w-3 h-3 rounded-full bg-${getHealthColor(customer.health)}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Screen 5: Products
const ProductsScreen = () => {
  const productStats = PRODUCTS.map((product) => {
    const resellerSubscribers = RESELLERS.reduce((count, r) => {
      return count + r.clients.filter((c) => c.status === "active" && c.products.includes(product.tag)).length;
    }, 0);

    const resellerMrr = RESELLERS.reduce((sum, r) => {
      return sum + r.clients.filter((c) => c.status === "active" && c.products.includes(product.tag)).reduce((s, c) => s + c.mrr, 0);
    }, 0);

    const directSubscribers = DIRECT_CUSTOMERS.filter((c) => c.status === "active" && c.products.includes(product.tag)).length;

    const directMrr = DIRECT_CUSTOMERS.filter((c) => c.status === "active" && c.products.includes(product.tag)).reduce((sum, c) => sum + c.mrr, 0);

    const totalSubscribers = resellerSubscribers + directSubscribers;
    const totalMrr = resellerMrr + directMrr;
    const commissionsOwed = (resellerMrr * COMMISSION_RATE) / 100;
    const netAfterCommission = totalMrr - commissionsOwed;

    return {
      ...product,
      totalSubscribers,
      totalMrr,
      resellerSubscribers,
      resellerMrr,
      directSubscribers,
      directMrr,
      netAfterCommission,
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 font-medium">+ New Product</button>
      </div>

      <div className="space-y-6">
        {productStats.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${getProductColor(product.tag)}`}>{product.tag}</span>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{product.description}</p>
                <div className="text-2xl font-bold text-gray-900">${(product.price / 100).toFixed(0)}/mo</div>
              </div>
              <div className="text-right">
                <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium text-sm block mb-2">View in Stripe</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium text-sm">Edit</button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">Total Subscribers</div>
                <div className="text-2xl font-bold text-gray-900">{product.totalSubscribers}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">Total MRR</div>
                <div className="text-2xl font-bold text-gray-900">${product.totalMrr.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">Via Resellers</div>
                <div className="text-2xl font-bold text-gray-900">{product.resellerSubscribers}</div>
                <div className="text-xs text-gray-600 mt-1">${product.resellerMrr.toLocaleString()} MRR</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">Direct</div>
                <div className="text-2xl font-bold text-gray-900">{product.directSubscribers}</div>
                <div className="text-xs text-gray-600 mt-1">${product.directMrr.toLocaleString()} MRR</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <div className="text-xs uppercase text-emerald-600 font-medium mb-2">Net (after 30%)</div>
                <div className="text-2xl font-bold text-emerald-700">${product.netAfterCommission.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Screen 6: Billing
const BillingScreen = () => {
  const allChannelMrr = RESELLERS.reduce((sum, r) => sum + r.clients.reduce((s, c) => sum + c.mrr, 0), 0);
  const directMrr = DIRECT_CUSTOMERS.filter((c) => c.status === "active").reduce((sum, c) => sum + c.mrr, 0);
  const resellerGrossMrr = RESELLERS.reduce((sum, r) => sum + r.clients.reduce((s, c) => s + c.mrr, 0), 0);
  const commissionsOwed = (resellerGrossMrr * COMMISSION_RATE) / 100;
  const netRevenue = resellerGrossMrr + directMrr - commissionsOwed;
  const totalMrr = resellerGrossMrr + directMrr;

  const directPercent = ((directMrr / totalMrr) * 100).toFixed(1);
  const resellerNetPercent = (((resellerGrossMrr - commissionsOwed) / totalMrr) * 100).toFixed(1);
  const commissionPercent = ((commissionsOwed / totalMrr) * 100).toFixed(1);

  const pastDueAccounts = [
    { name: "Accenture Federal", channel: "direct", amount: 2400, daysOverdue: 15 },
    { name: "CACI International", channel: "via FedSecure Consulting", amount: 4800, daysOverdue: 8 },
  ];

  const recentInvoices = [
    { date: "2026-03-28", customer: "US Cyber Command", channel: "direct", amount: 4800, status: "paid" },
    { date: "2026-03-25", customer: "L3Harris", channel: "via CyberVanguard Partners", amount: 2400, status: "paid" },
    { date: "2026-03-20", customer: "Deloitte Federal", channel: "direct", amount: 4800, status: "pending" },
    { date: "2026-03-18", customer: "Jacobs Engineering", channel: "via FedSecure Consulting", amount: 2400, status: "failed" },
    { date: "2026-03-15", customer: "DISA", channel: "direct", amount: 2400, status: "paid" },
  ];

  return (
    <div>
      <div className="grid grid-cols-5 gap-4 mb-8">
        <MetricCard label="Total MRR (All Channels)" value={`$${totalMrr.toLocaleString()}`} />
        <MetricCard label="Direct MRR" value={`$${directMrr.toLocaleString()}`} accent="emerald-500" subtext="100% retained" />
        <MetricCard label="Reseller MRR" value={`$${resellerGrossMrr.toLocaleString()}`} />
        <MetricCard label="Commissions Owed" value={`$${commissionsOwed.toLocaleString()}`} accent="amber-500" />
        <MetricCard label="Net Revenue" value={`$${netRevenue.toLocaleString()}`} accent="emerald-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-32">
            <div className="text-xs uppercase text-gray-500 font-medium">Direct ({directPercent}%)</div>
          </div>
          <div className="flex-1 bg-emerald-500 h-8 rounded-lg"></div>
          <div className="text-sm font-semibold text-gray-900">${directMrr.toLocaleString()}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32">
            <div className="text-xs uppercase text-gray-500 font-medium">Reseller Net ({resellerNetPercent}%)</div>
          </div>
          <div className="flex-1 bg-blue-500 h-8 rounded-lg"></div>
          <div className="text-sm font-semibold text-gray-900">${(resellerGrossMrr - commissionsOwed).toLocaleString()}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32">
            <div className="text-xs uppercase text-gray-500 font-medium">Commission ({commissionPercent}%)</div>
          </div>
          <div className="flex-1 bg-amber-400 h-8 rounded-lg"></div>
          <div className="text-sm font-semibold text-gray-900">${commissionsOwed.toLocaleString()}</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Due Accounts</h3>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 space-y-4">
        {pastDueAccounts.length > 0 ? (
          pastDueAccounts.map((account, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-red-100 last:border-b-0">
              <div>
                <div className="font-medium text-gray-900">{account.name}</div>
                <div className="text-sm text-gray-600">{account.channel}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-red-700">${account.amount.toLocaleString()}</div>
                <div className="text-xs text-red-600">{account.daysOverdue} days overdue</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600">No past due accounts</div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
        <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium">Open Stripe Dashboard</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Channel</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentInvoices.map((invoice, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-700">{invoice.date}</td>
                <td className="px-6 py-3 text-gray-900 font-medium">{invoice.customer}</td>
                <td className="px-6 py-3 text-gray-700">{invoice.channel}</td>
                <td className="px-6 py-3 text-right text-gray-900 font-medium">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-3">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      invoice.status === "paid"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : invoice.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main App Component
export default function AdminPortal() {
  const [activeScreen, setActiveScreen] = useState("resellers");
  const [selectedResellerId, setSelectedResellerId] = useState(null);

  const handleSelectReseller = (resellerId) => {
    setSelectedResellerId(resellerId);
    setActiveScreen("reseller-detail");
  };

  const handleBack = () => {
    setSelectedResellerId(null);
    setActiveScreen("resellers");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
            <div className="text-2xl font-bold text-gray-900">SAMS</div>
            <div className="text-gray-400 mx-2">|</div>
            <div className="text-lg font-medium text-red-700">Admin</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">Super Admin</span>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-700 font-bold">OC</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-56 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6 space-y-8">
            <div>
              <div className="text-xs uppercase text-gray-400 font-bold mb-4">Reseller Channel</div>
              <button
                onClick={() => setActiveScreen("resellers")}
                className={`block w-full text-left px-4 py-2 rounded-lg mb-2 font-medium ${activeScreen === "resellers" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Resellers
              </button>
              <button
                onClick={() => setActiveScreen("all-reseller-clients")}
                className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${activeScreen === "all-reseller-clients" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"}`}
              >
                All Reseller Clients
              </button>
            </div>

            <div>
              <div className="text-xs uppercase text-gray-400 font-bold mb-4">Business Operations</div>
              <button
                onClick={() => setActiveScreen("direct-customers")}
                className={`block w-full text-left px-4 py-2 rounded-lg mb-2 font-medium ${activeScreen === "direct-customers" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Direct Customers
              </button>
              <button
                onClick={() => setActiveScreen("products")}
                className={`block w-full text-left px-4 py-2 rounded-lg mb-2 font-medium ${activeScreen === "products" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveScreen("billing")}
                className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${activeScreen === "billing" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Billing
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 p-6">
          <div className="max-w-6xl">
            {/* Wireframe Banner */}
            <div className="bg-red-50 border-2 border-red-700 rounded-lg p-4 mb-8 text-sm text-gray-700">
              <span className="font-semibold text-red-700">ADMIN WIREFRAME</span> — OpenControls internal view · Flat 30% commission · Click reseller cards to drill in
            </div>

            {/* Screen Content */}
            {activeScreen === "resellers" && <ResellersScreen onSelectReseller={handleSelectReseller} />}
            {activeScreen === "reseller-detail" && <ResellerDetailScreen resellerId={selectedResellerId} onBack={handleBack} />}
            {activeScreen === "all-reseller-clients" && <AllResellerClientsScreen />}
            {activeScreen === "direct-customers" && <DirectCustomersScreen />}
            {activeScreen === "products" && <ProductsScreen />}
            {activeScreen === "billing" && <BillingScreen />}
          </div>
        </div>
      </div>
    </div>
  );
}
