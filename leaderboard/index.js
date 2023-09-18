const root = document.documentElement;

// Create Countdown until next Competition
const countDownDate = new Date("Sept 18, 2023 22:30:00 UTC-4").getTime();
const updateclock = setInterval(function() {

  // Get user's date and time in Eastern
  const localNow = new Date().toLocaleString('en-US', {timeZone: 'America/New_York'});
  const easternNow = new Date(localNow)

  // Time calculations for difference
  const difference = countDownDate - easternNow;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Display the result
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s";

  // If the count down is finished
  if (difference < 0) {
    clearInterval(updateclock);
    document.getElementById("countdown").innerHTML = "IN PROGRESS";
  }
}, 1000);

// Determine Current Leader
function determineLeader() {
  const winnerColumn = 1;
  const rows = document.querySelectorAll('#leaderboard tbody tr');
  const winnerCounts = {};

  rows.forEach(row => {
    const columns = row.querySelectorAll('td');
    if (columns.length > winnerColumn) {
      // Parse Row for Winners
      const winnerText = columns[winnerColumn].textContent;
      let winners = null
      if (winnerText.includes(',')) {
        winners = winnerText.split(',')
      } else {
        winners = [winnerText]
      }

      // Update Winner Tallies
      winners.forEach(winner => {
        winner = winner.trim()
        if (winner !== 'TBD') {
          winnerCounts[winner] = (winnerCounts[winner] || 0) + 1;
        }
      })
    }
  })

  const leader = Object.entries(winnerCounts).reduce((max, [winner, count]) => 
    count >= max.count ? { winner, count } : max, { winner: null, count: -1 });
  
  document.getElementById("currentLeader").innerHTML = leader.winner;

}
determineLeader()

// Set Site Theme
const setTheme = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.className = theme
  } else if (theme === 'light') {
    root.className = ''
  }
}

// Detect Initial System Dark Theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

// Detect Changes in System Theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const newTheme = event.matches ? 'dark' : 'light';
  setTheme(newTheme);
});

// Detect Manual Theme Changes (Button Click)
const toggleTheme = function() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}