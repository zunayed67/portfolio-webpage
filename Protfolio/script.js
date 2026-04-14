   (function(){
      "use strict";

      // ---------- DATA ----------
      const name = "Zunayed Hossain";
      const age = 24;
      const skills = ["HTML", "CSS", "JavaScript", "MERN", "SQL", "C++"];
      const skillIcons = {
        "HTML": "fab fa-html5",
        "CSS": "fab fa-css3-alt",
        "JavaScript": "fab fa-js",
        "MERN": "fas fa-layer-group",
        "SQL": "fas fa-database",
        "C++": "fas fa-copyright"
      };
      
      const contactInfo = {
        email: "zunayedhossen719@gmail.com",
        whatsapp: "+8801819776678",
        displayWhatsapp: "+880 1819-776678"
      };

      const githubUrl = "https://github.com/zunayed67";
      const linkedinUrl = "https://www.linkedin.com/in/zunayed-hossen-b28b98337/";

      // ---------- RENDER SKILLS ----------
      const skillContainer = document.getElementById('skillContainer');
      function renderSkills() {
        if (!skillContainer) return;
        let htmlStr = '';
        skills.forEach(skill => {
          const iconClass = skillIcons[skill] || 'fas fa-code';
          htmlStr += `<span class="skill-tag"><i class="${iconClass}"></i> ${skill}</span>`;
        });
        skillContainer.innerHTML = htmlStr;
      }
      renderSkills();

      // age display
      const ageSpan = document.getElementById('ageDisplay');
      if (ageSpan) ageSpan.textContent = age;

      // ---------- TOAST SYSTEM ----------
      const toast = document.getElementById('liveToast');
      let toastTimer = null;
      function showToast(message, isSuccess = true) {
        if (!toast) return;
        toast.textContent = message || '📋 Copied to clipboard';
        toast.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('show');
        }, 2000);
      }

      // ---------- COPY FUNCTIONALITY ----------
      async function copyTextToClipboard(text) {
        try {
          await navigator.clipboard.writeText(text);
          showToast(`✅ Copied: ${text}`);
        } catch (err) {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          showToast(`📎 Copied (fallback): ${text}`);
        }
      }

      function initCopyButtons() {
        const copyBadges = document.querySelectorAll('.copy-badge');
        copyBadges.forEach(badge => {
          badge.addEventListener('click', (e) => {
            e.stopPropagation();
            const copyValue = badge.getAttribute('data-copy');
            if (copyValue) {
              copyTextToClipboard(copyValue);
            }
          });
        });
      }

      // Update contact display
      const whatsappDetail = document.querySelector('#whatsappContact .contact-detail');
      if (whatsappDetail) {
        const small = whatsappDetail.querySelector('small');
        const textNode = document.createTextNode(contactInfo.displayWhatsapp);
        while (whatsappDetail.firstChild) whatsappDetail.removeChild(whatsappDetail.firstChild);
        whatsappDetail.appendChild(textNode);
        whatsappDetail.appendChild(small);
      }

      // Set copy attributes
      const waCopyBadge = document.querySelector('#whatsappContact .copy-badge');
      if (waCopyBadge) waCopyBadge.setAttribute('data-copy', contactInfo.whatsapp);
      
      const emailCopyBadge = document.querySelector('#emailContact .copy-badge');
      if (emailCopyBadge) emailCopyBadge.setAttribute('data-copy', contactInfo.email);

      initCopyButtons();

      // ---------- PROJECT LINKS (open GitHub/LinkedIn) ----------
      const projectLinks = document.querySelectorAll('.project-link');
      projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Open GitHub in new tab
          window.open(githubUrl, '_blank');
          showToast(`🚀 Opening GitHub · ${githubUrl}`, true);
        });
      });

      // Also entire project card click opens GitHub
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
          // Prevent if clicking on link itself (already handled)
          if (e.target.closest('.project-link')) return;
          window.open(githubUrl, '_blank');
          showToast(`📁 View projects on GitHub`, true);
        });
      });

      // Social cards already have href, but we can add tracking toast
      const githubCard = document.getElementById('githubCard');
      const linkedinCard = document.getElementById('linkedinCard');
      
      githubCard.addEventListener('click', (e) => {
        // let it open normally, just show toast
        showToast(`🔗 Opening GitHub profile`, true);
      });
      
      linkedinCard.addEventListener('click', (e) => {
        showToast(`💼 Opening LinkedIn profile`, true);
      });

      // ---------- INTERACTIVE BUTTONS ----------
      const greetBtn = document.getElementById('greetBtn');
      const hintBtn = document.getElementById('portfolioHintBtn');

      greetBtn.addEventListener('click', () => {
        showToast(`👋 Hey! I'm ${name}, ${age} — check out my projects!`, true);
      });

      hintBtn.addEventListener('click', () => {
        const birthYearGuess = new Date().getFullYear() - age;
        showToast(`🎂 ${name} is ${age} years old · born around ${birthYearGuess}`, true);
        
        const badge = document.querySelector('.badge-age');
        if (badge) {
          badge.style.transition = '0.2s';
          badge.style.background = '#2b5580';
          badge.style.borderColor = '#6ea9e0';
          setTimeout(() => {
            badge.style.background = '#1e3a5f';
            badge.style.borderColor = '#2e5f8e';
          }, 300);
        }
      });

      // double click on avatar
      const avatar = document.querySelector('.avatar-wrapper');
      if (avatar) {
        avatar.addEventListener('dblclick', () => {
          showToast(`✨ ${name} · MERN & C++ developer`, true);
        });
      }

      // Contact detail click hint
      document.querySelectorAll('.contact-detail').forEach(el => {
        el.style.cursor = 'default';
        el.addEventListener('click', (e) => {
          if (!e.target.closest('.copy-badge')) {
            const parent = el.closest('.contact-item');
            const copyBtn = parent?.querySelector('.copy-badge');
            if (copyBtn) {
              showToast(`💡 Click "copy" to save contact`, false);
            }
          }
        });
      });

      toast.addEventListener('click', () => {
        toast.classList.remove('show');
        if (toastTimer) clearTimeout(toastTimer);
      });

      console.log(`👨‍💻 Portfolio of ${name} | Age: ${age} | GitHub: ${githubUrl} | LinkedIn: ${linkedinUrl}`);
    })();