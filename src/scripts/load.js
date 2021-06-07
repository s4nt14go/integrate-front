const load = (callback) => {
  const existingScript = document.getElementById('civic');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://hosted-sip.civic.com/js/civic.sip.min.js';
    script.id = 'civic';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default load;
