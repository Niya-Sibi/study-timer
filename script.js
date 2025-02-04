// DOM Elements
const subjectInput = document.getElementById('subject');
const timeInput = document.getElementById('time');
const addSubjectButton = document.getElementById('add-subject');
const scheduleList = document.getElementById('schedule-list');
const timerDisplay = document.getElementById('timer');
const startTimerButton = document.getElementById('start-timer');
const breakTimerDisplay = document.getElementById('break-timer');
const musicButton = document.getElementById('music-button');
const pointsDisplay = document.getElementById('points');
const jarPopup = document.getElementById('jar-popup');
const pointsSection = document.getElementById('points-section');

let studySchedule = [];
let totalPoints = 0;

// Add Subject to Schedule
addSubjectButton.addEventListener('click', () => {
  const subject = subjectInput.value;
  const time = timeInput.value;

  if (subject && time) {
    studySchedule.push({ subject, time });
    updateSchedule();
    subjectInput.value = '';
    timeInput.value = '';
  } else {
    alert('Please fill in both fields.');
  }
});

// Update Schedule Display
function updateSchedule() {
  scheduleList.innerHTML = '';
  studySchedule.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.subject} - ${item.time} minutes`;
    scheduleList.appendChild(li);
  });
}

// Timer Functionality
startTimerButton.addEventListener('click', () => {
  if (studySchedule.length === 0) {
    alert('Please add at least one subject.');
    return;
  }

  const firstSubject = studySchedule[0];
  startStudySession(parseInt(firstSubject.time)); // Ensure time is a number
});

function startStudySession(minutes) {
  let timeLeft = minutes * 60; // Convert minutes to seconds
  const timerInterval = setInterval(() => {
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;
    timerDisplay.textContent = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop the timer
      alert('Study session over! Take a break.');
      addPoints();
      startBreakTimer();
    }
    timeLeft--; // Decrease timeLeft by 1 second
  }, 1000); // Run every 1000ms (1 second)
}

// Break Timer
function startBreakTimer() {
  let breakTimeLeft = 10 * 60; // 10 minutes
  const breakInterval = setInterval(() => {
    const minutesLeft = Math.floor(breakTimeLeft / 60);
    const secondsLeft = breakTimeLeft % 60;
    breakTimerDisplay.textContent = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

    if (breakTimeLeft <= 0) {
      clearInterval(breakInterval);
      alert('Break over! Start the next session.');
    }
    breakTimeLeft--;
  }, 1000);
}

// Add Points with Coin Animation
function addPoints() {
  totalPoints += 10;
  pointsDisplay.textContent = totalPoints;
  jarPopup.style.display = 'block';
  setTimeout(() => {
    jarPopup.style.display = 'none';
  }, 2000);

  // Add coin animation
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const coin = document.createElement('div');
      coin.classList.add('coin');
      coin.style.left = `${Math.random() * 100}%`;
      pointsSection.appendChild(coin);
      setTimeout(() => {
        coin.remove();
      }, 1000);
    }, i * 100);
  }
}

// Music Button
musicButton.addEventListener('click', () => {
  window.open('https://www.youtube.com', '_blank');
});