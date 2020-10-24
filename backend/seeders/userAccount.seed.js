const passwordEncrypted = '$2a$08$BqcEuqrhcDqYr6sA7RIzYeKnvUnSzEyRBP2BkZBOtv3aURcfNp9v6';
const userAccountSeed = [
  {
    user: 'supplierTest',
    password: passwordEncrypted,
    authority: 'SUPPLIER',
  },
];

module.exports.userAccountSeed = userAccountSeed;
