export default defineContentScript({
  matches: ['https://pos.contabilium.com/', 'https://app.contabilium.com/comprobantes.aspx'],
  runAt: "document_idle",
  main() {
    console.log('Hello content.');
  },
});
