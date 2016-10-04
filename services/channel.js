export const createChannels = (userId, friends) => {
  return friends.map(id => {
    const identifiers = [userId, id];
    identifiers.sort();

    return `conversation_${identifiers.join('_')}`;
  });
}
