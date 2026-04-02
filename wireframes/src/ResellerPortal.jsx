import { useState } from 'react';

const clients = [
  {
    id: 'northrop',
    name: 'Northrop Grumman - Cyber Div',
    status: 'active',
    products: ['STIGs', 'RegGenome'],
    mrr: 4800,
    health: 'green',
    createdDate: '2025-09-15',
    admin: { name: 'Sarah Chen', email: 'sarah.chen@northrop.com' },
    invoices: [
      { date: '2026-03-15', amount: 4800, commission: 1440, payout: 'paid' },
      { date: '2026-02-15', amount: 4800, commission: 1440, payout: 'paid' },
      { date: '2026-01-15', amount: 4800, commission: 1440, payout: 'paid' }
    ]
  },
  {
    id: 'raytheon',
    name: 'Raytheon Technologies',
    status: 'active',
    products: ['STIGs'],
    mrr: 2400,
    health: 'green',
    createdDate: '2025-11-01',
    admin: { name: 'Mike Torres', email: 'mike.torres@raytheon.com' },
    invoices: [
      { date: '2026-03-15', amount: 2400, commission: 720, payout: 'paid' },
      { date: '2026-02-15', amount: 2400, commission: 720, payout: 'paid' }
    ]
  },
  {
    id: 'bah',
    name: 'Booz Allen Hamilton',
    status: 'past_due',
    products: ['STIGs', 'RegGenome'],
    mrr: 4800,
    health: 'red',
    createdDate: '2025-08-20',
    admin: { name: 'Jessica Park', email: 'jessica.park@bah.com' },
    invoices: [
      { date: '2026-03-15', amount: 4800, commission: 1440, payout: 'held' },
      { date: '2026-02-15', amount: 4800, commission: 1440, payout: 'paid' },
      { date: '2026-01-15', amount: 4800, commission: 1440, payout: 'paid' }
    ]
  },
  {
    id: 'saic',
    name: 'SAIC',
    status: 'active',
    products: ['RegGenome'],
    mrr: 2400,
    health: 'green',
    createdDate: '2026-01-10',
    admin: { name: 'David Liu', email: 'david.liu@saic.com' },
    invoices: [
      { date: '2026-03-15', amount: 2400, commission: 720, payout: 'paid' },
      { date: '2026-02-15', amount: 2400, commission: 720, payout: 'paid' }
    ]
  },
  {
    id: 'leidos',
    name: 'Leidos',
    status: 'active',
    products: ['STIGs'],
    mrr: 2400,
    health: 'yellow',
    createdDate: '2025-12-05',
    admin: { name: 'Karen Wright', email: 'karen.wright@leidos.com' },
    invoices: [
      { date: '2026-03-15', amount: 2400, commission: 720, payout: 'pending' },
      { date: '2026-02-15', amount: 2400, commission: 720, payout: 'paid' }
    ]
  },
  {
    id: 'gdit',
    name: 'General Dynamics IT',
    status: 'churned',
    products: ['STIGs'],
    mrr: 0,
    health: 'red',
    createdDate: '2025-07-01',
    admin: { name: 'Tom Bradley', email: 'tom.bradley@gdit.com' },
    invoices: [
      { date: '2025-07-15', amount: 2400, commission: 720, payout: 'paid' }
    ]
  },
  {
    id: 'peraton',
    name: 'Peraton',
    status: 'active',
    products: ['STIGs', 'RegGenome'],
    mrr: 4800,
    health: 'green',
    createdDate: '2025-10-20',
    admin: { name: 'Amy Nguyen', email: 'amy.nguyen@peraton.com' },
    invoices: [
      { date: '2026-03-15', amount: 4800, commission: 1440, payout: 'paid' },
      { date: '2026-02-15', amount: 4800, commission: 1440, payout: 'paid' }
    ]
  },
  {
    id: 'mantech',
    name: 'ManTech International',
    status: 'active',
    products: ['STIGs'],
    mrr: 2400,
    health: 'green',
    createdDate: '2026-02-01',
    admin: { name: 'Robert Kim', email: 'robert.kim@mantech.com' },
    invoices: [
      { date: '2026-03-15', amount: 2400, commission: 720, payout: 'pending' },
      { date: '2026-02-15', amount: 2400, commission: 720, payout: 'paid' }
    ]
  }
];

const payouts = [
  {
    id: 'po_001',
    date: '2026-03-31',
    status: 'in_transit',
    breakdown: [
      { clientName: 'Northrop Grumman - Cyber Div', commission: 1440, status: 'paid' },
      { clientName: 'Raytheon Technologies', commission: 720, status: 'paid' },
      { clientName: 'Booz Allen Hamilton', commission: 1440, status: 'held' },
      { clientName: 'SAIC', commission: 720, status: 'paid' },
      { clientName: 'Leidos', commission: 720, status: 'pending' },
      { clientName: 'Peraton', commission: 1440, status: 'paid' },
      { clientName: 'ManTech International', commission: 720, status: 'pending' }
    ]
  },
  {
    id: 'po_002',
    date: '2026-02-28',
    status: 'paid',
    breakdown: [
      { clientName: 'Northrop Grumman - Cyber Div', commission: 1440, status: 'paid' },
      { clientName: 'Raytheon Technologies', commission: 720, status: 'paid' },
      { clientName: 'Booz Allen Hamilton', commission: 1440, status: 'paid' },
      { clientName: 'SAIC', commission: 720, status: 'paid' },
      { clientName: 'Leidos', commission: 720, status: 'paid' },
      { clientName: 'Peraton', commission: 1440, status: 'paid' }
    ]
  },
  {
    id: 'po_003',
    date: '2026-01-31',
    status: 'paid',
    breakdown: [
      { clientName: 'Northrop Grumman - Cyber Div', commission: 1440, status: 'paid' },
      { clientName: 'Raytheon Technologies', commission: 720, status: 'paid' },
      { clientName: 'Booz Allen Hamilton', commission: 1440, status: 'paid' },
      { clientName: 'SAIC', commission: 720, status: 'paid' },
      { clientName: 'Leidos', commission: 720, status: 'paid' },
      { clientName: 'Peraton', commission: 1440, status: 'paid' }
    ]
  }
];

// ============ UI Components ============
function MetricCard({ label, value, subtext, accentColor }) {
  const colorClass = accentColor || 'text-gray-900';
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className={`text-xs uppercase font-semibold text-gray-500 mb-2`}>
        {label}
      </div>
      <div className={`text-2xl font-semibold ${colorClass}`}>{value}</div>
      {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    past_due: 'bg-red-50 text-red-700 border border-red-200',
    churned: 'bg-gray-100 text-gray-500 border border-gray-300',
    paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    held: 'bg-red-50 text-red-700 border border-red-200',
    in_transit: 'bg-blue-50 text-blue-700 border border-blue-200'
  };
  const labels = {
    active: 'Active',
    past_due: 'Past Due',
    churned: 'Churned',
    paid: 'Paid',
    pending: 'Pending',
    held: 'Held',
    in_transit: 'In Transit'
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function HealthDot({ health }) {
  const colors = {
    green: 'bg-emerald-500',
    yellow: 'bg-amber-400',
    red: 'bg-red-500'
  };
  return <div className={`w-3 h-3 rounded-full ${colors[health]}`} />;
}

function ProductTag({ product }) {
  const styles = {
    STIGs: 'bg-blue-50 text-blue-700 border border-blue-200',
    RegGenome: 'bg-violet-50 text-violet-700 border border-violet-200'
  };
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${styles[product]}`}>
      {product}
    </span>
  );
}

// ============ Screen Components ============
function Dashboard({ clientList }) {
  const activeCount = clientList.filter(c => c.status === 'active').length;
  const pastDueCount = clientList.filter(c => c.status === 'past_due').length;
  const churnedCount = clientList.filter(c => c.status === 'churned').length;
  const portfolioMRR = clientList.filter(c => c.status === 'active').reduce((sum, c) => sum + c.mrr, 0);
  const monthlyCommission = portfolioMRR * 0.3;
  const pendingPayouts = payouts
    .find(p => p.id === 'po_001')
    ?.breakdown.filter(b => b.status === 'pending')
    .reduce((sum, b) => sum + b.commission, 0) || 0;

  const needsAttention = clientList.filter(c => c.health !== 'green');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="Active Clients"
          value={activeCount}
          subtext={`${pastDueCount} past due · ${churnedCount} churned`}
        />
        <MetricCard label="Portfolio MRR" value={`$${portfolioMRR.toLocaleString()}`} />
        <MetricCard
          label="Monthly Commission"
          value={`$${monthlyCommission.toLocaleString()}`}
          subtext="30% of active MRR"
          accentColor="text-emerald-600"
        />
        <MetricCard
          label="Pending Payout"
          value={`$${pendingPayouts.toLocaleString()}`}
          accentColor={pendingPayouts > 0 ? 'text-amber-600' : 'text-gray-900'}
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Commission Trend</h3>
        <div className="flex items-end justify-around h-40 gap-2">
          {[3600, 4320, 5400, 6120, 6840, 7200].map((val, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="text-xs font-semibold text-gray-600 mb-1">${(val / 100).toFixed(0)}K</div>
              <div className="bg-emerald-400 rounded w-full" style={{ height: `${(val / 7200) * 100}%` }} />
              <div className="text-xs text-gray-500 mt-2">
                {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Needs Attention</h3>
        <div className="space-y-3">
          {needsAttention.map(client => (
            <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <HealthDot health={client.health} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">Last paid: {client.invoices[0]?.date}</p>
                </div>
              </div>
              <StatusBadge status={client.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Clients({ clientList, onSelectClient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [sortBy, setSortBy] = useState('health');

  let filtered = clientList;
  if (statusFilter !== 'all') {
    filtered = filtered.filter(c => c.status === statusFilter);
  }
  if (productFilter !== 'all') {
    filtered = filtered.filter(c => c.products.includes(productFilter));
  }
  if (searchTerm) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  const healthOrder = { green: 0, yellow: 1, red: 2 };
  filtered.sort((a, b) => {
    if (sortBy === 'health') return healthOrder[a.health] - healthOrder[b.health];
    if (sortBy === 'mrr') return b.mrr - a.mrr;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="past_due">Past Due</option>
          <option value="churned">Churned</option>
        </select>
        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All Products</option>
          <option value="STIGs">STIGs</option>
          <option value="RegGenome">RegGenome</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="health">Sort: Health</option>
          <option value="mrr">Sort: MRR</option>
          <option value="name">Sort: Name</option>
        </select>
        <button className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
          Export CSV
        </button>
        <button className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">
          New Client
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Client</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Products</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">MRR</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Commission</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Payment</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Last Paid</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(client => (
              <tr
                key={client.id}
                onClick={() => onSelectClient(client.id)}
                className="border-b border-gray-50 hover:bg-blue-50 cursor-pointer"
              >
                <td className="px-4 py-3 font-medium text-gray-900">{client.name}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={client.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {client.products.map(p => (
                      <ProductTag key={p} product={p} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-900">${client.mrr.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-900">${(client.mrr * 0.3).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <HealthDot health={client.health} />
                </td>
                <td className="px-4 py-3 text-gray-600">{client.invoices[0]?.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientDetail({ client, onBack }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm text-gray-600 hover:text-gray-900">
        ← All Clients
      </button>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
          <StatusBadge status={client.status} />
        </div>
        <p className="text-sm text-gray-600">Client since {client.createdDate}</p>
        <button className="mt-3 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50">
          Request Support
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Monthly Revenue" value={`$${client.mrr.toLocaleString()}`} />
        <MetricCard
          label="Your Commission (30%)"
          value={`$${(client.mrr * 0.3).toLocaleString()}`}
          accentColor="text-emerald-600"
        />
        <MetricCard label="Payment Health" value={client.health.charAt(0).toUpperCase() + client.health.slice(1)} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Account Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs uppercase text-gray-500 font-semibold">Admin Contact</p>
              <p className="text-gray-900 font-medium">{client.admin.name}</p>
              <p className="text-gray-600">{client.admin.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Products</p>
              <div className="flex gap-1">
                {client.products.map(p => (
                  <ProductTag key={p} product={p} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 font-semibold">Created</p>
              <p className="text-gray-900">{client.createdDate}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Commission History</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Invoice Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Commission</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {client.invoices.map((invoice, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="px-4 py-3 text-gray-900">{invoice.date}</td>
                  <td className="px-4 py-3 text-gray-900">${invoice.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-900">${invoice.commission.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={invoice.payout} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Payouts() {
  const [expandedPayouts, setExpandedPayouts] = useState({});
  const totalEarned = payouts.reduce((sum, p) => {
    return sum + p.breakdown.reduce((s, b) => s + b.commission, 0);
  }, 0);
  const inTransit = payouts.find(p => p.status === 'in_transit')?.breakdown.reduce((sum, b) => sum + b.commission, 0) || 0;
  const held = payouts.find(p => p.status === 'in_transit')?.breakdown.filter(b => b.status === 'held').reduce((sum, b) => sum + b.commission, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Total Earned" value={`$${totalEarned.toLocaleString()}`} />
        <MetricCard
          label="In Transit"
          value={`$${inTransit.toLocaleString()}`}
          subtext="Arriving Apr 2, 2026"
          accentColor="text-blue-600"
        />
        <MetricCard
          label="Held"
          value={`$${held.toLocaleString()}`}
          subtext="1 client past due"
          accentColor="text-red-600"
        />
        <MetricCard label="Payout Schedule" value="Monthly" />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-red-700 mb-1">
          ${held.toLocaleString()} held from March payout
        </p>
        <p className="text-xs text-red-600">
          Commissions from Booz Allen Hamilton are held until their account is brought current.
        </p>
      </div>

      <div className="space-y-3">
        {payouts.map(payout => (
          <div key={payout.id}>
            <button
              onClick={() => setExpandedPayouts(prev => ({ ...prev, [payout.id]: !prev[payout.id] }))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 text-left hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{payout.date}</p>
                  <p className="text-xs text-gray-500">
                    Total: ${payout.breakdown.reduce((sum, b) => sum + b.commission, 0).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={payout.status} />
                  <span className="text-gray-400">{expandedPayouts[payout.id] ? '▼' : '▶'}</span>
                </div>
              </div>
            </button>

            {expandedPayouts[payout.id] && (
              <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-50">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Client</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Commission</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payout.breakdown.map((item, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="px-4 py-3 text-gray-900">{item.clientName}</td>
                        <td
                          className={`px-4 py-3 ${
                            item.status === 'held'
                              ? 'text-red-700 line-through'
                              : 'text-gray-900'
                          }`}
                        >
                          ${item.commission.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);

  if (selectedReport) {
    const reportData = {
      commission_summary: {
        title: 'Commission Summary',
        description: 'Monthly and YTD commission earnings',
        data: [
          { period: 'March 2026', amount: 7200, trend: '+5%' },
          { period: 'February 2026', amount: 6840, trend: '+8%' },
          { period: 'January 2026', amount: 6120, trend: '+12%' }
        ]
      },
      client_revenue: {
        title: 'Client Revenue',
        description: 'MRR by client and subscription type',
        data: [
          { client: 'Northrop Grumman', mrr: 4800, pct: '20%' },
          { client: 'Peraton', mrr: 4800, pct: '20%' },
          { client: 'Raytheon Technologies', mrr: 2400, pct: '10%' }
        ]
      },
      churn_retention: {
        title: 'Churn & Retention',
        description: 'Client retention metrics and churn analysis',
        data: [
          { month: 'Q1 2026', retention: '87.5%', churn: '12.5%' },
          { month: 'Q4 2025', retention: '85.7%', churn: '14.3%' },
          { month: 'Q3 2025', retention: '80%', churn: '20%' }
        ]
      },
      tax_summary: {
        title: 'Tax Summary',
        description: '1099 and tax reporting summary',
        data: [
          { quarter: 'Q1 2026', earnings: 20760, withholding: 0 },
          { quarter: 'Q4 2025', earnings: 19440, withholding: 0 },
          { quarter: 'Q3 2025', earnings: 18120, withholding: 0 }
        ]
      }
    };

    const report = reportData[selectedReport];

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedReport(null)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to Reports
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{report.title}</h1>
          <p className="text-sm text-gray-600">{report.description}</p>
        </div>

        <div className="flex gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
          <button className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
            Export CSV
          </button>
          <button className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
            Export PDF
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-50">
                {selectedReport === 'commission_summary' && (
                  <>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Trend</th>
                  </>
                )}
                {selectedReport === 'client_revenue' && (
                  <>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Client</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">MRR</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">% of Total</th>
                  </>
                )}
                {selectedReport === 'churn_retention' && (
                  <>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Retention</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Churn</th>
                  </>
                )}
                {selectedReport === 'tax_summary' && (
                  <>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Quarter</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Earnings</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Withholding</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {report.data.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {selectedReport === 'commission_summary' && (
                    <>
                      <td className="px-4 py-3 text-gray-900">{row.period}</td>
                      <td className="px-4 py-3 text-gray-900">${row.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-emerald-600 text-sm">{row.trend}</td>
                    </>
                  )}
                  {selectedReport === 'client_revenue' && (
                    <>
                      <td className="px-4 py-3 text-gray-900">{row.client}</td>
                      <td className="px-4 py-3 text-gray-900">${row.mrr.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600">{row.pct}</td>
                    </>
                  )}
                  {selectedReport === 'churn_retention' && (
                    <>
                      <td className="px-4 py-3 text-gray-900">{row.month}</td>
                      <td className="px-4 py-3 text-emerald-600">{row.retention}</td>
                      <td className="px-4 py-3 text-red-600">{row.churn}</td>
                    </>
                  )}
                  {selectedReport === 'tax_summary' && (
                    <>
                      <td className="px-4 py-3 text-gray-900">{row.quarter}</td>
                      <td className="px-4 py-3 text-gray-900">${row.earnings.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600">${row.withholding.toLocaleString()}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const reports = [
    { id: 'commission_summary', title: 'Commission Summary', icon: '$', color: 'emerald' },
    { id: 'client_revenue', title: 'Client Revenue', icon: 'C', color: 'blue' },
    { id: 'churn_retention', title: 'Churn & Retention', icon: 'R', color: 'violet' },
    { id: 'tax_summary', title: 'Tax Summary', icon: 'T', color: 'amber' }
  ];

  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600'
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {reports.map(report => (
        <button
          key={report.id}
          onClick={() => setSelectedReport(report.id)}
          className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-gray-300 hover:shadow-sm"
        >
          <div className={`w-12 h-12 rounded-lg ${colorMap[report.color]} flex items-center justify-center text-2xl font-bold mb-3`}>
            {report.icon}
          </div>
          <h3 className="font-semibold text-gray-900">{report.title}</h3>
        </button>
      ))}
    </div>
  );
}

function Settings() {
  const [settingsTab, setSettingsTab] = useState('company');
  const [notificationToggles, setNotificationToggles] = useState({
    payoutSent: true,
    payoutFailed: true,
    clientPaymentFailed: true,
    clientChurned: false,
    clientActivated: true,
    commissionHeld: true,
    monthlySummary: true
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-200">
        {['company', 'payout', 'notifications', 'team'].map(tab => (
          <button
            key={tab}
            onClick={() => setSettingsTab(tab)}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              settingsTab === tab
                ? 'text-gray-900 border-gray-900'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {settingsTab === 'company' && (
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Organization Name</label>
            <input
              disabled
              value="OpenControls.ai"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Primary Contact</label>
            <input
              value="Dorian"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              value="dorian@opencontrols.ai"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded text-xs font-medium">
              30% Flat Rate
            </span>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
            Save
          </button>
        </div>
      )}

      {settingsTab === 'payout' && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white border border-indigo-200 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Stripe Connect</p>
              <p className="text-sm text-gray-600">Bank of America ****4821 · ACH</p>
              <p className="text-xs text-gray-500 mt-1">Monthly · USD</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded text-xs font-medium">
                Verified
              </span>
              <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded text-xs font-medium">
                Active
              </span>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50">
            Update Bank Account
          </button>
        </div>
      )}

      {settingsTab === 'notifications' && (
        <div className="space-y-4 max-w-2xl">
          {[
            { key: 'payoutSent', label: 'Payout sent' },
            { key: 'payoutFailed', label: 'Payout failed' },
            { key: 'clientPaymentFailed', label: 'Client payment failed' },
            { key: 'clientChurned', label: 'Client churned' },
            { key: 'clientActivated', label: 'Client activated' },
            { key: 'commissionHeld', label: 'Commission held' },
            { key: 'monthlySummary', label: 'Monthly summary' }
          ].map(notification => (
            <div key={notification.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-900">{notification.label}</span>
              <input
                type="checkbox"
                checked={notificationToggles[notification.key]}
                onChange={(e) =>
                  setNotificationToggles(prev => ({
                    ...prev,
                    [notification.key]: e.target.checked
                  }))
                }
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>
      )}

      {settingsTab === 'team' && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
            {[
              { name: 'Dorian', role: 'Owner', status: 'active' },
              { name: 'Emily', role: 'Admin', status: 'active' },
              { name: 'Marcus', role: 'Viewer', status: 'pending' }
            ].map(member => (
              <div key={member.name} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
                {member.status === 'pending' && (
                  <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50">
            + Invite
          </button>
        </div>
      )}
    </div>
  );
}

// ============ Main Component ============
export default function ResellerPortal() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedClientId, setSelectedClientId] = useState(null);
  const selectedClient = clients.find(c => c.id === selectedClientId);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'clients', label: 'Clients' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'reports', label: 'Reports' }
  ];

  const settingsItems = [
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-52 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center font-bold">
              S
            </div>
            <span className="font-bold text-gray-900">SAMS</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 text-xs">Reseller Portal</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentScreen(item.id);
                setSelectedClientId(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentScreen === item.id && !selectedClientId
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          {settingsItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentScreen(item.id);
                setSelectedClientId(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentScreen === item.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <div />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">OpenControls.ai</span>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
              DC
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-6xl mx-auto p-6">
            {/* Wireframe Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-xs font-semibold text-yellow-800">
                WIREFRAME — All sidebar links clickable · Click table rows for detail · Expand payouts for line items
              </p>
            </div>

            {/* Screen Content */}
            {selectedClientId && selectedClient ? (
              <ClientDetail
                client={selectedClient}
                onBack={() => setSelectedClientId(null)}
              />
            ) : currentScreen === 'dashboard' ? (
              <Dashboard clientList={clients} />
            ) : currentScreen === 'clients' ? (
              <Clients clientList={clients} onSelectClient={setSelectedClientId} />
            ) : currentScreen === 'payouts' ? (
              <Payouts />
            ) : currentScreen === 'reports' ? (
              <Reports />
            ) : currentScreen === 'settings' ? (
              <Settings />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
