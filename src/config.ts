const configs: any = {
  dev: {
    API_URL: process.env.REACT_APP_dev_API_URL,
  },
  prod: {
    API_URL: process.env.REACT_APP_prod_API_URL,
  },
};

console.log('process.env.REACT_APP_STAGE', process.env.REACT_APP_STAGE);
if (!process.env.REACT_APP_STAGE) throw Error('Set REACT_APP_STAGE environmental variable');
if (!configs[process.env.REACT_APP_STAGE]) throw Error(`Config ${process.env.REACT_APP_STAGE} doesn't exist`);

const exported = {
  ...configs[process.env.REACT_APP_STAGE],
}

export default exported;
