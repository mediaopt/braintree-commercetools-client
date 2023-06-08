const loadScript = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

export default loadScript;
