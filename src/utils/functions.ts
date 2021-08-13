const makeRandomColor = () => {
  const history: string[] = [];

  return () => {
    let randColor = '';
    let isUnique = false;

    for (let i = 0; i < 100; i++) {
      randColor = Math.round(Math.random() * 0xffffff).toString(16).padStart(6, '0');
      isUnique = history.findIndex(h => h === randColor) < 0;
      if (isUnique) break;
    }

    if (isUnique) {
      history.push(randColor);
      return randColor;
    }
    return '000000';

  };
};

export const getRandomColor = makeRandomColor();
