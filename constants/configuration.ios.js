import {configure} from './configuration-base';

const loopbackAddress = 'localhost';

const github = {
  clientID: '4591e867f77e815d446e',
  clientSecret: 'a96497bed46dd07786b9b2fff16d59e25c9758cc',
};

export const config = configure(github, loopbackAddress);
