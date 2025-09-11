export interface passwordStrInterface {
  score: number;
  level: 'empty' | 'weak' | 'medium' | 'strong';
  color: 'red' | 'orange' | 'yellow' | 'green';
}

export const getPasswordStrength = (password: string): passwordStrInterface => {
  if (!password)
    return {
      score: 0,
      level: 'empty',
      color: 'red',
    };

  let score = 0;
  const checks = [
    password.length >= 8,
    /\d/.test(password),
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[!@#$%^&*(),.?":{}|<>]/.test(password),
  ];

  score = checks.filter(Boolean).length;
  console.log(score);
  if (score === 0) {
    return { score, level: 'empty', color: 'red' };
  } else if (score <= 2) {
    return { score, level: 'weak', color: 'red' };
  } else if (score === 3 || score === 4) {
    return { score, level: 'medium', color: 'orange' };
  } else {
    return { score, level: 'strong', color: 'green' };
  }
};
