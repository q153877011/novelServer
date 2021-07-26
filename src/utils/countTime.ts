import { timeCountTable } from 'src/database/table';

export async function countTime(username: string) {
  let timeCount = timeCountTable();

  let preDate = await timeCount.findOne({
    where: { username: username },
  });

  let latestTime: string = String(preDate.get('latestTime'));
  let d = new Date(latestTime).getTime();

  let sub = (new Date().getTime() - d) / 1000 / 60;
  console.log(sub);
}
