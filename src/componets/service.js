export const calcCount = (sender, reciver, sum) => {
  console.log("sender", sender);
  if (sum >= sender.count) {
    throw new Error("Не хватает средств");
  }
  sender.count = +sender.count - +sum;
  reciver.count += +sum;

  return {
    sender: sender,
    reciver: reciver,
  };
};
