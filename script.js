// Function to show a specific rule section
function showRule(ruleNumber) {
  // Hide all rule sections
  const allRules = document.querySelectorAll(".rule-section");
  allRules.forEach((rule) => {
    rule.classList.remove("active");
  });

  // Show the selected rule
  const selectedRule = document.getElementById(`rule-${ruleNumber}`);
  if (selectedRule) {
    selectedRule.classList.add("active");

    // Smooth scroll to the rule section
    selectedRule.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Update button states
  const allButtons = document.querySelectorAll(".rule-btn");
  allButtons.forEach((btn, index) => {
    if (index + 1 === ruleNumber) {
      btn.style.borderColor = "var(--primary-color)";
      btn.style.background = "var(--bg-secondary)";
    } else {
      btn.style.borderColor = "var(--border-color)";
      btn.style.background = "white";
    }
  });
}

// Text-to-Speech function for French words
function speakFrench(text) {
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR"; // French language
  utterance.rate = 0.8; // Slightly slower for learning
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to use a French voice if available
  const voices = window.speechSynthesis.getVoices();
  const frenchVoice = voices.find((voice) => voice.lang.startsWith("fr"));
  if (frenchVoice) {
    utterance.voice = frenchVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// Load voices (some browsers need this)
window.speechSynthesis.onvoiceschanged = function () {
  window.speechSynthesis.getVoices();
};

// Translation dictionary for French to English
const translations = {
  "un chat": "a cat",
  "des chats": "cats",
  "une pomme": "an apple",
  "des pommes": "apples",
  "le livre": "the book",
  "les livres": "the books",
  "la table": "the table",
  "les tables": "the tables",
  "un cheval": "a horse",
  "des chevaux": "horses",
  "la maison": "the house",
  "les maisons": "the houses",
  "un choix": "a choice",
  "des choix": "choices",
  "un nez": "a nose",
  "des nez": "noses",
  "un fils": "a son",
  "des fils": "sons",
  "un tableau": "a painting/board",
  "des tableaux": "paintings/boards",
  "un gâteau": "a cake",
  "des gâteaux": "cakes",
  "un jeu": "a game",
  "des jeux": "games",
  "un animal": "an animal",
  "des animaux": "animals",
  "un journal": "a newspaper",
  "des journaux": "newspapers",
  "un bijou": "a jewel",
  "des bijoux": "jewels",
  "un caillou": "a pebble",
  "des cailloux": "pebbles",
  "un chou": "a cabbage",
  "des choux": "cabbages",
  "un genou": "a knee",
  "des genoux": "knees",
  "un hibou": "an owl",
  "des hiboux": "owls",
  "un joujou": "a toy",
  "des joujoux": "toys",
  "un pou": "a louse",
  "des poux": "lice",
  "les chats": "the cats",
  "des livres": "(some) books",
  "des fruits": "(some) fruits",
  "grandes maisons": "big houses",
  "les enfants jouent": "the children are playing",
  "ces chaises": "these chairs",
  "ses amis": "his/her friends",
  "ils parlent": "they are speaking",
  "je les vois": "I see them",
  "aux filles": "to the girls",
  "des garçons": "(some) boys",
  "L'ami": "the friend",
  "Les amis": "the friends",
  "Mon enfant": "my child",
  "Mes enfants": "my children",
  "Une idée": "an idea",
  "Des idées": "(some) ideas",
  "Le village": "the village",
  "Les villages": "the villages",
  "Le chapeau": "the hat",
  "Les chapeaux": "the hats",
  "un festival": "a festival",
  "des festivals": "festivals",
  bleu: "blue",
  bleus: "blues",
  pneu: "tire",
  pneus: "tires",
};

// Initialize: Show the first rule by default
document.addEventListener("DOMContentLoaded", function () {
  showRule(1);

  // Add translation tooltips to all table cells with French text
  addTranslationTooltips();

  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key >= "1" && e.key <= "5") {
      const ruleNumber = parseInt(e.key);
      showRule(ruleNumber);
    }
  });

  // Add hover effects to table rows
  const tableRows = document.querySelectorAll("tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.01)";
      this.style.transition = "transform 0.2s ease";
    });

    row.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add progress indicator
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      updateProgressBar(scrollPercentage);
    }, 100);
  });
});

// Function to update progress bar (optional enhancement)
function updateProgressBar(percentage) {
  // This can be used to add a progress indicator at the top of the page
  // For now, it's a placeholder for future enhancement
  console.log(`Scroll progress: ${percentage.toFixed(2)}%`);
}

// Function to highlight search terms (optional enhancement)
function highlightText(searchTerm) {
  const content = document.querySelector(".container");
  const innerHTML = content.innerHTML;
  const searchRegex = new RegExp(searchTerm, "gi");

  if (searchTerm.length > 2) {
    const newHTML = innerHTML.replace(
      searchRegex,
      (match) => `<mark>${match}</mark>`
    );
    content.innerHTML = newHTML;
  }
}

// Add print functionality
function printPage() {
  window.print();
}

// Export to PDF functionality (requires additional library in production)
function exportToPDF() {
  alert(
    "PDF export feature coming soon! For now, you can use your browser's print function to save as PDF."
  );
  window.print();
}

// Toggle dark mode (optional enhancement for future)
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Add translation tooltips to French text
function addTranslationTooltips() {
  // Find all table cells
  const tableCells = document.querySelectorAll("td");

  tableCells.forEach((cell) => {
    const text = cell.textContent.trim();

    // Check if the text exists in our translations
    if (translations[text]) {
      // Add hover attributes and class
      cell.classList.add("french-text");
      cell.setAttribute("data-translation", translations[text]);

      // Create tooltip element
      const tooltip = document.createElement("span");
      tooltip.className = "tooltip";
      tooltip.textContent = translations[text];
      cell.appendChild(tooltip);
    }
  });

  // Also add to inline French text in paragraphs and lists
  const textElements = document.querySelectorAll("p, li");
  textElements.forEach((element) => {
    let html = element.innerHTML;

    // Look for French text in <strong> or <em> tags
    Object.keys(translations).forEach((french) => {
      const regex = new RegExp(
        `<(strong|em)>\\s*${escapeRegex(french)}\\s*<\/(strong|em)>`,
        "gi"
      );
      const match = html.match(regex);

      if (match) {
        const replacement = `<$1 class="french-text" data-translation="${translations[french]}">${french}<span class="tooltip">${translations[french]}</span></$1>`;
        html = html.replace(regex, replacement);
      }
    });

    element.innerHTML = html;
  });
}

// Escape special characters for regex
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
