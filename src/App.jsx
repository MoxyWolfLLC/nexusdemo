import React, { useState, useMemo } from "react";
import {
  Shield, AlertTriangle, CheckCircle2, Clock, Pause, XCircle,
  ChevronDown, ChevronRight, ChevronLeft, Brain, FileText, Download,
  Search, ArrowRight, ThumbsUp, Eye, Tag, Layers, Activity, Database,
  Globe, Cpu, Upload, FolderOpen, RefreshCcw, Plus, X, Scale,
  Flag, Bookmark, RotateCcw, Send, Sparkles, ExternalLink, Copy,
  Link, Minimize2, Maximize2, PauseCircle, ChevronUp,
  BookOpen, Hash, TrendingUp, ArrowUpDown, Filter,
  BarChart3, GitBranch, DollarSign, Zap, PieChart, Network,
  Library, ListChecks, Archive, FolderPlus, Pencil, Trash2, Share2, Star,
  Users, Briefcase, Target, Crosshair, MapPin, Menu, Sidebar,
  UserCheck, ClipboardCheck, ShieldCheck, LinkIcon, Unlink
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// NEXUS PLATFORM — Interactive Prototype
// Populated with real Anduril NixOS STIG data (104 findings)
// ═══════════════════════════════════════════════════════════════

const C = {
  sev: {
    "CAT I": { bg:"bg-red-100",text:"text-red-800",border:"border-red-300",icon:Shield },
    "CAT II": { bg:"bg-amber-100",text:"text-amber-800",border:"border-amber-300",icon:AlertTriangle },
    "CAT III": { bg:"bg-blue-100",text:"text-blue-800",border:"border-blue-300",icon:FileText },
  },
  stg: {
    pending:{bg:"bg-slate-50",text:"text-slate-500",border:"border-slate-200",icon:Clock},
    in_progress:{bg:"bg-emerald-50",text:"text-emerald-700",border:"border-emerald-200",icon:Activity},
    at_checkpoint:{bg:"bg-amber-50",text:"text-amber-700",border:"border-amber-200",icon:Pause},
    completed:{bg:"bg-emerald-100",text:"text-emerald-800",border:"border-emerald-300",icon:CheckCircle2},
    failed:{bg:"bg-red-50",text:"text-red-700",border:"border-red-200",icon:XCircle},
  },
  bl: {
    Remember:{bg:"bg-slate-100",text:"text-slate-700"},Understand:{bg:"bg-sky-100",text:"text-sky-700"},
    Apply:{bg:"bg-blue-100",text:"text-blue-700"},Analyze:{bg:"bg-violet-100",text:"text-violet-700"},
    Evaluate:{bg:"bg-purple-100",text:"text-purple-700"},Create:{bg:"bg-fuchsia-100",text:"text-fuchsia-700"},
  },
  ag: {
    Alice:{bg:"bg-rose-100",text:"text-rose-700",ring:"ring-rose-300"},
    Bob:{bg:"bg-sky-100",text:"text-sky-700",ring:"ring-sky-300"},
    Clara:{bg:"bg-amber-100",text:"text-amber-700",ring:"ring-amber-300"},
    David:{bg:"bg-emerald-100",text:"text-emerald-700",ring:"ring-emerald-300"},
  },
  md: {"GPT-4o":{bg:"bg-green-100",text:"text-green-700"},Claude:{bg:"bg-orange-100",text:"text-orange-700"},Gemini:{bg:"bg-blue-100",text:"text-blue-700"},Grok:{bg:"bg-slate-100",text:"text-slate-700"}},
};

// ── COMPONENTS ───────────────────────────────────────────────

const Sev = ({l})=>{const c=C.sev[l]||C.sev["CAT II"];const I=c.icon;return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${c.bg} ${c.text} border ${c.border}`}><I size={11}/>{l}</span>};

const SB = ({stage,status})=>{
  const labels={rag_ingest:"RAG Ingest",parse_finding:"Parse",mwe_tag_pass_1:"MWE Pass 1",atomize:"Atomize",mwe_tag_pass_2:"MWE Pass 2",blooms_classify:"SCL Classify",completed:"Complete"};
  const c=C.stg[status]||C.stg.pending;const I=c.icon;
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${c.bg} ${c.text} border ${c.border}`}><I size={11} className={status==="in_progress"?"animate-pulse":""}/>{labels[stage]||stage}</span>
};

const BB = ({l})=>{const c=C.bl[l]||C.bl.Remember;const i=["Remember","Understand","Apply","Analyze","Evaluate","Create"].indexOf(l);return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${c.bg} ${c.text}`}><Brain size={11}/>{l}<span className="opacity-50">L{i+1}</span></span>};

const SP = ({status})=>{const m={processing:{bg:"bg-blue-100",text:"text-blue-700",dot:"bg-blue-500 animate-pulse",l:"Processing"},completed:{bg:"bg-emerald-100",text:"text-emerald-700",dot:"bg-emerald-500",l:"Completed"}};const c=m[status]||m.processing;return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}><span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}/>{c.l}</span>};

const CB = ({s})=>{const p=Math.round(s*100);const cl=p>=85?"text-emerald-600":p>=70?"text-amber-600":"text-red-600";const bg=p>=85?"bg-emerald-500":p>=70?"bg-amber-500":"bg-red-500";const tr=p>=85?"bg-emerald-100":p>=70?"bg-amber-100":"bg-red-100";return <div className="inline-flex items-center gap-1.5"><div className={`w-12 h-1.5 rounded-full ${tr} overflow-hidden`}><div className={`h-full rounded-full ${bg}`} style={{width:`${p}%`}}/></div><span className={`font-semibold ${cl} text-[11px] tabular-nums`}>{p}%</span></div>};

const MC = ({term,pass,v})=><span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${v?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-amber-50 text-amber-700 border-amber-200"}`}><Tag size={9}/>{term}{pass&&<span className="opacity-50">P{pass}</span>}{v&&<CheckCircle2 size={9} className="text-emerald-500"/>}</span>;

const AA = ({name,vote,sz})=>{const c=C.ag[name]||C.ag.Alice;const s=sz==="sm"?"w-7 h-7 text-[10px]":"w-10 h-10 text-sm";return <div className="flex flex-col items-center gap-0.5"><div className={`${s} rounded-full ${c.bg} ${c.text} ring-2 ${c.ring} flex items-center justify-center font-bold`}>{name[0]}</div><span className="text-[9px] font-medium text-slate-500">{name}</span>{vote&&<span className={`text-[9px] font-bold px-1 py-0.5 rounded ${vote==="TAG"?"bg-emerald-100 text-emerald-700":"bg-red-100 text-red-700"}`}>{vote}</span>}</div>};

const MB = ({name})=>{const c=C.md[name]||C.md.Grok;return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${c.bg} ${c.text}`}><Cpu size={9}/>{name}</span>};

const PM = ({cs,st})=>{const ss=["rag_ingest","parse_finding","mwe_tag_pass_1","atomize","mwe_tag_pass_2","blooms_classify"];const idx=ss.indexOf(cs);const dn=cs==="completed";return <div className="flex items-center gap-px w-full min-w-[120px]">{ss.map((s,i)=>{const d=dn||i<idx;const a=!dn&&i===idx;const cp=a&&st==="at_checkpoint";return <div key={s} className="flex-1"><div className={`h-1.5 rounded-full transition-all ${d?"bg-emerald-500":cp?"bg-amber-400 animate-pulse":a?"bg-blue-500 animate-pulse":"bg-slate-200"}`}/></div>})}</div>};

// ── REAL STIG DATA ──────────────────────────────────────────
// Anduril NixOS STIG — 104 findings from groups array

const commonMwe = [
  {t:"audit record",v:true},{t:"audit daemon",v:true},{t:"access control",v:true},
  {t:"remote access",v:true},{t:"information system",v:true},{t:"cryptographic module",v:true},
  {t:"kernel module",v:true},{t:"authentication mechanism",v:true},{t:"account lockout",v:true},
  {t:"password complexity",v:true},{t:"privileged account",v:true},{t:"session lock",v:true},
  {t:"system call",v:true},{t:"audit log",v:true},{t:"file integrity",v:true},
  {t:"disk encryption",v:true},{t:"certificate validation",v:true},{t:"network firewall",v:true},
  {t:"emergency account",v:false},{t:"configuration baseline",v:false},{t:"privilege escalation",v:false},
  {t:"execution control policy",v:false},{t:"audit trail preservation",v:false},
];

// Seeded random for deterministic mock data
let _seed = 42;
const srand = () => { _seed=((_seed*16807)%2147483647); return(_seed-1)/2147483646; };

const rawGroups = [
  {id:"V-268078",sev:"medium",title:"NixOS must enable the built-in firewall.",vuln:"Without the ability to immediately disconnect or disable remote access, an attack or other compromise taking place would not be immediately stopped. Operating system remote access functionality must have the capability to immediately disconnect current users remotely accessing the information system and/or disable further remote access."},
  {id:"V-268096",sev:"medium",title:"Successful/unsuccessful uses of the init_module, finit_module, and delete_module system calls in NixOS must generate an audit record.",vuln:"Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one. The init_module and finit_module system calls are used to load a kernel module, and the delete_module is used to unload a kernel module."},
  {id:"V-268079",sev:"medium",title:"NixOS emergency or temporary user accounts must be provisioned with an expiration time of 72 hours or less.",vuln:"If emergency or temporary user accounts remain active when no longer needed or for an excessive period, these accounts may be used to gain unauthorized access. To mitigate this risk, automated termination of all emergency or temporary accounts must be set upon account creation."},
  {id:"V-268080",sev:"medium",title:"NixOS must enable the audit daemon.",vuln:"Once an attacker establishes access to a system, the attacker often attempts to create a persistent method of reestablishing access. One way to accomplish this is for the attacker to create an account. Auditing account creation actions provides logging that can be used for forensic purposes."},
  {id:"V-268081",sev:"medium",title:"NixOS must enforce the limit of three consecutive invalid login attempts by a user during a 15-minute time period.",vuln:"By limiting the number of failed logon attempts, the risk of unauthorized system access via user password guessing, otherwise known as brute-force attacks, is reduced. Limits are imposed by locking out the user after exceeding maximum invalid attempts."},
  {id:"V-268082",sev:"medium",title:"NixOS must automatically lock an account until the account lock is released by an administrator when three unsuccessful login attempts in 15 minutes occur.",vuln:"By limiting the number of failed logon attempts, the risk of unauthorized system access via user password guessing is reduced."},
  {id:"V-268083",sev:"medium",title:"NixOS must enforce a delay of at least four seconds between login prompts following a failed login attempt.",vuln:"Increasing the time between a failed authentication attempt and re-prompting to provide credentials helps to slow a single-threaded brute-force attack."},
  {id:"V-268084",sev:"medium",title:"NixOS must display the Standard Mandatory DoD Notice and Consent Banner before granting local or remote access to the system.",vuln:"Display of a standardized and approved use notification before granting access to the operating system ensures privacy and security notification verbiage used is consistent with applicable federal laws, Executive Orders, directives, policies, regulations, standards, and guidance."},
  {id:"V-268085",sev:"medium",title:"NixOS must display the Standard Mandatory DoD Notice and Consent Banner until users acknowledge the usage conditions.",vuln:"The banner must be acknowledged by the user prior to allowing the user access to the operating system. This provides assurance that the user has seen the message and accepted the conditions for access."},
  {id:"V-268086",sev:"medium",title:"NixOS must have the tmux package installed.",vuln:"Tmux is a terminal multiplexer that enables a number of terminals to be created, accessed, and controlled from a single screen. A session lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system."},
  {id:"V-268087",sev:"medium",title:"NixOS must enable a user session lock until that user re-establishes access using established identification and authentication procedures for graphical user interfaces.",vuln:"A session lock is a temporary action taken when a user stops work and moves away but does not want to log out because of the temporary nature of the absence."},
  {id:"V-268088",sev:"medium",title:"NixOS must enable a user session lock until that user re-establishes access using established identification and authentication procedures for command line interface.",vuln:"A session lock is a temporary action taken when a user stops work and moves away but does not want to log out because of the temporary nature of the absence. The session lock is implemented at the point where session activity can be determined."},
  {id:"V-268089",sev:"high",title:"NixOS must implement DOD-approved encryption to protect the confidentiality of remote access sessions.",vuln:"Without confidentiality protection mechanisms, unauthorized individuals may gain access to sensitive information via a remote access session. Remote access is access to DOD nonpublic information systems by an authorized user communicating through an external, non-organization-controlled network."},
  {id:"V-268090",sev:"medium",title:"NixOS must be configured so that all network connections associated with SSH traffic are terminated at the end of the session or after 10 minutes of inactivity.",vuln:"Terminating an idle SSH session within a short time period reduces the window of opportunity for unauthorized personnel to take control of a management session enabled on the console or console port."},
  {id:"V-268091",sev:"medium",title:"NixOS must be configured to prohibit or restrict the use of functions, ports, protocols, and/or services as defined in the PPSM CAL.",vuln:"In order to prevent unauthorized connection of devices, unauthorized transfer of information, or unauthorized tunneling, organizations must disable or restrict unused or unnecessary physical and logical ports/protocols on information systems."},
  {id:"V-268092",sev:"medium",title:"NixOS SSH daemon must prevent remote hosts from connecting to the proxy display.",vuln:"When X11 forwarding is enabled, there may be additional exposure to the server and client displays if the sshd proxy display is configured to listen on the wildcard address."},
  {id:"V-268093",sev:"medium",title:"NixOS SSH daemon must not allow authentication using known host's authentication.",vuln:"Configuring this setting for the SSH daemon provides additional assurance that remote logon via SSH will require a password."},
  {id:"V-268094",sev:"medium",title:"NixOS must enforce password complexity by requiring at least one uppercase character be used.",vuln:"Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks."},
  {id:"V-268095",sev:"medium",title:"NixOS must enforce password complexity by requiring at least one lowercase character be used.",vuln:"Use of a complex password helps to increase the time and resources required to compromise the password."},
  {id:"V-268097",sev:"medium",title:"Successful/unsuccessful uses of the chown, fchown, fchownat, and lchown system calls in NixOS must generate an audit record.",vuln:"Without generating audit records specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate events relating to an incident."},
  {id:"V-268098",sev:"medium",title:"Successful/unsuccessful uses of the chmod, fchmod, and fchmodat system calls in NixOS must generate an audit record.",vuln:"Without generating audit records specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate events relating to an incident."},
  {id:"V-268099",sev:"medium",title:"Successful/unsuccessful uses of the truncate, ftruncate, creat, open, openat, and open_by_handle_at system calls in NixOS must generate an audit record.",vuln:"Without generating audit records specific to the security needs of the organization, it would be difficult to establish and investigate events."},
  {id:"V-268100",sev:"medium",title:"Successful/unsuccessful uses of the sudo command in NixOS must generate an audit record.",vuln:"Without generating audit records specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate events relating to an incident."},
  {id:"V-268101",sev:"medium",title:"Successful/unsuccessful uses of the chsh command in NixOS must generate an audit record.",vuln:"Without generating audit records specific to the security and mission needs, it would be difficult to establish and investigate events relating to an incident."},
  {id:"V-268102",sev:"medium",title:"Successful/unsuccessful uses of the newgrp command in NixOS must generate an audit record.",vuln:"Without generating audit records specific to the security and mission needs of the organization, it would be difficult to investigate events relating to an incident."},
  {id:"V-268103",sev:"medium",title:"Successful/unsuccessful uses of the chcon command in NixOS must generate an audit record.",vuln:"Without generating audit records specific to the security and mission needs, it would be difficult to investigate events."},
  {id:"V-268130",sev:"high",title:"NixOS must store only encrypted representations of passwords.",vuln:"Passwords need to be protected at all times, and encryption is the standard method for protecting passwords. If passwords are not encrypted, they can be plainly read and easily compromised."},
  {id:"V-268131",sev:"high",title:"NixOS must not have the telnet package installed.",vuln:"It is detrimental for operating systems to provide, or install by default, functionality exceeding requirements or mission objectives. Telnet is an unencrypted protocol."},
  {id:"V-268144",sev:"high",title:"NixOS must protect the confidentiality and integrity of all information at rest.",vuln:"Information at rest refers to the state of information when it is located on a secondary storage device within an organizational information system. Operating systems handling data requiring data-at-rest protections must employ cryptographic mechanisms."},
  {id:"V-268146",sev:"high",title:"NixOS must protect wireless access to and from the system using encryption.",vuln:"Without protection of wireless connections, sensitive DoD information may be compromised."},
  {id:"V-268154",sev:"high",title:"NixOS must prevent the installation of patches, service packs, device drivers, or operating system components without verification they have been digitally signed.",vuln:"Changes to any software components can have significant effects on the overall security of the operating system. Verification of software components ensures the integrity of patches and updates."},
  {id:"V-268157",sev:"high",title:"NixOS must implement cryptographic mechanisms to protect the integrity of nonlocal maintenance and diagnostic communications.",vuln:"Privileged access contains control and configuration information which is particularly sensitive. Without cryptographic protection, transmitted information is vulnerable to interception."},
  {id:"V-268159",sev:"high",title:"NixOS must protect the confidentiality and integrity of transmitted information.",vuln:"Without protection of the transmitted information, confidentiality and integrity may be compromised since unprotected communications can be intercepted and either read or altered."},
  {id:"V-268168",sev:"high",title:"NixOS must implement NIST FIPS-validated cryptography for the following: to provision digital signatures, to generate cryptographic hashes, and to protect data requiring data-at-rest protections.",vuln:"Use of weak or untested encryption algorithms undermines the purposes of using encryption to protect data. FIPS 140-3 is the current standard for validating cryptographic modules."},
  {id:"V-268172",sev:"high",title:"NixOS must not allow an unattended or automatic login to the system via the console.",vuln:"Failure to restrict system access to authenticated users negatively impacts operating system security."},
  {id:"V-268176",sev:"high",title:"NixOS must employ strong authenticators in the establishment of nonlocal maintenance and diagnostic sessions.",vuln:"If maintenance tools are used by unauthorized personnel, they may accidentally or intentionally damage or compromise the system."},
];

// Generate all 104 findings with realistic stage distribution
function buildFindings() {
  // Use 36 groups we have detailed data for, then generate the rest
  const sevMap = {high:"CAT I",medium:"CAT II",low:"CAT III"};
  const allGroups = [...rawGroups];
  // Fill to 104 with numbered audit-type findings
  const auditPrefixes = [
    "NixOS must audit all uses of the","NixOS must generate audit records for","NixOS must log all","NixOS must monitor","NixOS must track",
    "NixOS must configure","NixOS must enforce","NixOS must implement","NixOS must require","NixOS must verify"
  ];
  const auditTargets = [
    "setxattr system call","removexattr system call","unlink system call","rename system call",
    "mount system call","umount2 system call","passwd command","usermod command","crontab command",
    "ssh-keygen command","su command","gpasswd command","kmod command","faillock command",
    "unix_chkpwd command","SSH session establishment","sshd configuration changes",
    "sudoers file modifications","user home directory changes","group membership modifications",
    "login configuration changes","PAM configuration modifications","network interface changes",
    "DNS resolution settings","NTP configuration","syslog forwarding","kernel parameter modifications",
    "systemd service modifications","user creation events","user deletion events","group creation events",
    "file permission changes on /etc/passwd","file permission changes on /etc/shadow",
    "file permission changes on /etc/group","GRUB configuration changes","boot loader modifications",
    "USB device connections","removable media access","failed file access attempts",
    "successful privilege escalation","cryptographic key generation","TLS certificate operations",
    "firewall rule modifications","routing table changes","ARP table modifications",
    "account expiration events","password aging policy enforcement","login banner modifications",
    "audit daemon configuration changes","SELinux policy modifications","AppArmor profile changes",
    "chroot operations","namespace creation events","capability modifications",
    "shared memory segment operations","message queue operations","semaphore operations",
    "ptrace attachment events","process signal delivery","core dump generation",
    "binary execution in /tmp","binary execution in home directories","world-writable file creation",
    "SUID/SGID binary execution","scheduled task modifications","at job creation events"
  ];
  for(let i=allGroups.length;i<104;i++){
    const n=268104+i;
    const prefix=auditPrefixes[i%auditPrefixes.length];
    const target=auditTargets[i-allGroups.length]||`security event type ${i}`;
    allGroups.push({id:`V-${n}`,sev:"medium",title:`${prefix} ${target}.`,vuln:`Without generating audit records specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.`});
  }

  return allGroups.map((g,i) => {
    const pct = i / allGroups.length;
    let cs, st;
    if(pct<0.56){cs="completed";st="completed";}
    else if(pct<0.62){cs="blooms_classify";st=srand()>0.5?"at_checkpoint":"in_progress";}
    else if(pct<0.70){cs="mwe_tag_pass_2";st=srand()>0.6?"at_checkpoint":"in_progress";}
    else if(pct<0.78){cs="atomize";st="in_progress";}
    else if(pct<0.86){cs="mwe_tag_pass_1";st=srand()>0.5?"at_checkpoint":"in_progress";}
    else if(pct<0.93){cs="parse_finding";st="in_progress";}
    else{cs="rag_ingest";st="in_progress";}

    const vl=(g.vuln||"").toLowerCase();
    const m1=commonMwe.filter(t=>vl.includes(t.t.toLowerCase())).slice(0,5);
    const m2=["completed","blooms_classify","mwe_tag_pass_2"].includes(cs)?m1.concat(commonMwe.filter(t=>!m1.find(x=>x.t===t.t)&&srand()>0.75).slice(0,2)):[];
    const mc=["completed","blooms_classify","mwe_tag_pass_2"].includes(cs)?Math.floor(srand()*5)+2:null;
    const bls=["Remember","Understand","Apply","Analyze","Evaluate","Create"];
    const bl=cs==="completed"?bls[Math.floor(srand()*4)+1]:null;
    const bc=bl?(0.75+srand()*0.22):null;

    return {id:g.id,title:g.title,severity:sevMap[g.sev]||"CAT II",cs,st,m1,m2,mc,bl,bc:bc?parseFloat(bc.toFixed(2)):null,time:Math.floor(srand()*170+10)+"s",vuln:g.vuln};
  });
}

const ALL = buildFindings();
const DONE=ALL.filter(f=>f.st==="completed").length;
const CHKPT=ALL.filter(f=>f.st==="at_checkpoint").length;
const INPROG=ALL.filter(f=>f.st==="in_progress").length;

// ── EXCEPTIONS (from real findings at checkpoints) ───────────

const EXC = [
  {id:"e1",type:"contested",fid:"V-268081",ftitle:"NixOS must enforce the limit of three consecutive invalid login attempts.",sev:"CAT II",stage:"MWE Pass 1",phrase:"consecutive invalid login attempts",ctx:"By limiting the number of failed logon attempts, the risk of unauthorized system access via user password guessing, otherwise known as brute-force attacks, is reduced. Limits are imposed by locking out the user after exceeding maximum consecutive invalid login attempts.",votes:{Alice:{v:"TAG",c:0.84,r:"'Consecutive invalid login attempts' is a well-defined security concept in NIST AC-7. The phrase describes a specific threshold-based access control mechanism, not just individual word meanings combined."},Bob:{v:"NO_TAG",c:0.69,r:"The words 'consecutive', 'invalid', 'login', and 'attempts' each contribute predictable meaning. 'Account lockout' is the actual MWE — the phrase describing what happens. This is a description, not a term."},Clara:{v:"TAG",c:0.77,r:"In DISA STIG context, this exact phrase appears repeatedly as a configured threshold. It's a countable policy parameter — 'set consecutive invalid login attempts to 3'. That's MWE-like behavior."},David:{v:"NO_TAG",c:0.72,r:"I see Clara's point about it being a policy parameter, but the phrase is compositional. You could say 'consecutive failed authentication attempts' interchangeably. The concept isn't phrase-locked."}}},
  {id:"e2",type:"candidate",fid:"V-268096",ftitle:"Successful/unsuccessful uses of init_module, finit_module, and delete_module system calls must generate an audit record.",sev:"CAT II",stage:"MWE Pass 1",phrase:"kernel module loading",ctx:"The init_module and finit_module system calls are used to load a kernel module, and the delete_module is used to unload a kernel module. Kernel module loading must be audited to detect unauthorized modifications to the running kernel.",votes:{Alice:{v:"TAG",c:0.90,r:"'Kernel module loading' is a specific Linux security concept. It refers to the mechanism of dynamically inserting code into the running kernel — a critical security boundary."},Bob:{v:"TAG",c:0.86,r:"Agreed. This is a term of art in Linux kernel security. 'Kernel module' alone is an MWE, and 'kernel module loading' describes a specific auditable event class."},Clara:{v:"TAG",c:0.88,r:"Strongly agree. This maps to specific syscalls (init_module, finit_module) and is a recognized audit category across CIS Benchmarks and DISA STIGs."},David:{v:"NO_TAG",c:0.55,r:"I'm weakly opposed. 'Kernel module' is the MWE. 'Loading' is a generic action. But I acknowledge the security-specific meaning of the full phrase."}}},
  {id:"e3",type:"blooms",fid:"V-268079",ftitle:"NixOS emergency or temporary user accounts must be provisioned with an expiration time of 72 hours or less.",sev:"CAT II",stage:"SCL Classify",mandate:"Emergency or temporary user accounts must be automatically terminated within 72 hours of creation to prevent unauthorized access from accounts that have exceeded their operational need.",proposed:"Remember",alt:"Understand",conf:0.61,reason:"The mandate specifies a concrete retention period (72 hours) — low entropy, single factual parameter → low cognitive load ('Remember'). However, the phrase 'to prevent unauthorized access from accounts that have exceeded their operational need' introduces a causal rationale with higher information entropy, requiring the reader to model the relationship between time limits and access risk ('Understand'). The dual nature — low-entropy parameter embedded in a higher-entropy justification — creates classification ambiguity."},
  {id:"e4",type:"contested",fid:"V-268089",ftitle:"NixOS must implement DOD-approved encryption to protect the confidentiality of remote access sessions.",sev:"CAT I",stage:"MWE Pass 2",phrase:"DOD-approved encryption",ctx:"Without confidentiality protection mechanisms, unauthorized individuals may gain access to sensitive information via a remote access session. Remote access is access to DOD nonpublic information systems. DOD-approved encryption must be implemented using FIPS 140-validated cryptographic modules.",votes:{Alice:{v:"TAG",c:0.88,r:"'DOD-approved encryption' is a regulatory term of art. It refers to a specific subset of cryptographic algorithms validated through the FIPS 140 process and approved by NSA for DOD use. Not interchangeable with 'strong encryption'."},Bob:{v:"TAG",c:0.82,r:"Agree. This phrase carries specific compliance meaning — it's not just 'encryption that DOD approves of' but refers to a formal approval process and algorithm list."},Clara:{v:"NO_TAG",c:0.64,r:"I see the argument, but 'DOD-approved' is a modifier and 'encryption' is already likely an MWE or common term. The compound doesn't add enough distinct meaning beyond 'DOD-approved' + 'encryption'."},David:{v:"NO_TAG",c:0.71,r:"The phrase is compositional. 'FIPS-validated cryptography' is the actual technical MWE. 'DOD-approved encryption' is a policy-level description that points to FIPS-validated crypto but isn't itself a technical term."}}},
  {id:"e5",type:"blooms",fid:"V-268090",ftitle:"NixOS SSH traffic connections must be terminated after 10 minutes of inactivity.",sev:"CAT II",stage:"SCL Classify",mandate:"The system administrator must configure the SSH daemon to terminate idle sessions after 600 seconds (10 minutes) by setting the ClientAliveInterval and ClientAliveCountMax parameters.",proposed:"Apply",alt:"Remember",conf:0.64,reason:"The mandate contains two distinct entropy signals: the parameter names (ClientAliveInterval, ClientAliveCountMax) are procedural tokens requiring application-level cognitive load — the reader must map abstract config keys to concrete system behavior ('Apply'). However, the actual values (600 seconds) are low-entropy factual recall ('Remember'). The verb 'configure' increases information density but the knowledge payload is a deterministic lookup, creating a split between the action's entropy and the content's entropy."},
];

// ── DETAIL DATA (V-268078 firewall finding) ──────────────────

const detailMandates = [
  {id:"m1",text:"The NixOS built-in firewall must be enabled on all systems by setting networking.firewall.enable to true.",src:"deterministic",bl:"Remember",bc:0.96,tags:[{t:"NixOS built-in firewall",v:true}]},
  {id:"m2",text:"The operating system must provide the capability to immediately disconnect or disable remote access sessions.",src:"deterministic",bl:"Apply",bc:0.91,tags:[{t:"operating system",v:true},{t:"remote access",v:true}]},
  {id:"m3",text:"Remote access functionality must have automatic disconnect capability in case of adverse information based on indicators of compromise.",src:"claimify",bl:"Analyze",bc:0.85,tags:[{t:"remote access functionality",v:true},{t:"automatic disconnect capability",v:false},{t:"adverse information",v:false},{t:"indicators of compromise",v:true}]},
  {id:"m4",text:"Firewall rules must be enforced through the NixOS declarative configuration in /etc/nixos/configuration.nix.",src:"deterministic",bl:"Apply",bc:0.93,tags:[{t:"firewall rules",v:true},{t:"NixOS declarative configuration",v:false}]},
  {id:"m5",text:"The speed of disconnect or disablement must be appropriate based on the criticality of mission functions and the need to eliminate future remote access to organizational information systems.",src:"claimify",bl:"Evaluate",bc:0.78,tags:[{t:"mission functions",v:false},{t:"remote access",v:true},{t:"organizational information systems",v:true}]},
];

const chatMsgs = [
  {role:"user",text:"What SRGs does this finding satisfy and what are the implications?"},
  {role:"ai",text:"This finding satisfies four SRGs: SRG-OS-000298-GPOS-00116 (primary — remote access disconnect capability), SRG-OS-000096-GPOS-00050 (network device management), SRG-OS-000297-GPOS-00115 (remote access monitoring), and SRG-OS-000480-GPOS-00232 (general security configuration). The key implication is that this isn't just about having a firewall enabled — it's about the capability to immediately sever remote connections when a compromise is detected. For NixOS specifically, the declarative configuration model via configuration.nix means firewall rules are version-controlled and reproducible, which is actually a stronger compliance posture than imperative iptables management.",conf:0.91},
  {role:"user",text:"Is the 'indicators of compromise' mandate over-reaching for a firewall rule?"},
  {role:"ai",text:"Good catch. Mandate #3 about 'indicators of compromise' is derived from the vuln discussion's language about 'adverse information based on an indicator of compromise or attack.' For a basic host firewall (iptables/nftables), this is arguably over-scoped — a stateful packet filter doesn't typically consume IoC feeds. However, the STIG is written for the OS as a whole, not just the firewall service. The mandate is technically accurate to the source text but in practice would be satisfied by the combination of firewall + a host IDS (like AIDE or OSSEC) rather than the firewall alone. This is a good example of where atomization correctly captures the source text but the implementation scope needs contextual interpretation.",conf:0.84},
];

// ═══════════════════════════════════════════════════════════════
// PAGE 1: PIPELINE MONITOR
// ═══════════════════════════════════════════════════════════════

function PipelinePage({nav}) {
  const [view,setView]=useState("list");
  const [exp,setExp]=useState(null);
  const [filters,setFilters]=useState({sev:"all",status:"all",search:""});
  const [page,setPage]=useState(0);
  const PER_PAGE=20;

  const filtered=useMemo(()=>ALL.filter(f=>{
    if(filters.sev!=="all"&&f.severity!==filters.sev) return false;
    if(filters.status!=="all"&&f.st!==filters.status) return false;
    if(filters.search&&!f.id.toLowerCase().includes(filters.search.toLowerCase())&&!f.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  }),[filters]);
  const paged=filtered.slice(page*PER_PAGE,(page+1)*PER_PAGE);
  const totalPages=Math.ceil(filtered.length/PER_PAGE);

  if(view==="list") return(<div className="space-y-5">
    <div className="flex items-center justify-between"><div><h1 className="text-lg font-bold text-slate-900">Pipeline Monitor</h1><p className="text-xs text-slate-500">Anduril NixOS STIG — 104 findings across 6 pipeline stages</p></div></div>
    {/* Summary */}
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Layers size={13} className="text-slate-400"/><span className="text-[11px] text-slate-500">Total</span></div><div className="text-xl font-bold text-slate-900 tabular-nums">{ALL.length}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><CheckCircle2 size={13} className="text-emerald-500"/><span className="text-[11px] text-slate-500">Complete</span></div><div className="text-xl font-bold text-emerald-600 tabular-nums">{DONE}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Pause size={13} className="text-amber-500"/><span className="text-[11px] text-slate-500">Checkpoint</span></div><div className="text-xl font-bold text-amber-600 tabular-nums">{CHKPT}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Activity size={13} className="text-blue-500"/><span className="text-[11px] text-slate-500">In Progress</span></div><div className="text-xl font-bold text-blue-600 tabular-nums">{INPROG}</div></div>
    </div>
    {/* Batch card */}
    <button onClick={()=>setView("detail")} className="w-full text-left rounded-xl border-2 border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div><div className="flex items-center gap-2"><h3 className="font-semibold text-slate-900 text-sm">Anduril NixOS Security Technical Implementation Guide</h3><span className="text-[10px] text-slate-400 font-mono">V1</span></div><p className="text-[11px] text-slate-500 mt-0.5">Anduril_NixOS_STIG — 11 CAT I, 92 CAT II, 1 CAT III</p></div>
        <SP status="processing"/>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs"><span className="text-slate-600">{DONE}/{ALL.length} findings</span><span className="font-semibold tabular-nums">{Math.round(DONE/ALL.length*100)}%</span></div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-blue-500" style={{width:`${DONE/ALL.length*100}%`}}/></div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <div className="flex gap-3"><span className="text-orange-600 font-medium flex items-center gap-1"><AlertTriangle size={11}/>{CHKPT} at checkpoint</span><span className="flex items-center gap-1"><Activity size={11}/>{INPROG} in progress</span></div>
          <span className="flex items-center gap-1"><Clock size={11}/>~12 min remaining</span>
        </div>
      </div>
    </button>
    <p className="text-[11px] text-slate-400 text-center">Click the batch card to drill into the per-finding tracker</p>
  </div>);

  return(<div className="space-y-4">
    <div className="flex items-start gap-3">
      <button onClick={()=>setView("list")} className="mt-1 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><ChevronLeft size={20}/></button>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-0.5"><h2 className="text-base font-bold text-slate-900">Anduril NixOS STIG</h2><span className="text-xs font-mono text-slate-400">V1</span><SP status="processing"/></div>
      </div>
      <button onClick={()=>nav("stig-exceptions")} className="text-xs px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700 flex items-center gap-1.5 font-medium"><AlertTriangle size={13}/>{EXC.length} Exceptions</button>
    </div>
    {/* Filters */}
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative flex-1 min-w-[180px] max-w-xs"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Search by rule ID or title..." value={filters.search} onChange={e=>{setFilters({...filters,search:e.target.value});setPage(0);}} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"/></div>
      <select value={filters.sev} onChange={e=>{setFilters({...filters,sev:e.target.value});setPage(0);}} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Severity</option><option value="CAT I">CAT I (11)</option><option value="CAT II">CAT II (92)</option><option value="CAT III">CAT III (1)</option></select>
      <select value={filters.status} onChange={e=>{setFilters({...filters,status:e.target.value});setPage(0);}} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Status</option><option value="completed">Completed</option><option value="in_progress">In Progress</option><option value="at_checkpoint">Checkpoint</option></select>
      <span className="text-[11px] text-slate-400 ml-auto">{filtered.length} findings</span>
    </div>
    {/* Table */}
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full">
        <thead><tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
          <th className="pl-3 pr-1 py-2 w-6"></th><th className="py-2 pr-2 text-left">Rule ID</th><th className="py-2 pr-2 text-left" style={{minWidth:200}}>Title</th><th className="py-2 pr-2 text-left">Sev</th><th className="py-2 pr-2 text-left">Stage</th><th className="py-2 pr-2 text-left" style={{minWidth:120}}>Progress</th><th className="py-2 pr-2 text-center">MWE</th><th className="py-2 pr-2 text-center">Mand.</th><th className="py-2 pr-2 text-left">SCL</th><th className="py-2 w-6"></th>
        </tr></thead>
        <tbody>{paged.map(f=><React.Fragment key={f.id}>
          <tr className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer text-xs transition-colors ${exp===f.id?"bg-slate-50":""} ${f.st==="at_checkpoint"?"bg-orange-50/30":""}`} onClick={()=>{if(f.st==="completed"&&f.id==="V-268078")nav("stig-finding");else setExp(exp===f.id?null:f.id);}}>
            <td className="pl-3 pr-1 py-2">{exp===f.id?<ChevronDown size={12} className="text-slate-400"/>:<ChevronRight size={12} className="text-slate-400"/>}</td>
            <td className="py-2 pr-2"><span className="font-mono text-[11px] font-semibold text-slate-700">{f.id}</span></td>
            <td className="py-2 pr-2"><span className="text-[11px] text-slate-700 line-clamp-1">{f.title}</span></td>
            <td className="py-2 pr-2"><Sev l={f.severity}/></td>
            <td className="py-2 pr-2"><SB stage={f.cs} status={f.st}/></td>
            <td className="py-2 pr-2"><PM cs={f.cs} st={f.st}/></td>
            <td className="py-2 pr-2 text-center"><span className="text-[11px] text-slate-500 tabular-nums">{f.m1.length||"—"}</span></td>
            <td className="py-2 pr-2 text-center"><span className="text-[11px] text-slate-500 tabular-nums">{f.mc??"—"}</span></td>
            <td className="py-2 pr-2">{f.bl?<BB l={f.bl}/>:<span className="text-slate-300">—</span>}</td>
            <td className="py-2 pr-2">{f.st==="at_checkpoint"&&<AlertTriangle size={12} className="text-orange-500"/>}</td>
          </tr>
          {exp===f.id&&<tr className="bg-slate-50 border-b border-slate-200"><td colSpan={10} className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">MWE Tags</p><div className="flex flex-wrap gap-1">{f.m1.length>0?f.m1.map((t,i)=><MC key={i} term={t.t} pass={1} v={t.v}/>):<span className="text-[11px] text-slate-400 italic">Not yet processed</span>}</div>{f.m2.length>0&&<div className="mt-2"><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Pass 2</p><div className="flex flex-wrap gap-1">{f.m2.map((t,i)=><MC key={i} term={t.t} pass={2} v={t.v}/>)}</div></div>}</div>
              <div>{f.bl&&<div className="mb-2"><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Cognitive Load</p><div className="flex items-center gap-2"><BB l={f.bl}/>{f.bc&&<CB s={f.bc}/>}</div></div>}<p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Processing</p><span className="text-[11px] text-slate-600 flex items-center gap-1"><Clock size={11}/>{f.time}</span></div>
              <div><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Vuln Discussion</p><p className="text-[11px] text-slate-600 leading-relaxed line-clamp-4">{f.vuln}</p></div>
            </div>
          </td></tr>}
        </React.Fragment>)}</tbody>
      </table></div>
      {/* Pagination */}
      {totalPages>1&&<div className="flex items-center justify-between px-4 py-2 border-t border-slate-200 bg-slate-50">
        <button onClick={()=>setPage(Math.max(0,page-1))} disabled={page===0} className="text-xs px-2 py-1 rounded border border-slate-200 disabled:opacity-30 hover:bg-white">← Prev</button>
        <span className="text-[11px] text-slate-500">Page {page+1} of {totalPages}</span>
        <button onClick={()=>setPage(Math.min(totalPages-1,page+1))} disabled={page>=totalPages-1} className="text-xs px-2 py-1 rounded border border-slate-200 disabled:opacity-30 hover:bg-white">Next →</button>
      </div>}
    </div>
    <p className="text-[11px] text-slate-400 text-center">Click V-268078 (first completed finding) to view the full Finding Detail page</p>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// PAGE 2: EXCEPTION QUEUE
// ═══════════════════════════════════════════════════════════════

function ExceptionsPage({nav, isAdmin}) {
  const [resolved,setResolved]=useState([]);
  const [filter,setFilter]=useState("all");
  const [showR,setShowR]=useState({});
  const vis=EXC.filter(e=>!resolved.includes(e.id)).filter(e=>filter==="all"||e.type===filter);

  return(<div className="space-y-5">
    <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">Exception Queue<span className="text-sm px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold tabular-nums">{EXC.length-resolved.length}</span></h1><p className="text-xs text-slate-500">Items needing SME review from the Anduril NixOS STIG pipeline</p></div>
    <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1">
      {[{k:"all",l:"All",i:Layers},{k:"contested",l:"Contested",i:Scale},{k:"candidate",l:"Candidates",i:Tag},{k:"blooms",l:"Cog. Load",i:Brain}].map(t=><button key={t.k} onClick={()=>setFilter(t.k)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium flex-1 justify-center transition-all ${filter===t.k?"bg-blue-50 text-blue-700 shadow-sm":"text-slate-500 hover:bg-slate-50"}`}><t.i size={13}/>{t.l}</button>)}
    </div>
    {resolved.length>0&&<div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 flex items-center gap-2 text-xs text-emerald-700"><CheckCircle2 size={14}/><span className="font-medium">{resolved.length} resolved — pipeline resumed for those findings</span></div>}
    <div className="space-y-4">{vis.map(exc=>{
      const bc=exc.type==="contested"?"border-red-200":exc.type==="candidate"?"border-amber-200":"border-violet-200";
      const hbg=exc.type==="contested"?"bg-red-50":exc.type==="candidate"?"bg-amber-50":"bg-violet-50";
      const hb=exc.type==="contested"?"border-red-200":exc.type==="candidate"?"border-amber-200":"border-violet-200";
      return(<div key={exc.id} className={`bg-white rounded-xl border-2 ${bc} overflow-hidden`}>
        <div className={`${hbg} px-5 py-3 border-b ${hb}`}><div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {exc.type==="contested"&&<><Scale size={13} className="text-red-600"/><span className="text-xs font-bold text-red-800">Contested MWE Verdict</span></>}
            {exc.type==="candidate"&&<><Tag size={13} className="text-amber-600"/><span className="text-xs font-bold text-amber-800">New Candidate Term</span></>}
            {exc.type==="blooms"&&<><Brain size={13} className="text-violet-600"/><span className="text-xs font-bold text-violet-800">Low-Confidence Cognitive Load</span></>}
          </div><Sev l={exc.sev}/>
        </div></div>
        <div className="p-5 space-y-3">
          <div><div className="flex items-center gap-2 mb-0.5"><span className="font-mono text-xs font-bold text-slate-700">{exc.fid}</span><span className="text-[10px] text-slate-400">{exc.stage}</span></div><p className="text-xs text-slate-600">{exc.ftitle}</p></div>
          {exc.phrase&&<div className={`${hbg} rounded-lg p-3 border ${hb}`}><p className="text-[10px] uppercase tracking-wide font-semibold text-slate-500 mb-1">{exc.type==="candidate"?"New Term":"Contested Phrase"}</p><p className="text-sm font-mono font-semibold text-slate-800">"{exc.phrase}"</p>{exc.ctx&&<p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{exc.ctx.substring(0,200)}...</p>}</div>}
          {exc.mandate&&<div className="bg-violet-50 rounded-lg p-3 border border-violet-200"><p className="text-[10px] uppercase font-semibold text-violet-600 mb-1">Mandate Text</p><p className="text-xs text-slate-700 leading-relaxed">{exc.mandate}</p></div>}
          {exc.votes&&<div><div className="grid grid-cols-4 gap-2">{Object.entries(exc.votes).map(([n,v])=><button key={n} onClick={()=>setShowR({...showR,[exc.id]:showR[exc.id]===n?null:n})} className={`rounded-lg border p-3 text-center transition-all hover:shadow-sm ${showR[exc.id]===n?"border-blue-300 bg-blue-50":v.v==="TAG"?"border-emerald-200 bg-emerald-50/50":"border-red-200 bg-red-50/50"}`}><AA name={n} vote={v.v}/><div className="mt-1"><CB s={v.c}/></div><div className="text-[9px] text-slate-400 mt-0.5 flex items-center justify-center gap-0.5"><Eye size={9}/>reasoning</div></button>)}</div>
          {showR[exc.id]&&<div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mt-2"><div className="flex items-center gap-2 mb-1"><span className="text-xs font-semibold text-slate-700">{showR[exc.id]}</span></div><p className="text-xs text-slate-600 leading-relaxed">{exc.votes[showR[exc.id]].r}</p></div>}</div>}
          {exc.type==="blooms"&&<><div className="grid grid-cols-2 gap-3"><div className="rounded-lg border border-violet-200 bg-violet-50/30 p-3"><p className="text-[10px] uppercase font-semibold text-violet-600 mb-1">Proposed</p><div className="flex items-center gap-2"><BB l={exc.proposed}/><CB s={exc.conf}/></div></div><div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-[10px] uppercase font-semibold text-slate-500 mb-1">Alternative</p><BB l={exc.alt}/></div></div>{exc.reason&&<div className="bg-slate-50 rounded-lg p-3 border border-slate-200"><p className="text-[10px] uppercase font-semibold text-slate-500 mb-1">Reasoning</p><p className="text-xs text-slate-600 leading-relaxed">{exc.reason}</p></div>}</>}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            {isAdmin ? <>
              <button onClick={()=>setResolved([...resolved,exc.id])} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 font-medium flex items-center gap-1.5"><CheckCircle2 size={13}/>Approve</button>
              <button onClick={()=>setResolved([...resolved,exc.id])} className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium flex items-center gap-1.5"><XCircle size={13}/>Reject</button>
              {exc.type==="contested"&&<button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-1.5"><RotateCcw size={13}/>Reconvene</button>}
              <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium ml-auto flex items-center gap-1.5"><Bookmark size={13}/>Defer</button>
            </> : <span className="text-[11px] text-slate-400 italic flex items-center gap-1"><Eye size={11}/>Awaiting Mapping Team review</span>}
          </div>
        </div>
      </div>);
    })}</div>
    {vis.length===0&&<div className="bg-white rounded-xl border border-slate-200 py-12 text-center"><CheckCircle2 size={36} className="mx-auto text-emerald-400 mb-2"/><h3 className="text-sm font-semibold text-slate-700">Queue clear</h3><p className="text-xs text-slate-500 mt-1">All exceptions resolved. Pipeline resumed for those findings.</p></div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// PAGE 3: FINDING DETAIL (V-268078)
// ═══════════════════════════════════════════════════════════════

function FindingPage({nav, isAdmin, isAuditor, role}) {
  const f=ALL[0];
  const [showV,setShowV]=useState(true);
  const [showP,setShowP]=useState(false);
  const [ci,setCi]=useState("");
  const [detailTab,setDetailTab]=useState("overview");
  const findingMappings=STIG_ONET_MAPPINGS.filter(m=>m.stigFinding===f.id);

  const prov=[
    {s:"RAG Ingest",ts:"09:14:00",d:"Ingested Anduril NixOS STIG V1 into vector store, 312 chunks across 104 findings"},
    {s:"Parse Finding",ts:"09:14:08",d:"Extracted V-268078, medium severity, SRG-OS-000298-GPOS-00116 + 3 related SRGs"},
    {s:"MWE Pass 1",ts:"09:14:22",d:`${f.m1.length} terms tagged from vuln discussion — remote access, information system, network firewall`},
    {s:"Atomize",ts:"09:14:51",d:`${detailMandates.length} mandates extracted (3 deterministic, 2 claimify)`},
    {s:"MWE Pass 2",ts:"09:15:18",d:`${f.m2.length} term instances across mandates, 1 new candidate: 'configuration baseline'`},
    {s:"SCL Classify",ts:"09:16:14",d:"All 5 mandates classified via Shannon cognitive load. Range: Remember → Evaluate. Min entropy confidence 0.78 on mandate #5"},
  ];

  const findingTags = ["#firewall", "#configuration", "#network", "#ssh"];

  return (<div className="space-y-5">
    <div className="flex items-center gap-1.5 text-xs text-slate-500"><button onClick={() => nav("stig-pipeline")} className="hover:text-blue-600">Pipeline</button><ChevronRight size={12} /><button onClick={() => nav("stig-dashboard")} className="hover:text-blue-600">Dashboard</button><ChevronRight size={12} /><span className="text-slate-700 font-medium">{f.id}</span></div>
    {/* Finding header card */}
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 mb-1"><span className="font-mono text-sm font-bold text-slate-800">{f.id}</span><Sev l={f.severity} /></div>
      <h1 className="text-sm font-semibold text-slate-900 mb-2">{f.title}</h1>
      <div className="flex items-center gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1"><Database size={11} />Anduril NixOS STIG V1</span>
        <span className="flex items-center gap-1"><Clock size={11} />{f.time}</span>
        <span className="flex items-center gap-1"><Layers size={11} />{detailMandates.length} mandates</span>
        <span className="flex items-center gap-1"><Tag size={11} />{f.m1.length} MWE terms</span>
      </div>
      <div className="flex gap-1.5 mt-2">{findingTags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-200">{t}</span>)}</div>
    </div>
    {/* Tabs */}
    <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1">
      {[
        { k: "overview", l: "Overview", i: FileText },
        { k: "mandates", l: `Mandate Analysis ${detailMandates.length}`, i: Layers },
        { k: "rdf", l: `RDF Graph ${RDF_TRIPLES.length}`, i: Network },
        { k: "mappings", l: `Role Mappings ${findingMappings.length}`, i: Users },
        { k: "ai", l: "AI Assistant", i: Sparkles },
      ].map(t => <button key={t.k} onClick={() => setDetailTab(t.k)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium flex-1 justify-center transition-all ${detailTab === t.k ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}><t.i size={13} />{t.l}</button>)}
    </div>

    {detailTab === "rdf" && <div className="space-y-4">
      {/* RDF Summary */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Network size={13} className="text-slate-400" /><span className="text-[11px] text-slate-500">Total Triples</span></div><div className="text-xl font-bold text-slate-900 tabular-nums">{RDF_TRIPLES.length}</div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Layers size={13} className="text-blue-400" /><span className="text-[11px] text-slate-500">Requirements</span></div><div className="text-xl font-bold text-blue-600 tabular-nums">{RDF_TRIPLES.filter(t => t.type === "requirement").length}</div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Tag size={13} className="text-emerald-400" /><span className="text-[11px] text-slate-500">Tags</span></div><div className="text-xl font-bold text-emerald-600 tabular-nums">{RDF_TRIPLES.filter(t => t.type === "tag").length}</div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Link size={13} className="text-amber-400" /><span className="text-[11px] text-slate-500">Traceability</span></div><div className="text-xl font-bold text-amber-600 tabular-nums">{RDF_TRIPLES.filter(t => t.type === "traceability").length}</div></div>
      </div>
      {/* RDF Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
              <th className="py-2.5 px-4 text-left w-8">#</th>
              <th className="py-2.5 px-4 text-left">Subject</th>
              <th className="py-2.5 px-4 text-left">Predicate</th>
              <th className="py-2.5 px-4 text-left">Object</th>
              <th className="py-2.5 px-4 text-left">Type</th>
            </tr></thead>
            <tbody>{RDF_TRIPLES.map((t, i) => {
              const tc = RDF_TYPE_COLORS[t.type] || RDF_TYPE_COLORS.metadata;
              return (<tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-4 text-[10px] text-slate-400 tabular-nums">{i + 1}</td>
                <td className="py-2.5 px-4"><span className="text-xs font-semibold text-slate-800">{t.subject}</span></td>
                <td className="py-2.5 px-4"><span className="text-xs text-indigo-600 font-medium italic">{t.predicate}</span></td>
                <td className="py-2.5 px-4"><span className={`text-xs font-medium ${t.type === "tag" ? "text-emerald-700 font-mono" : "text-slate-700"}`}>{t.object}</span></td>
                <td className="py-2.5 px-4"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${tc.bg} ${tc.text} border ${tc.border}`}>{t.type}</span></td>
              </tr>);
            })}</tbody>
          </table>
        </div>
      </div>
      <p className="text-[11px] text-slate-400 text-center">Subject-Predicate-Object semantic triples extracted from finding analysis</p>
    </div>}

    {detailTab === "overview" && <div className="grid grid-cols-5 gap-5">
      <div className="col-span-3 space-y-4">
        {/* Vuln */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <button onClick={()=>setShowV(!showV)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50"><span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><FileText size={13}/>Vulnerability Discussion</span>{showV?<ChevronDown size={14} className="text-slate-400"/>:<ChevronRight size={14} className="text-slate-400"/>}</button>
          {showV&&<div className="px-4 pb-3 border-t border-slate-100 pt-3"><p className="text-xs text-slate-600 leading-relaxed">{f.vuln}</p><div className="flex gap-1 mt-2 flex-wrap">{f.m1.map((t,i)=><MC key={i} term={t.t} pass={1} v={t.v}/>)}</div></div>}
        </div>
        {/* Mandates */}
        <div><h2 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-2"><Layers size={13}/>Atomic Mandates<span className="text-[10px] font-normal text-slate-400">{detailMandates.length} mandates with Shannon cognitive load classification</span></h2>
        <div className="space-y-2">{detailMandates.map((m,i)=>{const sc={deterministic:{bg:"bg-slate-100",t:"text-slate-600"},claimify:{bg:"bg-blue-100",t:"text-blue-600"},hybrid:{bg:"bg-violet-100",t:"text-violet-600"}}[m.src];return <div key={m.id} className="bg-white rounded-lg border border-slate-200 p-3 hover:border-slate-300 transition-colors">
          <div className="flex items-start gap-2 mb-2"><span className="text-[10px] font-bold text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">#{i+1}</span><p className="text-xs text-slate-700 leading-relaxed flex-1">{m.text}</p></div>
          <div className="flex items-center gap-1.5 flex-wrap mb-2">{m.tags.map((t,j)=><MC key={j} term={t.t} pass={2} v={t.v}/>)}</div>
          <div className="flex items-center justify-between"><span className={`text-[10px] px-2 py-0.5 rounded font-medium ${sc.bg} ${sc.t}`}>{m.src}</span><div className="flex items-center gap-2"><BB l={m.bl}/><CB s={m.bc}/></div></div>
        </div>})}</div></div>
        {/* Cognitive Load dist */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2"><Brain size={13}/>Cognitive Load Distribution</h3>
          <div className="grid grid-cols-6 gap-2">{["Remember","Understand","Apply","Analyze","Evaluate","Create"].map(lv=>{const ct=detailMandates.filter(m=>m.bl===lv).length;const c=C.bl[lv];return <div key={lv} className={`text-center p-2 rounded-lg border ${ct>0?`${c.bg} border-current`:"bg-slate-50 border-slate-200"}`}><div className={`text-lg font-bold tabular-nums ${ct>0?c.text:"text-slate-300"}`}>{ct}</div><div className={`text-[10px] font-medium ${ct>0?c.text:"text-slate-400"}`}>{lv}</div></div>})}</div>
        </div>
        {/* Provenance — admin only */}
        {isAdmin && <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <button onClick={() => setShowP(!showP)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50"><span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><Activity size={13} />Pipeline Provenance</span>{showP ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}</button>
          {showP && <div className="px-4 pb-3 border-t border-slate-100 pt-3">{prov.map((p, i) => <div key={i} className="flex gap-3"><div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />{i < prov.length - 1 && <div className="w-px flex-1 bg-emerald-200 my-1" />}</div><div className="pb-2.5"><div className="flex items-center gap-2"><span className="text-[11px] font-semibold text-slate-700">{p.s}</span><span className="text-[10px] text-slate-400 font-mono">{p.ts}</span></div><p className="text-[11px] text-slate-500">{p.d}</p></div></div>)}</div>}
        </div>}
      </div>
      {/* Cognitive Load dist */}
      <div className="col-span-2">
        <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-4">
          <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2"><Brain size={13} />Cognitive Load Distribution</h3>
          <div className="grid grid-cols-3 gap-2">{["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"].map(lv => { const ct = detailMandates.filter(m => m.bl === lv).length; const c = C.bl[lv]; return <div key={lv} className={`text-center p-2 rounded-lg border ${ct > 0 ? `${c.bg} border-current` : "bg-slate-50 border-slate-200"}`}><div className={`text-lg font-bold tabular-nums ${ct > 0 ? c.text : "text-slate-300"}`}>{ct}</div><div className={`text-[10px] font-medium ${ct > 0 ? c.text : "text-slate-400"}`}>{lv}</div></div> })}</div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-[10px] text-slate-500 space-y-1">
              <div className="flex justify-between"><span>Total mandates</span><span className="font-semibold text-slate-700">{detailMandates.length}</span></div>
              <div className="flex justify-between"><span>Avg. SCL level</span><span className="font-semibold text-slate-700">Apply (L3)</span></div>
              <div className="flex justify-between"><span>Entropy range</span><span className="font-semibold text-slate-700">L1 → L5</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>}

    {detailTab === "mandates" && <div className="space-y-4">
      <div><h2 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-2"><Layers size={13} />Atomic Mandates<span className="text-[10px] font-normal text-slate-400">{detailMandates.length} mandates with Shannon cognitive load classification</span></h2>
      <div className="space-y-2">{detailMandates.map((m, i) => { const sc = { deterministic: { bg: "bg-slate-100", t: "text-slate-600" }, claimify: { bg: "bg-blue-100", t: "text-blue-600" }, hybrid: { bg: "bg-violet-100", t: "text-violet-600" } }[m.src]; return <div key={m.id} className="bg-white rounded-lg border border-slate-200 p-3 hover:border-slate-300 transition-colors">
        <div className="flex items-start gap-2 mb-2"><span className="text-[10px] font-bold text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">#{i + 1}</span><p className="text-xs text-slate-700 leading-relaxed flex-1">{m.text}</p></div>
        <div className="flex items-center gap-1.5 flex-wrap mb-2">{m.tags.map((t, j) => <MC key={j} term={t.t} pass={2} v={t.v} />)}</div>
        <div className="flex items-center justify-between"><span className={`text-[10px] px-2 py-0.5 rounded font-medium ${sc.bg} ${sc.t}`}>{m.src}</span><div className="flex items-center gap-2"><BB l={m.bl} /><CB s={m.bc} /></div></div>
      </div> })}</div></div>
      {/* Cognitive Load dist */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2"><Brain size={13} />Cognitive Load Distribution</h3>
        <div className="grid grid-cols-6 gap-2">{["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"].map(lv => { const ct = detailMandates.filter(m => m.bl === lv).length; const c = C.bl[lv]; return <div key={lv} className={`text-center p-2 rounded-lg border ${ct > 0 ? `${c.bg} border-current` : "bg-slate-50 border-slate-200"}`}><div className={`text-lg font-bold tabular-nums ${ct > 0 ? c.text : "text-slate-300"}`}>{ct}</div><div className={`text-[10px] font-medium ${ct > 0 ? c.text : "text-slate-400"}`}>{lv}</div></div> })}</div>
      </div>
    </div>}

    {/* ════════ ROLE MAPPINGS TAB ════════ */}
    {detailTab === "mappings" && <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Users size={13} className="text-slate-400"/><span className="text-[11px] text-slate-500">Total Mappings</span></div><div className="text-xl font-bold text-slate-900 tabular-nums">{findingMappings.length}</div></div>
        <div className="bg-white rounded-xl border border-amber-200 p-3"><div className="flex items-center gap-2 mb-1"><Zap size={13} className="text-amber-400"/><span className="text-[11px] text-slate-500">Suggested</span></div><div className="text-xl font-bold text-amber-600 tabular-nums">{findingMappings.filter(m=>m.status==="suggested").length}</div></div>
        <div className="bg-white rounded-xl border border-blue-200 p-3"><div className="flex items-center gap-2 mb-1"><CheckCircle2 size={13} className="text-blue-400"/><span className="text-[11px] text-slate-500">Team Approved</span></div><div className="text-xl font-bold text-blue-600 tabular-nums">{findingMappings.filter(m=>m.status==="team_approved").length}</div></div>
        <div className="bg-white rounded-xl border border-emerald-200 p-3"><div className="flex items-center gap-2 mb-1"><ShieldCheck size={13} className="text-emerald-400"/><span className="text-[11px] text-slate-500">Auditor Validated</span></div><div className="text-xl font-bold text-emerald-600 tabular-nums">{findingMappings.filter(m=>m.status==="auditor_validated").length}</div></div>
      </div>
      <p className="text-xs text-slate-500">O*Net tasks and work activities mapped to this finding through shared MWE terms. Lifecycle: Auto-Suggested → Team Approved → Auditor Validated.</p>
      <div className="space-y-3">{findingMappings.filter(m=>m.status!=="team_rejected").map(m=>{
        const st=MAPPING_STATUS[m.status];
        return(<div key={m.id} className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${st.color}`}>{st.icon} {st.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono">{m.onetOccupation}</span>
              <span className="text-[11px] text-slate-600 font-medium">{m.onetRole}</span>
            </div>
            <CB s={m.confidence}/>
          </div>
          <div className="flex items-center gap-2 mb-2"><span className="text-[10px] text-slate-400 uppercase font-semibold w-16">{m.onetTask?"Task":"Activity"}</span><span className="text-xs text-slate-700">{m.onetTaskText}</span></div>
          <div className="flex items-center gap-1.5 mb-2"><span className="text-[10px] text-slate-400">Bridge terms:</span>{m.bridgeTerms.map((bt,i)=><span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">{bt}</span>)}</div>
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            {m.teamReviewedBy&&<span>Team: {m.teamReviewedBy} ({m.teamReviewedAt})</span>}
            {m.auditorValidatedBy&&<span className="text-emerald-600">Auditor: {m.auditorValidatedBy} ({m.auditorValidatedAt})</span>}
          </div>
          {/* Role-based actions */}
          {isAdmin&&m.status==="suggested"&&<div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <button className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border border-blue-200 flex items-center gap-1"><ThumbsUp size={11}/>Approve</button>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium border border-red-200 flex items-center gap-1"><XCircle size={11}/>Reject</button>
          </div>}
          {isAuditor&&m.status==="team_approved"&&<div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 flex items-center gap-1"><ShieldCheck size={11}/>Validate</button>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 font-medium border border-orange-200 flex items-center gap-1"><AlertTriangle size={11}/>Dispute</button>
            <span className="text-[10px] text-slate-400 ml-2 italic">Optional — validate at your discretion</span>
          </div>}
        </div>);
      })}</div>
      {findingMappings.filter(m=>m.status==="team_rejected").length>0&&<div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
        <p className="text-[10px] text-slate-400 font-medium mb-1">Rejected ({findingMappings.filter(m=>m.status==="team_rejected").length})</p>
        {findingMappings.filter(m=>m.status==="team_rejected").map(m=><div key={m.id} className="flex items-center gap-2 text-[10px] text-slate-400 py-1 opacity-60"><XCircle size={10}/><span className="font-mono">{m.onetOccupation}</span><span>{m.onetTaskText}</span><span>— rejected by {m.teamReviewedBy}</span></div>)}
      </div>}
    </div>}

    {detailTab === "ai" && <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-200 flex flex-col" style={{ minHeight: 520 }}>
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2"><Sparkles size={14} className="text-indigo-500" /><span className="text-xs font-bold text-slate-800">Nexus AI Assistant</span></div>
        <div className="px-4 py-1.5 bg-indigo-50 border-b border-indigo-100 text-[10px] text-indigo-600 flex items-center gap-1"><Link size={9} />Context: {f.id} — NixOS firewall | {detailMandates.length} mandates, {f.m1.length} MWE terms</div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 380 }}>
          {chatMsgs.map((m, i) => <div key={i}>
            {m.role === "user" ? <div className="flex justify-end"><div className="bg-blue-500 text-white rounded-xl rounded-tr-sm px-3 py-2 max-w-[90%]"><p className="text-xs leading-relaxed">{m.text}</p></div></div>
              : <div><div className="bg-slate-50 rounded-xl rounded-tl-sm px-3 py-2"><p className="text-xs text-slate-700 leading-relaxed">{m.text}</p><div className="flex items-center mt-2"><span className={`text-[10px] font-semibold tabular-nums ${Math.round(m.conf * 100) >= 85 ? "text-emerald-600" : "text-amber-600"}`}>{Math.round(m.conf * 100)}% confidence</span></div></div></div>}
          </div>)}
        </div>
        <div className="px-4 py-3 border-t border-slate-200"><div className="flex gap-2"><input type="text" value={ci} onChange={e => setCi(e.target.value)} placeholder="Ask about this finding..." className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" /><button className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"><Send size={14} /></button></div><div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400"><Sparkles size={9} />AI-assisted analysis based on finding context</div></div>
      </div>
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// PAGE 4: LEXICON BROWSER (Expanded — Glossary, Dictionary, Thesaurus, Knowledge Graph, Manage)
// ═══════════════════════════════════════════════════════════════

const PREDICATE_TYPES = {
  synonym:{label:"Synonym",color:"bg-green-100 text-green-700 border-green-200",icon:"="},
  antonym:{label:"Antonym",color:"bg-red-100 text-red-700 border-red-200",icon:"≠"},
  broader:{label:"Broader",color:"bg-blue-100 text-blue-700 border-blue-200",icon:"↑"},
  narrower:{label:"Narrower",color:"bg-violet-100 text-violet-700 border-violet-200",icon:"↓"},
  related:{label:"Related",color:"bg-amber-100 text-amber-700 border-amber-200",icon:"↔"},
  acronym_of:{label:"Acronym Of",color:"bg-cyan-100 text-cyan-700 border-cyan-200",icon:"ABC"},
  abbreviation_of:{label:"Abbreviation Of",color:"bg-teal-100 text-teal-700 border-teal-200",icon:"Ab"},
  deprecated_in_favor_of:{label:"Deprecated",color:"bg-slate-100 text-slate-500 border-slate-200",icon:"⊘"},
};

const LEX = [
  {id:"lex-001",term:"audit record",status:"validated",pass1:true,pass2:true,freq:67,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.97,cat:"Audit & Logging",def:"A chronological record of system activities sufficient to enable reconstruction, review, and examination of the sequence of events surrounding or leading to an operation, procedure, or event.",related:["audit log","audit daemon","audit trail preservation"],cciRefs:["CCI-000130","CCI-000131","CCI-000132"],
    senses:[{sense_number:1,sense_label:"Event Entry",definition:"A single timestamped entry documenting one discrete system event (login, file access, process execution).",framework:"NIST SP 800-92"},{sense_number:2,sense_label:"Compliance Artifact",definition:"The formal evidentiary record required by DISA STIGs to demonstrate audit capability during assessment.",framework:"DISA STIG"}],
    triples:[{subject:"audit record",predicate:"broader",object:"audit log",type:"hierarchical"},{subject:"audit record",predicate:"related",object:"audit daemon",type:"semantic"},{subject:"audit record",predicate:"narrower",object:"audit trail preservation",type:"hierarchical"}]},
  {id:"lex-002",term:"audit daemon",status:"validated",pass1:true,pass2:true,freq:42,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.95,cat:"Audit & Logging",def:"The background process (auditd) responsible for writing audit records to disk. Critical for maintaining continuous audit coverage per DISA STIG requirements.",related:["audit record","audit log"],cciRefs:["CCI-000135","CCI-000136"],senses:[],triples:[{subject:"audit daemon",predicate:"related",object:"audit record",type:"semantic"},{subject:"audit daemon",predicate:"related",object:"audit log",type:"semantic"}]},
  {id:"lex-003",term:"access control",status:"validated",pass1:true,pass2:true,freq:89,stigs:6,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.88,cat:"Access Management",def:"The process of granting or denying specific requests to obtain and use information and related information processing services.",related:["privileged account","authentication mechanism","account lockout"],cciRefs:["CCI-000213","CCI-000764"],
    senses:[{sense_number:1,sense_label:"Physical",definition:"Restricting physical entry to facilities, rooms, or hardware containing information systems.",framework:"NIST SP 800-53 PE"},{sense_number:2,sense_label:"Logical",definition:"Restricting access to system resources, data, and services through authentication and authorization mechanisms.",framework:"NIST SP 800-53 AC"},{sense_number:3,sense_label:"Administrative",definition:"Policies, procedures, and organizational controls governing who may access what resources under what conditions.",framework:"NIST SP 800-53 AC-1"}],
    triples:[{subject:"access control",predicate:"broader",object:"privileged account",type:"hierarchical"},{subject:"access control",predicate:"related",object:"authentication mechanism",type:"semantic"},{subject:"access control",predicate:"narrower",object:"account lockout",type:"hierarchical"},{subject:"access control",predicate:"related",object:"session lock",type:"semantic"}]},
  {id:"lex-004",term:"remote access",status:"validated",pass1:true,pass2:true,freq:34,stigs:5,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.96,cat:"Network Security",def:"Access to DOD nonpublic information systems by an authorized user communicating through an external, non-organization-controlled network.",related:["remote access functionality","DOD-approved encryption"],cciRefs:["CCI-001453","CCI-002418"],
    senses:[{sense_number:1,sense_label:"VPN-based",definition:"Remote connectivity established through an encrypted VPN tunnel to the organization's network perimeter.",framework:"NIST SP 800-77"},{sense_number:2,sense_label:"Application-layer",definition:"Remote access to specific applications or services (e.g., SSH, RDP, web portals) without full network tunnel.",framework:"NIST SP 800-46"}],
    triples:[{subject:"remote access",predicate:"broader",object:"remote access functionality",type:"hierarchical"},{subject:"remote access",predicate:"related",object:"DOD-approved encryption",type:"semantic"},{subject:"remote access",predicate:"related",object:"automatic disconnect capability",type:"semantic"}]},
  {id:"lex-005",term:"information system",status:"validated",pass1:true,pass2:false,freq:112,stigs:8,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"TAG"},conf:0.82,cat:"General",def:"A discrete set of information resources organized for the collection, processing, maintenance, use, sharing, dissemination, or disposition of information. Per NIST SP 800-18.",related:["organizational information systems"],cciRefs:["CCI-000366"],senses:[],triples:[{subject:"information system",predicate:"broader",object:"organizational information systems",type:"hierarchical"},{subject:"information system",predicate:"related",object:"operating system",type:"semantic"}]},
  {id:"lex-006",term:"cryptographic module",status:"validated",pass1:true,pass2:true,freq:28,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.98,cat:"Cryptography",def:"The set of hardware, software, and/or firmware that implements approved security functions and is contained within the cryptographic boundary. Validated through FIPS 140-2/140-3.",related:["DOD-approved encryption","FIPS-validated cryptography","disk encryption"],cciRefs:["CCI-002450","CCI-002476"],
    senses:[{sense_number:1,sense_label:"Hardware Module",definition:"A dedicated physical device (HSM, TPM, smartcard) implementing cryptographic functions within a tamper-resistant boundary.",framework:"FIPS 140-3"},{sense_number:2,sense_label:"Software Module",definition:"A software library or application implementing cryptographic algorithms validated against FIPS 140 standards.",framework:"FIPS 140-3"},{sense_number:3,sense_label:"Firmware Module",definition:"Cryptographic functions embedded in device firmware, typically in network appliances or storage controllers.",framework:"FIPS 140-3"}],
    triples:[{subject:"cryptographic module",predicate:"broader",object:"FIPS-validated cryptography",type:"hierarchical"},{subject:"cryptographic module",predicate:"narrower",object:"disk encryption",type:"hierarchical"},{subject:"cryptographic module",predicate:"related",object:"DOD-approved encryption",type:"semantic"},{subject:"cryptographic module",predicate:"related",object:"certificate validation",type:"semantic"}]},
  {id:"lex-007",term:"kernel module",status:"validated",pass1:true,pass2:true,freq:18,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.94,cat:"System Integrity",def:"Dynamically loadable code that extends kernel functionality without reboot. Loading/unloading monitored via init_module, finit_module, and delete_module syscalls.",related:["kernel module loading","system call"],cciRefs:["CCI-000172"],
    senses:[{sense_number:1,sense_label:"Device Driver",definition:"A kernel module providing hardware abstraction for a specific device class (network, storage, input).",framework:"Linux Kernel Documentation"},{sense_number:2,sense_label:"Security Extension",definition:"A kernel module implementing mandatory access control or audit subsystem extensions (SELinux, AppArmor).",framework:"DISA STIG"}],
    triples:[{subject:"kernel module",predicate:"broader",object:"kernel module loading",type:"hierarchical"},{subject:"kernel module",predicate:"related",object:"system call",type:"semantic"},{subject:"kernel module",predicate:"related",object:"file integrity",type:"semantic"}]},
  {id:"lex-008",term:"authentication mechanism",status:"validated",pass1:true,pass2:true,freq:31,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.86,cat:"Access Management",def:"The method used to verify the identity of a user, process, or device as a prerequisite to allowing access to resources in an information system.",related:["account lockout","password complexity","privileged account"],cciRefs:["CCI-000765","CCI-000766"],senses:[],triples:[{subject:"authentication mechanism",predicate:"related",object:"password complexity",type:"semantic"},{subject:"authentication mechanism",predicate:"narrower",object:"account lockout",type:"hierarchical"}]},
  {id:"lex-009",term:"account lockout",status:"validated",pass1:true,pass2:true,freq:22,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.93,cat:"Access Management",def:"Security mechanism that disables a user account after a specified number of consecutive failed authentication attempts within a defined time window.",related:["consecutive invalid login attempts","authentication mechanism"],cciRefs:["CCI-000044","CCI-002238"],senses:[],triples:[{subject:"account lockout",predicate:"related",object:"consecutive invalid login attempts",type:"semantic"},{subject:"account lockout",predicate:"broader",object:"authentication mechanism",type:"hierarchical"}]},
  {id:"lex-010",term:"password complexity",status:"validated",pass1:true,pass2:false,freq:26,stigs:5,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.84,cat:"Access Management",def:"The measure of effectiveness of a password in resisting attempts at guessing and brute-force attacks based on character composition requirements.",related:["authentication mechanism"],cciRefs:["CCI-000192","CCI-000193","CCI-000194"],senses:[],triples:[]},
  {id:"lex-011",term:"session lock",status:"validated",pass1:true,pass2:true,freq:19,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.95,cat:"Access Management",def:"A temporary action that prevents further access to the system by blanking the display or other mechanism while preserving the user session state.",related:["remote access"],cciRefs:["CCI-000056","CCI-000058"],
    senses:[{sense_number:1,sense_label:"Inactivity Timeout",definition:"Automatic session lock triggered after a configured period of user inactivity (typically 15 minutes per STIG).",framework:"DISA STIG"},{sense_number:2,sense_label:"User-initiated",definition:"Manual session lock triggered by the user via keyboard shortcut or menu action before leaving the workstation.",framework:"NIST SP 800-53 AC-11"}],
    triples:[{subject:"session lock",predicate:"related",object:"remote access",type:"semantic"},{subject:"session lock",predicate:"broader",object:"access control",type:"hierarchical"}]},
  {id:"lex-012",term:"system call",status:"validated",pass1:true,pass2:true,freq:53,stigs:3,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"TAG"},conf:0.81,cat:"Audit & Logging",def:"The programmatic way a process requests service from the kernel. Specific syscalls (open, chmod, chown, etc.) must be audited per STIG requirements.",related:["audit record","kernel module"],cciRefs:["CCI-000172","CCI-000130"],
    senses:[{sense_number:1,sense_label:"File Operations",definition:"Syscalls governing file manipulation: open, close, read, write, chmod, chown, unlink.",framework:"POSIX"},{sense_number:2,sense_label:"Module Operations",definition:"Syscalls for kernel module management: init_module, finit_module, delete_module.",framework:"Linux Kernel"},{sense_number:3,sense_label:"Process Operations",definition:"Syscalls governing process lifecycle: fork, exec, exit, kill, ptrace.",framework:"POSIX"}],
    triples:[{subject:"system call",predicate:"related",object:"audit record",type:"semantic"},{subject:"system call",predicate:"related",object:"kernel module",type:"semantic"}]},
  {id:"lex-013",term:"privileged account",status:"validated",pass1:true,pass2:true,freq:15,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.96,cat:"Access Management",def:"An information system account with authorizations of a privileged user — elevated rights that can affect system security posture.",related:["access control","authentication mechanism"],cciRefs:["CCI-000015","CCI-000764"],senses:[],triples:[{subject:"privileged account",predicate:"narrower",object:"access control",type:"hierarchical"},{subject:"privileged account",predicate:"related",object:"privilege escalation",type:"semantic"}]},
  {id:"lex-014",term:"network firewall",status:"validated",pass1:true,pass2:true,freq:12,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.97,cat:"Network Security",def:"A device or software that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies.",related:["firewall rules","remote access"],cciRefs:["CCI-002314","CCI-000382"],
    senses:[{sense_number:1,sense_label:"Host-based",definition:"Software firewall running on an individual host (e.g., iptables/nftables on NixOS) filtering traffic to/from that system.",framework:"NIST SP 800-41"},{sense_number:2,sense_label:"Network-based",definition:"Dedicated hardware or virtual appliance positioned at a network boundary to filter traffic between zones.",framework:"NIST SP 800-41"}],
    triples:[{subject:"network firewall",predicate:"broader",object:"firewall rules",type:"hierarchical"},{subject:"network firewall",predicate:"narrower",object:"NixOS built-in firewall",type:"hierarchical"},{subject:"network firewall",predicate:"related",object:"remote access",type:"semantic"}]},
  {id:"lex-015",term:"disk encryption",status:"validated",pass1:true,pass2:false,freq:8,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.87,cat:"Cryptography",def:"Cryptographic protection of data stored on secondary storage devices to prevent unauthorized access to information at rest.",related:["cryptographic module","FIPS-validated cryptography"],cciRefs:["CCI-002476"],senses:[],triples:[{subject:"disk encryption",predicate:"broader",object:"cryptographic module",type:"hierarchical"}]},
  {id:"lex-016",term:"file integrity",status:"validated",pass1:true,pass2:true,freq:14,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.94,cat:"System Integrity",def:"Verification that files have not been tampered with by comparing current state against known-good baselines using cryptographic hashes.",related:["audit record","configuration baseline"],cciRefs:["CCI-001744","CCI-002702"],
    senses:[{sense_number:1,sense_label:"Baseline Comparison",definition:"Comparing file checksums against a known-good baseline to detect unauthorized changes (e.g., AIDE, Tripwire).",framework:"NIST SP 800-53 SI-7"},{sense_number:2,sense_label:"Real-time Monitoring",definition:"Continuous monitoring of file system events to detect modifications as they occur via kernel audit hooks.",framework:"DISA STIG"}],
    triples:[{subject:"file integrity",predicate:"related",object:"audit record",type:"semantic"},{subject:"file integrity",predicate:"related",object:"configuration baseline",type:"semantic"},{subject:"file integrity",predicate:"related",object:"kernel module",type:"semantic"}]},
  {id:"lex-017",term:"audit log",status:"validated",pass1:true,pass2:true,freq:38,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.85,cat:"Audit & Logging",def:"The persistent storage of audit records, typically files written by the audit daemon. Must be protected from unauthorized modification or deletion.",related:["audit record","audit daemon"],cciRefs:["CCI-000162","CCI-000163"],senses:[],triples:[{subject:"audit log",predicate:"narrower",object:"audit record",type:"hierarchical"},{subject:"audit log",predicate:"related",object:"audit daemon",type:"semantic"}]},
  {id:"lex-018",term:"certificate validation",status:"validated",pass1:true,pass2:false,freq:9,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.92,cat:"Cryptography",def:"The process of verifying digital certificate authenticity, revocation status, and trust chain to a recognized Certificate Authority.",related:["cryptographic module"],cciRefs:["CCI-002470"],senses:[],triples:[{subject:"certificate validation",predicate:"related",object:"cryptographic module",type:"semantic"}]},
  {id:"lex-019",term:"kernel module loading",status:"candidate",pass1:true,pass2:false,freq:6,stigs:1,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.78,cat:"System Integrity",def:"The mechanism of dynamically inserting code into the running kernel via init_module or finit_module syscalls. Candidate — under council review.",related:["kernel module","system call"],cciRefs:["CCI-000172"],senses:[],triples:[{subject:"kernel module loading",predicate:"narrower",object:"kernel module",type:"hierarchical"}]},
  {id:"lex-020",term:"consecutive invalid login attempts",status:"contested",pass1:true,pass2:false,freq:11,stigs:3,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.58,cat:"Access Management",def:"A sequence of failed authentication events by the same user without an intervening success. Council split 2-2 on whether this is compositional or a policy-specific MWE.",related:["account lockout","authentication mechanism"],cciRefs:["CCI-000044"],senses:[],triples:[]},
  {id:"lex-021",term:"DOD-approved encryption",status:"contested",pass1:false,pass2:true,freq:14,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"NO_TAG"},conf:0.62,cat:"Cryptography",def:"Encryption using cryptographic algorithms validated through the FIPS 140 process and approved by NSA for DOD use. Council split 2-2 on compositional vs. regulatory MWE.",related:["cryptographic module","FIPS-validated cryptography"],cciRefs:["CCI-002418","CCI-002421"],senses:[],triples:[{subject:"DOD-approved encryption",predicate:"synonym",object:"FIPS-validated cryptography",type:"equivalence"}]},
  {id:"lex-022",term:"emergency account",status:"candidate",pass1:false,pass2:false,freq:4,stigs:1,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.52,cat:"Access Management",def:"A temporary user account created under exigent circumstances with a mandatory 72-hour expiration. Candidate term — low frequency, unclear MWE boundary.",related:["privileged account"],cciRefs:["CCI-000016"],senses:[],triples:[]},
  {id:"lex-023",term:"configuration baseline",status:"candidate",pass1:false,pass2:true,freq:7,stigs:2,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.55,cat:"System Integrity",def:"A documented set of specifications for an information system that has been formally reviewed and agreed upon as the basis for further development or change. Candidate — council split.",related:["file integrity"],cciRefs:["CCI-000366"],senses:[],triples:[]},
  {id:"lex-024",term:"remote access functionality",status:"candidate",pass1:false,pass2:true,freq:5,stigs:1,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.74,cat:"Network Security",def:"The set of capabilities enabling users to access systems from external networks. Candidate — may be superset of 'remote access' MWE.",related:["remote access","automatic disconnect capability"],cciRefs:["CCI-001453"],senses:[],triples:[{subject:"remote access functionality",predicate:"narrower",object:"remote access",type:"hierarchical"}]},
  {id:"lex-025",term:"automatic disconnect capability",status:"candidate",pass1:false,pass2:true,freq:3,stigs:1,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.48,cat:"Network Security",def:"The ability to terminate remote sessions without manual intervention based on policy triggers (time, threat detection). Low frequency — under review.",related:["remote access functionality","remote access"],cciRefs:["CCI-002361"],senses:[],triples:[]},
  {id:"lex-026",term:"indicators of compromise",status:"validated",pass1:true,pass2:true,freq:16,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.97,cat:"Threat Detection",def:"Artifacts observed on a network or in an operating system that indicate a computer intrusion with high confidence. Well-established security term (IoCs).",related:["adverse information"],cciRefs:["CCI-002361","CCI-002684"],senses:[],triples:[{subject:"indicators of compromise",predicate:"acronym_of",object:"IoCs",type:"equivalence"},{subject:"indicators of compromise",predicate:"related",object:"adverse information",type:"semantic"}]},
  {id:"lex-027",term:"firewall rules",status:"validated",pass1:true,pass2:true,freq:10,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.83,cat:"Network Security",def:"The set of conditions and actions that determine how network traffic is filtered — defined declaratively in NixOS via configuration.nix.",related:["network firewall","NixOS declarative configuration"],cciRefs:["CCI-000382"],senses:[],triples:[{subject:"firewall rules",predicate:"narrower",object:"network firewall",type:"hierarchical"}]},
  {id:"lex-028",term:"NixOS built-in firewall",status:"candidate",pass1:false,pass2:true,freq:2,stigs:1,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.54,cat:"Network Security",def:"The iptables/nftables-based firewall managed declaratively through networking.firewall.enable in NixOS. Platform-specific term — under review.",related:["network firewall","firewall rules","NixOS declarative configuration"],cciRefs:["CCI-002314"],senses:[],triples:[{subject:"NixOS built-in firewall",predicate:"narrower",object:"network firewall",type:"hierarchical"}]},
  {id:"lex-029",term:"NixOS declarative configuration",status:"candidate",pass1:false,pass2:true,freq:3,stigs:1,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"NO_TAG",David:"TAG"},conf:0.46,cat:"System Integrity",def:"The functional configuration model used by NixOS where system state is defined in /etc/nixos/configuration.nix. Platform-specific — may not generalize.",related:["configuration baseline","NixOS built-in firewall"],cciRefs:["CCI-000366"],senses:[],triples:[]},
  {id:"lex-030",term:"mission functions",status:"candidate",pass1:false,pass2:true,freq:8,stigs:3,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"NO_TAG"},conf:0.38,cat:"General",def:"Organizational operations essential to achieving the mission objective. Very broad term — likely compositional rather than MWE.",related:["organizational information systems"],cciRefs:["CCI-000366"],senses:[],triples:[]},
  {id:"lex-031",term:"organizational information systems",status:"validated",pass1:true,pass2:true,freq:21,stigs:5,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.83,cat:"General",def:"Information systems operated by an organization or on behalf of an organization, including those operated by contractors. Regulatory term of art.",related:["information system","mission functions"],cciRefs:["CCI-000366"],senses:[],triples:[{subject:"organizational information systems",predicate:"narrower",object:"information system",type:"hierarchical"}]},
  {id:"lex-032",term:"adverse information",status:"candidate",pass1:false,pass2:true,freq:4,stigs:1,council:{Alice:"NO_TAG",Bob:"NO_TAG",Clara:"TAG",David:"TAG"},conf:0.49,cat:"Threat Detection",def:"Information that adversely reflects on the integrity or character of a cleared individual, or data suggesting hostile activity. Under review.",related:["indicators of compromise"],cciRefs:["CCI-002361"],senses:[],triples:[]},
  {id:"lex-033",term:"operating system",status:"validated",pass1:true,pass2:true,freq:98,stigs:8,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.99,cat:"General",def:"System software that manages computer hardware and software resources and provides common services for computer programs.",related:["information system"],cciRefs:["CCI-000366"],senses:[],triples:[{subject:"operating system",predicate:"abbreviation_of",object:"OS",type:"equivalence"},{subject:"operating system",predicate:"narrower",object:"information system",type:"hierarchical"}]},
  {id:"lex-034",term:"privilege escalation",status:"candidate",pass1:false,pass2:false,freq:7,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.76,cat:"Access Management",def:"The exploitation of a programming error, design flaw, or configuration oversight to gain elevated access to resources normally protected from a user.",related:["privileged account","access control"],cciRefs:["CCI-000015"],
    senses:[{sense_number:1,sense_label:"Vertical",definition:"Gaining higher privilege level than assigned (e.g., regular user to root/admin).",framework:"MITRE ATT&CK"},{sense_number:2,sense_label:"Horizontal",definition:"Accessing resources of another user at the same privilege level without authorization.",framework:"MITRE ATT&CK"}],
    triples:[{subject:"privilege escalation",predicate:"related",object:"privileged account",type:"semantic"},{subject:"privilege escalation",predicate:"related",object:"access control",type:"semantic"}]},
  {id:"lex-035",term:"execution control policy",status:"candidate",pass1:false,pass2:false,freq:3,stigs:1,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"NO_TAG"},conf:0.32,cat:"System Integrity",def:"Organizational policy governing which binaries and scripts may execute on a system. Low consensus — likely compositional.",related:["configuration baseline"],cciRefs:["CCI-001774"],senses:[],triples:[]},
  {id:"lex-036",term:"audit trail preservation",status:"candidate",pass1:false,pass2:false,freq:5,stigs:2,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.51,cat:"Audit & Logging",def:"The protection of audit records from unauthorized alteration, deletion, or overwriting. Council split — may overlap with 'audit log' protection.",related:["audit log","audit record"],cciRefs:["CCI-000162","CCI-000163"],senses:[],triples:[{subject:"audit trail preservation",predicate:"related",object:"audit log",type:"semantic"},{subject:"audit trail preservation",predicate:"narrower",object:"audit record",type:"hierarchical"}]},
  {id:"lex-037",term:"FIPS-validated cryptography",status:"validated",pass1:true,pass2:true,freq:19,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.98,cat:"Cryptography",def:"Cryptographic modules that have been tested and validated against FIPS 140-2 or FIPS 140-3 standards by an accredited Cryptographic Module Testing Laboratory.",related:["cryptographic module","DOD-approved encryption"],cciRefs:["CCI-002450"],senses:[],triples:[{subject:"FIPS-validated cryptography",predicate:"synonym",object:"DOD-approved encryption",type:"equivalence"},{subject:"FIPS-validated cryptography",predicate:"narrower",object:"cryptographic module",type:"hierarchical"}]},
];

const LEX_CATS = [...new Set(LEX.map(l=>l.cat))].sort();
const LEX_VALIDATED = LEX.filter(l=>l.status==="validated").length;
const LEX_CANDIDATE = LEX.filter(l=>l.status==="candidate").length;
const LEX_CONTESTED = LEX.filter(l=>l.status==="contested").length;
const ALL_TRIPLES = LEX.flatMap(l=>l.triples);
const ALL_SENSES = LEX.filter(l=>l.senses.length>0);

// Mock management queue items
const SENSE_CONFLICTS = [
  {id:"sc-1",term:"access control",sense1:{sense_number:2,sense_label:"Logical",proposedBy:"Alice"},sense2:{sense_number:2,sense_label:"Digital/Logical",proposedBy:"Clara"},reason:"Naming disagreement — 'Digital' vs 'Logical' for non-physical access restriction"},
  {id:"sc-2",term:"cryptographic module",sense1:{sense_number:1,sense_label:"Hardware Module",proposedBy:"Bob"},sense2:{sense_number:1,sense_label:"HSM/Hardware Module",proposedBy:"David"},reason:"Whether to include HSM acronym in the sense label for specificity"},
];
const PREDICATE_PROPOSALS = [
  {id:"pp-1",subject:"audit daemon",predicate:"depends_on",object:"audit log",proposedBy:"Alice",reason:"auditd process depends on writable audit log path — suggests 'depends_on' predicate"},
  {id:"pp-2",subject:"session lock",predicate:"triggers",object:"audit record",proposedBy:"Bob",reason:"Session lock events should generate audit records — suggests 'triggers' predicate"},
  {id:"pp-3",subject:"NixOS built-in firewall",predicate:"implemented_by",object:"NixOS declarative configuration",proposedBy:"Clara",reason:"Firewall is configured through NixOS declarations — suggests 'implemented_by' predicate"},
];

// ── Mini Force Graph ──────────────────────────────────────────
function ForceGraph({terms, triples, width=540, height=360}) {
  const svgRef = React.useRef(null);
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);
  const [hoveredNode, setHoveredNode] = React.useState(null);
  const frameRef = React.useRef(null);

  React.useEffect(()=>{
    // Build unique nodes from triples
    const nodeMap = new Map();
    const catColors = {"Audit & Logging":"#6366f1","Access Management":"#f59e0b","Network Security":"#10b981","Cryptography":"#ec4899","System Integrity":"#8b5cf6","Threat Detection":"#ef4444","General":"#64748b"};
    terms.forEach(t=>{nodeMap.set(t.term,{id:t.term,x:Math.random()*width,y:Math.random()*height,vx:0,vy:0,r:Math.max(6,Math.min(18,t.freq/6)),color:catColors[t.cat]||"#64748b",cat:t.cat});});
    // Add any nodes from triples not in terms
    triples.forEach(tr=>{
      if(!nodeMap.has(tr.subject)){nodeMap.set(tr.subject,{id:tr.subject,x:Math.random()*width,y:Math.random()*height,vx:0,vy:0,r:5,color:"#94a3b8",cat:"External"});}
      if(!nodeMap.has(tr.object)){nodeMap.set(tr.object,{id:tr.object,x:Math.random()*width,y:Math.random()*height,vx:0,vy:0,r:5,color:"#94a3b8",cat:"External"});}
    });
    const ns=[...nodeMap.values()];
    const es=triples.map((tr,i)=>({id:i,source:tr.subject,target:tr.object,predicate:tr.predicate}));
    setNodes(ns);
    setEdges(es);

    // Simple force simulation
    let running=true;
    let tick=0;
    const simulate=()=>{
      if(!running||tick>200)return;
      tick++;
      const alpha=Math.max(0.01,1-tick/200);
      // Repulsion
      for(let i=0;i<ns.length;i++){for(let j=i+1;j<ns.length;j++){
        let dx=ns[j].x-ns[i].x,dy=ns[j].y-ns[i].y;
        let d=Math.sqrt(dx*dx+dy*dy)||1;
        let f=alpha*800/(d*d);
        ns[i].vx-=f*dx/d;ns[i].vy-=f*dy/d;
        ns[j].vx+=f*dx/d;ns[j].vy+=f*dy/d;
      }}
      // Attraction along edges
      es.forEach(e=>{
        const s=ns.find(n=>n.id===e.source),t=ns.find(n=>n.id===e.target);
        if(!s||!t)return;
        let dx=t.x-s.x,dy=t.y-s.y,d=Math.sqrt(dx*dx+dy*dy)||1;
        let f=alpha*(d-80)*0.05;
        s.vx+=f*dx/d;s.vy+=f*dy/d;
        t.vx-=f*dx/d;t.vy-=f*dy/d;
      });
      // Center gravity
      ns.forEach(n=>{
        n.vx+=(width/2-n.x)*alpha*0.01;
        n.vy+=(height/2-n.y)*alpha*0.01;
        n.vx*=0.85;n.vy*=0.85;
        n.x+=n.vx;n.y+=n.vy;
        n.x=Math.max(n.r+5,Math.min(width-n.r-5,n.x));
        n.y=Math.max(n.r+5,Math.min(height-n.r-5,n.y));
      });
      setNodes([...ns]);
      frameRef.current=requestAnimationFrame(simulate);
    };
    frameRef.current=requestAnimationFrame(simulate);
    return()=>{running=false;if(frameRef.current)cancelAnimationFrame(frameRef.current);};
  },[terms.length,triples.length]);

  return (<svg ref={svgRef} width={width} height={height} className="bg-slate-50 rounded-xl border border-slate-200">
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/></marker></defs>
    {edges.map(e=>{const s=nodes.find(n=>n.id===e.source),t=nodes.find(n=>n.id===e.target);if(!s||!t)return null;const mx=(s.x+t.x)/2,my=(s.y+t.y)/2;return <g key={e.id}><line x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke="#cbd5e1" strokeWidth={1.5} markerEnd="url(#arrowhead)"/><text x={mx} y={my-4} textAnchor="middle" className="text-[8px] fill-slate-400 select-none">{e.predicate}</text></g>})}
    {nodes.map(n=><g key={n.id} onMouseEnter={()=>setHoveredNode(n.id)} onMouseLeave={()=>setHoveredNode(null)}>
      <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={hoveredNode&&hoveredNode!==n.id?0.3:0.85} stroke={hoveredNode===n.id?"#1e293b":"white"} strokeWidth={hoveredNode===n.id?2:1.5} className="transition-opacity cursor-pointer"/>
      <text x={n.x} y={n.y+n.r+10} textAnchor="middle" className="text-[9px] fill-slate-600 font-medium select-none pointer-events-none">{n.id.length>20?n.id.slice(0,18)+"…":n.id}</text>
    </g>)}
  </svg>);
}

// ── Lexicon Page ──────────────────────────────────────────────
function LexiconPage({nav, isAdmin}) {
  const [lexTab,setLexTab]=useState("glossary");
  const [search,setSearch]=useState("");
  const [catFilter,setCatFilter]=useState("all");
  const [statusFilter,setStatusFilter]=useState("all");
  const [sort,setSort]=useState("freq");
  const [expanded,setExpanded]=useState(null);
  const [selectedTerm,setSelectedTerm]=useState(null);
  const [predFilter,setPredFilter]=useState("all");

  const filtered=useMemo(()=>{
    let r=LEX.filter(l=>{
      if(catFilter!=="all"&&l.cat!==catFilter) return false;
      if(statusFilter!=="all"&&l.status!==statusFilter) return false;
      if(search&&!l.term.toLowerCase().includes(search.toLowerCase())&&!l.def.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if(sort==="freq") r.sort((a,b)=>b.freq-a.freq);
    else if(sort==="conf") r.sort((a,b)=>b.conf-a.conf);
    else if(sort==="alpha") r.sort((a,b)=>a.term.localeCompare(b.term));
    else if(sort==="stigs") r.sort((a,b)=>b.stigs-a.stigs);
    return r;
  },[search,catFilter,statusFilter,sort]);

  const filteredTriples=useMemo(()=>{
    let t=ALL_TRIPLES;
    if(predFilter!=="all") t=t.filter(tr=>tr.predicate===predFilter);
    if(search) t=t.filter(tr=>tr.subject.toLowerCase().includes(search.toLowerCase())||tr.object.toLowerCase().includes(search.toLowerCase()));
    return t;
  },[predFilter,search]);

  const graphTerms=useMemo(()=>LEX.filter(l=>l.triples.length>0),[]);

  const stColor={validated:{bg:"bg-emerald-100",text:"text-emerald-700",border:"border-emerald-200"},candidate:{bg:"bg-amber-100",text:"text-amber-700",border:"border-amber-200"},contested:{bg:"bg-red-100",text:"text-red-700",border:"border-red-200"}};

  const tabs=[{k:"glossary",l:"Glossary",i:BookOpen},{k:"dictionary",l:"Dictionary",i:Layers},{k:"thesaurus",l:"Thesaurus",i:GitBranch},{k:"graph",l:"Knowledge Graph",i:Network}];
  if(isAdmin) tabs.push({k:"manage",l:"Manage",i:Pencil});

  const selTermData=selectedTerm?LEX.find(l=>l.id===selectedTerm):null;

  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><BookOpen size={18}/>MWE Lexicon</h1><p className="text-xs text-slate-500">Multi-Word Expression dictionary — {LEX.length} terms across {LEX_CATS.length} categories • {ALL_SENSES.length} with senses • {ALL_TRIPLES.length} triples</p></div>
    </div>
    {/* Summary cards */}
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><BookOpen size={13} className="text-slate-400"/><span className="text-[11px] text-slate-500">Total Terms</span></div><div className="text-xl font-bold text-slate-900 tabular-nums">{LEX.length}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><CheckCircle2 size={13} className="text-emerald-500"/><span className="text-[11px] text-slate-500">Validated</span></div><div className="text-xl font-bold text-emerald-600 tabular-nums">{LEX_VALIDATED}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Plus size={13} className="text-amber-500"/><span className="text-[11px] text-slate-500">Candidates</span></div><div className="text-xl font-bold text-amber-600 tabular-nums">{LEX_CANDIDATE}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Scale size={13} className="text-red-500"/><span className="text-[11px] text-slate-500">Contested</span></div><div className="text-xl font-bold text-red-600 tabular-nums">{LEX_CONTESTED}</div></div>
    </div>
    {/* Tab bar */}
    <div className="flex items-center gap-1 border-b border-slate-200 pb-px">
      {tabs.map(t=><button key={t.k} onClick={()=>setLexTab(t.k)} className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all ${lexTab===t.k?"border-blue-500 text-blue-700":"border-transparent text-slate-500 hover:text-slate-700"}`}><t.i size={13}/>{t.l}</button>)}
    </div>
    {/* Filters — shared across glossary/dictionary/thesaurus */}
    {(lexTab==="glossary"||lexTab==="dictionary"||lexTab==="thesaurus")&&<div className="flex items-center gap-2 flex-wrap">
      <div className="relative flex-1 min-w-[180px] max-w-xs"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Search terms or definitions..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"/></div>
      <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Status</option><option value="validated">Validated ({LEX_VALIDATED})</option><option value="candidate">Candidate ({LEX_CANDIDATE})</option><option value="contested">Contested ({LEX_CONTESTED})</option></select>
      <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Categories</option>{LEX_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select>
      <select value={sort} onChange={e=>setSort(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="freq">Sort: Frequency</option><option value="conf">Sort: Confidence</option><option value="alpha">Sort: A-Z</option><option value="stigs">Sort: STIG Coverage</option></select>
      <span className="text-[11px] text-slate-400 ml-auto">{filtered.length} terms</span>
    </div>}

    {/* ════════ GLOSSARY VIEW ════════ */}
    {lexTab==="glossary"&&<div className="space-y-2">{filtered.map(l=>{
      const sc=stColor[l.status];
      const isExp=expanded===l.id;
      const votes=Object.entries(l.council);
      const tagCount=votes.filter(([,v])=>v==="TAG").length;
      return (<div key={l.id} className={`bg-white rounded-xl border ${isExp?"border-blue-300 shadow-sm":"border-slate-200"} overflow-hidden transition-all`}>
        <button onClick={()=>setExpanded(isExp?null:l.id)} className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-slate-900 font-mono">{l.term}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.text} border ${sc.border}`}>{l.status==="validated"&&<CheckCircle2 size={9}/>}{l.status==="contested"&&<Scale size={9}/>}{l.status==="candidate"&&<Plus size={9}/>}{l.status}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{l.cat}</span>
                {l.senses.length>0&&<span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-medium">{l.senses.length} senses</span>}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{l.def}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-center"><div className="text-sm font-bold text-slate-700 tabular-nums">{l.freq}</div><div className="text-[9px] text-slate-400">hits</div></div>
              <div className="text-center"><div className="text-sm font-bold text-slate-700 tabular-nums">{l.stigs}</div><div className="text-[9px] text-slate-400">STIGs</div></div>
              {isAdmin && <div className="text-center"><div className="flex items-center gap-0.5">{votes.map(([n,v])=><div key={n} className={`w-3 h-3 rounded-full text-[6px] font-bold flex items-center justify-center ${v==="TAG"?"bg-emerald-400 text-white":"bg-red-300 text-white"}`}>{n[0]}</div>)}</div><div className="text-[9px] text-slate-400">{tagCount}/4</div></div>}
              <CB s={l.conf}/>
              {isExp?<ChevronDown size={14} className="text-slate-400"/>:<ChevronRight size={14} className="text-slate-400"/>}
            </div>
          </div>
        </button>
        {isExp&&<div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Definition</p>
              <p className="text-xs text-slate-700 leading-relaxed">{l.def}</p>
            </div>
            {isAdmin && <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Council Votes</p>
              <div className="grid grid-cols-4 gap-1.5">{votes.map(([n,v])=><div key={n} className={`rounded-lg border p-2 text-center ${v==="TAG"?"border-emerald-200 bg-emerald-50/50":"border-red-200 bg-red-50/50"}`}><AA name={n} vote={v} sz="sm"/></div>)}</div>
            </div>}
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Properties</p>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between"><span className="text-slate-500">Pass 1 (raw text)</span>{l.pass1?<CheckCircle2 size={12} className="text-emerald-500"/>:<XCircle size={12} className="text-slate-300"/>}</div>
                <div className="flex items-center justify-between"><span className="text-slate-500">Pass 2 (mandates)</span>{l.pass2?<CheckCircle2 size={12} className="text-emerald-500"/>:<XCircle size={12} className="text-slate-300"/>}</div>
                <div className="flex items-center justify-between"><span className="text-slate-500">Frequency</span><span className="font-semibold text-slate-700">{l.freq} occurrences</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">STIG coverage</span><span className="font-semibold text-slate-700">{l.stigs} benchmarks</span></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Related Terms</p>
              <div className="flex flex-wrap gap-1">{l.related.map((r,i)=>{const rl=LEX.find(x=>x.term===r);return <button key={i} onClick={()=>{if(rl)setExpanded(rl.id);}} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${rl?"bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer":"bg-slate-50 text-slate-500 border-slate-200"}`}><Link size={8}/>{r}</button>})}</div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">CCI References</p>
              <div className="flex flex-wrap gap-1">{l.cciRefs.map((c,i)=><span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200"><Hash size={8}/>{c}</span>)}</div>
            </div>
          </div>
        </div>}
      </div>);
    })}
    {filtered.length===0&&<div className="bg-white rounded-xl border border-slate-200 py-12 text-center"><Search size={36} className="mx-auto text-slate-300 mb-2"/><h3 className="text-sm font-semibold text-slate-700">No matching terms</h3><p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p></div>}
    </div>}

    {/* ════════ DICTIONARY VIEW ════════ */}
    {lexTab==="dictionary"&&<div className="space-y-3">{filtered.map(l=>{
      const sc=stColor[l.status];
      return (<div key={l.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-200 transition-all">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-slate-900 font-mono">{l.term}</span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.text} border ${sc.border}`}>{l.status}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{l.cat}</span>
          <span className="text-[10px] text-slate-400 ml-auto">{l.freq} hits • {l.stigs} STIGs</span>
        </div>
        {/* Primary definition */}
        <p className="text-xs text-slate-700 leading-relaxed mb-2">{l.def}</p>
        {/* Senses */}
        {l.senses.length>0?(<div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
          <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1"><Layers size={10}/>Senses ({l.senses.length})</p>
          {l.senses.map(s=>(
            <div key={s.sense_number} className="flex gap-3 pl-2 border-l-2 border-indigo-200">
              <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-bold">{s.sense_number}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-slate-800">{s.sense_label}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 font-medium">{s.framework}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{s.definition}</p>
              </div>
            </div>
          ))}
        </div>):(
          <p className="text-[10px] text-slate-400 italic mt-1">No additional senses defined</p>
        )}
      </div>);
    })}
    {filtered.length===0&&<div className="bg-white rounded-xl border border-slate-200 py-12 text-center"><Search size={36} className="mx-auto text-slate-300 mb-2"/><h3 className="text-sm font-semibold text-slate-700">No matching terms</h3></div>}
    </div>}

    {/* ════════ THESAURUS VIEW ════════ */}
    {lexTab==="thesaurus"&&<div className="grid grid-cols-3 gap-4" style={{minHeight:400}}>
      {/* Term list */}
      <div className="col-span-1 space-y-1 overflow-y-auto max-h-[600px] pr-1">
        <p className="text-[10px] font-semibold text-slate-500 uppercase mb-2 sticky top-0 bg-slate-50 py-1">Terms with relationships ({LEX.filter(l=>l.triples.length>0).length})</p>
        {filtered.filter(l=>l.triples.length>0).map(l=>(
          <button key={l.id} onClick={()=>setSelectedTerm(l.id)} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${selectedTerm===l.id?"bg-blue-50 text-blue-700 border border-blue-200":"bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
            <div className="flex items-center justify-between">
              <span className="font-mono">{l.term}</span>
              <span className="text-[9px] text-slate-400">{l.triples.length}</span>
            </div>
          </button>
        ))}
        {filtered.filter(l=>l.triples.length===0).length>0&&<>
          <p className="text-[10px] font-semibold text-slate-400 uppercase mt-3 mb-1">No relationships yet</p>
          {filtered.filter(l=>l.triples.length===0).slice(0,8).map(l=>(
            <div key={l.id} className="px-3 py-1.5 text-[11px] text-slate-400 font-mono">{l.term}</div>
          ))}
        </>}
      </div>
      {/* Relationship detail */}
      <div className="col-span-2">
        {selTermData&&selTermData.triples.length>0?(<div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-slate-900 font-mono">{selTermData.term}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{selTermData.triples.length} relationships</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">{selTermData.def}</p>
          <div className="space-y-2">
            {Object.entries(PREDICATE_TYPES).map(([pk,pv])=>{
              const matching=selTermData.triples.filter(t=>t.predicate===pk);
              if(matching.length===0) return null;
              return (<div key={pk} className="space-y-1">
                <div className="flex items-center gap-2"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${pv.color}`}><span className="text-[9px]">{pv.icon}</span>{pv.label}</span></div>
                {matching.map((tr,i)=>(
                  <div key={i} className="flex items-center gap-2 pl-4 py-1">
                    <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{tr.subject}</span>
                    <ArrowRight size={10} className="text-slate-400 shrink-0"/>
                    <span className="text-[11px] font-mono text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">{tr.object}</span>
                    <span className="text-[9px] text-slate-400 ml-1">{tr.type}</span>
                  </div>
                ))}
              </div>);
            })}
          </div>
        </div>):(<div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
          <GitBranch size={36} className="mx-auto text-slate-300 mb-2"/>
          <h3 className="text-sm font-semibold text-slate-700">Select a term</h3>
          <p className="text-xs text-slate-500 mt-1">Choose a term from the left to view its semantic relationships.</p>
        </div>)}
      </div>
    </div>}

    {/* ════════ KNOWLEDGE GRAPH VIEW ════════ */}
    {lexTab==="graph"&&<div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[180px] max-w-xs"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Filter triples..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"/></div>
        <select value={predFilter} onChange={e=>setPredFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Predicates ({ALL_TRIPLES.length})</option>{Object.entries(PREDICATE_TYPES).map(([k,v])=>{const c=ALL_TRIPLES.filter(t=>t.predicate===k).length;return c>0?<option key={k} value={k}>{v.label} ({c})</option>:null;})}</select>
        <span className="text-[11px] text-slate-400 ml-auto">{filteredTriples.length} triples</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Triple table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-4 gap-px bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase">
            <div className="bg-slate-50 px-3 py-2">Subject</div>
            <div className="bg-slate-50 px-3 py-2">Predicate</div>
            <div className="bg-slate-50 px-3 py-2">Object</div>
            <div className="bg-slate-50 px-3 py-2">Type</div>
          </div>
          <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100">
            {filteredTriples.map((tr,i)=>{const pt=PREDICATE_TYPES[tr.predicate];return(
              <div key={i} className="grid grid-cols-4 gap-px text-[11px] hover:bg-blue-50/50 transition-colors">
                <div className="px-3 py-1.5 font-mono text-slate-700 truncate">{tr.subject}</div>
                <div className="px-3 py-1.5">{pt?<span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold border ${pt.color}`}><span>{pt.icon}</span>{pt.label}</span>:<span className="text-slate-500">{tr.predicate}</span>}</div>
                <div className="px-3 py-1.5 font-mono text-slate-700 truncate">{tr.object}</div>
                <div className="px-3 py-1.5 text-slate-400">{tr.type}</div>
              </div>
            );})}
          </div>
        </div>
        {/* Force graph */}
        <ForceGraph terms={graphTerms} triples={filteredTriples}/>
      </div>
    </div>}

    {/* ════════ MANAGE VIEW (Admin Only) ════════ */}
    {lexTab==="manage"&&isAdmin&&<div className="space-y-6">
      {/* Candidate terms */}
      <div>
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3"><Flag size={14} className="text-amber-500"/>Candidate Terms ({LEX_CANDIDATE})</h2>
        <div className="space-y-2">{LEX.filter(l=>l.status==="candidate").map(l=>{
          const votes=Object.entries(l.council);
          const tagCount=votes.filter(([,v])=>v==="TAG").length;
          return (<div key={l.id} className="bg-white rounded-xl border border-amber-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 font-mono">{l.term}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{l.cat}</span>
                <CB s={l.conf}/>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 mr-2">{votes.map(([n,v])=><div key={n} className={`w-4 h-4 rounded-full text-[7px] font-bold flex items-center justify-center ${v==="TAG"?"bg-emerald-400 text-white":"bg-red-300 text-white"}`}>{n[0]}</div>)}<span className="text-[10px] text-slate-500 ml-1">{tagCount}/4</span></div>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 flex items-center gap-1"><ThumbsUp size={11}/>Approve</button>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium border border-red-200 flex items-center gap-1"><XCircle size={11}/>Reject</button>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">{l.def}</p>
          </div>);
        })}</div>
      </div>

      {/* Sense conflicts */}
      <div>
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3"><Scale size={14} className="text-violet-500"/>Sense Conflicts ({SENSE_CONFLICTS.length})</h2>
        <div className="space-y-2">{SENSE_CONFLICTS.map(sc=>(
          <div key={sc.id} className="bg-white rounded-xl border border-violet-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 font-mono">{sc.term}</span>
                <span className="text-[10px] text-violet-600">Sense #{sc.sense1.sense_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border border-blue-200">Keep "{sc.sense1.sense_label}"</button>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 font-medium border border-violet-200">Use "{sc.sense2.sense_label}"</button>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 mb-2">{sc.reason}</p>
            <div className="flex items-center gap-4 text-[10px] text-slate-400">
              <span>Proposed by {sc.sense1.proposedBy} vs {sc.sense2.proposedBy}</span>
            </div>
          </div>
        ))}</div>
      </div>

      {/* Predicate proposals */}
      <div>
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3"><GitBranch size={14} className="text-cyan-500"/>Predicate Proposals ({PREDICATE_PROPOSALS.length})</h2>
        <div className="space-y-2">{PREDICATE_PROPOSALS.map(pp=>(
          <div key={pp.id} className="bg-white rounded-xl border border-cyan-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{pp.subject}</span>
                <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">{pp.predicate}</span>
                <ArrowRight size={10} className="text-slate-400"/>
                <span className="text-[11px] font-mono text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">{pp.object}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 flex items-center gap-1"><ThumbsUp size={11}/>Approve</button>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium border border-red-200 flex items-center gap-1"><XCircle size={11}/>Reject</button>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">{pp.reason}</p>
            <span className="text-[10px] text-slate-400 mt-1 block">Proposed by {pp.proposedBy}</span>
          </div>
        ))}</div>
      </div>
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// PAGE 5: STIG DASHBOARD
// ═══════════════════════════════════════════════════════════════

const TOTAL_MANDATES = 168;
const HIGH_COUNT = ALL.filter(f => f.severity === "CAT I").length;
const MED_COUNT = ALL.filter(f => f.severity === "CAT II").length;
const LOW_COUNT = ALL.filter(f => f.severity === "CAT III").length;
const DETERMINISTIC_COUNT = ALL.length;
const AVG_MANDATES = (TOTAL_MANDATES / ALL.length).toFixed(2);

// SCL distribution across all mandates (approximate from pipeline data)
const SCL_DIST = [
  { level: "Remember", count: 12, color: "bg-slate-400" },
  { level: "Understand", count: 10, color: "bg-sky-400" },
  { level: "Apply", count: 74, color: "bg-blue-500" },
  { level: "Analyze", count: 48, color: "bg-violet-500" },
  { level: "Evaluate", count: 16, color: "bg-purple-500" },
  { level: "Create", count: 8, color: "bg-fuchsia-500" },
];
const SCL_MAX = Math.max(...SCL_DIST.map(s => s.count));

// Classification categories
const CLASS_DIST = [
  { cat: "Audit & Logging", count: 42 },
  { cat: "Access Management", count: 28 },
  { cat: "Network Security", count: 18 },
  { cat: "Cryptography", count: 14 },
  { cat: "System Integrity", count: 12 },
  { cat: "Configuration", count: 8 },
  { cat: "Authentication", count: 22 },
  { cat: "Session Mgmt", count: 6 },
];
const CLASS_MAX = Math.max(...CLASS_DIST.map(c => c.count));

function DashboardPage({ nav, isAdmin }) {
  const sevData = [
    { label: "High (CAT I)", count: HIGH_COUNT, pct: Math.round(HIGH_COUNT / ALL.length * 100), color: "bg-red-500", ring: "ring-red-200" },
    { label: "Medium (CAT II)", count: MED_COUNT, pct: Math.round(MED_COUNT / ALL.length * 100), color: "bg-amber-500", ring: "ring-amber-200" },
    { label: "Low (CAT III)", count: LOW_COUNT, pct: Math.round(LOW_COUNT / ALL.length * 100), color: "bg-blue-400", ring: "ring-blue-200" },
  ];

  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><BarChart3 size={18} />STIG Dashboard</h1>
        <p className="text-xs text-slate-500">Anduril NixOS Security Technical Implementation Guide — Processing Overview</p>
      </div>
      <button onClick={() => nav("stig-pipeline")} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 font-medium"><Activity size={13} />View Pipeline</button>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-2"><Layers size={14} className="text-slate-400" /><span className="text-[11px] text-slate-500 font-medium">Total Findings</span></div>
        <div className="text-2xl font-bold text-slate-900 tabular-nums">{ALL.length}</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-2"><GitBranch size={14} className="text-indigo-400" /><span className="text-[11px] text-slate-500 font-medium">Atomic Mandates</span></div>
        <div className="text-2xl font-bold text-indigo-600 tabular-nums">{TOTAL_MANDATES}</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-2"><Shield size={14} className="text-red-400" /><span className="text-[11px] text-slate-500 font-medium">High Severity</span></div>
        <div className="text-2xl font-bold text-red-600 tabular-nums">{HIGH_COUNT}</div>
      </div>
      {isAdmin && <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-2"><Zap size={14} className="text-emerald-400" /><span className="text-[11px] text-slate-500 font-medium">Deterministic</span></div>
        <div className="text-2xl font-bold text-emerald-600 tabular-nums">100.0%</div>
      </div>}
    </div>

    <div className="grid grid-cols-2 gap-5">
      {/* Severity Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-4 flex items-center gap-2"><PieChart size={13} />Severity Distribution</h3>
        <div className="flex items-center gap-6">
          {/* Donut chart */}
          <div className="relative w-32 h-32 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="3"
                strokeDasharray={`${HIGH_COUNT / ALL.length * 100} ${100 - HIGH_COUNT / ALL.length * 100}`}
                strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3"
                strokeDasharray={`${MED_COUNT / ALL.length * 100} ${100 - MED_COUNT / ALL.length * 100}`}
                strokeDashoffset={`${-(HIGH_COUNT / ALL.length * 100)}`} />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#60a5fa" strokeWidth="3"
                strokeDasharray={`${LOW_COUNT / ALL.length * 100} ${100 - LOW_COUNT / ALL.length * 100}`}
                strokeDashoffset={`${-(HIGH_COUNT / ALL.length * 100 + MED_COUNT / ALL.length * 100)}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-slate-800">{ALL.length}</span>
              <span className="text-[9px] text-slate-400">findings</span>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            {sevData.map(s => (<div key={s.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${s.color}`} />
              <span className="text-xs text-slate-600 flex-1">{s.label}</span>
              <span className="text-xs font-bold text-slate-700 tabular-nums">{s.count}</span>
              <span className="text-[10px] text-slate-400 tabular-nums w-8 text-right">{s.pct}%</span>
            </div>))}
          </div>
        </div>
      </div>

      {/* Cognitive Load Levels */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-4 flex items-center gap-2"><Brain size={13} />Cognitive Load Levels (SCL)</h3>
        <div className="space-y-2">
          {SCL_DIST.map(s => (<div key={s.level} className="flex items-center gap-2">
            <span className="text-[11px] text-slate-600 w-20 shrink-0">{s.level}</span>
            <div className="flex-1 h-5 bg-slate-100 rounded overflow-hidden">
              <div className={`h-full ${s.color} rounded transition-all flex items-center justify-end pr-1.5`} style={{ width: `${(s.count / SCL_MAX) * 100}%` }}>
                <span className="text-[9px] font-bold text-white">{s.count}</span>
              </div>
            </div>
          </div>))}
        </div>
      </div>

      {/* Classification Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-4 flex items-center gap-2"><Tag size={13} />Classification Distribution</h3>
        <div className="space-y-1.5">
          {CLASS_DIST.sort((a, b) => b.count - a.count).map(c => (<div key={c.cat} className="flex items-center gap-2">
            <span className="text-[10px] text-slate-600 w-28 shrink-0 truncate">{c.cat}</span>
            <div className="flex-1 h-4 bg-slate-100 rounded overflow-hidden">
              <div className="h-full bg-indigo-400 rounded transition-all flex items-center justify-end pr-1" style={{ width: `${(c.count / CLASS_MAX) * 100}%` }}>
                <span className="text-[8px] font-bold text-white">{c.count}</span>
              </div>
            </div>
          </div>))}
        </div>
      </div>

      {/* Processing Summary — admin only */}
      {isAdmin && <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-4 flex items-center gap-2"><Cpu size={13} />Processing Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs text-slate-600">Avg. Mandates / Finding</span>
            <span className="text-sm font-bold text-slate-800 tabular-nums">{AVG_MANDATES}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs text-slate-600">Deterministic Extractions</span>
            <span className="text-sm font-bold text-emerald-600 tabular-nums">{DETERMINISTIC_COUNT}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs text-slate-600">LLM-Assisted Extractions</span>
            <span className="text-sm font-bold text-slate-400 tabular-nums">0</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-slate-600 flex items-center gap-1"><DollarSign size={11} />Processing Cost</span>
            <span className="text-sm font-bold text-emerald-600 tabular-nums">$0.0000</span>
          </div>
        </div>
        <div className="mt-4 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-[11px] text-emerald-700 font-medium">All findings processed deterministically — zero LLM cost</span>
          </div>
        </div>
      </div>}
    </div>

    {/* O*Net Role Mappings for this STIG */}
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-700 flex items-center gap-2"><Users size={13} className="text-cyan-500"/>O*Net Role Mappings</h3>
        <button onClick={() => nav("nexus-lexicon")} className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">View crosswalk <ArrowRight size={11} /></button>
      </div>
      <p className="text-[10px] text-slate-500 mb-3">STIG findings from this guide mapped to O*Net occupational tasks and activities. Mappings flow: Auto-Suggested → Team Approved → Auditor Validated.</p>
      {/* Summary stats */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div className="rounded-lg border border-slate-200 p-2 text-center"><div className="text-lg font-bold text-slate-900 tabular-nums">{MAPPING_COUNTS.total}</div><div className="text-[9px] text-slate-500">Total</div></div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-2 text-center"><div className="text-lg font-bold text-amber-600 tabular-nums">{MAPPING_COUNTS.suggested}</div><div className="text-[9px] text-amber-600">Suggested</div></div>
        <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-2 text-center"><div className="text-lg font-bold text-blue-600 tabular-nums">{MAPPING_COUNTS.team_approved}</div><div className="text-[9px] text-blue-600">Approved</div></div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2 text-center"><div className="text-lg font-bold text-emerald-600 tabular-nums">{MAPPING_COUNTS.auditor_validated}</div><div className="text-[9px] text-emerald-600">Validated</div></div>
        <div className="rounded-lg border border-red-200 bg-red-50/50 p-2 text-center"><div className="text-lg font-bold text-red-500 tabular-nums">{MAPPING_COUNTS.team_rejected}</div><div className="text-[9px] text-red-500">Rejected</div></div>
      </div>
      {/* Mapped roles */}
      <div className="space-y-2">
        {[...new Set(STIG_ONET_MAPPINGS.filter(m=>m.status!=="team_rejected").map(m=>m.onetOccupation))].map(occ=>{
          const roleMaps=STIG_ONET_MAPPINGS.filter(m=>m.onetOccupation===occ&&m.status!=="team_rejected");
          const role=ONET_CATALOG.find(o=>o.id===occ);
          if(!role)return null;
          const validated=roleMaps.filter(m=>m.status==="auditor_validated").length;
          const approved=roleMaps.filter(m=>m.status==="team_approved").length;
          const suggested=roleMaps.filter(m=>m.status==="suggested").length;
          const allTerms=[...new Set(roleMaps.flatMap(m=>m.bridgeTerms))];
          return(<div key={occ} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/20 transition-all cursor-pointer" onClick={()=>nav("onet-role")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0"><Users size={14} className="text-white"/></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2"><span className="text-xs font-semibold text-slate-900">{role.title}</span><span className="text-[9px] font-mono text-slate-400">{occ}</span></div>
              <div className="flex items-center gap-1 mt-0.5">{allTerms.slice(0,4).map((t,i)=><span key={i} className="text-[8px] px-1 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">{t}</span>)}{allTerms.length>4&&<span className="text-[8px] text-slate-400">+{allTerms.length-4}</span>}</div>
            </div>
            <div className="flex items-center gap-3 text-[10px] shrink-0">
              <span className="flex items-center gap-1 text-slate-600 font-semibold">{roleMaps.length} mappings</span>
              {validated>0&&<span className="flex items-center gap-0.5 text-emerald-600"><ShieldCheck size={10}/>{validated}</span>}
              {approved>0&&<span className="flex items-center gap-0.5 text-blue-600"><CheckCircle2 size={10}/>{approved}</span>}
              {suggested>0&&<span className="flex items-center gap-0.5 text-amber-600"><Zap size={10}/>{suggested}</span>}
            </div>
            <ChevronRight size={14} className="text-slate-300 shrink-0"/>
          </div>);
        })}
      </div>
    </div>

    {/* Quick finding list */}
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-700 flex items-center gap-2"><FileText size={13} />High Severity Findings</h3>
        <button onClick={() => nav("stig-pipeline")} className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">View all <ArrowRight size={11} /></button>
      </div>
      <div className="space-y-1">
        {ALL.filter(f => f.severity === "CAT I").slice(0, 6).map(f => (<div key={f.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => { if (f.id === "V-268078") nav("stig-finding"); }}>
          <span className="font-mono text-[11px] font-semibold text-slate-600 w-16">{f.id}</span>
          <span className="text-[11px] text-slate-700 flex-1 truncate">{f.title}</span>
          <Sev l={f.severity} />
          <SB stage={f.cs} status={f.st} />
        </div>))}
      </div>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// RDF DATA (V-268078)
// ═══════════════════════════════════════════════════════════════

const RDF_TRIPLES = [
  { subject: "NixOS", predicate: "must enable", object: "the built-in firewall", type: "requirement" },
  { subject: "NixOS", predicate: "has verification complexity", object: "Apply", type: "classification" },
  { subject: "V-268078", predicate: "has severity", object: "CAT II (Medium)", type: "metadata" },
  { subject: "V-268078", predicate: "is tagged with", object: "#firewall", type: "tag" },
  { subject: "V-268078", predicate: "is tagged with", object: "#configuration", type: "tag" },
  { subject: "V-268078", predicate: "is tagged with", object: "#network", type: "tag" },
  { subject: "V-268078", predicate: "is tagged with", object: "#ssh", type: "tag" },
  { subject: "remote access sessions", predicate: "must have", object: "automatic disconnect capability", type: "requirement" },
  { subject: "firewall rules", predicate: "must be enforced through", object: "NixOS declarative configuration", type: "requirement" },
  { subject: "V-268078", predicate: "satisfies", object: "SRG-OS-000298-GPOS-00116", type: "traceability" },
  { subject: "V-268078", predicate: "has mandates", object: "5 atomic mandates", type: "metadata" },
];

const RDF_TYPE_COLORS = {
  requirement: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  classification: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  metadata: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
  tag: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  traceability: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};

// ═══════════════════════════════════════════════════════════════
// PAGE 6: STIG LIBRARY + LISTS
// ═══════════════════════════════════════════════════════════════

const STIG_CATALOG = [
  { id: "stig-001", name: "Anduril NixOS STIG", product: "Anduril NixOS", type: "Operating System", version: "V1R1", release: "2025-09-15", findings: 104, status: "ingested", severity: { high: 11, medium: 92, low: 1 }, publisher: "Anduril Industries" },
  { id: "stig-002", name: "Windows Server 2022 STIG", product: "Microsoft Windows Server 2022", type: "Operating System", version: "V2R2", release: "2025-07-24", findings: 286, status: "catalog", severity: { high: 34, medium: 231, low: 21 }, publisher: "DISA" },
  { id: "stig-003", name: "Red Hat Enterprise Linux 9 STIG", product: "RHEL 9", type: "Operating System", version: "V1R3", release: "2025-10-01", findings: 247, status: "catalog", severity: { high: 28, medium: 198, low: 21 }, publisher: "DISA" },
  { id: "stig-004", name: "Cisco IOS XE Router STIG", product: "Cisco IOS XE", type: "Network", version: "V3R1", release: "2025-06-12", findings: 178, status: "catalog", severity: { high: 22, medium: 142, low: 14 }, publisher: "DISA" },
  { id: "stig-005", name: "PostgreSQL 15 STIG", product: "PostgreSQL 15", type: "Database", version: "V1R1", release: "2025-08-30", findings: 89, status: "catalog", severity: { high: 8, medium: 72, low: 9 }, publisher: "DISA" },
  { id: "stig-006", name: "Apache HTTP Server 2.4 STIG", product: "Apache 2.4", type: "Application", version: "V3R2", release: "2025-05-18", findings: 63, status: "catalog", severity: { high: 5, medium: 51, low: 7 }, publisher: "DISA" },
  { id: "stig-007", name: "Kubernetes STIG", product: "Kubernetes", type: "Container Platform", version: "V2R1", release: "2025-11-05", findings: 91, status: "catalog", severity: { high: 12, medium: 69, low: 10 }, publisher: "DISA" },
  { id: "stig-008", name: "AWS Foundations STIG", product: "Amazon Web Services", type: "Cloud", version: "V1R4", release: "2025-09-22", findings: 134, status: "catalog", severity: { high: 18, medium: 102, low: 14 }, publisher: "DISA" },
];

const STIG_TYPES = [...new Set(STIG_CATALOG.map(s => s.type))].sort();

const DEFAULT_LISTS = [
  { id: "list-001", name: "FedRAMP High Baseline", description: "STIGs required for FedRAMP High authorization boundary", created: "2025-10-01", stigs: ["stig-001", "stig-002", "stig-003"], archived: false, shared: true },
  { id: "list-002", name: "Q1 2026 Remediation Sprint", description: "Priority STIGs for Q1 remediation cycle", created: "2025-12-15", stigs: ["stig-001"], archived: false, shared: false },
];

function LibraryPage({ nav, isAdmin }) {
  const [view, setView] = useState("my");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [lists, setLists] = useState(DEFAULT_LISTS);
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDesc, setNewListDesc] = useState("");
  const [selectedStigs, setSelectedStigs] = useState([]);
  const [editingList, setEditingList] = useState(null);
  const [showListDetail, setShowListDetail] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  const ingested = STIG_CATALOG.filter(s => s.status === "ingested");
  const catalog = STIG_CATALOG.filter(s => {
    if (typeFilter !== "all" && s.type !== typeFilter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.product.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleStigSelect = (id) => {
    setSelectedStigs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const createList = () => {
    if (!newListName.trim()) return;
    const nl = { id: `list-${Date.now()}`, name: newListName, description: newListDesc, created: new Date().toISOString().split("T")[0], stigs: [...selectedStigs], archived: false, shared: false };
    setLists([...lists, nl]);
    setNewListName("");
    setNewListDesc("");
    setSelectedStigs([]);
    setShowCreateList(false);
  };

  const archiveList = (id) => {
    setLists(lists.map(l => l.id === id ? { ...l, archived: true } : l));
  };

  const unarchiveList = (id) => {
    setLists(lists.map(l => l.id === id ? { ...l, archived: false } : l));
  };

  const removeFromList = (listId, stigId) => {
    setLists(lists.map(l => l.id === listId ? { ...l, stigs: l.stigs.filter(s => s !== stigId) } : l));
  };

  const addToList = (listId, stigId) => {
    setLists(lists.map(l => l.id === listId ? { ...l, stigs: [...new Set([...l.stigs, stigId])] } : l));
  };

  const activeLists = lists.filter(l => !l.archived);
  const archivedLists = lists.filter(l => l.archived);

  const listDetail = showListDetail ? lists.find(l => l.id === showListDetail) : null;

  // ── List Detail View ──
  if (listDetail) {
    const listStigs = listDetail.stigs.map(id => STIG_CATALOG.find(s => s.id === id)).filter(Boolean);
    return (<div className="space-y-5">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <button onClick={() => setShowListDetail(null)} className="hover:text-blue-600">Library</button>
        <ChevronRight size={12} /><span className="text-slate-700 font-medium">{listDetail.name}</span>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><ListChecks size={18} />{listDetail.name}</h1>
          <div className="flex items-center gap-2">
            {listDetail.shared && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1"><Share2 size={9} />Shared</span>}
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{listStigs.length} STIGs</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">{listDetail.description}</p>
        <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-2">
          <span>Created {listDetail.created}</span>
          <span>Total findings: {listStigs.reduce((a, s) => a + s.findings, 0)}</span>
        </div>
      </div>

      {/* API endpoint card */}
      <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
        <div className="flex items-center gap-2 mb-2"><Cpu size={13} className="text-indigo-500" /><span className="text-xs font-semibold text-indigo-700">API Endpoint</span></div>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-[11px] bg-white rounded-lg border border-indigo-200 px-3 py-2 font-mono text-indigo-800">GET /api/v1/lists/{listDetail.id}/stigs</code>
          <button className="text-xs px-2 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700"><Copy size={12} /></button>
        </div>
        <p className="text-[10px] text-indigo-500 mt-1.5">Use this endpoint to pull this STIG list into your GRC or SecOps tools</p>
      </div>

      {/* STIGs in list */}
      <div className="space-y-2">
        {listStigs.map(s => (<div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-slate-900">{s.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">{s.version}</span>
              {s.status === "ingested" && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Ingested</span>}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span>{s.type}</span><span>{s.findings} findings</span><span className="text-red-500 font-medium">{s.severity.high} high</span>
            </div>
          </div>
          {s.status === "ingested" && <button onClick={() => nav("stig-dashboard")} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium flex items-center gap-1"><BarChart3 size={12} />Dashboard</button>}
          <button onClick={() => removeFromList(listDetail.id, s.id)} className="text-xs px-2 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50"><X size={12} /></button>
        </div>))}
      </div>

      {/* Add more STIGs */}
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-4">
        <p className="text-xs text-slate-500 text-center mb-2">Add STIGs from the catalog</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {STIG_CATALOG.filter(s => !listDetail.stigs.includes(s.id)).slice(0, 4).map(s => (
            <button key={s.id} onClick={() => addToList(listDetail.id, s.id)} className="text-[10px] px-2 py-1 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-600 flex items-center gap-1"><Plus size={10} />{s.product}</button>
          ))}
        </div>
      </div>
    </div>);
  }

  // ── Main Library View ──
  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Library size={18} />STIG Library</h1>
        <p className="text-xs text-slate-500">{STIG_CATALOG.length} benchmarks available — {ingested.length} ingested into pipeline</p>
      </div>
      <button onClick={() => setShowCreateList(true)} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 font-medium flex items-center gap-1.5"><FolderPlus size={13} />New List</button>
    </div>

    {/* View tabs */}
    <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1">
      {[
        { k: "my", l: "My STIGs", i: Star, badge: ingested.length },
        { k: "catalog", l: "STIG Catalog", i: Database, badge: STIG_CATALOG.length },
        { k: "lists", l: "Lists", i: ListChecks, badge: activeLists.length },
      ].map(t => <button key={t.k} onClick={() => setView(t.k)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium flex-1 justify-center transition-all ${view === t.k ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}><t.i size={13} />{t.l}{t.badge != null && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">{t.badge}</span>}</button>)}
    </div>

    {/* ── My STIGs ── */}
    {view === "my" && <div className="space-y-3">
      {ingested.length === 0 && <div className="bg-white rounded-xl border border-slate-200 py-12 text-center"><Upload size={36} className="mx-auto text-slate-300 mb-2" /><h3 className="text-sm font-semibold text-slate-700">No STIGs ingested yet</h3><p className="text-xs text-slate-500 mt-1">Browse the catalog to add STIGs to your pipeline.</p></div>}
      {ingested.map(s => (<div key={s.id} className="bg-white rounded-xl border-2 border-emerald-200 p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => nav("stig-dashboard")}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm font-semibold text-slate-900">{s.name}</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">{s.version}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1"><CheckCircle2 size={9} />Ingested</span>
            </div>
            <p className="text-[11px] text-slate-500">{s.product} — {s.publisher}</p>
          </div>
          <SP status="processing" />
        </div>
        <div className="grid grid-cols-4 gap-3 mt-3">
          <div className="text-center p-2 rounded-lg bg-slate-50"><div className="text-lg font-bold text-slate-800 tabular-nums">{s.findings}</div><div className="text-[9px] text-slate-400">Findings</div></div>
          <div className="text-center p-2 rounded-lg bg-red-50"><div className="text-lg font-bold text-red-600 tabular-nums">{s.severity.high}</div><div className="text-[9px] text-red-400">CAT I</div></div>
          <div className="text-center p-2 rounded-lg bg-amber-50"><div className="text-lg font-bold text-amber-600 tabular-nums">{s.severity.medium}</div><div className="text-[9px] text-amber-400">CAT II</div></div>
          <div className="text-center p-2 rounded-lg bg-blue-50"><div className="text-lg font-bold text-blue-600 tabular-nums">{s.severity.low}</div><div className="text-[9px] text-blue-400">CAT III</div></div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-emerald-100">
          <span className="text-[10px] text-slate-400">Released {s.release}</span>
          <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">View Dashboard <ArrowRight size={11} /></span>
        </div>
      </div>))}
    </div>}

    {/* ── STIG Catalog ── */}
    {view === "catalog" && <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search STIGs by name or product..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200" /></div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Types</option>{STIG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select>
        {selectedStigs.length > 0 && <button onClick={() => setShowCreateList(true)} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 font-medium flex items-center gap-1.5"><FolderPlus size={12} />Add {selectedStigs.length} to List</button>}
        <span className="text-[11px] text-slate-400 ml-auto">{catalog.length} benchmarks</span>
      </div>
      {catalog.map(s => {
        const selected = selectedStigs.includes(s.id);
        return (<div key={s.id} className={`bg-white rounded-xl border-2 ${selected ? "border-indigo-300 bg-indigo-50/30" : "border-slate-200"} p-4 transition-all`}>
          <div className="flex items-center gap-3">
            <button onClick={() => toggleStigSelect(s.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${selected ? "bg-indigo-500 border-indigo-500" : "border-slate-300 hover:border-indigo-300"}`}>{selected && <CheckCircle2 size={12} className="text-white" />}</button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-slate-900">{s.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">{s.version}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{s.type}</span>
                {s.status === "ingested" && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Ingested</span>}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span>{s.publisher}</span><span>{s.findings} findings</span><span className="text-red-500 font-medium">{s.severity.high} high</span><span className="text-amber-500">{s.severity.medium} med</span><span>Released {s.release}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {s.status === "ingested" ? <button onClick={() => nav("stig-dashboard")} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 flex items-center gap-1"><BarChart3 size={12} />View</button>
                : <button className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border border-blue-200 flex items-center gap-1"><Upload size={12} />Ingest</button>}
            </div>
          </div>
        </div>);
      })}
    </div>}

    {/* ── Lists ── */}
    {view === "lists" && <div className="space-y-4">
      {activeLists.map(l => {
        const listStigs = l.stigs.map(id => STIG_CATALOG.find(s => s.id === id)).filter(Boolean);
        const totalFindings = listStigs.reduce((a, s) => a + s.findings, 0);
        return (<div key={l.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer" onClick={() => setShowListDetail(l.id)}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ListChecks size={16} className="text-indigo-500" />
              <h3 className="text-sm font-semibold text-slate-900">{l.name}</h3>
              {l.shared && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1"><Share2 size={8} />Shared</span>}
            </div>
            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
              <button onClick={() => archiveList(l.id)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Archive size={13} /></button>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mb-2">{l.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {listStigs.slice(0, 3).map(s => <span key={s.id} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">{s.product}</span>)}
            {listStigs.length > 3 && <span className="text-[10px] text-slate-400">+{listStigs.length - 3} more</span>}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span>{listStigs.length} STIGs</span><span>{totalFindings} total findings</span><span>Created {l.created}</span>
            </div>
            <span className="text-[10px] text-blue-600 font-medium flex items-center gap-1">Details <ArrowRight size={10} /></span>
          </div>
        </div>);
      })}

      {archivedLists.length > 0 && <div>
        <button onClick={() => setShowArchived(!showArchived)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 font-medium mb-2"><Archive size={12} />{showArchived ? "Hide" : "Show"} archived ({archivedLists.length}){showArchived ? <ChevronDown size={12} /> : <ChevronRight size={12} />}</button>
        {showArchived && archivedLists.map(l => (<div key={l.id} className="bg-slate-50 rounded-xl border border-slate-200 p-4 opacity-60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Archive size={14} className="text-slate-400" /><span className="text-sm font-semibold text-slate-600">{l.name}</span><span className="text-[10px] text-slate-400">{l.stigs.length} STIGs</span></div>
            <button onClick={() => unarchiveList(l.id)} className="text-xs px-2 py-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-white">Restore</button>
          </div>
        </div>))}
      </div>}

      {activeLists.length === 0 && <div className="bg-white rounded-xl border border-slate-200 py-12 text-center"><FolderPlus size={36} className="mx-auto text-slate-300 mb-2" /><h3 className="text-sm font-semibold text-slate-700">No lists yet</h3><p className="text-xs text-slate-500 mt-1">Create a list to organize STIGs for compliance packages, team workspaces, or API integration.</p></div>}
    </div>}

    {/* ── Create List Modal ── */}
    {showCreateList && <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowCreateList(false)}>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md p-5 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between"><h2 className="text-sm font-bold text-slate-900 flex items-center gap-2"><FolderPlus size={16} />Create New List</h2><button onClick={() => setShowCreateList(false)} className="p-1 rounded-lg hover:bg-slate-100"><X size={16} className="text-slate-400" /></button></div>
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">List Name</label>
          <input type="text" value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="e.g., FedRAMP High Baseline" className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Description</label>
          <input type="text" value={newListDesc} onChange={e => setNewListDesc(e.target.value)} placeholder="What is this list for?" className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        {selectedStigs.length > 0 && <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Selected STIGs ({selectedStigs.length})</label>
          <div className="flex flex-wrap gap-1">{selectedStigs.map(id => { const s = STIG_CATALOG.find(x => x.id === id); return s ? <span key={id} className="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">{s.product}</span> : null; })}</div>
        </div>}
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={() => setShowCreateList(false)} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={createList} disabled={!newListName.trim()} className="text-xs px-4 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 font-medium disabled:opacity-40">Create List</button>
        </div>
      </div>
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// O*NET DATA MODEL
// ═══════════════════════════════════════════════════════════════

const ONET_CATALOG = [
  {id:"15-1212.00",title:"Information Security Analysts",soc_family:"15-1200",category:"Computer Occupations",
    description:"Plan, implement, upgrade, or monitor security measures for the protection of computer networks and information. Ensure appropriate security controls are in place.",
    status:"ingested",bright_outlook:true,median_salary:"$112,000",employment:"175,350",growth:"32%",
    tasks:[
      {id:"t1",text:"Monitor computer networks for security issues",importance:4.5,tagged:true,mwe_tags:["network monitoring","security incident"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"}},
      {id:"t2",text:"Investigate security breaches and other cybersecurity incidents",importance:4.3,tagged:true,mwe_tags:["security breach","incident response"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"}},
      {id:"t3",text:"Install security measures and operate software to protect systems",importance:4.1,tagged:false,mwe_tags:[],status:"in_progress",council:{}},
      {id:"t4",text:"Document security breaches and assess the damage they cause",importance:3.9,tagged:true,mwe_tags:["security breach","damage assessment"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"}},
      {id:"t5",text:"Develop plans to safeguard computer files against unauthorized access",importance:3.8,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"t6",text:"Perform risk assessments and execute tests of data processing system",importance:3.7,tagged:true,mwe_tags:["risk assessment","data processing"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"}},
    ],
    work_activities:[
      {id:"wa1",text:"Analyzing Data or Information",importance:4.2,tagged:true,mwe_tags:["data analysis"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"}},
      {id:"wa2",text:"Working with Computers",importance:4.5,tagged:true,mwe_tags:["information system"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"}},
      {id:"wa3",text:"Getting Information",importance:4.0,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"wa4",text:"Making Decisions and Solving Problems",importance:3.9,tagged:true,mwe_tags:["decision making"],status:"completed",council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"TAG"}},
      {id:"wa5",text:"Updating and Using Relevant Knowledge",importance:3.8,tagged:true,mwe_tags:["continuing education"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"}},
    ],
    skills:[{name:"Information Security",level:4.5,importance:4.8},{name:"Network Security",level:4.2,importance:4.5},{name:"Vulnerability Assessment",level:3.8,importance:4.0},{name:"Incident Response",level:3.7,importance:4.2},{name:"Risk Management",level:3.5,importance:3.8}],
    knowledge:[{name:"Computers and Electronics",level:4.5,importance:4.7},{name:"Telecommunications",level:3.8,importance:3.9},{name:"Administration and Management",level:3.2,importance:3.4},{name:"English Language",level:3.5,importance:3.6},{name:"Law and Government",level:3.0,importance:3.2}],
  },
  {id:"15-1231.00",title:"Computer Network Support Specialists",soc_family:"15-1200",category:"Computer Occupations",
    description:"Analyze, test, troubleshoot, and evaluate existing network systems such as LAN, WAN, cloud, and internet systems.",
    status:"ingested",bright_outlook:false,median_salary:"$62,760",employment:"172,520",growth:"6%",
    tasks:[
      {id:"t1",text:"Back up network data",importance:4.0,tagged:true,mwe_tags:["data backup","network data"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"}},
      {id:"t2",text:"Configure security settings or access permissions for groups or individuals",importance:4.2,tagged:true,mwe_tags:["access control","security settings"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"}},
      {id:"t3",text:"Analyze and report computer network security breaches",importance:3.8,tagged:true,mwe_tags:["security breach","network security"],status:"at_checkpoint",council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"}},
      {id:"t4",text:"Monitor network performance to determine if adjustments are needed",importance:3.5,tagged:false,mwe_tags:[],status:"pending",council:{}},
    ],
    work_activities:[
      {id:"wa1",text:"Working with Computers",importance:4.5,tagged:true,mwe_tags:["information system"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"}},
      {id:"wa2",text:"Communicating with Supervisors",importance:3.5,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"wa3",text:"Updating and Using Relevant Knowledge",importance:3.6,tagged:true,mwe_tags:["continuing education"],status:"completed",council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"}},
    ],
    skills:[{name:"Network Administration",level:4.0,importance:4.3},{name:"Troubleshooting",level:3.8,importance:4.0},{name:"Systems Analysis",level:3.5,importance:3.7}],
    knowledge:[{name:"Computers and Electronics",level:4.2,importance:4.5},{name:"Telecommunications",level:3.9,importance:4.1},{name:"Customer Service",level:3.0,importance:3.2}],
  },
  {id:"15-1211.00",title:"Computer Systems Analysts",soc_family:"15-1200",category:"Computer Occupations",
    description:"Analyze science, engineering, business, and other data processing problems to develop and implement solutions to complex applications problems.",
    status:"available",bright_outlook:true,median_salary:"$99,270",employment:"650,100",growth:"10%",
    tasks:[
      {id:"t1",text:"Provide staff and users with assistance solving computer-related problems",importance:4.0,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"t2",text:"Test, maintain, and monitor computer programs and systems",importance:3.9,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"t3",text:"Develop and document configuration management policies",importance:3.5,tagged:false,mwe_tags:[],status:"pending",council:{}},
    ],
    work_activities:[
      {id:"wa1",text:"Getting Information",importance:4.1,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"wa2",text:"Analyzing Data or Information",importance:4.0,tagged:false,mwe_tags:[],status:"pending",council:{}},
    ],
    skills:[{name:"Systems Analysis",level:4.0,importance:4.3},{name:"Critical Thinking",level:3.8,importance:4.0}],
    knowledge:[{name:"Computers and Electronics",level:4.3,importance:4.5},{name:"Mathematics",level:3.2,importance:3.4}],
  },
  {id:"13-1111.00",title:"Management Analysts",soc_family:"13-1100",category:"Business Operations Specialists",
    description:"Conduct organizational studies and evaluations, design systems and procedures, conduct work simplification and measurement studies.",
    status:"available",bright_outlook:true,median_salary:"$95,290",employment:"876,300",growth:"10%",
    tasks:[
      {id:"t1",text:"Gather and organize information on problems or procedures",importance:4.2,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"t2",text:"Analyze data to identify solutions and determine costs and benefits",importance:4.0,tagged:false,mwe_tags:[],status:"pending",council:{}},
    ],
    work_activities:[
      {id:"wa1",text:"Analyzing Data or Information",importance:4.3,tagged:false,mwe_tags:[],status:"pending",council:{}},
      {id:"wa2",text:"Making Decisions and Solving Problems",importance:4.1,tagged:false,mwe_tags:[],status:"pending",council:{}},
    ],
    skills:[{name:"Critical Thinking",level:4.0,importance:4.2},{name:"Active Listening",level:3.8,importance:4.0}],
    knowledge:[{name:"Administration and Management",level:4.0,importance:4.2},{name:"English Language",level:3.5,importance:3.7}],
  },
];

const ONET_INGESTED = ONET_CATALOG.filter(o=>o.status==="ingested");

// O*Net domain lexicon
const ONET_LEX = [
  {id:"olex-001",term:"risk assessment",source:"onet",status:"validated",freq:34,stigs:0,cat:"Risk Management",def:"The process of identifying, analyzing, and evaluating risk to organizational operations, assets, and individuals.",related:["vulnerability assessment","threat analysis"],conf:0.91,senses:[{sense_number:1,sense_label:"Qualitative",definition:"Risk evaluation using likelihood/impact matrices and expert judgment.",framework:"NIST SP 800-30"},{sense_number:2,sense_label:"Quantitative",definition:"Risk evaluation using statistical methods, loss expectancy calculations, and probability distributions.",framework:"FAIR"}],triples:[{subject:"risk assessment",predicate:"broader",object:"vulnerability assessment",type:"hierarchical"}]},
  {id:"olex-002",term:"incident response",source:"onet",status:"validated",freq:28,stigs:0,cat:"Operations",def:"The organized approach to addressing and managing the aftermath of a security breach or cyberattack.",related:["security breach","indicators of compromise"],conf:0.94,senses:[],triples:[{subject:"incident response",predicate:"related",object:"security breach",type:"semantic"}]},
  {id:"olex-003",term:"network monitoring",source:"onet",status:"validated",freq:41,stigs:0,cat:"Operations",def:"Continuous observation of a computer network for slow or failing components, unauthorized access, or anomalous behavior.",related:["network security","indicators of compromise"],conf:0.92,senses:[],triples:[{subject:"network monitoring",predicate:"related",object:"indicators of compromise",type:"semantic"}]},
  {id:"olex-004",term:"vulnerability assessment",source:"onet",status:"validated",freq:22,stigs:0,cat:"Risk Management",def:"The process of identifying, quantifying, and prioritizing security vulnerabilities in systems and software.",related:["risk assessment","penetration testing"],conf:0.89,senses:[],triples:[{subject:"vulnerability assessment",predicate:"narrower",object:"risk assessment",type:"hierarchical"},{subject:"vulnerability assessment",predicate:"related",object:"penetration testing",type:"semantic"}]},
  {id:"olex-005",term:"security breach",source:"onet",status:"validated",freq:19,stigs:0,cat:"Threat Detection",def:"An incident that results in unauthorized access of data, applications, services, networks, or devices.",related:["incident response","indicators of compromise"],conf:0.93,senses:[],triples:[{subject:"security breach",predicate:"related",object:"incident response",type:"semantic"},{subject:"security breach",predicate:"related",object:"indicators of compromise",type:"semantic"}]},
  {id:"olex-006",term:"data backup",source:"onet",status:"candidate",freq:15,stigs:0,cat:"Operations",def:"The process of copying and archiving data to a secondary location for preservation and disaster recovery.",related:["disaster recovery"],conf:0.72,senses:[],triples:[]},
  {id:"olex-007",term:"penetration testing",source:"onet",status:"validated",freq:17,stigs:0,cat:"Risk Management",def:"Authorized simulated cyberattack on a computer system to evaluate security posture and identify exploitable weaknesses.",related:["vulnerability assessment"],conf:0.95,senses:[],triples:[{subject:"penetration testing",predicate:"related",object:"vulnerability assessment",type:"semantic"}]},
  {id:"olex-008",term:"security settings",source:"onet",status:"candidate",freq:12,stigs:0,cat:"Access Management",def:"Configuration parameters that control authentication, authorization, and access control policies for systems and applications.",related:["access control","configuration baseline"],conf:0.68,senses:[],triples:[{subject:"security settings",predicate:"related",object:"access control",type:"semantic"}]},
];

// O*Net exception queue
const ONET_EXC = [
  {id:"oexc-1",roleId:"15-1212.00",itemType:"task",itemId:"t3",text:"Install security measures and operate software to protect systems",proposedTags:["security software","system protection"],council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},reason:"Council split 2-2 on whether 'security measures' is compositional or a domain MWE."},
  {id:"oexc-2",roleId:"15-1231.00",itemType:"task",itemId:"t3",text:"Analyze and report computer network security breaches",proposedTags:["security breach","network analysis"],council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},reason:"'computer network security breaches' — should this be one MWE or two overlapping?"},
  {id:"oexc-3",roleId:"15-1212.00",itemType:"activity",itemId:"wa3",text:"Getting Information",proposedTags:["information gathering"],council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},reason:"'Getting Information' is too generic to be a meaningful MWE in the security context."},
];

// ═══════════════════════════════════════════════════════════════
// STIG ↔ O*NET MAPPING DATA
// Three-tier lifecycle: suggested → team_approved → auditor_validated
// ═══════════════════════════════════════════════════════════════

const MAPPING_STATUS = {
  suggested:{label:"Auto-Suggested",color:"bg-amber-100 text-amber-700 border-amber-200",icon:"⚡"},
  team_approved:{label:"Team Approved",color:"bg-blue-100 text-blue-700 border-blue-200",icon:"✓"},
  team_rejected:{label:"Team Rejected",color:"bg-red-100 text-red-500 border-red-200",icon:"✗"},
  auditor_validated:{label:"Auditor Validated",color:"bg-emerald-100 text-emerald-700 border-emerald-200",icon:"✔✔"},
  auditor_disputed:{label:"Auditor Disputed",color:"bg-orange-100 text-orange-700 border-orange-200",icon:"⚠"},
};

const STIG_ONET_MAPPINGS = [
  // Auto-suggested mappings (from term overlap)
  {id:"map-001",stigFinding:"V-268078",stigTitle:"NixOS must use DOD-approved encryption for SSH",onetTask:"t1",onetTaskText:"Monitor computer networks for security issues",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["network firewall","remote access"],confidence:0.89,status:"team_approved",teamReviewedBy:"Alice",teamReviewedAt:"2025-03-12",auditorValidatedBy:null,auditorValidatedAt:null},
  {id:"map-002",stigFinding:"V-268078",stigTitle:"NixOS must use DOD-approved encryption for SSH",onetTask:"t2",onetTaskText:"Assess current security measures and identify vulnerabilities",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["cryptographic module","configuration baseline"],confidence:0.84,status:"auditor_validated",teamReviewedBy:"Bob",teamReviewedAt:"2025-03-11",auditorValidatedBy:"J. Torres (ISSM)",auditorValidatedAt:"2025-03-15"},
  {id:"map-003",stigFinding:"V-268078",stigTitle:"NixOS must use DOD-approved encryption for SSH",onetTask:"t4",onetTaskText:"Investigate security alerts and provide incident response",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["remote access","indicators of compromise"],confidence:0.78,status:"suggested",teamReviewedBy:null,teamReviewedAt:null,auditorValidatedBy:null,auditorValidatedAt:null},
  {id:"map-004",stigFinding:"V-268080",stigTitle:"NixOS must audit all account modifications",onetTask:"t2",onetTaskText:"Assess current security measures and identify vulnerabilities",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["audit record","access control"],confidence:0.92,status:"team_approved",teamReviewedBy:"Clara",teamReviewedAt:"2025-03-13",auditorValidatedBy:null,auditorValidatedAt:null},
  {id:"map-005",stigFinding:"V-268080",stigTitle:"NixOS must audit all account modifications",onetActivity:"wa2",onetTaskText:"Analyzing Data or Information",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["audit record","audit log"],confidence:0.86,status:"auditor_validated",teamReviewedBy:"Alice",teamReviewedAt:"2025-03-10",auditorValidatedBy:"J. Torres (ISSM)",auditorValidatedAt:"2025-03-14"},
  {id:"map-006",stigFinding:"V-268081",stigTitle:"NixOS must enforce session lock after 15 minutes",onetTask:"t5",onetTaskText:"Develop security standards and best practices for the organization",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["session lock","access control"],confidence:0.81,status:"suggested",teamReviewedBy:null,teamReviewedAt:null,auditorValidatedBy:null,auditorValidatedAt:null},
  {id:"map-007",stigFinding:"V-268078",stigTitle:"NixOS must use DOD-approved encryption for SSH",onetTask:"t1",onetTaskText:"Maintain and administer computer networks and related computing environments",onetOccupation:"15-1231.00",onetRole:"Computer Network Support Specialists",bridgeTerms:["network firewall","remote access"],confidence:0.74,status:"team_approved",teamReviewedBy:"David",teamReviewedAt:"2025-03-14",auditorValidatedBy:null,auditorValidatedAt:null},
  {id:"map-008",stigFinding:"V-268082",stigTitle:"NixOS must implement kernel module signing",onetTask:"t6",onetTaskText:"Perform risk assessments and execute tests against secured environments",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["kernel module","privilege escalation","file integrity"],confidence:0.88,status:"team_approved",teamReviewedBy:"Alice",teamReviewedAt:"2025-03-15",auditorValidatedBy:null,auditorValidatedAt:null},
  {id:"map-009",stigFinding:"V-268083",stigTitle:"NixOS must disable unnecessary services",onetActivity:"wa4",onetTaskText:"Updating and Using Relevant Knowledge",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["system call","daemon process"],confidence:0.62,status:"team_rejected",teamReviewedBy:"Bob",teamReviewedAt:"2025-03-13",auditorValidatedBy:null,auditorValidatedAt:null},
  {id:"map-010",stigFinding:"V-268084",stigTitle:"NixOS must configure audit log retention",onetTask:"t2",onetTaskText:"Assess current security measures and identify vulnerabilities",onetOccupation:"15-1212.00",onetRole:"Information Security Analysts",bridgeTerms:["audit record","audit trail preservation"],confidence:0.91,status:"suggested",teamReviewedBy:null,teamReviewedAt:null,auditorValidatedBy:null,auditorValidatedAt:null},
];

const MAPPING_COUNTS = {
  total: STIG_ONET_MAPPINGS.length,
  suggested: STIG_ONET_MAPPINGS.filter(m=>m.status==="suggested").length,
  team_approved: STIG_ONET_MAPPINGS.filter(m=>m.status==="team_approved").length,
  auditor_validated: STIG_ONET_MAPPINGS.filter(m=>m.status==="auditor_validated").length,
  team_rejected: STIG_ONET_MAPPINGS.filter(m=>m.status==="team_rejected").length,
  auditor_disputed: STIG_ONET_MAPPINGS.filter(m=>m.status==="auditor_disputed").length,
};

// O*Net Role Collections (parallel to STIG Lists)
const DEFAULT_ROLE_COLLECTIONS = [
  {id:"rc-1",name:"SOC Team Roles",description:"Occupations mapped to our Security Operations Center staffing plan.",created:"2025-03-01",roles:["15-1212.00","15-1231.00"],archived:false,shared:true},
  {id:"rc-2",name:"GRC Analyst Track",description:"Roles aligned with Governance, Risk, and Compliance career progression.",created:"2025-03-05",roles:["15-1212.00","13-1111.00"],archived:false,shared:false},
];

// ═══════════════════════════════════════════════════════════════
// O*NET PAGE 1: LIBRARY (with Role Collections)
// ═══════════════════════════════════════════════════════════════

function OnetLibraryPage({nav, isAdmin, isAuditor, role}) {
  const [view,setView]=useState("my");
  const [search,setSearch]=useState("");
  const [catFilter,setCatFilter]=useState("all");
  const [collections,setCollections]=useState(DEFAULT_ROLE_COLLECTIONS);
  const [showCreate,setShowCreate]=useState(false);
  const [newName,setNewName]=useState("");
  const [newDesc,setNewDesc]=useState("");
  const [selectedRoles,setSelectedRoles]=useState([]);
  const [showCollDetail,setShowCollDetail]=useState(null);
  const [showArchived,setShowArchived]=useState(false);

  const cats=[...new Set(ONET_CATALOG.map(o=>o.category))].sort();
  const filtered=useMemo(()=>{
    return ONET_CATALOG.filter(o=>{
      if(view==="my"&&o.status!=="ingested")return false;
      if(catFilter!=="all"&&o.category!==catFilter)return false;
      if(search){const s=search.toLowerCase();if(!o.title.toLowerCase().includes(s)&&!o.id.includes(s)&&!o.category.toLowerCase().includes(s))return false;}
      return true;
    });
  },[view,search,catFilter]);

  const toggleRoleSelect=(id)=>setSelectedRoles(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const createCollection=()=>{if(!newName.trim())return;const nc={id:`rc-${Date.now()}`,name:newName,description:newDesc,created:new Date().toISOString().split("T")[0],roles:[...selectedRoles],archived:false,shared:false};setCollections([...collections,nc]);setNewName("");setNewDesc("");setSelectedRoles([]);setShowCreate(false);};
  const archiveCollection=(id)=>setCollections(collections.map(c=>c.id===id?{...c,archived:true}:c));
  const unarchiveCollection=(id)=>setCollections(collections.map(c=>c.id===id?{...c,archived:false}:c));
  const removeFromCollection=(collId,roleId)=>setCollections(collections.map(c=>c.id===collId?{...c,roles:c.roles.filter(r=>r!==roleId)}:c));
  const addToCollection=(collId,roleId)=>setCollections(collections.map(c=>c.id===collId?{...c,roles:[...new Set([...c.roles,roleId])]}:c));

  const activeColls=collections.filter(c=>!c.archived);
  const archivedColls=collections.filter(c=>c.archived);
  const collDetail=showCollDetail?collections.find(c=>c.id===showCollDetail):null;

  // ── Collection Detail View ──
  if(collDetail){
    const collRoles=collDetail.roles.map(id=>ONET_CATALOG.find(o=>o.id===id)).filter(Boolean);
    const totalMappings=STIG_ONET_MAPPINGS.filter(m=>collDetail.roles.includes(m.onetOccupation)).length;
    return(<div className="space-y-5">
      <div className="flex items-center gap-1.5 text-xs text-slate-500"><button onClick={()=>setShowCollDetail(null)} className="hover:text-blue-600">Library</button><ChevronRight size={12}/><span className="text-slate-700 font-medium">{collDetail.name}</span></div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><ListChecks size={18}/>{collDetail.name}</h1>
          <div className="flex items-center gap-2">
            {collDetail.shared&&<span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1"><Share2 size={9}/>Shared</span>}
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{collRoles.length} Roles</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">{collDetail.description}</p>
        <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-2"><span>Created {collDetail.created}</span><span>{totalMappings} STIG mappings across these roles</span></div>
      </div>
      {/* API endpoint */}
      <div className="bg-cyan-50 rounded-xl border border-cyan-200 p-4">
        <div className="flex items-center gap-2 mb-2"><Cpu size={13} className="text-cyan-500"/><span className="text-xs font-semibold text-cyan-700">API Endpoint</span></div>
        <div className="flex items-center gap-2"><code className="flex-1 text-[11px] bg-white rounded-lg border border-cyan-200 px-3 py-2 font-mono text-cyan-800">GET /api/v1/collections/{collDetail.id}/roles</code><button className="text-xs px-2 py-1.5 rounded-lg bg-cyan-100 hover:bg-cyan-200 text-cyan-700"><Copy size={12}/></button></div>
        <p className="text-[10px] text-cyan-500 mt-1.5">Pull this role collection into your HR, workforce planning, or GRC tools</p>
      </div>
      {/* Roles in collection */}
      <div className="space-y-2">{collRoles.map(o=>{
        const roleMappings=STIG_ONET_MAPPINGS.filter(m=>m.onetOccupation===o.id);
        return(<div key={o.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5"><span className="text-sm font-semibold text-slate-900">{o.title}</span><span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">{o.id}</span>{o.status==="ingested"&&<span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Ingested</span>}</div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500"><span>{o.category}</span><span>{o.median_salary}</span><span className="text-blue-600 font-medium">{roleMappings.length} STIG mappings</span></div>
          </div>
          {o.status==="ingested"&&<button onClick={()=>nav("onet-role")} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium flex items-center gap-1"><BarChart3 size={12}/>Detail</button>}
          <button onClick={()=>removeFromCollection(collDetail.id,o.id)} className="text-xs px-2 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50"><X size={12}/></button>
        </div>);
      })}</div>
      {/* Add more roles */}
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-4">
        <p className="text-xs text-slate-500 text-center mb-2">Add roles from the catalog</p>
        <div className="flex flex-wrap gap-1 justify-center">{ONET_CATALOG.filter(o=>!collDetail.roles.includes(o.id)).map(o=>(
          <button key={o.id} onClick={()=>addToCollection(collDetail.id,o.id)} className="text-[10px] px-2 py-1 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-600 flex items-center gap-1"><Plus size={10}/>{o.title.split(" ").slice(0,3).join(" ")}</button>
        ))}</div>
      </div>
    </div>);
  }

  // ── Main Library View ──
  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Users size={18}/>O*Net Role Library</h1><p className="text-xs text-slate-500">{ONET_CATALOG.length} occupations — {ONET_INGESTED.length} ingested</p></div>
    </div>

    {/* Role Collections */}
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2"><ListChecks size={14}/>Role Collections</h2>
        <div className="flex items-center gap-2">
          {archivedColls.length>0&&<button onClick={()=>setShowArchived(!showArchived)} className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-1"><Archive size={10}/>{showArchived?"Hide":"Show"} Archived ({archivedColls.length})</button>}
          <button onClick={()=>setShowCreate(!showCreate)} className="text-xs px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-700 hover:bg-cyan-100 font-medium border border-cyan-200 flex items-center gap-1"><Plus size={12}/>New Collection</button>
        </div>
      </div>
      {showCreate&&<div className="bg-cyan-50/50 rounded-lg border border-cyan-200 p-3 mb-3 space-y-2">
        <input type="text" placeholder="Collection name..." value={newName} onChange={e=>setNewName(e.target.value)} className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"/>
        <input type="text" placeholder="Description..." value={newDesc} onChange={e=>setNewDesc(e.target.value)} className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"/>
        <div className="flex flex-wrap gap-1">{ONET_CATALOG.map(o=><button key={o.id} onClick={()=>toggleRoleSelect(o.id)} className={`text-[10px] px-2 py-1 rounded-lg border font-medium ${selectedRoles.includes(o.id)?"bg-cyan-100 text-cyan-700 border-cyan-300":"bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}>{o.title.split(" ").slice(0,3).join(" ")}</button>)}</div>
        <div className="flex items-center gap-2"><button onClick={createCollection} disabled={!newName.trim()} className="text-xs px-4 py-1.5 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 font-medium disabled:opacity-40">Create Collection</button><button onClick={()=>{setShowCreate(false);setNewName("");setNewDesc("");setSelectedRoles([]);}} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">Cancel</button></div>
      </div>}
      <div className="space-y-2">{activeColls.map(c=>{const roleCount=c.roles.length;const mappingCount=STIG_ONET_MAPPINGS.filter(m=>c.roles.includes(m.onetOccupation)).length;return(
        <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/30 transition-all cursor-pointer" onClick={()=>setShowCollDetail(c.id)}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center"><ListChecks size={14} className="text-white"/></div>
          <div className="flex-1"><div className="flex items-center gap-2"><span className="text-xs font-semibold text-slate-900">{c.name}</span>{c.shared&&<Share2 size={10} className="text-blue-400"/>}</div><p className="text-[10px] text-slate-500">{roleCount} roles • {mappingCount} STIG mappings • Created {c.created}</p></div>
          <button onClick={e=>{e.stopPropagation();archiveCollection(c.id);}} className="text-xs px-2 py-1 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"><Archive size={11}/></button>
          <ChevronRight size={14} className="text-slate-300"/>
        </div>);
      })}</div>
      {showArchived&&archivedColls.length>0&&<div className="mt-2 space-y-1">{archivedColls.map(c=><div key={c.id} className="flex items-center gap-3 p-2 rounded-lg border border-slate-100 bg-slate-50/50 opacity-60"><Archive size={12} className="text-slate-400"/><span className="text-[10px] text-slate-500 flex-1">{c.name}</span><button onClick={()=>unarchiveCollection(c.id)} className="text-[10px] text-blue-600 hover:text-blue-800">Restore</button></div>)}</div>}
    </div>

    {/* Browse/Catalog */}
    <div className="flex items-center gap-2">
      <button onClick={()=>setView("my")} className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${view==="my"?"bg-blue-50 text-blue-700 border-blue-200":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}>My Roles ({ONET_INGESTED.length})</button>
      <button onClick={()=>setView("catalog")} className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${view==="catalog"?"bg-blue-50 text-blue-700 border-blue-200":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}>O*Net Catalog ({ONET_CATALOG.length})</button>
      <div className="relative flex-1 max-w-xs ml-auto"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Search roles..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"/></div>
      <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Categories</option>{cats.map(c=><option key={c} value={c}>{c}</option>)}</select>
    </div>
    <div className="space-y-3">{filtered.map(o=>{
      const totalItems=[...o.tasks,...o.work_activities];
      const taggedCount=totalItems.filter(i=>i.tagged).length;
      const pct=totalItems.length>0?Math.round(taggedCount/totalItems.length*100):0;
      return (<div key={o.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"><Users size={16} className="text-white"/></div>
            <div>
              <div className="flex items-center gap-2"><h3 className="text-sm font-semibold text-slate-900">{o.title}</h3>
                {o.bright_outlook&&<span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center gap-0.5"><TrendingUp size={8}/>Bright Outlook</span>}
                {o.status==="ingested"&&<span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">Ingested</span>}
              </div>
              <p className="text-[10px] text-slate-500">{o.id} • {o.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {o.status==="ingested"?<button onClick={()=>nav("onet-dashboard")} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 flex items-center gap-1"><BarChart3 size={12}/>View</button>
              :<button className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border border-blue-200 flex items-center gap-1"><Upload size={12}/>Ingest</button>}
          </div>
        </div>
        <p className="text-[11px] text-slate-600 mb-3">{o.description}</p>
        <div className="flex items-center gap-4 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><DollarSign size={10}/>{o.median_salary}</span>
          <span className="flex items-center gap-1"><Users size={10}/>{o.employment} employed</span>
          <span className="flex items-center gap-1"><TrendingUp size={10}/>{o.growth} growth</span>
          {o.status==="ingested"&&<><span className="flex items-center gap-1"><Tag size={10}/>{taggedCount}/{totalItems.length} tagged</span>
          <div className="flex items-center gap-1 ml-auto"><div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden"><div className={`h-full rounded-full ${pct>=80?"bg-emerald-500":pct>=50?"bg-amber-500":"bg-red-500"}`} style={{width:`${pct}%`}}/></div><span className="font-semibold">{pct}%</span></div></>}
        </div>
      </div>);
    })}</div>
    {filtered.length===0&&<div className="bg-white rounded-xl border border-slate-200 py-12 text-center"><Users size={36} className="mx-auto text-slate-300 mb-2"/><h3 className="text-sm font-semibold text-slate-700">No matching roles</h3></div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// O*NET PAGE 2: DASHBOARD (per-role)
// ═══════════════════════════════════════════════════════════════

function OnetDashboardPage({nav, isAdmin}) {
  const role=ONET_CATALOG[0]; // Default to Info Sec Analysts
  const allItems=[...role.tasks,...role.work_activities];
  const taggedCount=allItems.filter(i=>i.tagged).length;
  const taskTagged=role.tasks.filter(t=>t.tagged).length;
  const actTagged=role.work_activities.filter(a=>a.tagged).length;

  const Ring=({pct,size=80,stroke=8,color="text-blue-500"})=>{const r=(size-stroke)/2;const circ=2*Math.PI*r;const off=circ*(1-pct/100);return(
    <svg width={size} height={size} className="transform -rotate-90"><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-slate-100"/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" className={color}/></svg>
  )};

  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Briefcase size={18}/>{role.title}</h1>
        <p className="text-xs text-slate-500">{role.id} • {role.category} • {role.median_salary} median salary • {role.growth} projected growth</p>
      </div>
      {role.bright_outlook&&<span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center gap-1"><TrendingUp size={12}/>Bright Outlook</span>}
    </div>
    {/* Summary row */}
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white rounded-xl border border-slate-200 p-3 text-center"><div className="text-[11px] text-slate-500 mb-1">Tasks</div><div className="text-xl font-bold text-slate-900">{role.tasks.length}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3 text-center"><div className="text-[11px] text-slate-500 mb-1">Work Activities</div><div className="text-xl font-bold text-slate-900">{role.work_activities.length}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3 text-center"><div className="text-[11px] text-slate-500 mb-1">Skills</div><div className="text-xl font-bold text-slate-900">{role.skills.length}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3 text-center"><div className="text-[11px] text-slate-500 mb-1">Knowledge Areas</div><div className="text-xl font-bold text-slate-900">{role.knowledge.length}</div></div>
    </div>
    {/* Completion rings + bars */}
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3">Task Tagging</h3>
        <div className="flex items-center gap-4">
          <div className="relative"><Ring pct={Math.round(taskTagged/role.tasks.length*100)} color="text-blue-500"/><div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">{Math.round(taskTagged/role.tasks.length*100)}%</div></div>
          <div className="text-[11px] text-slate-500 space-y-1"><div>{taskTagged} of {role.tasks.length} tagged</div><div>{role.tasks.length-taskTagged} remaining</div></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3">Activity Tagging</h3>
        <div className="flex items-center gap-4">
          <div className="relative"><Ring pct={Math.round(actTagged/role.work_activities.length*100)} color="text-violet-500"/><div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">{Math.round(actTagged/role.work_activities.length*100)}%</div></div>
          <div className="text-[11px] text-slate-500 space-y-1"><div>{actTagged} of {role.work_activities.length} tagged</div><div>{role.work_activities.length-actTagged} remaining</div></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3">Overall Progress</h3>
        <div className="flex items-center gap-4">
          <div className="relative"><Ring pct={Math.round(taggedCount/allItems.length*100)} color="text-emerald-500"/><div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">{Math.round(taggedCount/allItems.length*100)}%</div></div>
          <div className="text-[11px] text-slate-500 space-y-1"><div>{taggedCount} of {allItems.length} total items</div><div>{allItems.length-taggedCount} remaining</div></div>
        </div>
      </div>
    </div>
    {/* Skills & Knowledge */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5"><Target size={13}/>Skills (by Importance)</h3>
        <div className="space-y-2">{role.skills.map((s,i)=><div key={i} className="flex items-center gap-2"><span className="text-[11px] text-slate-600 w-36 shrink-0 truncate">{s.name}</span><div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-blue-500" style={{width:`${s.importance/5*100}%`}}/></div><span className="text-[10px] text-slate-500 font-semibold tabular-nums w-6">{s.importance}</span></div>)}</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5"><BookOpen size={13}/>Knowledge Areas (by Importance)</h3>
        <div className="space-y-2">{role.knowledge.map((k,i)=><div key={i} className="flex items-center gap-2"><span className="text-[11px] text-slate-600 w-36 shrink-0 truncate">{k.name}</span><div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-violet-500" style={{width:`${k.importance/5*100}%`}}/></div><span className="text-[10px] text-slate-500 font-semibold tabular-nums w-6">{k.importance}</span></div>)}</div>
      </div>
    </div>
    {/* STIG Mappings for this role */}
    {(()=>{const roleMaps=STIG_ONET_MAPPINGS.filter(m=>m.onetOccupation===role.id&&m.status!=="team_rejected");const validated=roleMaps.filter(m=>m.status==="auditor_validated").length;const approved=roleMaps.filter(m=>m.status==="team_approved").length;const suggested=roleMaps.filter(m=>m.status==="suggested").length;const findings=[...new Set(roleMaps.map(m=>m.stigFinding))];return(
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-700 flex items-center gap-2"><Shield size={13} className="text-indigo-500"/>STIG Findings Mapped to This Role</h3>
        <button onClick={()=>nav("onet-role")} className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">View detail <ArrowRight size={11}/></button>
      </div>
      <p className="text-[10px] text-slate-500 mb-3">{roleMaps.length} mappings across {findings.length} STIG findings connected through {[...new Set(roleMaps.flatMap(m=>m.bridgeTerms))].length} shared MWE terms.</p>
      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="rounded-lg border border-slate-200 p-2 text-center"><div className="text-lg font-bold text-slate-900 tabular-nums">{roleMaps.length}</div><div className="text-[9px] text-slate-500">Total</div></div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-2 text-center"><div className="text-lg font-bold text-amber-600 tabular-nums">{suggested}</div><div className="text-[9px] text-amber-600">Suggested</div></div>
        <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-2 text-center"><div className="text-lg font-bold text-blue-600 tabular-nums">{approved}</div><div className="text-[9px] text-blue-600">Approved</div></div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2 text-center"><div className="text-lg font-bold text-emerald-600 tabular-nums">{validated}</div><div className="text-[9px] text-emerald-600">Validated</div></div>
      </div>
      {/* Finding list */}
      <div className="space-y-2">{findings.map(fid=>{
        const fMaps=roleMaps.filter(m=>m.stigFinding===fid);
        const allTerms=[...new Set(fMaps.flatMap(m=>m.bridgeTerms))];
        const bestStatus=fMaps.some(m=>m.status==="auditor_validated")?"auditor_validated":fMaps.some(m=>m.status==="team_approved")?"team_approved":"suggested";
        const st=MAPPING_STATUS[bestStatus];
        return(<div key={fid} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all cursor-pointer" onClick={()=>nav("stig-finding")}>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0"><Shield size={12} className="text-white"/></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2"><span className="text-xs font-mono font-semibold text-indigo-700">{fid}</span><span className="text-[10px] text-slate-600 truncate">{fMaps[0]?.stigTitle}</span></div>
            <div className="flex items-center gap-1 mt-0.5">{allTerms.map((t,i)=><span key={i} className="text-[8px] px-1 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">{t}</span>)}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold border ${st.color}`}>{st.label}</span>
            <span className="text-[10px] text-slate-500 font-semibold">{fMaps.length}</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 shrink-0"/>
        </div>);
      })}</div>
    </div>);})()}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// O*NET PAGE 3: PIPELINE (task/activity tagging)
// ═══════════════════════════════════════════════════════════════

function OnetPipelinePage({nav, isAdmin}) {
  const role=ONET_CATALOG[0];
  const [typeFilter,setTypeFilter]=useState("all");
  const [tagFilter,setTagFilter]=useState("all");
  const [expanded,setExpanded]=useState(null);
  const allItems=useMemo(()=>{
    const tasks=role.tasks.map(t=>({...t,type:"Task"}));
    const acts=role.work_activities.map(a=>({...a,type:"Activity"}));
    let items=[...tasks,...acts];
    if(typeFilter!=="all") items=items.filter(i=>i.type===typeFilter);
    if(tagFilter==="tagged") items=items.filter(i=>i.tagged);
    if(tagFilter==="untagged") items=items.filter(i=>!i.tagged);
    return items;
  },[typeFilter,tagFilter]);
  const totalTagged=allItems.filter(i=>i.tagged).length;
  const pct=allItems.length>0?Math.round(totalTagged/allItems.length*100):0;

  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Activity size={18}/>O*Net Tagging Pipeline</h1><p className="text-xs text-slate-500">{role.title} ({role.id}) — {allItems.length} items</p></div>
      <div className="flex items-center gap-2"><div className="w-24 h-2 rounded-full bg-slate-200 overflow-hidden"><div className={`h-full rounded-full ${pct>=80?"bg-emerald-500":pct>=50?"bg-amber-500":"bg-blue-500"}`} style={{width:`${pct}%`}}/></div><span className="text-xs font-semibold text-slate-700">{pct}% tagged</span></div>
    </div>
    <div className="flex items-center gap-2">
      <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Types</option><option value="Task">Tasks</option><option value="Activity">Work Activities</option></select>
      <select value={tagFilter} onChange={e=>setTagFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Status</option><option value="tagged">Tagged</option><option value="untagged">Untagged</option></select>
      <span className="text-[11px] text-slate-400 ml-auto">{allItems.length} items</span>
    </div>
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-12 gap-px bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase">
        <div className="col-span-5 bg-slate-50 px-3 py-2">Item</div>
        <div className="col-span-1 bg-slate-50 px-3 py-2">Type</div>
        <div className="col-span-1 bg-slate-50 px-3 py-2">Imp.</div>
        <div className="col-span-2 bg-slate-50 px-3 py-2">MWE Tags</div>
        <div className="col-span-2 bg-slate-50 px-3 py-2">Status</div>
        <div className="col-span-1 bg-slate-50 px-3 py-2"></div>
      </div>
      <div className="divide-y divide-slate-100">{allItems.map(item=>{
        const isExp=expanded===item.id+item.type;
        const stColor=item.tagged?"text-emerald-700":"text-slate-400";
        return (<div key={item.id+item.type}>
          <button onClick={()=>setExpanded(isExp?null:item.id+item.type)} className="w-full grid grid-cols-12 gap-px text-[11px] hover:bg-blue-50/50 transition-colors">
            <div className="col-span-5 px-3 py-2.5 text-left text-slate-700 truncate">{item.text}</div>
            <div className="col-span-1 px-3 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${item.type==="Task"?"bg-blue-100 text-blue-700":"bg-violet-100 text-violet-700"}`}>{item.type}</span></div>
            <div className="col-span-1 px-3 py-2.5 font-semibold text-slate-700 tabular-nums">{item.importance}</div>
            <div className="col-span-2 px-3 py-2.5"><div className="flex flex-wrap gap-0.5">{item.mwe_tags.length>0?item.mwe_tags.map((t,i)=><span key={i} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-medium border border-emerald-200">{t}</span>):<span className="text-slate-300">—</span>}</div></div>
            <div className="col-span-2 px-3 py-2.5"><SB stage={item.tagged?"completed":item.status==="in_progress"?"mwe_tag_pass_1":"parse_finding"} status={item.tagged?"completed":item.status}/></div>
            <div className="col-span-1 px-3 py-2.5 text-right">{isExp?<ChevronDown size={12} className="text-slate-400"/>:<ChevronRight size={12} className="text-slate-400"/>}</div>
          </button>
          {isExp&&<div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Full Text</p><p className="text-[11px] text-slate-700">{item.text}</p></div>
              {isAdmin&&Object.keys(item.council).length>0&&<div><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Council Votes</p><div className="flex gap-1.5">{Object.entries(item.council).map(([n,v])=><AA key={n} name={n} vote={v} sz="sm"/>)}</div></div>}
              <div><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Tags</p>{item.mwe_tags.length>0?<div className="flex flex-wrap gap-1">{item.mwe_tags.map((t,i)=><MC key={i} term={t} v={true}/>)}</div>:<p className="text-[11px] text-slate-400 italic">Not yet tagged</p>}</div>
            </div>
          </div>}
        </div>);
      })}</div>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// O*NET PAGE 4: EXCEPTIONS
// ═══════════════════════════════════════════════════════════════

function OnetExceptionsPage({nav, isAdmin}) {
  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><AlertTriangle size={18}/>O*Net Exceptions</h1><p className="text-xs text-slate-500">{ONET_EXC.length} items requiring review</p></div>
    </div>
    <div className="space-y-3">{ONET_EXC.map(exc=>{
      const role=ONET_CATALOG.find(o=>o.id===exc.roleId);
      const votes=Object.entries(exc.council);
      const tagCount=votes.filter(([,v])=>v==="TAG").length;
      return (<div key={exc.id} className="bg-white rounded-xl border border-amber-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${exc.itemType==="task"?"bg-blue-100 text-blue-700":"bg-violet-100 text-violet-700"}`}>{exc.itemType}</span>
            <span className="text-sm font-semibold text-slate-900">{exc.text}</span>
          </div>
          {isAdmin&&<div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 flex items-center gap-1"><ThumbsUp size={11}/>Approve</button>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium border border-red-200 flex items-center gap-1"><XCircle size={11}/>Reject</button>
          </div>}
        </div>
        <p className="text-[11px] text-slate-600">{exc.reason}</p>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-500">{role?.title} ({exc.roleId})</span>
          <div className="flex items-center gap-1">{exc.proposedTags.map((t,i)=><span key={i} className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[9px] font-medium border border-amber-200">{t}</span>)}</div>
          {isAdmin&&<div className="flex items-center gap-1 ml-auto">{votes.map(([n,v])=><div key={n} className={`w-4 h-4 rounded-full text-[7px] font-bold flex items-center justify-center ${v==="TAG"?"bg-emerald-400 text-white":"bg-red-300 text-white"}`}>{n[0]}</div>)}<span className="text-[10px] text-slate-500 ml-1">{tagCount}/4</span></div>}
        </div>
      </div>);
    })}</div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// O*NET PAGE 5: LEXICON
// ═══════════════════════════════════════════════════════════════

function OnetLexiconPage({nav, isAdmin}) {
  const [search,setSearch]=useState("");
  const [expanded,setExpanded]=useState(null);
  const filtered=useMemo(()=>ONET_LEX.filter(l=>{
    if(search&&!l.term.toLowerCase().includes(search.toLowerCase())&&!l.def.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  }),[search]);
  const stColor={validated:{bg:"bg-emerald-100",text:"text-emerald-700",border:"border-emerald-200"},candidate:{bg:"bg-amber-100",text:"text-amber-700",border:"border-amber-200"}};
  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><BookOpen size={18}/>O*Net Lexicon</h1><p className="text-xs text-slate-500">{ONET_LEX.length} occupation-domain terms</p></div>
    </div>
    <div className="relative max-w-sm"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Search O*Net terms..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"/></div>
    <div className="space-y-2">{filtered.map(l=>{
      const sc=stColor[l.status]||stColor.candidate;
      const isExp=expanded===l.id;
      return (<div key={l.id} className={`bg-white rounded-xl border ${isExp?"border-blue-300 shadow-sm":"border-slate-200"} overflow-hidden transition-all`}>
        <button onClick={()=>setExpanded(isExp?null:l.id)} className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-slate-900 font-mono">{l.term}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.text} border ${sc.border}`}>{l.status}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 font-medium">O*Net</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{l.cat}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{l.def}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center"><div className="text-sm font-bold text-slate-700 tabular-nums">{l.freq}</div><div className="text-[9px] text-slate-400">hits</div></div>
              <CB s={l.conf}/>
              {isExp?<ChevronDown size={14} className="text-slate-400"/>:<ChevronRight size={14} className="text-slate-400"/>}
            </div>
          </div>
        </button>
        {isExp&&<div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
          <p className="text-xs text-slate-700 leading-relaxed">{l.def}</p>
          {l.senses.length>0&&<div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-[10px] font-semibold text-indigo-600 uppercase">Senses ({l.senses.length})</p>
            {l.senses.map(s=><div key={s.sense_number} className="flex gap-2 pl-2 border-l-2 border-indigo-200"><div className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">{s.sense_number}</div><div><span className="text-[11px] font-semibold text-slate-800">{s.sense_label}</span><p className="text-[10px] text-slate-600">{s.definition}</p></div></div>)}
          </div>}
          <div><p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Related</p><div className="flex flex-wrap gap-1">{l.related.map((r,i)=><span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">{r}</span>)}</div></div>
        </div>}
      </div>);
    })}</div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// O*NET PAGE 6: ROLE DETAIL
// ═══════════════════════════════════════════════════════════════

function OnetRoleDetailPage({nav, isAdmin, isAuditor, role:userRole}) {
  const role=ONET_CATALOG[0];
  const [tab,setTab]=useState("overview");
  const roleMappings=STIG_ONET_MAPPINGS.filter(m=>m.onetOccupation===role.id);
  const tabs=[{k:"overview",l:"Overview"},{k:"tasks",l:"Tasks"},{k:"activities",l:"Work Activities"},{k:"skills",l:"Skills & Knowledge"},{k:"stigMappings",l:`STIG Mappings (${roleMappings.length})`},{k:"terms",l:"Term Connections"}];
  // Find STIG terms that connect to this role's task tags
  const roleTags=[...new Set([...role.tasks,...role.work_activities].flatMap(i=>i.mwe_tags))];
  const connectedStigTerms=LEX.filter(l=>roleTags.some(rt=>l.term.includes(rt)||l.related.some(r=>r.includes(rt))));

  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Briefcase size={18}/>{role.title}</h1><p className="text-xs text-slate-500">{role.id} • {role.category}</p></div>
      {role.bright_outlook&&<span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center gap-1"><TrendingUp size={12}/>Bright Outlook</span>}
    </div>
    <div className="flex items-center gap-1 border-b border-slate-200 pb-px">{tabs.map(t=><button key={t.k} onClick={()=>setTab(t.k)} className={`px-3 py-2 text-xs font-medium border-b-2 transition-all ${tab===t.k?"border-blue-500 text-blue-700":"border-transparent text-slate-500 hover:text-slate-700"}`}>{t.l}</button>)}</div>

    {tab==="overview"&&<div className="space-y-4">
      <p className="text-xs text-slate-700 leading-relaxed">{role.description}</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="text-[11px] text-slate-500 mb-1">Median Salary</div><div className="text-lg font-bold text-slate-900">{role.median_salary}</div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="text-[11px] text-slate-500 mb-1">Employment</div><div className="text-lg font-bold text-slate-900">{role.employment}</div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="text-[11px] text-slate-500 mb-1">Growth Rate</div><div className="text-lg font-bold text-emerald-600">{role.growth}</div></div>
      </div>
    </div>}

    {tab==="tasks"&&<div className="space-y-2">{role.tasks.map(t=>(
      <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-3">
        <div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-700">{t.text}</span><span className="text-[10px] font-semibold text-slate-500">Imp: {t.importance}</span></div>
        <div className="flex items-center gap-1">{t.mwe_tags.length>0?t.mwe_tags.map((tag,i)=><MC key={i} term={tag} v={true}/>):<span className="text-[10px] text-slate-400 italic">Not tagged</span>}</div>
      </div>
    ))}</div>}

    {tab==="activities"&&<div className="space-y-2">{role.work_activities.map(a=>(
      <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-3">
        <div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-700">{a.text}</span><span className="text-[10px] font-semibold text-slate-500">Imp: {a.importance}</span></div>
        <div className="flex items-center gap-1">{a.mwe_tags.length>0?a.mwe_tags.map((tag,i)=><MC key={i} term={tag} v={true}/>):<span className="text-[10px] text-slate-400 italic">Not tagged</span>}</div>
      </div>
    ))}</div>}

    {tab==="skills"&&<div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5"><Target size={13}/>Skills</h3>
        <div className="space-y-2">{role.skills.map((s,i)=><div key={i} className="flex items-center gap-2"><span className="text-[11px] text-slate-600 w-32 shrink-0 truncate">{s.name}</span><div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-blue-500" style={{width:`${s.importance/5*100}%`}}/></div><span className="text-[10px] text-slate-500 font-semibold tabular-nums">{s.importance}</span></div>)}</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5"><BookOpen size={13}/>Knowledge Areas</h3>
        <div className="space-y-2">{role.knowledge.map((k,i)=><div key={i} className="flex items-center gap-2"><span className="text-[11px] text-slate-600 w-32 shrink-0 truncate">{k.name}</span><div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-violet-500" style={{width:`${k.importance/5*100}%`}}/></div><span className="text-[10px] text-slate-500 font-semibold tabular-nums">{k.importance}</span></div>)}</div>
      </div>
    </div>}

    {/* ════════ STIG MAPPINGS TAB ════════ */}
    {tab==="stigMappings"&&<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Shield size={13} className="text-indigo-400"/><span className="text-[11px] text-slate-500">Total Mappings</span></div><div className="text-xl font-bold text-slate-900 tabular-nums">{roleMappings.length}</div></div>
        <div className="bg-white rounded-xl border border-amber-200 p-3"><div className="flex items-center gap-2 mb-1"><Zap size={13} className="text-amber-400"/><span className="text-[11px] text-slate-500">Suggested</span></div><div className="text-xl font-bold text-amber-600 tabular-nums">{roleMappings.filter(m=>m.status==="suggested").length}</div></div>
        <div className="bg-white rounded-xl border border-blue-200 p-3"><div className="flex items-center gap-2 mb-1"><CheckCircle2 size={13} className="text-blue-400"/><span className="text-[11px] text-slate-500">Team Approved</span></div><div className="text-xl font-bold text-blue-600 tabular-nums">{roleMappings.filter(m=>m.status==="team_approved").length}</div></div>
        <div className="bg-white rounded-xl border border-emerald-200 p-3"><div className="flex items-center gap-2 mb-1"><ShieldCheck size={13} className="text-emerald-400"/><span className="text-[11px] text-slate-500">Validated</span></div><div className="text-xl font-bold text-emerald-600 tabular-nums">{roleMappings.filter(m=>m.status==="auditor_validated").length}</div></div>
      </div>
      <p className="text-xs text-slate-500">STIG findings mapped to this role's tasks and work activities. The Lexicon's MWE terms serve as the bridge.</p>
      {/* Group by finding */}
      {[...new Set(roleMappings.filter(m=>m.status!=="team_rejected").map(m=>m.stigFinding))].map(fid=>{
        const fMaps=roleMappings.filter(m=>m.stigFinding===fid&&m.status!=="team_rejected");
        return(<div key={fid} className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={()=>nav("stig-finding")} className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 hover:bg-indigo-100">{fid}</button>
            <span className="text-xs text-slate-600">{fMaps[0]?.stigTitle}</span>
          </div>
          <div className="space-y-2">{fMaps.map(m=>{const st=MAPPING_STATUS[m.status];return(
            <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold border shrink-0 ${st.color}`}>{st.icon}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold w-14 shrink-0">{m.onetTask?"Task":"Activity"}</span>
              <span className="text-[11px] text-slate-700 flex-1">{m.onetTaskText}</span>
              <div className="flex items-center gap-1">{m.bridgeTerms.map((bt,i)=><span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">{bt}</span>)}</div>
              <CB s={m.confidence}/>
              {isAdmin&&m.status==="suggested"&&<><button className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">Approve</button><button className="text-[10px] px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200 font-medium">Reject</button></>}
              {isAuditor&&m.status==="team_approved"&&<><button className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">Validate</button><button className="text-[10px] px-2 py-1 rounded bg-orange-50 text-orange-700 border border-orange-200 font-medium">Dispute</button></>}
            </div>);
          })}</div>
        </div>);
      })}
    </div>}

    {tab==="terms"&&<div className="space-y-4">
      <p className="text-xs text-slate-500">STIG terms connected to this role through task/activity MWE tags ({connectedStigTerms.length} found)</p>
      <div className="space-y-2">{connectedStigTerms.length>0?connectedStigTerms.map(l=>(
        <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-900 font-mono w-40">{l.term}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">STIG</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{l.cat}</span>
          <p className="text-[10px] text-slate-500 flex-1 truncate">{l.def}</p>
          <CB s={l.conf}/>
        </div>
      )):<div className="bg-white rounded-xl border border-slate-200 py-8 text-center"><p className="text-xs text-slate-500">No connected STIG terms found for untagged items.</p></div>}</div>
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// NEXUS LEXICON (Unified)
// ═══════════════════════════════════════════════════════════════

function NexusLexiconPage({nav, isAdmin, isAuditor, role}) {
  const [nlTab,setNlTab]=useState("glossary");
  const [search,setSearch]=useState("");
  const [sourceFilter,setSourceFilter]=useState("all");

  // Merge STIG + O*Net terms — mark shared terms
  const MERGED = useMemo(()=>{
    const merged = LEX.map(l=>({...l,source:"stig",sources:["stig"]}));
    ONET_LEX.forEach(ol=>{
      // Check for overlap by term name
      const existing = merged.find(m=>m.term.toLowerCase()===ol.term.toLowerCase());
      if(existing){
        existing.sources.push("onet");
        existing.source="both";
      } else {
        merged.push({...ol,sources:["onet"],pass1:false,pass2:false,stigs:0,council:{},cciRefs:[],senses:ol.senses||[],triples:ol.triples||[]});
      }
    });
    return merged;
  },[]);

  const filtered=useMemo(()=>{
    let r=MERGED;
    if(sourceFilter!=="all") r=r.filter(l=>l.source===sourceFilter||l.sources.includes(sourceFilter));
    if(search) r=r.filter(l=>l.term.toLowerCase().includes(search.toLowerCase())||l.def.toLowerCase().includes(search.toLowerCase()));
    return r;
  },[search,sourceFilter,MERGED]);

  const stigCount=MERGED.filter(m=>m.sources.includes("stig")).length;
  const onetCount=MERGED.filter(m=>m.sources.includes("onet")).length;
  const bothCount=MERGED.filter(m=>m.source==="both").length;
  const stigOnly=MERGED.filter(m=>m.sources.length===1&&m.sources[0]==="stig");
  const onetOnly=MERGED.filter(m=>m.sources.length===1&&m.sources[0]==="onet");

  const stColor={validated:{bg:"bg-emerald-100",text:"text-emerald-700",border:"border-emerald-200"},candidate:{bg:"bg-amber-100",text:"text-amber-700",border:"border-amber-200"},contested:{bg:"bg-red-100",text:"text-red-700",border:"border-red-200"}};
  const srcBadge={stig:{bg:"bg-indigo-50",text:"text-indigo-700",border:"border-indigo-200",label:"STIG"},onet:{bg:"bg-cyan-50",text:"text-cyan-700",border:"border-cyan-200",label:"O*Net"},both:{bg:"bg-emerald-50",text:"text-emerald-700",border:"border-emerald-200",label:"Both"}};

  const tabs=[{k:"glossary",l:"Glossary",i:BookOpen},{k:"crosswalk",l:"Crosswalk",i:ArrowUpDown},{k:"gap",l:"Gap Analysis",i:Target},{k:"graph",l:"Knowledge Graph",i:Network}];
  if(isAdmin||isAuditor) tabs.push({k:"manage",l:isAuditor?"Validate":"Manage",i:isAuditor?ShieldCheck:Pencil});

  // Crosswalk data: STIG terms that map to O*Net skills/knowledge
  const CROSSWALK = useMemo(()=>{
    const mappings=[];
    ONET_INGESTED.forEach(role=>{
      role.skills.forEach(sk=>{
        const matchingTerms=LEX.filter(l=>l.term.toLowerCase().includes(sk.name.toLowerCase().split(" ")[0])||sk.name.toLowerCase().includes(l.term.toLowerCase().split(" ")[0]));
        matchingTerms.forEach(t=>{mappings.push({stigTerm:t.term,onetAttr:sk.name,onetType:"Skill",role:role.title,importance:sk.importance});});
      });
      role.knowledge.forEach(kn=>{
        const matchingTerms=LEX.filter(l=>l.cat.toLowerCase().includes(kn.name.toLowerCase().split(" ")[0]));
        matchingTerms.forEach(t=>{mappings.push({stigTerm:t.term,onetAttr:kn.name,onetType:"Knowledge",role:role.title,importance:kn.importance});});
      });
    });
    // Add some hardcoded meaningful crosswalks
    return [
      {stigTerm:"access control",onetAttr:"Information Security",onetType:"Skill",role:"Information Security Analysts",importance:4.8},
      {stigTerm:"network firewall",onetAttr:"Network Security",onetType:"Skill",role:"Information Security Analysts",importance:4.5},
      {stigTerm:"audit record",onetAttr:"Information Security",onetType:"Skill",role:"Information Security Analysts",importance:4.8},
      {stigTerm:"cryptographic module",onetAttr:"Network Security",onetType:"Skill",role:"Information Security Analysts",importance:4.5},
      {stigTerm:"remote access",onetAttr:"Telecommunications",onetType:"Knowledge",role:"Information Security Analysts",importance:3.9},
      {stigTerm:"file integrity",onetAttr:"Vulnerability Assessment",onetType:"Skill",role:"Information Security Analysts",importance:4.0},
      {stigTerm:"session lock",onetAttr:"Information Security",onetType:"Skill",role:"Information Security Analysts",importance:4.8},
      {stigTerm:"privilege escalation",onetAttr:"Vulnerability Assessment",onetType:"Skill",role:"Information Security Analysts",importance:4.0},
      {stigTerm:"indicators of compromise",onetAttr:"Incident Response",onetType:"Skill",role:"Information Security Analysts",importance:4.2},
      {stigTerm:"access control",onetAttr:"Network Administration",onetType:"Skill",role:"Computer Network Support Specialists",importance:4.3},
      ...mappings.slice(0,5),
    ];
  },[]);

  const graphTerms=useMemo(()=>MERGED.filter(l=>(l.triples||[]).length>0),[MERGED]);
  const graphTriples=useMemo(()=>MERGED.flatMap(l=>l.triples||[]),[MERGED]);

  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Database size={18}/>Nexus Lexicon</h1><p className="text-xs text-slate-500">Unified terminology — {MERGED.length} terms ({stigCount} STIG, {onetCount} O*Net, {bothCount} shared)</p></div>
    </div>
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Database size={13} className="text-slate-400"/><span className="text-[11px] text-slate-500">Total Terms</span></div><div className="text-xl font-bold text-slate-900 tabular-nums">{MERGED.length}</div></div>
      <div className="bg-white rounded-xl border border-indigo-200 p-3"><div className="flex items-center gap-2 mb-1"><Shield size={13} className="text-indigo-500"/><span className="text-[11px] text-slate-500">STIG Terms</span></div><div className="text-xl font-bold text-indigo-600 tabular-nums">{stigCount}</div></div>
      <div className="bg-white rounded-xl border border-cyan-200 p-3"><div className="flex items-center gap-2 mb-1"><Users size={13} className="text-cyan-500"/><span className="text-[11px] text-slate-500">O*Net Terms</span></div><div className="text-xl font-bold text-cyan-600 tabular-nums">{onetCount}</div></div>
      <div className="bg-white rounded-xl border border-emerald-200 p-3"><div className="flex items-center gap-2 mb-1"><Link size={13} className="text-emerald-500"/><span className="text-[11px] text-slate-500">Shared</span></div><div className="text-xl font-bold text-emerald-600 tabular-nums">{bothCount}</div></div>
    </div>
    <div className="flex items-center gap-1 border-b border-slate-200 pb-px">{tabs.map(t=><button key={t.k} onClick={()=>setNlTab(t.k)} className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all ${nlTab===t.k?"border-blue-500 text-blue-700":"border-transparent text-slate-500 hover:text-slate-700"}`}><t.i size={13}/>{t.l}</button>)}</div>

    {/* ════════ GLOSSARY ════════ */}
    {nlTab==="glossary"&&<div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Search unified lexicon..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"/></div>
        <select value={sourceFilter} onChange={e=>setSourceFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Sources</option><option value="stig">STIG Only</option><option value="onet">O*Net Only</option><option value="both">Shared</option></select>
        <span className="text-[11px] text-slate-400 ml-auto">{filtered.length} terms</span>
      </div>
      <div className="space-y-2">{filtered.map(l=>{
        const sc=stColor[l.status]||stColor.candidate;
        const sb=srcBadge[l.source]||srcBadge.stig;
        return (<div key={l.id} className="bg-white rounded-xl border border-slate-200 p-3 hover:border-blue-200 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-slate-900 font-mono">{l.term}</span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${sb.bg} ${sb.text} ${sb.border}`}>{sb.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${sc.bg} ${sc.text} border ${sc.border}`}>{l.status}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{l.cat}</span>
            <span className="text-[10px] text-slate-400 ml-auto">{l.freq} hits</span>
          </div>
          <p className="text-[11px] text-slate-600 line-clamp-1">{l.def}</p>
        </div>);
      })}</div>
    </div>}

    {/* ════════ CROSSWALK (Three-Tier Mapping) ════════ */}
    {nlTab==="crosswalk"&&<div className="space-y-4">
      <p className="text-xs text-slate-500">STIG ↔ O*Net finding-level mappings through MWE term overlap. Lifecycle: Auto-Suggested → Team Approved → Auditor Validated ({STIG_ONET_MAPPINGS.length} total)</p>
      {/* Summary row */}
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-2 text-center"><div className="text-lg font-bold text-slate-900">{MAPPING_COUNTS.total}</div><div className="text-[9px] text-slate-500">Total</div></div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-2 text-center"><div className="text-lg font-bold text-amber-600">{MAPPING_COUNTS.suggested}</div><div className="text-[9px] text-amber-600">Suggested</div></div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-2 text-center"><div className="text-lg font-bold text-blue-600">{MAPPING_COUNTS.team_approved}</div><div className="text-[9px] text-blue-600">Team Approved</div></div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-2 text-center"><div className="text-lg font-bold text-emerald-600">{MAPPING_COUNTS.auditor_validated}</div><div className="text-[9px] text-emerald-600">Auditor Validated</div></div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-2 text-center"><div className="text-lg font-bold text-red-500">{MAPPING_COUNTS.team_rejected}</div><div className="text-[9px] text-red-500">Rejected</div></div>
      </div>
      {/* Mapping table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase">
          <div className="bg-slate-50 px-3 py-2">STIG Finding</div>
          <div className="bg-slate-50 px-3 py-2">O*Net Task/Activity</div>
          <div className="bg-slate-50 px-3 py-2">Role</div>
          <div className="bg-slate-50 px-3 py-2">Bridge Terms</div>
          <div className="bg-slate-50 px-3 py-2">Conf.</div>
          <div className="bg-slate-50 px-3 py-2">Status</div>
          <div className="bg-slate-50 px-3 py-2">Actions</div>
        </div>
        <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-100">{STIG_ONET_MAPPINGS.map(m=>{const st=MAPPING_STATUS[m.status];return(
          <div key={m.id} className="grid grid-cols-7 gap-px text-[11px] hover:bg-blue-50/50 transition-colors items-center">
            <div className="px-3 py-2"><span className="font-mono text-indigo-700 text-[10px]">{m.stigFinding}</span></div>
            <div className="px-3 py-2 text-slate-600 text-[10px] truncate">{m.onetTaskText}</div>
            <div className="px-3 py-2 text-[10px] text-slate-500 truncate">{m.onetRole.split(" ").slice(0,2).join(" ")}</div>
            <div className="px-3 py-2"><div className="flex flex-wrap gap-0.5">{m.bridgeTerms.map((bt,i)=><span key={i} className="text-[8px] px-1 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">{bt}</span>)}</div></div>
            <div className="px-3 py-2"><CB s={m.confidence}/></div>
            <div className="px-3 py-2"><span className={`text-[8px] px-1.5 py-0.5 rounded-full font-semibold border ${st.color}`}>{st.label}</span></div>
            <div className="px-3 py-2 flex gap-1">
              {isAdmin&&m.status==="suggested"&&<><button className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">✓</button><button className="text-[9px] px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">✗</button></>}
              {isAuditor&&m.status==="team_approved"&&<><button className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">✔</button><button className="text-[9px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">⚠</button></>}
              {m.status==="auditor_validated"&&<span className="text-[9px] text-emerald-600">✔✔</span>}
              {m.status==="team_rejected"&&<span className="text-[9px] text-red-400">—</span>}
            </div>
          </div>);
        })}</div>
      </div>
      {/* Legacy term-level crosswalk */}
      <details className="bg-white rounded-xl border border-slate-200 p-3">
        <summary className="text-xs text-slate-500 cursor-pointer font-medium">Term-Level Crosswalk (legacy — {CROSSWALK.length} connections)</summary>
        <div className="mt-2 max-h-[200px] overflow-y-auto divide-y divide-slate-100">{CROSSWALK.map((cw,i)=>(
          <div key={i} className="flex items-center gap-3 py-1.5 text-[10px]"><span className="font-mono text-indigo-700 w-28 shrink-0">{cw.stigTerm}</span><ArrowRight size={8} className="text-slate-300"/><span className="font-mono text-cyan-700 w-28 shrink-0">{cw.onetAttr}</span><span className={`px-1 py-0.5 rounded text-[8px] font-semibold ${cw.onetType==="Skill"?"bg-blue-100 text-blue-700":"bg-violet-100 text-violet-700"}`}>{cw.onetType}</span><span className="text-slate-500 truncate flex-1">{cw.role}</span></div>
        ))}</div>
      </details>
    </div>}

    {/* ════════ GAP ANALYSIS ════════ */}
    {nlTab==="gap"&&<div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-indigo-200 p-4">
          <h3 className="text-xs font-semibold text-indigo-700 mb-1 flex items-center gap-1.5"><Shield size={13}/>STIG-Only Terms</h3>
          <p className="text-[10px] text-slate-500 mb-3">Terms in STIGs with no O*Net coverage ({stigOnly.length})</p>
          <div className="space-y-1 max-h-[250px] overflow-y-auto">{stigOnly.map(l=>(
            <div key={l.id} className="flex items-center justify-between px-2 py-1 rounded bg-indigo-50/50">
              <span className="text-[11px] font-mono text-slate-700">{l.term}</span>
              <span className="text-[9px] text-slate-400">{l.cat}</span>
            </div>
          ))}</div>
        </div>
        <div className="bg-white rounded-xl border border-cyan-200 p-4">
          <h3 className="text-xs font-semibold text-cyan-700 mb-1 flex items-center gap-1.5"><Users size={13}/>O*Net-Only Terms</h3>
          <p className="text-[10px] text-slate-500 mb-3">Terms in O*Net with no STIG coverage ({onetOnly.length})</p>
          <div className="space-y-1 max-h-[250px] overflow-y-auto">{onetOnly.map(l=>(
            <div key={l.id} className="flex items-center justify-between px-2 py-1 rounded bg-cyan-50/50">
              <span className="text-[11px] font-mono text-slate-700">{l.term}</span>
              <span className="text-[9px] text-slate-400">{l.cat}</span>
            </div>
          ))}</div>
        </div>
        <div className="bg-white rounded-xl border border-emerald-200 p-4">
          <h3 className="text-xs font-semibold text-emerald-700 mb-1 flex items-center gap-1.5"><Link size={13}/>Coverage Summary</h3>
          <p className="text-[10px] text-slate-500 mb-3">Framework coverage statistics</p>
          <div className="space-y-3">
            <div><div className="flex items-center justify-between text-[11px] mb-1"><span className="text-slate-600">STIG coverage</span><span className="font-semibold text-slate-900">{stigCount}/{MERGED.length}</span></div><div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-indigo-500" style={{width:`${Math.round(stigCount/MERGED.length*100)}%`}}/></div></div>
            <div><div className="flex items-center justify-between text-[11px] mb-1"><span className="text-slate-600">O*Net coverage</span><span className="font-semibold text-slate-900">{onetCount}/{MERGED.length}</span></div><div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-cyan-500" style={{width:`${Math.round(onetCount/MERGED.length*100)}%`}}/></div></div>
            <div><div className="flex items-center justify-between text-[11px] mb-1"><span className="text-slate-600">Overlap rate</span><span className="font-semibold text-slate-900">{bothCount}/{MERGED.length} ({Math.round(bothCount/MERGED.length*100)}%)</span></div><div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{width:`${Math.round(bothCount/MERGED.length*100)}%`}}/></div></div>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10px] text-slate-500 mb-1">Category coverage</p>
              {[...new Set(MERGED.map(m=>m.cat))].sort().slice(0,6).map(cat=>{const catTerms=MERGED.filter(m=>m.cat===cat);const catBoth=catTerms.filter(m=>m.source==="both").length;return(
                <div key={cat} className="flex items-center justify-between text-[10px] py-0.5"><span className="text-slate-600">{cat}</span><span className="text-slate-500">{catTerms.length} terms {catBoth>0&&<span className="text-emerald-600">({catBoth} shared)</span>}</span></div>
              );})}
            </div>
          </div>
        </div>
      </div>
    </div>}

    {/* ════════ KNOWLEDGE GRAPH ════════ */}
    {nlTab==="graph"&&<div className="space-y-4">
      <p className="text-xs text-slate-500">Cross-domain knowledge graph — STIG and O*Net terms connected through semantic relationships</p>
      <ForceGraph terms={graphTerms} triples={graphTriples} width={720} height={420}/>
    </div>}

    {/* ════════ MANAGE ════════ */}
    {nlTab==="manage"&&(isAdmin||isAuditor)&&<div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Pencil size={14}/>{isAuditor?"Auditor Validation Queue":"Unified Lexicon Management"}</h2>
      <p className="text-xs text-slate-500">{isAuditor?"Team-approved STIG ↔ O*Net mappings awaiting your optional validation.":"Review cross-domain proposals, manage mappings, and resolve source conflicts."}</p>

      {/* Mapping review queue */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-2">{isAdmin?<Zap size={12} className="text-amber-500"/>:<ShieldCheck size={12} className="text-teal-500"/>}{isAdmin?"Auto-Suggested Mappings":"Awaiting Validation"}</h3>
        <p className="text-[10px] text-slate-400 mb-3">{isAdmin?`${MAPPING_COUNTS.suggested} mappings pending team review`:`${MAPPING_COUNTS.team_approved} mappings approved by team — validate at your discretion`}</p>
        <div className="space-y-2">
          {STIG_ONET_MAPPINGS.filter(m=>isAdmin?m.status==="suggested":m.status==="team_approved").map(m=>{
            const st=MAPPING_STATUS[m.status];
            return(<div key={m.id} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-blue-50/30 transition-all">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 shrink-0">{m.stigFinding}</span>
                <ArrowRight size={10} className="text-slate-300 shrink-0"/>
                <span className="text-[10px] text-slate-600 truncate">{m.onetTaskText}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono shrink-0">{m.onetOccupation}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <div className="flex gap-0.5">{m.bridgeTerms.map((bt,i)=><span key={i} className="text-[8px] px-1 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">{bt}</span>)}</div>
                <CB s={m.confidence}/>
                {isAdmin&&<><button className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">Approve</button><button className="text-[10px] px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200 font-medium">Reject</button></>}
                {isAuditor&&<><button className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">Validate</button><button className="text-[10px] px-2 py-1 rounded bg-orange-50 text-orange-700 border border-orange-200 font-medium">Dispute</button></>}
              </div>
            </div>);
          })}
          {STIG_ONET_MAPPINGS.filter(m=>isAdmin?m.status==="suggested":m.status==="team_approved").length===0&&<p className="text-[10px] text-slate-400 text-center py-4">No items in queue</p>}
        </div>
      </div>

      {/* Term-level proposals (admin only) */}
      {isAdmin&&<div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-xs font-semibold text-slate-700 mb-3">Pending Cross-Domain Term Proposals</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg border border-amber-200 bg-amber-50/50"><div className="flex items-center gap-2"><span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">access control</span><ArrowRight size={10} className="text-slate-400"/><span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">security settings</span><span className="text-[9px] text-slate-500">proposed synonym</span></div><div className="flex gap-1"><button className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Approve</button><button className="text-[10px] px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200">Reject</button></div></div>
          <div className="flex items-center justify-between p-2 rounded-lg border border-amber-200 bg-amber-50/50"><div className="flex items-center gap-2"><span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">indicators of compromise</span><ArrowRight size={10} className="text-slate-400"/><span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">security breach</span><span className="text-[9px] text-slate-500">proposed related</span></div><div className="flex gap-1"><button className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Approve</button><button className="text-[10px] px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200">Reject</button></div></div>
          <div className="flex items-center justify-between p-2 rounded-lg border border-amber-200 bg-amber-50/50"><div className="flex items-center gap-2"><span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">file integrity</span><ArrowRight size={10} className="text-slate-400"/><span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">vulnerability assessment</span><span className="text-[9px] text-slate-500">proposed related</span></div><div className="flex gap-1"><button className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Approve</button><button className="text-[10px] px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200">Reject</button></div></div>
        </div>
      </div>}

      {/* Audit trail (auditor view) */}
      {isAuditor&&<div className="bg-white rounded-xl border border-emerald-200 p-4">
        <h3 className="text-xs font-semibold text-emerald-700 mb-3 flex items-center gap-2"><ShieldCheck size={12}/>Your Validated Mappings</h3>
        <div className="space-y-1">{STIG_ONET_MAPPINGS.filter(m=>m.status==="auditor_validated").map(m=>(
          <div key={m.id} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 text-[10px]">
            <CheckCircle2 size={10} className="text-emerald-500"/>
            <span className="font-mono text-indigo-700">{m.stigFinding}</span>
            <ArrowRight size={8} className="text-slate-300"/>
            <span className="text-slate-600 truncate flex-1">{m.onetTaskText}</span>
            <span className="text-emerald-600 font-medium">{m.auditorValidatedBy}</span>
            <span className="text-slate-400">{m.auditorValidatedAt}</span>
          </div>
        ))}</div>
      </div>}
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// APP SHELL — Collapsible Left Sidebar
// ═══════════════════════════════════════════════════════════════

const ROLES = { admin: "Mapping Team", auditor: "Auditor", user: "End User" };
const ROLE_CYCLE = ["admin","auditor","user"];

export default function NexusApp() {
  const [page,setPage]=useState("stig-library");
  const [role,setRole]=useState("admin");
  const [sidebarOpen,setSidebarOpen]=useState({stigs:true,onet:false,nexus:false});
  const isAdmin = role === "admin";
  const isAuditor = role === "auditor";
  const canReview = role === "admin" || role === "auditor";

  const toggleSection=(key)=>setSidebarOpen(prev=>({...prev,[key]:!prev[key]}));

  const stigNav=[
    {k:"stig-library",l:"Library",i:Library},
    {k:"stig-dashboard",l:"Dashboard",i:BarChart3},
    {k:"stig-pipeline",l:"Pipeline",i:Activity},
    {k:"stig-exceptions",l:"Exceptions",i:AlertTriangle,badge:EXC.length},
    {k:"stig-lexicon",l:"Lexicon",i:BookOpen,badge:LEX.length},
    {k:"stig-finding",l:"Finding Detail",i:FileText},
  ];
  const onetNav=[
    {k:"onet-library",l:"Library",i:Library},
    {k:"onet-dashboard",l:"Dashboard",i:BarChart3},
    {k:"onet-pipeline",l:"Pipeline",i:Activity},
    {k:"onet-exceptions",l:"Exceptions",i:AlertTriangle,badge:ONET_EXC.length},
    {k:"onet-lexicon",l:"Lexicon",i:BookOpen,badge:ONET_LEX.length},
    {k:"onet-role",l:"Role Detail",i:Briefcase},
  ];

  const NavItem=({item})=><button onClick={()=>setPage(item.k)} className={`w-full flex items-center gap-2 pl-9 pr-3 py-1.5 text-[11px] font-medium transition-all rounded-r-lg ${page===item.k?"bg-blue-50 text-blue-700 border-l-2 border-blue-500":"text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent"}`}><item.i size={12}/>{item.l}{item.badge!=null&&<span className="text-[9px] px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold ml-auto">{item.badge}</span>}</button>;

  return (<div className="min-h-screen bg-slate-50 flex flex-col">
    {/* Top header */}
    <div className="bg-white border-b border-slate-200 px-4 py-2.5 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Database size={16} className="text-white"/></div>
          <div><h1 className="text-sm font-bold text-slate-900">Nexus Platform</h1><p className="text-[10px] text-slate-500">Open Controls — STIG + O*Net Intelligence</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {const idx=ROLE_CYCLE.indexOf(role);setRole(ROLE_CYCLE[(idx+1)%ROLE_CYCLE.length]);}} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${isAdmin?"bg-violet-50 text-violet-700 border-violet-200":isAuditor?"bg-teal-50 text-teal-700 border-teal-200":"bg-slate-50 text-slate-600 border-slate-200"}`}>
            {isAdmin?<Shield size={11}/>:isAuditor?<ShieldCheck size={11}/>:<Eye size={11}/>}
            {ROLES[role]}
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">DC</div>
        </div>
      </div>
    </div>
    {/* Role banner */}
    {isAuditor && <div className="bg-teal-50 border-b border-teal-200 px-4 py-1.5 shrink-0"><div className="flex items-center gap-2 text-[10px] text-teal-700"><ShieldCheck size={10}/>Viewing as Auditor — you can optionally validate team-approved mappings<button onClick={()=>setRole("admin")} className="text-blue-600 hover:text-blue-800 font-medium ml-auto">Switch to Mapping Team</button></div></div>}
    {role==="user" && <div className="bg-slate-100 border-b border-slate-200 px-4 py-1.5 shrink-0"><div className="flex items-center gap-2 text-[10px] text-slate-500"><Eye size={10}/>Viewing as End User — some internal details are hidden<button onClick={()=>setRole("admin")} className="text-blue-600 hover:text-blue-800 font-medium ml-auto">Switch to Mapping Team</button></div></div>}
    {/* Main layout: sidebar + content */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-slate-200 overflow-y-auto shrink-0 py-3">
        {/* STIGs group */}
        <button onClick={()=>toggleSection("stigs")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all">
          {sidebarOpen.stigs?<ChevronDown size={12} className="text-slate-400"/>:<ChevronRight size={12} className="text-slate-400"/>}
          <Shield size={14} className="text-indigo-500"/>
          <span>STIGs</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-bold ml-auto">{STIG_CATALOG.length}</span>
        </button>
        {sidebarOpen.stigs&&<div className="space-y-0.5 pb-2">{stigNav.map(n=><NavItem key={n.k} item={n}/>)}</div>}

        <div className="border-t border-slate-100 my-1"/>

        {/* O*Net group */}
        <button onClick={()=>toggleSection("onet")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all">
          {sidebarOpen.onet?<ChevronDown size={12} className="text-slate-400"/>:<ChevronRight size={12} className="text-slate-400"/>}
          <Users size={14} className="text-cyan-500"/>
          <span>O*Net</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-600 font-bold ml-auto">{ONET_CATALOG.length}</span>
        </button>
        {sidebarOpen.onet&&<div className="space-y-0.5 pb-2">{onetNav.map(n=><NavItem key={n.k} item={n}/>)}</div>}

        <div className="border-t border-slate-100 my-1"/>

        {/* Nexus Lexicon */}
        <button onClick={()=>{toggleSection("nexus");setPage("nexus-lexicon");}} className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all ${page==="nexus-lexicon"?"text-blue-700 bg-blue-50":"text-slate-800 hover:bg-slate-50"}`}>
          <Database size={14} className="text-emerald-500"/>
          <span>Nexus Lexicon</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-bold ml-auto">{LEX.length+ONET_LEX.length}</span>
        </button>
      </div>
      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          {page==="stig-library"&&<LibraryPage nav={setPage} isAdmin={isAdmin}/>}
          {page==="stig-dashboard"&&<DashboardPage nav={setPage} isAdmin={isAdmin}/>}
          {page==="stig-pipeline"&&<PipelinePage nav={setPage}/>}
          {page==="stig-exceptions"&&<ExceptionsPage nav={setPage} isAdmin={isAdmin}/>}
          {page==="stig-lexicon"&&<LexiconPage nav={setPage} isAdmin={isAdmin}/>}
          {page==="stig-finding"&&<FindingPage nav={setPage} isAdmin={isAdmin} isAuditor={isAuditor} role={role}/>}
          {page==="onet-library"&&<OnetLibraryPage nav={setPage} isAdmin={isAdmin} isAuditor={isAuditor} role={role}/>}
          {page==="onet-dashboard"&&<OnetDashboardPage nav={setPage} isAdmin={isAdmin}/>}
          {page==="onet-pipeline"&&<OnetPipelinePage nav={setPage} isAdmin={isAdmin}/>}
          {page==="onet-exceptions"&&<OnetExceptionsPage nav={setPage} isAdmin={isAdmin}/>}
          {page==="onet-lexicon"&&<OnetLexiconPage nav={setPage} isAdmin={isAdmin}/>}
          {page==="onet-role"&&<OnetRoleDetailPage nav={setPage} isAdmin={isAdmin} isAuditor={isAuditor} role={role}/>}
          {page==="nexus-lexicon"&&<NexusLexiconPage nav={setPage} isAdmin={isAdmin} isAuditor={isAuditor} role={role}/>}
        </div>
      </div>
    </div>
  </div>);
}
