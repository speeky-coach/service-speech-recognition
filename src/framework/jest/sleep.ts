function sleep(timeInSeconds: number) {
  return new Promise((r) => setTimeout(r, timeInSeconds));
}

export default sleep;
