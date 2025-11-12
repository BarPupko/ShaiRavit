// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const blessingsRef = database.ref('ShaiRevital/blessings');

// Blessing Database class with Firebase integration
class BlessingDatabase {
    constructor() {
        this.blessings = [];
        this.loadBlessings();
    }

    loadBlessings() {
        // Listen for real-time updates from Firebase
        blessingsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.blessings = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            } else {
                this.blessings = [];
            }
            // Update the display whenever data changes
            displayBlessings();
        });
    }

    addBlessing(name, text) {
        // Add to Firebase
        const newBlessingRef = blessingsRef.push();
        newBlessingRef.set({
            name: name,
            text: text,
            timestamp: Date.now()
        }).then(() => {
            console.log('Blessing saved successfully!');
        }).catch((error) => {
            console.error('Error saving blessing:', error);
            alert('שגיאה בשמירת הברכה. אנא נסו שוב.');
        });

        return this.blessings.length;
    }

    getAllBlessings() {
        return this.blessings;
    }

    getCount() {
        return this.blessings.length;
    }
}

// Initialize database
const db = new BlessingDatabase();

// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Create floating blessing notes
function createBlessingNote(blessing, index) {
    const note = document.createElement('div');
    note.className = 'blessing-note';
    note.innerHTML = `<strong>${blessing.name}</strong><br>${blessing.text}`;

    // Random position
    const randomX = Math.random() * 80 + 10; // 10-90%
    const randomY = Math.random() * 80 + 10; // 10-90%
    note.style.left = randomX + '%';
    note.style.top = randomY + '%';

    // Random animation delay and duration
    note.style.animationDelay = (index * 2) + 's';
    note.style.animationDuration = (15 + Math.random() * 10) + 's';

    return note;
}

function displayBlessings() {
    const container = document.getElementById('blessingsContainer');
    container.innerHTML = '';

    const blessings = db.getAllBlessings();
    blessings.forEach((blessing, index) => {
        const note = createBlessingNote(blessing, index);
        container.appendChild(note);
    });

    // Update counter
    const countElement = document.getElementById('blessingsCount');
    if (countElement) {
        countElement.textContent = blessings.length;
    }
}

// Submit blessing form
function submitBlessing(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const blessing = document.getElementById('blessing').value;

    // Validate input
    if (!name.trim() || !blessing.trim()) {
        alert('אנא מלאו את כל השדות');
        return;
    }

    // Add to Firebase database
    db.addBlessing(name.trim(), blessing.trim());

    // Show success message
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('blessing').value = '';

    // Hide success message after 3 seconds
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);

    // Close modal after 4 seconds
    setTimeout(() => {
        closeModal('blessing');
    }, 4000);
}

// Countdown timer
function updateCountdown() {
    const weddingDate = new Date('2026-10-28T19:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h2>🎉 היום הגדול הגיע! 🎉</h2>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Modal functions
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
