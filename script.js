// script.js
const dialogueText = document.getElementById('dialogueText');
const confessButton = document.getElementById('confessButton');
const confessionInput = document.getElementById('confessionInput');
const backgroundMusic = document.getElementById('backgroundMusic');
const typeSound = document.getElementById('typeSound');
const moreSinsPrompt = document.getElementById('moreSinsPrompt');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const yesFatherButton = document.getElementById('yesFatherButton');
const amenButton = document.getElementById('amenButton');
const thanksButton = document.getElementById('thanksButton');
const priest = document.querySelector('.priest');
const container = document.querySelector('.container');

let dialogueQueue = [
    "In the name of the Father, and of the Son, and of the Holy Spirit. Please confess your sins, my child."
];
let confessionCount = 0;
let canPlayAudio = false;

const penances = [
    "Pray one <a href='https://www.usccb.org/prayers/our-father' target='_blank'>Our Father</a> slowly and reflectively.",
    "Recite three <a href='https://www.usccb.org/prayers/hail-mary' target='_blank'>Hail Marys</a> for the souls in Purgatory.",
    "Read Psalm 51 and meditate on its meaning.",
    "Spend 15 minutes in silent prayer before the Blessed Sacrament.",
    "Pray the <a href='https://www.usccb.org/prayers/rosary' target='_blank'>Rosary</a>’s Sorrowful Mysteries.",
    "Fast from one meal today.",
    "Perform an act of charity for a neighbor.",
    "Recite the <a href='https://www.usccb.org/prayers/act-contrition' target='_blank'>Act of Contrition</a> daily for a week.",
    "Pray five <a href='https://www.usccb.org/prayers/our-father' target='_blank'>Our Fathers</a> for the intentions of the Holy Father.",
    "Meditate on the <a href='https://www.usccb.org/prayers/stations-cross' target='_blank'>Stations of the Cross</a>.",
    "Offer a day of abstinence from sweets.",
    "Read the Gospel of John, Chapter 3.",
    "Pray the <a href='https://www.divinemercy.org/elements-of-divine-mercy/divine-mercy-chaplet.html' target='_blank'>Chaplet of Divine Mercy</a>.",
    "Spend 10 minutes reflecting on your sins.",
    "Recite one decade of the <a href='https://www.usccb.org/prayers/rosary' target='_blank'>Rosary</a>.",
    "Give alms to the poor this week.",
    "Pray the <a href='https://www.usccb.org/prayers/angelus' target='_blank'>Angelus</a> at noon.",
    "Read Psalm 23 and thank God for His guidance.",
    "Offer a prayer for your enemies.",
    "Spend 5 minutes in Eucharistic adoration.",
    "Recite the <a href='https://www.usccb.org/prayers/prayer-st-michael-archangel' target='_blank'>Prayer to St. Michael the Archangel</a>.",
    "Fast from media for one hour.",
    "Pray for the conversion of sinners.",
    "Read Matthew 5:1-12 and reflect on the Beatitudes.",
    "Offer a kind word to someone in need.",
    "Pray the <a href='https://www.ewtn.com/catholicism/devotions/litany-of-humility-289' target='_blank'>Litany of Humility</a>.",
    "Spend a day without complaining.",
    "Recite the <a href='https://www.usccb.org/prayers/memorare' target='_blank'>Memorare</a> three times.",
    "Meditate on Christ’s Passion for 10 minutes.",
    "Pray one <a href='https://www.usccb.org/prayers/hail-holy-queen' target='_blank'>Hail Holy Queen</a>.",
    "Visit a church and light a candle.",
    "Read Psalm 130 and seek God’s mercy.",
    "Offer a sacrifice of your time to help another.",
    "Pray the <a href='https://www.usccb.org/prayers/morning-offering' target='_blank'>Morning Offering</a> each day for three days.",
    "Recite the <a href='https://www.usccb.org/prayers/prayer-crucifix' target='_blank'>Prayer Before a Crucifix</a>.",
    "Fast from one luxury today.",
    "Pray for the priests of your parish.",
    "Read Luke 15:11-32 (Prodigal Son) and reflect.",
    "Spend 15 minutes in Scripture reading.",
    "Offer a day of silence for penance.",
    "Pray the <a href='https://www.usccb.org/prayers/anima-christi' target='_blank'>Anima Christi</a>.",
    "Recite five <a href='https://www.usccb.org/prayers/glory-be' target='_blank'>Glory Bes</a> for God’s glory.",
    "Perform a work of mercy this week.",
    "Meditate on the Seven Last Words of Christ.",
    "Pray the <a href='https://www.usccb.org/prayers/guardian-angel-prayer' target='_blank'>Guardian Angel Prayer</a>.",
    "Read Psalm 91 and trust in God’s protection.",
    "Offer a day of patience in trials.",
    "Recite the <a href='https://www.franciscanmedia.org/franciscan-spirit-blog/prayer-of-st-francis' target='_blank'>St. Francis Peace Prayer</a>.",
    "Spend 10 minutes thanking God for His mercy.",
    "Pray one <a href='https://www.usccb.org/prayers/our-father' target='_blank'>Our Father</a> for each confession made."
];

function typeWriter(text, element, callback) {
    let i = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            if (canPlayAudio) {
                typeSound.currentTime = 0;
                typeSound.play().catch(error => console.log("Typing sound error:", error));
            }
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 33); // 3x speed
}

function showNextDialogue() {
    if (dialogueQueue.length > 0) {
        const nextText = dialogueQueue.shift();
        typeWriter(nextText, dialogueText, showNextDialogue);
    }
}

function lockConfessionActions() {
    confessionInput.disabled = true;
    confessButton.disabled = true;
}

function unlockConfessionActions() {
    confessionInput.disabled = false;
    confessButton.disabled = false;
}

confessButton.addEventListener('click', () => {
    const confession = confessionInput.value.trim();
    if (!canPlayAudio) {
        canPlayAudio = true;
        backgroundMusic.play().catch(error => console.log("Background music error:", error));
    }
    if (confession) {
        confessionCount++;
        dialogueQueue.push("Thank you for your confession, my child.");
        dialogueQueue.push("Now, I absolvo you from your sins in the name of the Father, and of the Son, and of the Holy Spirit.");
        showNextDialogue();
        confessionInput.value = '';
        confessButton.style.display = 'none';
        moreSinsPrompt.style.display = 'block';
        lockConfessionActions();
    } else {
        dialogueQueue.push("Please confess your sins to receive absolution.");
        showNextDialogue();
    }
});

yesButton.addEventListener('click', () => {
    moreSinsPrompt.style.display = 'none';
    confessButton.style.display = 'block';
    unlockConfessionActions();
    confessionInput.focus();
});

noButton.addEventListener('click', () => {
    moreSinsPrompt.style.display = 'none';
    priest.classList.add('stopped');
    const randomPenance = penances[Math.floor(Math.random() * penances.length)];
    dialogueQueue.push(`For your penance, ${randomPenance}`);
    showNextDialogue();
    setTimeout(() => {
        yesFatherButton.style.display = 'block';
    }, dialogueQueue.length * 1000);
});

yesFatherButton.addEventListener('click', () => {
    yesFatherButton.style.display = 'none';
    dialogueQueue.push("Very well. Repeat after me.");
    dialogueQueue.push("O my God, I am heartily sorry for having offended You, and I detest all my sins because I dread the loss of Heaven and the pains of Hell, but most of all because they offend You, my God, who are all good and deserving of all my love. I firmly resolve, with the help of Your grace, to confess my sins, to do penance, and to amend my life. Amen.");
    showNextDialogue();
    setTimeout(() => {
        amenButton.style.display = 'block';
    }, dialogueQueue.length * 1000);
});

amenButton.addEventListener('click', () => {
    amenButton.style.display = 'none';
    dialogueText.textContent = "Go in peace.";
    thanksButton.style.display = 'block';
});

thanksButton.addEventListener('click', () => {
    priest.style.display = 'none';
    container.innerHTML = `
        <p class="final-text">Go in peace.</p>
        <div class="final-message">
            <p>Confessing your sins brings peace, restores your relationship with God, and renews your spirit. Don’t carry the weight of sin—find a local priest and schedule a time for confession today.</p>
        </div>
    `;
    document.querySelector('.final-text').style.fontSize = '24px';
    document.querySelector('.final-text').style.position = 'absolute';
    document.querySelector('.final-text').style.top = '50%';
    document.querySelector('.final-text').style.left = '50%';
    document.querySelector('.final-text').style.transform = 'translate(-50%, -50%)';
});

showNextDialogue();