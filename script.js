lucide.createIcons();

// 1. GALLERY DATA
// Add your new photos here. Ensure the 'cat' matches the folder names below.
const gallery = [
    { id: 1, cat: "Landscape", src: "Categories/Landscape/Gatto_Nero.JPG", title: "Gatto Nero" },
    { id: 2, cat: "Landscape", src: "Categories/Landscape/Blessed_ahh.jpg", title: "Blessed" },
    { id: 3, cat: "Landscape", src: "Categories/Landscape/Acqua_nuvola.jpg", title: "Mist" },
    { id: 4, cat: "Landscape", src: "Categories/Landscape/Fiume.jpg", title: "River" },
    { id: 5, cat: "Landscape", src: "Categories/Landscape/Casa.jpg", title: "Structure" },
    { id: 6, cat: "Landscape", src: "Categories/Landscape/Aura_Portrait.jpg", title: "Aura" },
    
    // Portraits Category
    { id: 7, cat: "Portraits", src: "Categories/Portraits/Swiss_Soul.jpg", title: "Swiss Soul" },
    { id: 8, cat: "Portraits", src: "Categories/Portraits/ISO_Study_01.jpg", title: "Technical Portrait" },

    // Wildlife Category
    { id: 9, cat: "Wildlife", src: "Categories/Wildlife/Alpine_Nature.jpg", title: "Alpine Life" }
];

function selectDevice(mode, el) {
    const chooser = document.getElementById('device-chooser');
    el.classList.add('card-selected');
    document.querySelectorAll('.chooser-card').forEach(c => c !== el && c.classList.add('card-discarded'));
    setTimeout(() => {
        chooser.style.opacity = '0';
        setTimeout(() => {
            chooser.style.display = 'none';
            if(mode === 'desktop') {
                document.getElementById('desktop-layout').style.display = 'block';
                document.getElementById('desktop-layout').classList.add('h-screen', 'flex', 'items-center');
                switchMainTab('home');
            } else {
                document.getElementById('mobile-layout').style.display = 'block';
                mobileSwitchTab('home');
            }
        }, 800);
    }, 600);
}

function switchMainTab(tab) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-tab'));
    document.getElementById('nav-' + tab)?.classList.add('active-tab');
    const area = document.getElementById('content-area');
    
    area.className = "flex-grow flex flex-col justify-center items-center min-h-screen p-10 overflow-hidden";

    if(tab === 'about') {
        area.innerHTML = `
        <div class="about-layout flex gap-5 h-[500px] items-stretch fade-in">
            <div class="about-text-col w-[320px] bg-[#d34a24] text-black p-8 rounded-sm flex flex-col justify-start shadow-2xl">
                <h2 class="text-4xl font-black italic mb-6">ABOUT</h2>
                <p class="text-sm font-bold leading-relaxed mb-4">
                    My name is Leo, a 16-year-old photographer living in Switzerland.
                </p>
                <p class="text-sm font-bold leading-relaxed">
                    I focus on the "ISO Lifestyle"—finding beauty in technical precision and raw lighting. Switzerland offers a landscape like no other, and my goal is to capture its geometry and soul.
                </p>
                <div class="mt-auto text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Swiss Engineering x Art</div>
            </div>
            <div class="flex flex-col gap-5 w-[250px]">
                <div class="about-square flex-1 bg-[#d34a24] text-black rounded-sm flex flex-col items-center justify-center p-5 text-center overflow-hidden relative shadow-2xl" style="animation-delay: 0.1s">
                    <i data-lucide="user" class="w-12 h-12 opacity-30 mb-2"></i>
                    <span class="text-[10px] font-black uppercase tracking-widest">Picture of me</span>
                </div>
                <div class="about-square flex-1 bg-[#d34a24] text-black rounded-sm flex flex-col items-center justify-center p-5 text-center overflow-hidden relative shadow-2xl" style="animation-delay: 0.2s">
                    <i data-lucide="camera" class="w-16 h-16 opacity-30 mb-2"></i>
                    <span class="text-[10px] font-black uppercase tracking-widest">Leo.ISO</span>
                </div>
            </div>
        </div>`;
        lucide.createIcons();
    } else if (tab === 'home') {
        area.innerHTML = `
        <div class="text-center fade-in flex flex-col items-center justify-center">
            <div class="text-[12rem] font-black opacity-10 select-none leading-none">Hi!</div>
            <div class="text-2xl font-light tracking-[0.5em] opacity-30 mt-4 uppercase italic">Welcome to my portfolio</div>
        </div>`;
    } else if (tab === 'contact') {
        area.innerHTML = `
        <div class="text-center fade-in flex flex-col items-center justify-center">
            <div class="text-[8rem] font-black opacity-10 leading-none">Contact</div>
            <div class="flex flex-col items-center gap-6 mt-12">
                <a href="https://instagram.com/leo.iso" target="_blank" class="flex items-center gap-4 text-white hover:text-[#d34a24] transition-colors group">
                    <i data-lucide="instagram" class="w-8 h-8 group-hover:scale-110 transition-transform"></i>
                    <span class="text-2xl font-black italic">ItsLeo.ISO</span>
                </a>
                <a href="mailto:hello@leo.iso" class="flex items-center gap-4 text-white hover:text-[#d34a24] transition-colors group">
                    <i data-lucide="mail" class="w-8 h-8 group-hover:scale-110 transition-transform"></i>
                    <span class="text-2xl font-black italic">hello@leo.iso</span>
                </a>
            </div>
        </div>`;
        lucide.createIcons();
    }
}

function openProjects() {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-tab'));
    document.getElementById('nav-projects').classList.add('active-tab');
    document.getElementById('viewport').classList.add('is-projects-active');
    
    // Updated folder list with Portraits and Wildlife
    document.getElementById('folder-list').innerHTML = `
        <div class="finder-item px-6 py-3 cursor-pointer text-sm hover:bg-white/5 active" onclick="loadProjectDir('Landscape', this)">Landscape</div>
        <div class="finder-item px-6 py-3 cursor-pointer text-sm hover:bg-white/5" onclick="loadProjectDir('Portraits', this)">Portraits</div>
        <div class="finder-item px-6 py-3 cursor-pointer text-sm hover:bg-white/5" onclick="loadProjectDir('Wildlife', this)">Wildlife</div>
    `;

    loadProjectDir('Landscape', document.querySelector('#folder-list .finder-item'));
}

function closeProjects() {
    document.getElementById('viewport').classList.remove('is-projects-active');
    switchMainTab('home');
}

function loadProjectDir(cat, el) {
    document.querySelectorAll('#folder-list .finder-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const filtered = gallery.filter(i => i.cat === cat);
    
    if (filtered.length === 0) {
        document.getElementById('file-list').innerHTML = `<div class="p-6 text-[10px] opacity-20 uppercase tracking-widest">No captures yet</div>`;
    } else {
        document.getElementById('file-list').innerHTML = filtered.map(i => `
            <div class="finder-item px-6 py-3 flex items-center gap-3 cursor-pointer text-sm hover:bg-white/5" onclick="previewFile(${i.id})">
                <i data-lucide="image" class="w-4 h-4 opacity-40"></i>
                ${i.src.split('/').pop()}
            </div>
        `).join('');
    }
    lucide.createIcons();
}

function previewFile(id) {
    const item = gallery.find(g => g.id === id);
    document.getElementById('file-preview').innerHTML = `
        <div class="w-full h-48 bg-white/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <img src="${item.src}" class="max-h-full object-contain opacity-70" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
        </div>
        <h4 class="text-white text-sm font-bold mb-1">${item.title}</h4>
        <p class="text-[10px] opacity-40 italic mb-4">${item.cat} Study</p>
        <button onclick="openOverlay('${item.src}')" class="w-full px-4 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">View Full Res</button>
    `;
}

function openOverlay(src) {
    const over = document.getElementById('image-overlay');
    document.getElementById('overlay-img').src = src;
    over.classList.add('active');
}

function closeOverlay() {
    document.getElementById('image-overlay').classList.remove('active');
}

function mobileSwitchTab(tab) {
    const area = document.getElementById('mobile-content-area');
    if(tab === 'projects') {
        area.innerHTML = gallery.map(i => `<div class="bg-[#111] border border-[#222] p-4 rounded mb-4" onclick="openOverlay('${i.src}')"><img src="${i.src}" class="w-full h-32 object-cover opacity-50 mb-2"><div>${i.title}</div></div>`).join('');
    } else if (tab === 'about') {
        area.innerHTML = `
        <div class="flex flex-col gap-4">
            <div class="bg-[#d34a24] text-black p-6 rounded min-h-[300px]">
                <h3 class="font-black italic text-2xl mb-4 uppercase">About</h3>
                <p class="text-xs font-bold leading-relaxed">16 years old. ISO based. Capturing Switzerland. Finding beauty in technical precision.</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-[#d34a24] text-black h-40 flex flex-col items-center justify-center rounded">
                     <i data-lucide="user" class="w-8 h-8 mb-2 opacity-50"></i>
                     <span class="text-[8px] font-black uppercase tracking-widest">Me</span>
                </div>
                <div class="bg-[#d34a24] text-black h-40 flex flex-col items-center justify-center rounded">
                     <i data-lucide="camera" class="w-10 h-10 opacity-40"></i>
                     <span class="text-[8px] font-black uppercase tracking-widest mt-2">Leo.ISO</span>
                </div>
            </div>
        </div>`;
        lucide.createIcons();
    } else {
        area.innerHTML = `<div class="bg-[#111] border border-[#222] py-20 text-center font-black uppercase opacity-20">${tab}</div>`;
    }
}
