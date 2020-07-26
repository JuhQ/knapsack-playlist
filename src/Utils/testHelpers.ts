import Queue from "../Datastructures/queue/queue";

// This helper will generate n-length queue of test data
const generateTestData = (n: number, seconds = 1): Queue => {
  const queue = new Queue();

  for (let i = 0; i < n; i++) {
    queue.enqueue({
      id: `${i}`,
      title: "test",
      seconds,
    });
  }
  return queue;
};

export default generateTestData;
