lucide.createIcons();

// PATHS BASED ON YOUR REPOSITORY
const gallery = [
    { id: 1, cat: "Landscape", src: "Categories/Landscape/Gatto_Nero.JPG", title: "Gatto Nero" },
    { id: 2, cat: "Landscape", src: "Categories/Landscape/Blessed_ahh.jpg", title: "Blessed" },
    { id: 3, cat: "Landscape", src: "Categories/Landscape/Acqua_nuvola.jpg", title: "Mist" },
    { id: 4, cat: "Landscape", src: "Categories/Landscape/Fiume.jpg", title: "River" },
    { id: 5, cat: "Landscape", src: "Categories/Landscape/Casa.jpg", title: "Structure" },
    { id: 6, cat: "Landscape", src: "Categories/Landscape/Aura_Portrait.jpg", title: "Aura" }
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
    
    if(tab === 'about') {
        area.innerHTML = `
        <div class="about-layout">
            <div class="about-text-col">
                <h2 class="text-4xl font-black italic mb-6">ABOUT</h2>
                <p class="text-sm font-bold leading-relaxed">16-year-old photographer from Switzerland. Focus on technical ISO precision and geometric Swiss soul.</p>
            </div>
            <div class="flex flex-col gap-5 w-[250px]">
                <div class="about-square" style="animation-delay: 0.1s">
                    <i data-lucide="user" class="w-12 h-12 opacity-30"></i>
                    <span class="text-[10px] font-black uppercase tracking-widest mt-2">Leo</span>
                </div>
                <div class="about-square" style="animation-delay: 0.2s">
                    <i data-lucide="camera" class="w-12 h-12 opacity-30"></i>
                    <span class="text-[10px] font-black uppercase tracking-widest mt-2">Leo.ISO</span>
                </div>
            </div>
        </div>`;
        lucide.createIcons();
    } else if (tab === 'home') {
        area.innerHTML = '<div class="text-center fade-in"><div class="text-[12rem] font-black opacity-10">Hi!</div></div>';
    } else if (tab === 'contact') {
        area.innerHTML = '<div class="text-center fade-in"><div class="text-4xl font-black italic">ItsLeo.ISO</div><p class="mt-4 opacity-40">Instagram / Mail</p></div>';
    }
}

function openProjects() {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-tab'));
    document.getElementById('nav-projects').classList.add('active-tab');
    document.getElementById('viewport').classList.add('is-projects-active');
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
    document.getElementById('file-list').innerHTML = filtered.map(i => `<div class="finder-item" onclick="previewFile(${i.id})">${i.src.split('/').pop()}</div>`).join('');
}

function previewFile(id) {
    const item = gallery.find(g => g.id === id);
    document.getElementById('file-preview').innerHTML = `
        <div class="w-full h-48 bg-white/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden"><img src="${item.src}" class="max-h-full object-contain opacity-70"></div>
        <h4 class="text-white text-sm font-bold">${item.title}</h4>
        <button onclick="openOverlay('${item.src}')" class="mt-4 px-4 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">View Full</button>
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
        area.innerHTML = gallery.map(i => `<div class="bg-white/5 p-4 rounded mb-4" onclick="openOverlay('${i.src}')"><img src="${i.src}" class="w-full h-32 object-cover opacity-50 mb-2"><div>${i.title}</div></div>`).join('');
    } else {
        area.innerHTML = `<div class="text-center py-20 font-black uppercase opacity-20">${tab}</div>`;
    }
}
