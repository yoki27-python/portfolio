/**
 * Interactive Cyber Terminal CLI for Yokeshwaran R
 * Full keyboard navigation, command history, and custom commands
 */

(function () {
  let terminalModal, terminalOutput, terminalInput, terminalCloseBtn;
  let commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<span class="cmd-cyan">AVAILABLE COMMANDS:</span>
  <span class="cmd-green">whoami</span>        - Brief summary of Yokeshwaran R
  <span class="cmd-green">education</span>     - Academic timeline & universities
  <span class="cmd-green">skills</span>        - Technical skills & programming competencies
  <span class="cmd-green">projects</span>      - List of featured software projects
  <span class="cmd-green">chennai</span>       - Information about Alwarpet, Chennai base & timezone
  <span class="cmd-green">contact</span>       - Get direct contact channels & links
  <span class="cmd-green">socials</span>       - GitHub, LinkedIn, and developer profiles
  <span class="cmd-green">date</span>          - Display current local date & IST time
  <span class="cmd-green">sudo hire</span>     - Reason to hire / interview Yokeshwaran
  <span class="cmd-green">clear</span>         - Clear the terminal screen
  <span class="cmd-green">exit</span>          - Close this interactive terminal
`,

    whoami: () => `
<span class="cmd-cyan">NAME:</span> Yokeshwaran R
<span class="cmd-cyan">ROLE:</span> Undergraduate Computer Science Student & Software Builder
<span class="cmd-cyan">COLLEGE:</span> Hindustan College (Batch 2023–2027)
<span class="cmd-cyan">SCHOOL:</span> MCTM School, Chennai
<span class="cmd-cyan">LOCATION:</span> Alwarpet, Chennai, Tamil Nadu, India
<span class="cmd-cyan">STATUS:</span> Actively building full-stack platforms, exploring algorithms & cloud architectures.
<span class="cmd-purple">MISSION:</span> Building reliable, high-performance software that solves real-world challenges.
`,

    education: () => `
<span class="cmd-yellow">🎓 ACADEMIC BACKGROUND:</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. <span class="cmd-cyan">Hindustan College, Chennai</span>
   • Degree: B.Sc. Computer Science (2023 – 2027)
   • Status: Undergraduate Candidate
   • Focus: Data Structures & Algorithms, OOP, Database Systems, Computer Networks, Modern Web Architectures.

2. <span class="cmd-cyan">MCTM School, Chennai</span>
   • Foundational schooling with high academic standing
   • Strong grounding in mathematics, analytical problem solving, and science fundamentals.
`,

    skills: () => `
<span class="cmd-yellow">⚡ TECHNICAL SKILLS ARSENAL:</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• <span class="cmd-cyan">Languages:</span>      C++, Python, JavaScript (ES6+), TypeScript, Java, HTML5/CSS3, SQL
• <span class="cmd-cyan">Frontend:</span>       React.js, Modern CSS3/Tailwind, Responsive UI/UX, Web APIs
• <span class="cmd-cyan">Backend:</span>        Node.js, Express.js, REST APIs, Authentication, Microservices
• <span class="cmd-cyan">Databases:</span>      MySQL, PostgreSQL, MongoDB, Firebase
• <span class="cmd-cyan">Developer Tools:</span> Git & GitHub, Linux/Bash, VS Code, Postman, Vercel
• <span class="cmd-cyan">Core CS:</span>        Data Structures, OOP, Software Design, Algorithm Optimization
`,

    projects: () => `
<span class="cmd-yellow">🚀 FEATURED ENGINEERING PROJECTS:</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. <span class="cmd-green">NexusFlow</span> - Intelligent Task & Real-Time Workflow Engine
   • Stack: React, Node.js, WebSockets, Tailwind CSS, PostgreSQL
2. <span class="cmd-green">AuraStream</span> - High-Performance Telemetry & Analytics Dashboard
   • Stack: TypeScript, Chart.js, Express, Redis, Tailwind
3. <span class="cmd-green">Algoverse</span> - Interactive Algorithm & Graph Visualizer
   • Stack: Vanilla ES6+, Canvas API, Data Structures Engine
4. <span class="cmd-green">SmartCampus</span> - Collegiate Academic & Resource Collaboration Portal
   • Stack: Node.js, Express, MongoDB, EJS/Tailwind

<span class="cmd-muted">Type <span class="cmd-cyan">projects</span> in the main portfolio window to interact with 3D live demos!</span>
`,

    chennai: () => `
<span class="cmd-cyan">📍 LOCATION: ALWARPET, CHENNAI, TAMIL NADU</span>
• Timezone: Indian Standard Time (IST, UTC+05:30)
• Coordinates: 13.0336° N, 80.2520° E
• Cultural hub of Central Chennai, surrounded by premier institutions, tech parks, and thriving dev communities.
`,

    contact: () => `
<span class="cmd-yellow">📫 DIRECT REACH:</span>
• Email:    <a href="mailto:yokeshwaran.dev@gmail.com" class="cmd-cyan">yokeshwaran.dev@gmail.com</a>
• Location: Alwarpet, Chennai, Tamil Nadu, India
• Response: Within 24 hours for internships, hackathons & technical collaborations!
`,

    socials: () => `
<span class="cmd-yellow">🌐 DEVELOPER PROFILES:</span>
• GitHub:   <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="cmd-cyan">github.com/yokeshwaran</a>
• LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="cmd-cyan">linkedin.com/in/yokeshwaran-r</a>
• LeetCode: <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" class="cmd-cyan">leetcode.com/u/yokeshwaran</a>
`,

    date: () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      return `<span class="cmd-green">Current Chennai Time (IST):</span> ${now.toLocaleString('en-IN', options)}`;
    },

    'sudo hire': () => `
<span class="cmd-green">ACCESS GRANTED: Candidate Validation Passed!</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yokeshwaran R brings:
✓ Solid CS fundamentals from Hindustan College (Batch 2023-2027)
✓ Strong analytical base developed at MCTM School
✓ Passionate engineering drive, fast learner, and team collaborator
✓ Proven hands-on project portfolio & dedication to writing clean code
✓ Ready for SDE internships, frontend/backend roles, and technical sprints!

Email: <span class="cmd-cyan">yokeshwaran.dev@gmail.com</span> — Let's connect!
`,

    clear: () => {
      if (terminalOutput) terminalOutput.innerHTML = '';
      return '';
    },

    exit: () => {
      closeTerminal();
      return 'Terminal session closed.';
    }
  };

  function openTerminal() {
    if (!terminalModal) initTerminalElements();
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    terminalModal.setAttribute('aria-hidden', 'false');
    if (terminalInput) terminalInput.focus();
    if (window.soundEngine) window.soundEngine.playChime();
  }

  function closeTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    terminalModal.setAttribute('aria-hidden', 'true');
    if (window.soundEngine) window.soundEngine.playClick();
  }

  function printOutput(inputCmd, response) {
    if (!terminalOutput) return;
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = `
      <div class="terminal-cmd-line">
        <span class="prompt-user">yokeshwaran</span><span class="prompt-at">@</span><span class="prompt-host">chennai</span>:<span class="prompt-path">~</span>$ <span class="cmd-text">${escapeHTML(inputCmd)}</span>
      </div>
      ${response ? `<div class="terminal-response">${response}</div>` : ''}
    `;
    terminalOutput.appendChild(entry);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(cmdRaw);
    historyIndex = commandHistory.length;

    if (window.soundEngine) window.soundEngine.playKey();

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]();
      if (result) printOutput(cmdRaw, result);
    } else {
      printOutput(
        cmdRaw,
        `<span class="cmd-red">command not found: "${escapeHTML(cmd)}".</span> Type <span class="cmd-cyan">help</span> to view available commands.`
      );
    }
  }

  function initTerminalElements() {
    terminalModal = document.getElementById('terminal-modal');
    terminalOutput = document.getElementById('terminal-output');
    terminalInput = document.getElementById('terminal-input');
    terminalCloseBtn = document.getElementById('terminal-close-btn');

    if (!terminalModal || !terminalInput || !terminalOutput) return;

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        handleCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex] || '';
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });

    const triggerBtns = document.querySelectorAll('[data-open-terminal]');
    triggerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openTerminal();
      });
    });

    if (terminalCloseBtn) {
      terminalCloseBtn.addEventListener('click', closeTerminal);
    }

    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) {
        closeTerminal();
      }
    });
  }

  // Hotkey: press `~` or `Ctrl + K` to toggle terminal
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '`' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      if (terminalModal && terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && terminalModal && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalElements);
  } else {
    initTerminalElements();
  }

  window.openTerminal = openTerminal;
  window.runTerminalCommand = function (cmd) {
    openTerminal();
    handleCommand(cmd);
  };
})();
