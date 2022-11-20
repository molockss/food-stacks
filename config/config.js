exports.creds = {
    identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration', 

    clientID: 'd926fa4e-4c64-4dd1-b581-8aecc78ec5d9',
  
    clientSecret: '481c5964-9ab3-4058-82d7-14f23bba4ee0', 
  
    responseType: 'code id_token', 
  
    responseMode: 'form_post', 
  
    //redirectUrl: 'kingstodo.heroku.com/auth/openid/return/id',

    redirectUrl: 'http://localhost:8000/auth/openid/return', 

    allowHttpForRedirectUrl: true,
  
    validateIssuer: false,
  
    issuer: null,
  
    passReqToCallback: false,
  
    useCookieInsteadOfSession: false,
  
    cookieEncryptionKeys: [ 
      { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
      { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
    ],
  
    scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],
  
    loggingLevel: false,
  
    nonceLifetime: null,
  
    nonceMaxAmount: 5,
  
    clockSkew: null,
  };
  
  exports.destroySessionUrl = 'http://localhost:8000';

  //exports.destroySessionUrl = 'http://kingstodo.heroku.com';
  
  exports.useMongoDBSessionStore = false;
  
  exports.databaseUri = 'mongodb://localhost/OIDCStrategy';
  
  exports.mongoDBSessionMaxAge = 24 * 60 * 60;  
  