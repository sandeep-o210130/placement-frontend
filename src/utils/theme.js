export const applyTheme = (mode) => {

  if(mode === "dark"){

    document.documentElement.style.setProperty("--bg-color","#121212");
    document.documentElement.style.setProperty("--text-color","#ffffff");
    document.documentElement.style.setProperty("--card-bg","#1f1f1f");
    document.documentElement.style.setProperty("--input-bg","#ffffff");

  }
  else{

    document.documentElement.style.setProperty("--bg-color","#f5f9ff");
    document.documentElement.style.setProperty("--text-color","#000000");
    document.documentElement.style.setProperty("--card-bg","#ffffff");
    document.documentElement.style.setProperty("--input-bg","#ffffff");

  }

  document.body.style.background="var(--bg-color)";
  document.body.style.color="var(--text-color)";

  localStorage.setItem("theme",mode);
};

export const loadTheme = ()=>{
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);
};