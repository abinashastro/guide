const chaldeanMap = { A:1, I:1, J:1, Q:1, Y:1, B:2, K:2, R:2, C:3, G:3, L:3, S:3, D:4, M:4, T:4, E:5, H:5, N:5, X:5, U:6, V:6, W:6, O:7, Z:7, F:8, P:8 };

const opportunities = {
    1: "Lead a new project today; your sun energy is at its peak.",
    2: "Allow your caring nature to build bridges in challenging situations, fostering unity.",
    3: "Express your creativity today; communication is your strongest tool.",
    4: "Focus on organization and discipline; hard work will pay off.",
    5: "Embrace change and look for new travel or networking opportunities.",
    6: "Spend time with family and focus on home harmony.",
    7: "A great day for meditation and seeking deeper knowledge.",
    8: "Financial gains are possible; focus on long-term investments.",
    9: "Perfect day for social service and completing pending tasks."
};

function getSingleDigit(num) {
    while (num > 9) {
        num = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return num;
}

function calculateAstro() {
    const name = document.getElementById('userName').value.toUpperCase();
    const dobValue = document.getElementById('dob').value;
    if (!name || !dobValue) return alert("Please fill all details!");

    const dobParts = dobValue.split('-');
    const d = parseInt(dobParts[2]);
    const m = parseInt(dobParts[1]);
    const y = parseInt(dobParts[0]);

    // 1. Basic Numbers
    const mulank = getSingleDigit(d);
    const bhagyank = getSingleDigit(d + m + getSingleDigit(y));
    
    // 2. Name Number
    let nameSum = 0;
    for (let char of name) { if (chaldeanMap[char]) nameSum += chaldeanMap[char]; }
    const nNum = getSingleDigit(nameSum);

    // 3. Personal Horoscope Logic (From Image)
    const today = new Date();
    const pYear = getSingleDigit(getSingleDigit(d) + getSingleDigit(m) + getSingleDigit(today.getFullYear()));
    const pMonth = getSingleDigit(pYear + getSingleDigit(today.getMonth() + 1));
    const pDay = getSingleDigit(pMonth + getSingleDigit(today.getDate()));

    // Update UI
    document.getElementById('mNum').innerText = mulank;
    document.getElementById('bNum').innerText = bhagyank;
    document.getElementById('nNum').innerText = nNum;
    document.getElementById('nAlign').innerText = (nNum === mulank || nNum === bhagyank) ? "✅ Balanced" : "⚠️ Needs Correction";
    
    document.getElementById('dailyNum').innerText = pDay;
    document.getElementById('monthlyNum').innerText = pMonth;
    document.getElementById('yearlyNum').innerText = pYear;
    document.getElementById('dailyOpportunity').innerText = opportunities[pDay] || "Stay positive and focused.";

    // Rituals & Analysis
    const planetNames = ["", "Sun", "Moon", "Jupiter", "Rahu", "Mercury", "Venus", "Ketu", "Saturn", "Mars"];
    document.getElementById('ritual').innerText = `Chant ${planetNames[pDay]} Beej Mantra and drink water in a copper vessel.`;
    document.getElementById('challenge').innerText = `Avoid impulse buying and emotional decisions today.`;
    document.getElementById('health').innerText = `Focus on back posture and stay hydrated.`;
    document.getElementById('advice').innerText = `Wear something in shades of Yellow or Light Blue.`;

    renderLoshu(dobValue, mulank, bhagyank);
    document.getElementById('resultArea').classList.remove('hidden');
}

function renderLoshu(dob, m, b) {
    const combined = dob.replace(/-/g, '') + m + b;
    const gridOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    let html = '';
    gridOrder.forEach(num => {
        const count = combined.split(num).length - 1;
        html += `<div>${count > 0 ? num.toString().repeat(count) : ''}</div>`;
    });
    document.getElementById('loshuGrid').innerHTML = html;
}
