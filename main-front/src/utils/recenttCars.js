const RECENT_CARS_KEY = "recentCars";

// 최근 본 차량 목록 불러오기
export const getRecentCars = () => {
  const storedData = localStorage.getItem(RECENT_CARS_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// 최근 본 차량 추가
export const addRecentCar = (car) => {
  const recentCars = getRecentCars();
  const updatedCars = [car, ...recentCars.filter((c) => c.id !== car.id)].slice(0, 5);
  localStorage.setItem(RECENT_CARS_KEY, JSON.stringify(updatedCars));
};
