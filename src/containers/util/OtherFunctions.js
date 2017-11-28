
export const getSubstring = (input) => {
  if (!input) return;
  const limit = 70;
  if (input.length < limit) return input;
  if (input.indexOf(' ', limit * 0.9) == -1) return input;
  const end = input.indexOf(' ', limit * 0.9);
  return input.substring(0, end) + '...';
};
