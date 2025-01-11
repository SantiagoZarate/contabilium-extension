export async function retryUntilSuccessful(
  task: () => void,
  retries = 5,
  delay = 500,
) {
  for (let i = 0; i < retries; i++) {
    try {
      task();
      return;
    } catch (error) {
      console.warn(`Retry ${i + 1} failed: ${error}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  console.error('Task failed after retries.');
}
