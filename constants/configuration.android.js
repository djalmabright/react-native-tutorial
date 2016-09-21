import {configure} from './configuration-base';

const loopbackAddress = '10.0.2.2';

const github = {
  clientID: '22ef2f2ea7fc5cf1d125',
  clientSecret: 'c965f686a901a338a81d6a50f81aad750705a328',
};

export const config = configure(github, loopbackAddress);