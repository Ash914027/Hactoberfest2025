// Project data
const projects = [
    {
        title: "Calculator",
        description: "A modern calculator application with a clean interface and advanced mathematical operations.",
        image: "calculator-preview.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        demo: "../Calculator-Using-HTML-CSS-Js/index.html",
        source: "Calculator-Using-HTML-CSS-Js"
    },
    {
        title: "Color Palette Generator",
        description: "Generate beautiful color palettes for your next design project.",
        image: "palette-preview.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        demo: "../Color-Pallete/index.html",
        source: "Color-Pallete"
    },
    {
        title: "Contact Manager",
        description: "Organize and manage your contacts with this easy-to-use contact management system.",
        image: "contacts-preview.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        demo: "../ContactManger/index.html",
        source: "ContactManger"
    },
    {
        title: "Flipkart Clone",
        description: "A responsive e-commerce website clone inspired by Flipkart's design.",
        image: "flipkart-preview.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        demo: "../Flipkart Clone/index.html",
        source: "Flipkart Clone"
    },
    {
        title: "Keyboard Event Tracker",
        description: "Track and display keyboard events in real-time with this interactive tool.",
        image: "keyboard-preview.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        demo: "../keyboard-event-tracker-app/index.html",
        source: "keyboard-event-tracker-app"
    },
    {
        title: "Login Page",
        description: "A secure and modern login page implementation with TypeScript.",
        image: "login-preview.jpg",
        tags: ["TypeScript", "HTML", "CSS"],
        demo: "../login-page-project/index.html",
        source: "login-page-project"
    },
    {
        title: "MoodWave",
        description: "Track and analyze your daily mood patterns with this interactive application.",
        image: "mood-preview.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        demo: "../moodwave/index.html",
        source: "moodwave"
    },
    {
        title: "Sticky Notes",
        description: "Create and manage digital sticky notes for better organization.",
        image: "notes-preview.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        demo: "../StickyNotes/index.html",
        source: "StickyNotes"
    }
];

// DOM Elements
const projectGrid = document.getElementById('projectGrid');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

// Create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image" style="background-image: url('${project.image}'), linear-gradient(45deg, #2c3e50, #3498db)"></div>
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.demo}" target="_blank">
                    <i class="fas fa-play-circle"></i> Live Demo
                </a>
                <a href="https://github.com/SurajPatil1404/Hactoberfest2025/tree/main/${project.source}" target="_blank">
                    <i class="fab fa-github"></i> Source Code
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Filter and display projects
function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                            project.description.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' ||
                            project.tags.some(tag => tag.toLowerCase() === filterValue);
        
        return matchesSearch && matchesFilter;
    });
    
    projectGrid.innerHTML = '';
    filteredProjects.forEach(project => {
        projectGrid.appendChild(createProjectCard(project));
    });
}

// Event listeners
searchInput.addEventListener('input', filterProjects);
filterSelect.addEventListener('change', filterProjects);

// Initial render
filterProjects();
