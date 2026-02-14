const chaldeanTable = { a:1, i:1, j:1, q:1, y:1, b:2, k:2, r:2, c:3, g:3, l:3, s:3, d:4, m:4, t:4, e:5, h:5, n:5, x:5, u:6, v:6, w:6, o:7, z:7, f:8, p:8 };

const planetData = {
    1: { name: "Sun", ritual: "Offer water to the Sun (Arghya).", advice: "Lead with confidence.", color: "Orange/Gold" },
    2: { name: "Moon", ritual: "Meditate for 10 mins.", advice: "Control your emotions.", color: "White" },
    3: { name: "Jupiter", ritual: "Apply saffron tilak.", advice: "Help someone today.", color: "Yellow" },
    4: { name: "Rahu", ritual: "Bird feeding.", advice: "Avoid shortcuts.", color: "Grey" },
    5: { name: "Mercury", ritual: "Water green plants.", advice: "Communicate clearly.", color: "Green" },
    6: { name: "Venus", ritual: "Use a mild perfume.", advice: "Focus on luxury/comfort.", color: "Pink" },
    7: { name: "Ketu", ritual: "Feed a black dog.", advice: "Trust your intuition.", color: "Multi-color" },
    8: { name: "Saturn", ritual: "Light a mustard oil lamp.", advice: "Work hard, stay patient.", color: "Blue/Black" },
    9: { name: "Mars", ritual: "Recite Hanuman Chalisa.", advice: "Channel energy into sports.", color: "Red" }
};

function getSum(num) {
    let s = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    return s > 9 ? getSum(s) : s;
}

function getNameNumber(name) {
    let sum = 0;
    name.toLowerCase().replace(/\s/g, '').split('').forEach(char => {
        sum += chaldeanTable[char] || 0;
    });
    return { total: sum, single: getSum(sum) };
}

function calculateAstro() {
    const name = document.getElementById('userName').value;
    const dobValue = document.getElementById('dob').value;
    if(!dobValue) return alert("Select DOB");

    const date = new Date(dobValue);
    const d = date.getDate(), m = date.getMonth() + 1, y = date.getFullYear();
    
    const mulank = getSum(d);
    const bhagyank = getSum(d + m + getSum(y));
    const nameData = getNameNumber(name);

    // UI Updates
    document.getElementById('mNum').innerText = mulank;
    document.getElementById('bNum').innerText = bhagyank;
    document.getElementById('nNum').innerText = nameData.total + " (" + nameData.single + ")";
    document.getElementById('nAlign').innerText = (nameData.single === mulank || nameData.single === 5) ? "✅ Aligned" : "❌ Not Aligned";

    // Today's Logic (Feb 14, 2026 for example)
    const today = new Date();
    const tD = getSum(today.getDate()), tM = getSum(today.getMonth()+1), tY = getSum(2026);
    document.getElementById('todayNumbers').innerText = `Day: ${tD}, Month: ${tM}, Year: ${tY}`;

    // Rituals & Analysis
    const p = planetData[mulank];
    document.getElementById('ritual').innerText = `[${p.name}] ${p.ritual}`;
    document.getElementById('challenge').innerText = `Avoid conflicts with number ${mulank === 1 ? 8 : 4}.`;
    document.getElementById('health').innerText = `Watch your ${mulank === 2 ? 'stomach' : 'back'} today.`;
    document.getElementById('advice').innerText = p.advice;

    renderLoshu(dobValue, mulank, bhagyank);
    document.getElementById('resultArea').classList.remove('hidden');
}

function renderLoshu(dob, m, b) {
    const digits = dob.replace(/-/g, '') + m + b;
    const layout = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    let html = '';
    layout.forEach(num => {
        const count = digits.split(num).length - 1;
        html += `<div class="grid-cell">${count > 0 ? num.toString().repeat(count) : ''}</div>`;
    });
    document.getElementById('loshuGrid').innerHTML = html;
}

function showSection(type) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    modal.classList.remove('hidden');
    
    if(type === 'career') body.innerHTML = "<h2>Career Prediction</h2><p>Based on your numbers, creative fields or consultancy suits you best.</p>";
    if(type === 'planets') body.innerHTML = "<h2>Planet Traits</h2><p><b>Sun:</b> Authority, Soul<br><b>Moon:</b> Mind, Peace</p>";
}

function closeModal() { document.getElementById('modal').classList.add('hidden'); }
