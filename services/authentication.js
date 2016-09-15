export class AuthenticationService {
  static getTokenFromUri(uri) {
    const matches = uri.match(/reactchat:\/\/(.*)$/);
    if (matches.length < 2) {
      throw new Error(`No authentication token available in this URI: ${uri}`);
    }
    return matches[1];
  }
}