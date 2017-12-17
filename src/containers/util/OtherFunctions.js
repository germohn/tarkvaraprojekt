
export const getSubstring = (input) => {
  if (!input) return;
  const limit = 70;
  if (input.length < limit) return input;
  const substring = input.substring(0, limit);
  const end = substring.lastIndexOf(' ');
  return input.substring(0, end) + '...';
};

export const joinFoundersToList = (elems) => {
  if (!elems) return '';
  let names = [];
  elems.map((founder) =>
    names.push(founder.name)
  );
  return names.join('  |  ');
};
