export const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return "Selamat Pagi, Admin";
  } else if (hours < 18) {
    return "Selamat Siang, Admin";
  } else {
    return "Selamat Malam, Admin";
  }
};
