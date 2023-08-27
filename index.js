const root = document.documentElement;

const countDownDate = new Date("Aug 28, 2023 22:30:00 UTC-4").getTime();
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


// Dark Mode
    
const toggleTheme = function() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? '' : 'dark';
  root.className = newTheme
}