import { createContext, useContext, useState } from 'react';

// basic - CustomNumber와 비슷하게 map을 사용함으로
// map에 이미 값이 있는지 중복확인하기 = 값을 캐시하기
const cache = new Map();

export const memo1 = (fn) => {
  if (cache.has(fn)) return cache.get(fn);

  const result = fn();
  cache.set(fn, result);

  return result;
};

export const memo2 = (fn, dependencies) => {
  const key = dependencies.join(',');

  if (cache.has(key)) return cache.get(key);

  const result = fn();
  cache.set(key, result);

  return result;
};

export const useCustomState = (initValue) => {
  return useState(initValue);
};

const textContextDefaultValue = {
  user: null,
  todoItems: [],
  count: 0,
};

export const TestContext = createContext({
  value: textContextDefaultValue,
  setValue: () => null,
});

export const TestContextProvider = ({ children }) => {
  const [value, setValue] = useState(textContextDefaultValue);

  return (
    <TestContext.Provider value={{ value, setValue }}>
      {children}
    </TestContext.Provider>
  );
};

const useTestContext = () => {
  return useContext(TestContext);
};

export const useUser = () => {
  const { value, setValue } = useTestContext();

  return [value.user, (user) => setValue({ ...value, user })];
};

export const useCounter = () => {
  const { value, setValue } = useTestContext();

  return [value.count, (count) => setValue({ ...value, count })];
};

export const useTodoItems = () => {
  const { value, setValue } = useTestContext();

  return [value.todoItems, (todoItems) => setValue({ ...value, todoItems })];
};
