import React, { useState, useMemo } from "react";
import {
  Shield, AlertTriangle, CheckCircle2, Clock, Pause, XCircle,
  ChevronDown, ChevronRight, ChevronLeft, Brain, FileText, Download,
  Search, ArrowRight, ThumbsUp, Eye, Tag, Layers, Activity, Database,
  Globe, Cpu, Upload, FolderOpen, RefreshCcw, Plus, X, Scale,
  Flag, Bookmark, RotateCcw, Send, Sparkles, ExternalLink, Copy,
  Link, Minimize2, Maximize2, PauseCircle, ChevronUp,
  BookOpen, Hash, TrendingUp, ArrowUpDown, Filter
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
      <button onClick={()=>nav("exceptions")} className="text-xs px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700 flex items-center gap-1.5 font-medium"><AlertTriangle size={13}/>{EXC.length} Exceptions</button>
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
          <tr className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer text-xs transition-colors ${exp===f.id?"bg-slate-50":""} ${f.st==="at_checkpoint"?"bg-orange-50/30":""}`} onClick={()=>{if(f.st==="completed"&&f.id==="V-268078")nav("finding");else setExp(exp===f.id?null:f.id);}}>
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

function ExceptionsPage({nav}) {
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
            <button onClick={()=>setResolved([...resolved,exc.id])} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 font-medium flex items-center gap-1.5"><CheckCircle2 size={13}/>Approve</button>
            <button onClick={()=>setResolved([...resolved,exc.id])} className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium flex items-center gap-1.5"><XCircle size={13}/>Reject</button>
            {exc.type==="contested"&&<button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-1.5"><RotateCcw size={13}/>Reconvene</button>}
            <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium ml-auto flex items-center gap-1.5"><Bookmark size={13}/>Defer</button>
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

function FindingPage({nav}) {
  const f=ALL[0];
  const [showV,setShowV]=useState(true);
  const [showP,setShowP]=useState(false);
  const [ci,setCi]=useState("");

  const prov=[
    {s:"RAG Ingest",ts:"09:14:00",d:"Ingested Anduril NixOS STIG V1 into vector store, 312 chunks across 104 findings"},
    {s:"Parse Finding",ts:"09:14:08",d:"Extracted V-268078, medium severity, SRG-OS-000298-GPOS-00116 + 3 related SRGs"},
    {s:"MWE Pass 1",ts:"09:14:22",d:`${f.m1.length} terms tagged from vuln discussion — remote access, information system, network firewall`},
    {s:"Atomize",ts:"09:14:51",d:`${detailMandates.length} mandates extracted (3 deterministic, 2 claimify)`},
    {s:"MWE Pass 2",ts:"09:15:18",d:`${f.m2.length} term instances across mandates, 1 new candidate: 'configuration baseline'`},
    {s:"SCL Classify",ts:"09:16:14",d:"All 5 mandates classified via Shannon cognitive load. Range: Remember → Evaluate. Min entropy confidence 0.78 on mandate #5"},
  ];

  return(<div className="space-y-5">
    <div className="flex items-center gap-1.5 text-xs text-slate-500"><button onClick={()=>nav("pipeline")} className="hover:text-blue-600">Pipeline</button><ChevronRight size={12}/><span className="text-slate-700 font-medium">{f.id}</span></div>
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-3 space-y-4">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1"><span className="font-mono text-sm font-bold text-slate-800">{f.id}</span><Sev l={f.severity}/></div>
          <h1 className="text-sm font-semibold text-slate-900 mb-2">{f.title}</h1>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><Database size={11}/>Anduril NixOS STIG V1</span>
            <span className="flex items-center gap-1"><Clock size={11}/>{f.time}</span>
            <span className="flex items-center gap-1"><Layers size={11}/>{detailMandates.length} mandates</span>
            <span className="flex items-center gap-1"><Tag size={11}/>{f.m1.length} MWE terms</span>
          </div>
        </div>
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
        {/* Provenance */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <button onClick={()=>setShowP(!showP)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50"><span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><Activity size={13}/>Pipeline Provenance</span>{showP?<ChevronDown size={14} className="text-slate-400"/>:<ChevronRight size={14} className="text-slate-400"/>}</button>
          {showP&&<div className="px-4 pb-3 border-t border-slate-100 pt-3">{prov.map((p,i)=><div key={i} className="flex gap-3"><div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"/>{i<prov.length-1&&<div className="w-px flex-1 bg-emerald-200 my-1"/>}</div><div className="pb-2.5"><div className="flex items-center gap-2"><span className="text-[11px] font-semibold text-slate-700">{p.s}</span><span className="text-[10px] text-slate-400 font-mono">{p.ts}</span></div><p className="text-[11px] text-slate-500">{p.d}</p></div></div>)}</div>}
        </div>
      </div>
      {/* Chat */}
      <div className="col-span-2"><div className="bg-white rounded-xl border border-slate-200 flex flex-col sticky top-4" style={{minHeight:480}}>
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2"><Sparkles size={14} className="text-indigo-500"/><span className="text-xs font-bold text-slate-800">Nexus AI Assistant</span></div>
        <div className="px-4 py-1.5 bg-indigo-50 border-b border-indigo-100 text-[10px] text-indigo-600 flex items-center gap-1"><Link size={9}/>Context: {f.id} — NixOS firewall | {detailMandates.length} mandates, {f.m1.length} MWE terms</div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{maxHeight:340}}>
          {chatMsgs.map((m,i)=><div key={i}>
            {m.role==="user"?<div className="flex justify-end"><div className="bg-blue-500 text-white rounded-xl rounded-tr-sm px-3 py-2 max-w-[90%]"><p className="text-xs leading-relaxed">{m.text}</p></div></div>
            :<div><div className="bg-slate-50 rounded-xl rounded-tl-sm px-3 py-2"><p className="text-xs text-slate-700 leading-relaxed">{m.text}</p><div className="flex items-center mt-2"><span className={`text-[10px] font-semibold tabular-nums ${Math.round(m.conf*100)>=85?"text-emerald-600":"text-amber-600"}`}>{Math.round(m.conf*100)}% confidence</span></div></div></div>}
          </div>)}
        </div>
        <div className="px-4 py-3 border-t border-slate-200"><div className="flex gap-2"><input type="text" value={ci} onChange={e=>setCi(e.target.value)} placeholder="Ask about this finding..." className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"/><button className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"><Send size={14}/></button></div><div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400"><Sparkles size={9}/>AI-assisted analysis based on finding context</div></div>
      </div></div>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// PAGE 4: LEXICON BROWSER
// ═══════════════════════════════════════════════════════════════

const LEX = [
  {id:"lex-001",term:"audit record",status:"validated",pass1:true,pass2:true,freq:67,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.97,cat:"Audit & Logging",def:"A chronological record of system activities sufficient to enable reconstruction, review, and examination of the sequence of events surrounding or leading to an operation, procedure, or event.",related:["audit log","audit daemon","audit trail preservation"],cciRefs:["CCI-000130","CCI-000131","CCI-000132"]},
  {id:"lex-002",term:"audit daemon",status:"validated",pass1:true,pass2:true,freq:42,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.95,cat:"Audit & Logging",def:"The background process (auditd) responsible for writing audit records to disk. Critical for maintaining continuous audit coverage per DISA STIG requirements.",related:["audit record","audit log"],cciRefs:["CCI-000135","CCI-000136"]},
  {id:"lex-003",term:"access control",status:"validated",pass1:true,pass2:true,freq:89,stigs:6,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.88,cat:"Access Management",def:"The process of granting or denying specific requests to obtain and use information and related information processing services.",related:["privileged account","authentication mechanism","account lockout"],cciRefs:["CCI-000213","CCI-000764"]},
  {id:"lex-004",term:"remote access",status:"validated",pass1:true,pass2:true,freq:34,stigs:5,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.96,cat:"Network Security",def:"Access to DOD nonpublic information systems by an authorized user communicating through an external, non-organization-controlled network.",related:["remote access functionality","DOD-approved encryption"],cciRefs:["CCI-001453","CCI-002418"]},
  {id:"lex-005",term:"information system",status:"validated",pass1:true,pass2:false,freq:112,stigs:8,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"TAG"},conf:0.82,cat:"General",def:"A discrete set of information resources organized for the collection, processing, maintenance, use, sharing, dissemination, or disposition of information. Per NIST SP 800-18.",related:["organizational information systems"],cciRefs:["CCI-000366"]},
  {id:"lex-006",term:"cryptographic module",status:"validated",pass1:true,pass2:true,freq:28,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.98,cat:"Cryptography",def:"The set of hardware, software, and/or firmware that implements approved security functions and is contained within the cryptographic boundary. Validated through FIPS 140-2/140-3.",related:["DOD-approved encryption","FIPS-validated cryptography","disk encryption"],cciRefs:["CCI-002450","CCI-002476"]},
  {id:"lex-007",term:"kernel module",status:"validated",pass1:true,pass2:true,freq:18,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.94,cat:"System Integrity",def:"Dynamically loadable code that extends kernel functionality without reboot. Loading/unloading monitored via init_module, finit_module, and delete_module syscalls.",related:["kernel module loading","system call"],cciRefs:["CCI-000172"]},
  {id:"lex-008",term:"authentication mechanism",status:"validated",pass1:true,pass2:true,freq:31,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.86,cat:"Access Management",def:"The method used to verify the identity of a user, process, or device as a prerequisite to allowing access to resources in an information system.",related:["account lockout","password complexity","privileged account"],cciRefs:["CCI-000765","CCI-000766"]},
  {id:"lex-009",term:"account lockout",status:"validated",pass1:true,pass2:true,freq:22,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.93,cat:"Access Management",def:"Security mechanism that disables a user account after a specified number of consecutive failed authentication attempts within a defined time window.",related:["consecutive invalid login attempts","authentication mechanism"],cciRefs:["CCI-000044","CCI-002238"]},
  {id:"lex-010",term:"password complexity",status:"validated",pass1:true,pass2:false,freq:26,stigs:5,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.84,cat:"Access Management",def:"The measure of effectiveness of a password in resisting attempts at guessing and brute-force attacks based on character composition requirements.",related:["authentication mechanism"],cciRefs:["CCI-000192","CCI-000193","CCI-000194"]},
  {id:"lex-011",term:"session lock",status:"validated",pass1:true,pass2:true,freq:19,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.95,cat:"Access Management",def:"A temporary action that prevents further access to the system by blanking the display or other mechanism while preserving the user session state.",related:["remote access"],cciRefs:["CCI-000056","CCI-000058"]},
  {id:"lex-012",term:"system call",status:"validated",pass1:true,pass2:true,freq:53,stigs:3,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"TAG"},conf:0.81,cat:"Audit & Logging",def:"The programmatic way a process requests service from the kernel. Specific syscalls (open, chmod, chown, etc.) must be audited per STIG requirements.",related:["audit record","kernel module"],cciRefs:["CCI-000172","CCI-000130"]},
  {id:"lex-013",term:"privileged account",status:"validated",pass1:true,pass2:true,freq:15,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.96,cat:"Access Management",def:"An information system account with authorizations of a privileged user — elevated rights that can affect system security posture.",related:["access control","authentication mechanism"],cciRefs:["CCI-000015","CCI-000764"]},
  {id:"lex-014",term:"network firewall",status:"validated",pass1:true,pass2:true,freq:12,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.97,cat:"Network Security",def:"A device or software that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies.",related:["firewall rules","remote access"],cciRefs:["CCI-002314","CCI-000382"]},
  {id:"lex-015",term:"disk encryption",status:"validated",pass1:true,pass2:false,freq:8,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.87,cat:"Cryptography",def:"Cryptographic protection of data stored on secondary storage devices to prevent unauthorized access to information at rest.",related:["cryptographic module","FIPS-validated cryptography"],cciRefs:["CCI-002476"]},
  {id:"lex-016",term:"file integrity",status:"validated",pass1:true,pass2:true,freq:14,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.94,cat:"System Integrity",def:"Verification that files have not been tampered with by comparing current state against known-good baselines using cryptographic hashes.",related:["audit record","configuration baseline"],cciRefs:["CCI-001744","CCI-002702"]},
  {id:"lex-017",term:"audit log",status:"validated",pass1:true,pass2:true,freq:38,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.85,cat:"Audit & Logging",def:"The persistent storage of audit records, typically files written by the audit daemon. Must be protected from unauthorized modification or deletion.",related:["audit record","audit daemon"],cciRefs:["CCI-000162","CCI-000163"]},
  {id:"lex-018",term:"certificate validation",status:"validated",pass1:true,pass2:false,freq:9,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.92,cat:"Cryptography",def:"The process of verifying digital certificate authenticity, revocation status, and trust chain to a recognized Certificate Authority.",related:["cryptographic module"],cciRefs:["CCI-002470"]},
  {id:"lex-019",term:"kernel module loading",status:"candidate",pass1:true,pass2:false,freq:6,stigs:1,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.78,cat:"System Integrity",def:"The mechanism of dynamically inserting code into the running kernel via init_module or finit_module syscalls. Candidate — under council review.",related:["kernel module","system call"],cciRefs:["CCI-000172"]},
  {id:"lex-020",term:"consecutive invalid login attempts",status:"contested",pass1:true,pass2:false,freq:11,stigs:3,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.58,cat:"Access Management",def:"A sequence of failed authentication events by the same user without an intervening success. Council split 2-2 on whether this is compositional or a policy-specific MWE.",related:["account lockout","authentication mechanism"],cciRefs:["CCI-000044"]},
  {id:"lex-021",term:"DOD-approved encryption",status:"contested",pass1:false,pass2:true,freq:14,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"NO_TAG"},conf:0.62,cat:"Cryptography",def:"Encryption using cryptographic algorithms validated through the FIPS 140 process and approved by NSA for DOD use. Council split 2-2 on compositional vs. regulatory MWE.",related:["cryptographic module","FIPS-validated cryptography"],cciRefs:["CCI-002418","CCI-002421"]},
  {id:"lex-022",term:"emergency account",status:"candidate",pass1:false,pass2:false,freq:4,stigs:1,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.52,cat:"Access Management",def:"A temporary user account created under exigent circumstances with a mandatory 72-hour expiration. Candidate term — low frequency, unclear MWE boundary.",related:["privileged account"],cciRefs:["CCI-000016"]},
  {id:"lex-023",term:"configuration baseline",status:"candidate",pass1:false,pass2:true,freq:7,stigs:2,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.55,cat:"System Integrity",def:"A documented set of specifications for an information system that has been formally reviewed and agreed upon as the basis for further development or change. Candidate — council split.",related:["file integrity"],cciRefs:["CCI-000366"]},
  {id:"lex-024",term:"remote access functionality",status:"candidate",pass1:false,pass2:true,freq:5,stigs:1,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.74,cat:"Network Security",def:"The set of capabilities enabling users to access systems from external networks. Candidate — may be superset of 'remote access' MWE.",related:["remote access","automatic disconnect capability"],cciRefs:["CCI-001453"]},
  {id:"lex-025",term:"automatic disconnect capability",status:"candidate",pass1:false,pass2:true,freq:3,stigs:1,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.48,cat:"Network Security",def:"The ability to terminate remote sessions without manual intervention based on policy triggers (time, threat detection). Low frequency — under review.",related:["remote access functionality","remote access"],cciRefs:["CCI-002361"]},
  {id:"lex-026",term:"indicators of compromise",status:"validated",pass1:true,pass2:true,freq:16,stigs:3,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.97,cat:"Threat Detection",def:"Artifacts observed on a network or in an operating system that indicate a computer intrusion with high confidence. Well-established security term (IoCs).",related:["adverse information"],cciRefs:["CCI-002361","CCI-002684"]},
  {id:"lex-027",term:"firewall rules",status:"validated",pass1:true,pass2:true,freq:10,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.83,cat:"Network Security",def:"The set of conditions and actions that determine how network traffic is filtered — defined declaratively in NixOS via configuration.nix.",related:["network firewall","NixOS declarative configuration"],cciRefs:["CCI-000382"]},
  {id:"lex-028",term:"NixOS built-in firewall",status:"candidate",pass1:false,pass2:true,freq:2,stigs:1,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.54,cat:"Network Security",def:"The iptables/nftables-based firewall managed declaratively through networking.firewall.enable in NixOS. Platform-specific term — under review.",related:["network firewall","firewall rules","NixOS declarative configuration"],cciRefs:["CCI-002314"]},
  {id:"lex-029",term:"NixOS declarative configuration",status:"candidate",pass1:false,pass2:true,freq:3,stigs:1,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"NO_TAG",David:"TAG"},conf:0.46,cat:"System Integrity",def:"The functional configuration model used by NixOS where system state is defined in /etc/nixos/configuration.nix. Platform-specific — may not generalize.",related:["configuration baseline","NixOS built-in firewall"],cciRefs:["CCI-000366"]},
  {id:"lex-030",term:"mission functions",status:"candidate",pass1:false,pass2:true,freq:8,stigs:3,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"NO_TAG"},conf:0.38,cat:"General",def:"Organizational operations essential to achieving the mission objective. Very broad term — likely compositional rather than MWE.",related:["organizational information systems"],cciRefs:["CCI-000366"]},
  {id:"lex-031",term:"organizational information systems",status:"validated",pass1:true,pass2:true,freq:21,stigs:5,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"NO_TAG"},conf:0.83,cat:"General",def:"Information systems operated by an organization or on behalf of an organization, including those operated by contractors. Regulatory term of art.",related:["information system","mission functions"],cciRefs:["CCI-000366"]},
  {id:"lex-032",term:"adverse information",status:"candidate",pass1:false,pass2:true,freq:4,stigs:1,council:{Alice:"NO_TAG",Bob:"NO_TAG",Clara:"TAG",David:"TAG"},conf:0.49,cat:"Threat Detection",def:"Information that adversely reflects on the integrity or character of a cleared individual, or data suggesting hostile activity. Under review.",related:["indicators of compromise"],cciRefs:["CCI-002361"]},
  {id:"lex-033",term:"operating system",status:"validated",pass1:true,pass2:true,freq:98,stigs:8,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.99,cat:"General",def:"System software that manages computer hardware and software resources and provides common services for computer programs.",related:["information system"],cciRefs:["CCI-000366"]},
  {id:"lex-034",term:"privilege escalation",status:"candidate",pass1:false,pass2:false,freq:7,stigs:2,council:{Alice:"TAG",Bob:"TAG",Clara:"NO_TAG",David:"TAG"},conf:0.76,cat:"Access Management",def:"The exploitation of a programming error, design flaw, or configuration oversight to gain elevated access to resources normally protected from a user.",related:["privileged account","access control"],cciRefs:["CCI-000015"]},
  {id:"lex-035",term:"execution control policy",status:"candidate",pass1:false,pass2:false,freq:3,stigs:1,council:{Alice:"NO_TAG",Bob:"TAG",Clara:"NO_TAG",David:"NO_TAG"},conf:0.32,cat:"System Integrity",def:"Organizational policy governing which binaries and scripts may execute on a system. Low consensus — likely compositional.",related:["configuration baseline"],cciRefs:["CCI-001774"]},
  {id:"lex-036",term:"audit trail preservation",status:"candidate",pass1:false,pass2:false,freq:5,stigs:2,council:{Alice:"TAG",Bob:"NO_TAG",Clara:"TAG",David:"NO_TAG"},conf:0.51,cat:"Audit & Logging",def:"The protection of audit records from unauthorized alteration, deletion, or overwriting. Council split — may overlap with 'audit log' protection.",related:["audit log","audit record"],cciRefs:["CCI-000162","CCI-000163"]},
  {id:"lex-037",term:"FIPS-validated cryptography",status:"validated",pass1:true,pass2:true,freq:19,stigs:4,council:{Alice:"TAG",Bob:"TAG",Clara:"TAG",David:"TAG"},conf:0.98,cat:"Cryptography",def:"Cryptographic modules that have been tested and validated against FIPS 140-2 or FIPS 140-3 standards by an accredited Cryptographic Module Testing Laboratory.",related:["cryptographic module","DOD-approved encryption"],cciRefs:["CCI-002450"]},
];

const LEX_CATS = [...new Set(LEX.map(l=>l.cat))].sort();
const LEX_VALIDATED = LEX.filter(l=>l.status==="validated").length;
const LEX_CANDIDATE = LEX.filter(l=>l.status==="candidate").length;
const LEX_CONTESTED = LEX.filter(l=>l.status==="contested").length;

function LexiconPage({nav}) {
  const [search,setSearch]=useState("");
  const [catFilter,setCatFilter]=useState("all");
  const [statusFilter,setStatusFilter]=useState("all");
  const [sort,setSort]=useState("freq");
  const [expanded,setExpanded]=useState(null);

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

  const stColor={validated:{bg:"bg-emerald-100",text:"text-emerald-700",border:"border-emerald-200"},candidate:{bg:"bg-amber-100",text:"text-amber-700",border:"border-amber-200"},contested:{bg:"bg-red-100",text:"text-red-700",border:"border-red-200"}};

  return (<div className="space-y-5">
    <div className="flex items-center justify-between">
      <div><h1 className="text-lg font-bold text-slate-900 flex items-center gap-2"><BookOpen size={18}/>MWE Lexicon</h1><p className="text-xs text-slate-500">Multi-Word Expression dictionary — {LEX.length} terms across {LEX_CATS.length} categories</p></div>
    </div>
    {/* Summary cards */}
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><BookOpen size={13} className="text-slate-400"/><span className="text-[11px] text-slate-500">Total Terms</span></div><div className="text-xl font-bold text-slate-900 tabular-nums">{LEX.length}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><CheckCircle2 size={13} className="text-emerald-500"/><span className="text-[11px] text-slate-500">Validated</span></div><div className="text-xl font-bold text-emerald-600 tabular-nums">{LEX_VALIDATED}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Plus size={13} className="text-amber-500"/><span className="text-[11px] text-slate-500">Candidates</span></div><div className="text-xl font-bold text-amber-600 tabular-nums">{LEX_CANDIDATE}</div></div>
      <div className="bg-white rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 mb-1"><Scale size={13} className="text-red-500"/><span className="text-[11px] text-slate-500">Contested</span></div><div className="text-xl font-bold text-red-600 tabular-nums">{LEX_CONTESTED}</div></div>
    </div>
    {/* Filters */}
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative flex-1 min-w-[180px] max-w-xs"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Search terms or definitions..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"/></div>
      <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Status</option><option value="validated">Validated ({LEX_VALIDATED})</option><option value="candidate">Candidate ({LEX_CANDIDATE})</option><option value="contested">Contested ({LEX_CONTESTED})</option></select>
      <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="all">All Categories</option>{LEX_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select>
      <select value={sort} onChange={e=>setSort(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"><option value="freq">Sort: Frequency</option><option value="conf">Sort: Confidence</option><option value="alpha">Sort: A-Z</option><option value="stigs">Sort: STIG Coverage</option></select>
      <span className="text-[11px] text-slate-400 ml-auto">{filtered.length} terms</span>
    </div>
    {/* Term list */}
    <div className="space-y-2">{filtered.map(l=>{
      const sc=stColor[l.status];
      const isExp=expanded===l.id;
      const votes=Object.entries(l.council);
      const tagCount=votes.filter(([,v])=>v==="TAG").length;
      return (<div key={l.id} className={`bg-white rounded-xl border ${isExp?"border-blue-300 shadow-sm":"border-slate-200"} overflow-hidden transition-all`}>
        <button onClick={()=>setExpanded(isExp?null:l.id)} className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-slate-900 font-mono">"{l.term}"</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.text} border ${sc.border}`}>{l.status==="validated"&&<CheckCircle2 size={9}/>}{l.status==="contested"&&<Scale size={9}/>}{l.status==="candidate"&&<Plus size={9}/>}{l.status}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{l.cat}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{l.def}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-center"><div className="text-sm font-bold text-slate-700 tabular-nums">{l.freq}</div><div className="text-[9px] text-slate-400">hits</div></div>
              <div className="text-center"><div className="text-sm font-bold text-slate-700 tabular-nums">{l.stigs}</div><div className="text-[9px] text-slate-400">STIGs</div></div>
              <div className="text-center"><div className="flex items-center gap-0.5">{votes.map(([n,v])=><div key={n} className={`w-3 h-3 rounded-full text-[6px] font-bold flex items-center justify-center ${v==="TAG"?"bg-emerald-400 text-white":"bg-red-300 text-white"}`}>{n[0]}</div>)}</div><div className="text-[9px] text-slate-400">{tagCount}/4</div></div>
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
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Council Votes</p>
              <div className="grid grid-cols-4 gap-1.5">{votes.map(([n,v])=><div key={n} className={`rounded-lg border p-2 text-center ${v==="TAG"?"border-emerald-200 bg-emerald-50/50":"border-red-200 bg-red-50/50"}`}><AA name={n} vote={v} sz="sm"/></div>)}</div>
            </div>
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
    })}</div>
    {filtered.length===0&&<div className="bg-white rounded-xl border border-slate-200 py-12 text-center"><Search size={36} className="mx-auto text-slate-300 mb-2"/><h3 className="text-sm font-semibold text-slate-700">No matching terms</h3><p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p></div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// APP SHELL
// ═══════════════════════════════════════════════════════════════

export default function NexusApp() {
  const [page,setPage]=useState("pipeline");
  const nav=[{k:"pipeline",l:"Pipeline",i:Activity},{k:"exceptions",l:"Exceptions",i:AlertTriangle,badge:EXC.length},{k:"lexicon",l:"Lexicon",i:BookOpen,badge:LEX.length},{k:"finding",l:"Finding Detail",i:FileText}];
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-white border-b border-slate-200 px-6 py-2.5">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Database size={16} className="text-white"/></div><div><h1 className="text-sm font-bold text-slate-900">Nexus Platform</h1><p className="text-[10px] text-slate-500">Open Controls — Anduril NixOS STIG</p></div></div>
        <div className="flex items-center gap-1">{nav.map(n=><button key={n.k} onClick={()=>setPage(n.k)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${page===n.k?"bg-blue-50 text-blue-700":"text-slate-500 hover:bg-slate-50"}`}><n.i size={13}/>{n.l}{n.badge&&<span className="text-[9px] px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold">{n.badge}</span>}</button>)}</div>
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">DC</div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-6 py-6">
      {page==="pipeline"&&<PipelinePage nav={setPage}/>}
      {page==="exceptions"&&<ExceptionsPage nav={setPage}/>}
      {page==="lexicon"&&<LexiconPage nav={setPage}/>}
      {page==="finding"&&<FindingPage nav={setPage}/>}
    </div>
  </div>);
}
